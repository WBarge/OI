import { computed, DestroyRef, inject, Service, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config-service';

interface AuthResult {
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
}

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

export const REFRESH_KEY = 'oi.refresh';
const REFRESH_LOCK = 'oi-token-refresh';
const RENEW_BEFORE_EXPIRY_MS = 60_000;
const toArray = (v?: string | string[]) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/**
 * Keeps the signed-in session.
 *  - The access token (15 minutes) lives in memory only.
 *  - The refresh token (7 days, replaced every time it is used) lives in localStorage so a reload,
 *    a new tab, or coming back tomorrow does not ask for a password again. The trade-off is that a
 *    script running on the page could read it, which is why the Angular templates must never bypass sanitising.
 */
@Service()
export class AuthService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private router = inject(Router);

  private readonly accessToken = signal<string | null>(null);
  private readonly claims = signal<TokenClaims | null>(null);
  private refreshInFlight: Promise<RefreshOutcome> | null = null;
  private sessionEnding = false;

  readonly isAuthenticated = computed(() => this.accessToken() !== null);
  readonly userName = computed(() => this.claims()?.name ?? '');
  readonly roles = computed(() => toArray(this.claims()?.role));
  readonly groups = computed(() => toArray(this.claims()?.group));

  constructor() {
    // Signing out in one tab removes the shared refresh token; follow it in the other tabs.
    const onStorage = (event: StorageEvent) => {
      const refreshTokenRemoved =
        (event.key === REFRESH_KEY || event.key === null) && localStorage.getItem(REFRESH_KEY) === null;
      if (refreshTokenRemoved && this.accessToken() !== null) {
        this.clearSession();
        void this.router.navigate(['/login']);
      }
    };
    window.addEventListener('storage', onStorage);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('storage', onStorage));
  }

  private get authUrl(): string {
    return this.configService.config.authApiUrl + 'auth/';
  }

  /** For the interceptor. */
  get currentToken(): string | null {
    return this.accessToken();
  }

  /** Called by the app initializer: quietly sign back in if a refresh token was kept from last time. */
  async restore(): Promise<void> {
    if (localStorage.getItem(REFRESH_KEY)) {
      await this.refresh();
    }
  }

  /** Rejects with the HttpErrorResponse when the sign-in is refused (401), throttled (429) or unreachable (0). */
  async login(email: string, password: string): Promise<void> {
    const result = await firstValueFrom(
      this.http.post<AuthResult>(this.authUrl + 'login', { email, password }),
    );
    this.applySession(result);
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    this.clearSession();
    await this.router.navigate(['/login']);
    if (refreshToken) {
      try {
        await firstValueFrom(this.http.post(this.authUrl + 'logout', { refreshToken }));
      } catch {
        /* best effort: the token is already gone from this browser */
      }
    }
  }

  /** The session cannot be kept alive. Forget it and go to the sign-in page, remembering where the user was. */
  async sessionExpired(): Promise<void> {
    this.clearSession();
    const here = this.router.url;
    if (this.sessionEnding || here === '/login' || here.startsWith('/login?')) {
      return;
    }
    this.sessionEnding = true;   // several requests can fail together; navigate once
    try {
      await this.router.navigate(['/login'], { queryParams: { reason: 'expired', returnUrl: here } });
    } finally {
      this.sessionEnding = false;
    }
  }

  /** Single flight: concurrent callers (interceptor, SignalR) share one request. */
  refresh(): Promise<RefreshOutcome> {
    this.refreshInFlight ??= this.refreshAcrossTabs().finally(() => (this.refreshInFlight = null));
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

  /**
   * Every tab shares one refresh token and each use replaces it. Two tabs refreshing at the same moment
   * would use the same one twice, so they take turns (Web Locks) and the second reads the replacement.
   */
  private refreshAcrossTabs(): Promise<RefreshOutcome> {
    const locks = typeof navigator === 'undefined' ? undefined : navigator.locks;
    return locks ? locks.request(REFRESH_LOCK, () => this.doRefresh()) : this.doRefresh();
  }

  private async doRefresh(): Promise<RefreshOutcome> {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) {
      this.clearSession();
      return 'rejected';
    }
    try {
      const result = await firstValueFrom(
        this.http.post<AuthResult>(this.authUrl + 'refresh', { refreshToken }),
      );
      this.applySession(result);
      return 'refreshed';
    } catch (error) {
      // Only a refusal ends the session. A network problem or a server error must not sign the user out.
      const refused =
        error instanceof HttpErrorResponse && (error.status === 400 || error.status === 401 || error.status === 403);
      if (refused) {
        this.clearSession();
        return 'rejected';
      }
      return 'unavailable';
    }
  }

  private applySession(result: AuthResult): void {
    const claims = this.decode(result.accessToken);
    this.accessToken.set(result.accessToken);
    this.claims.set(claims);
    localStorage.setItem(REFRESH_KEY, result.refreshToken);
  }

  private clearSession(): void {
    this.accessToken.set(null);
    this.claims.set(null);
    localStorage.removeItem(REFRESH_KEY);
  }

  /** Reads the payload for display and expiry only. The server is what enforces access. */
  private decode(jwt: string): TokenClaims {
    const payload = (jwt.split('.')[1] ?? '').replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as TokenClaims;
  }
}
