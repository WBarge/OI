import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OI_UI_OPTIONS } from '../options/oi-ui-options';
import { safeReturnUrl } from '../utils/url.utils';
import { OIDC_SESSION, OidcUser } from './oidc-session';

interface TokenClaims {
  sub: string;
  name?: string;
  role?: string | string[];
  group?: string | string[];
  exp: number;
}

/**
 * What happened when we tried to renew the session.
 * refreshed:   there is a new access token
 * rejected:    the server refused the refresh token (expired, revoked, user locked out): sign in again
 * unavailable: the server could not be reached or failed: nothing is known about the session, so keep it
 */
export type RefreshOutcome = 'refreshed' | 'rejected' | 'unavailable';

/** What the application remembers across the redirect to OI.Auth. */
interface SignInState {
  returnUrl: string;
}

/** The errors OI.Auth answers a refresh with when the session is genuinely over (as opposed to being temporarily unavailable). */
const REFUSALS = ['invalid_grant', 'invalid_token', 'invalid_client', 'unauthorized_client', 'access_denied'];

const RENEW_BEFORE_EXPIRY_MS = 60_000;
/** If the browser comes back to this page without having left (the back button restoring it from the cache), sign-in may be started again after this long. */
const SIGN_IN_RESET_MS = 5_000;
const toArray = (v?: string | string[]) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/**
 * Keeps the signed-in session. People sign in on OI.Auth (the browser is sent there; no password is ever typed into this
 * application), and OI.Auth sends the browser back with a code that is traded for tokens.
 *  - The access token (15 minutes) is what the APIs check. It is kept for the page's use in memory and by oidc-client-ts in
 *    the tab's sessionStorage, so a reload does not sign the user out.
 *  - The refresh token (rotating: each use replaces it) is kept the same way. sessionStorage belongs to one tab, so each tab
 *    has its own sign-in and tabs never race to use the same refresh token. A tab that is closed is signed out of this
 *    application, but opening another one signs in again without a password while the OI.Auth session lasts (8 hours).
 *  - The trade-off of keeping tokens in the page's storage is that a script running on the page could read them, which is why
 *    the Angular templates must never bypass sanitising.
 */
@Service()
export class AuthService {
  private router = inject(Router);
  private options = inject(OI_UI_OPTIONS);
  private oidc = inject(OIDC_SESSION);

  private readonly accessToken = signal<string | null>(null);
  private readonly claims = signal<TokenClaims | null>(null);
  private refreshInFlight: Promise<RefreshOutcome> | null = null;
  private sessionEnding = false;
  private signInStarted = false;

  readonly isAuthenticated = computed(() => this.accessToken() !== null);
  /** The user's id (the token's "sub"), which is how the Admin screens recognise the signed-in user's own row. */
  readonly userId = computed(() => this.claims()?.sub ?? '');
  readonly userName = computed(() => this.claims()?.name ?? '');
  readonly roles = computed(() => toArray(this.claims()?.role));
  readonly groups = computed(() => toArray(this.claims()?.group));

  /** For the interceptor. */
  get currentToken(): string | null {
    return this.accessToken();
  }

  /**
   * Called by the app initializer: pick the session back up if this tab was already signed in (a page reload).
   * A token that has run out is renewed with the refresh token. Nothing is stored: nobody is signed in.
   */
  async restore(): Promise<void> {
    let user: OidcUser | null;
    try {
      user = await this.oidc.getUser();
    } catch {
      return;
    }
    if (!user) {
      return;
    }

    if (this.isFresh(user) && this.applyUser(user)) {
      return;
    }
    await this.refresh();
  }

  /**
   * Sends the browser to OI.Auth to sign in. If the person already has an OI.Auth session (the other application, another tab)
   * they come straight back signed in without typing a password. Where they were going is remembered and restored afterwards.
   * Rejects if the sign-in cannot be started (OI.Auth cannot be reached).
   */
  async signIn(returnUrl?: string): Promise<void> {
    if (this.signInStarted) {
      return;   // several guards or failing requests can ask at the same moment: send the browser once
    }
    this.signInStarted = true;
    try {
      const state: SignInState = { returnUrl: safeReturnUrl(returnUrl ?? this.router.url, this.options.homeRoute) };
      await this.oidc.signinRedirect(state);
      setTimeout(() => (this.signInStarted = false), SIGN_IN_RESET_MS);
    } catch (error) {
      this.signInStarted = false;
      throw error;
    }
  }

  /**
   * Finishes a sign-in on the callback page: trades the code in the address for tokens and returns where the person was going.
   * Rejects when OI.Auth refused (sign-in cancelled, bad or reused code) or cannot be reached.
   */
  async completeSignIn(url?: string): Promise<string> {
    const user = await this.oidc.signinCallback(url);
    if (!this.applyUser(user)) {
      throw new Error('OI.Auth returned an access token that cannot be read.');
    }
    this.signInStarted = false;
    const state = user.state as Partial<SignInState> | undefined;
    return safeReturnUrl(state?.returnUrl, this.options.homeRoute);
  }

  /** Ends the session here and at OI.Auth (which ends this browser's tokens), then lands on the signed-out page. */
  async logout(): Promise<void> {
    this.clearSession();
    try {
      await this.oidc.signoutRedirect();
    } catch {
      // OI.Auth could not be reached: this tab is signed out anyway
      await this.forget();
      await this.router.navigate([this.options.signedOutRoute]);
    }
  }

  /**
   * The session cannot be kept alive. Forget it and go back to OI.Auth, remembering where the user was. If their OI.Auth session
   * is still valid they come straight back signed in; if not, they are asked for a password.
   */
  async sessionExpired(): Promise<void> {
    this.clearSession();
    await this.forget();
    const here = this.router.url;
    const plumbing = [this.options.callbackRoute, this.options.signedOutRoute];
    if (this.sessionEnding || plumbing.some((route) => here === route || here.startsWith(route + '?'))) {
      return;
    }
    this.sessionEnding = true;   // several requests can fail together; go once
    try {
      await this.signIn(here);
    } catch {
      await this.router.navigate([this.options.signedOutRoute], { queryParams: { error: 'unavailable' } });
    } finally {
      this.sessionEnding = false;
    }
  }

  /** Single flight: concurrent callers (interceptor, SignalR) share one request. */
  refresh(): Promise<RefreshOutcome> {
    this.refreshInFlight ??= this.doRefresh().finally(() => (this.refreshInFlight = null));
    return this.refreshInFlight;
  }

  /**
   * Called when a request came back 401. If another request already got a newer token since this one
   * was sent, there is nothing to renew: just retry with the newer token.
   */
  async renewAfterRejection(rejectedToken: string | null): Promise<RefreshOutcome> {
    const latest = this.accessToken();
    if (latest !== null && latest !== rejectedToken) {
      return 'refreshed';
    }
    return this.refresh();
  }

  /** For SignalR's accessTokenFactory. Renews first if the token is about to expire. */
  async getAccessToken(): Promise<string> {
    const exp = this.claims()?.exp ?? 0;
    if (!this.accessToken() || exp * 1000 - Date.now() < RENEW_BEFORE_EXPIRY_MS) {
      await this.refresh();
    }
    return this.accessToken() ?? '';
  }

  private async doRefresh(): Promise<RefreshOutcome> {
    let stored: OidcUser | null;
    try {
      stored = await this.oidc.getUser();
    } catch {
      return 'unavailable';
    }
    if (!stored?.refresh_token) {
      // nothing to renew with (signed out in this tab, or offline_access was not granted)
      this.clearSession();
      return 'rejected';
    }

    try {
      const user = await this.oidc.signinSilent();
      if (!user || !this.applyUser(user)) {
        return await this.reject();
      }
      return 'refreshed';
    } catch (error) {
      // Only a refusal ends the session. A network problem or a server error must not sign the user out.
      return this.isRefusal(error) ? await this.reject() : 'unavailable';
    }
  }

  private async reject(): Promise<RefreshOutcome> {
    this.clearSession();
    await this.forget();
    return 'rejected';
  }

  private isRefusal(error: unknown): boolean {
    const failure = error as { name?: string; error?: string | null } | null;
    return failure?.name === 'ErrorResponse' && typeof failure.error === 'string' && REFUSALS.includes(failure.error);
  }

  private isFresh(user: OidcUser): boolean {
    return user.expires_at === undefined || user.expires_at * 1000 - Date.now() > RENEW_BEFORE_EXPIRY_MS;
  }

  /** Takes the tokens into use. False when the access token cannot be read (nothing is changed then). */
  private applyUser(user: OidcUser): boolean {
    try {
      const claims = this.decode(user.access_token);
      this.accessToken.set(user.access_token);
      this.claims.set(claims);
      return true;
    } catch {
      return false;
    }
  }

  private clearSession(): void {
    this.accessToken.set(null);
    this.claims.set(null);
  }

  /** Forgets the user kept in this tab's storage. Best effort. */
  private async forget(): Promise<void> {
    try {
      await this.oidc.removeUser();
    } catch {
      /* nothing more to do */
    }
  }

  /** Reads the payload for display and expiry only. The server is what enforces access. */
  private decode(jwt: string): TokenClaims {
    const payload = (jwt.split('.')[1] ?? '').replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as TokenClaims;
  }
}
