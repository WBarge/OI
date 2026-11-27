import { inject, InjectionToken } from '@angular/core';
import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';
import { OiBaseConfig } from '../model/oi-base-config';
import { OI_UI_OPTIONS, OiUiOptions } from '../options/oi-ui-options';
import { ConfigService } from './config-service';

/** What the application keeps of a signed-in user. */
export interface OidcUser {
  /** The access token the APIs check. */
  access_token: string;
  /** Present when the offline_access scope was granted: what renews the session. */
  refresh_token?: string;
  /** When the access token runs out (seconds since 1970). */
  expires_at?: number;
  /** What the application stored before it sent the browser to sign in (see AuthService.signIn). */
  state?: unknown;
}

/**
 * The OpenID Connect work (redirect to OI.Auth with PKCE, trading the code for tokens, renewing with the refresh token,
 * signing out). A small seam over oidc-client-ts so AuthService can be tested without a browser redirect.
 * Tokens are kept in sessionStorage: each browser tab has its own sign-in, which is why no two tabs ever share a refresh token.
 */
export interface OidcSession {
  /** The user kept from earlier in this tab (page reload), or null. */
  getUser(): Promise<OidcUser | null>;
  /** Sends the browser to OI.Auth to sign in. The state comes back with the user. */
  signinRedirect(state?: unknown): Promise<void>;
  /** Finishes a sign-in: reads the code from the address (this page's by default) and trades it for tokens. */
  signinCallback(url?: string): Promise<OidcUser>;
  /** Renews with the refresh token. */
  signinSilent(): Promise<OidcUser | null>;
  /** Forgets the user and sends the browser to OI.Auth to end the sign-in session. */
  signoutRedirect(): Promise<void>;
  /** Forgets the user in this tab only. */
  removeUser(): Promise<void>;
}

/**
 * The address of OI.Auth itself, worked out from config.json's authApiUrl (which ends in /api/), so each deployment
 * has one setting less to get wrong. Without the trailing slash.
 */
export function authorityFrom(authApiUrl: string): string {
  return authApiUrl.replace(/\/+$/, '').replace(/\/api$/i, '');
}

/** A route as the full address the browser is sent back to. The router's base href is respected (e.g. /app/ + auth/callback). */
export function absoluteRouteUrl(route: string, baseUri: string): string {
  return new URL(route.replace(/^\/+/, ''), baseUri).href;
}

/**
 * A fresh random value for each sign-in. It is sent to OI.Auth, which writes it into the ID token it returns, and
 * oidc-client-ts refuses an ID token whose nonce is not this one (a sign-in response replayed from another session).
 */
export function newNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** What a sign-in request carries beyond the settings: the application's own state, and the nonce. */
export function signinArgs(state?: unknown): { state: unknown; nonce: string } {
  return { state, nonce: newNonce() };
}

/** The oidc-client-ts settings for this application: one place that says what the browser asks OI.Auth for. */
export function buildUserManagerSettings(
  config: OiBaseConfig,
  options: OiUiOptions,
  baseUri: string,
  storage: Storage,
): UserManagerSettings {
  return {
    authority: authorityFrom(config.authApiUrl),
    client_id: options.clientId,
    redirect_uri: absoluteRouteUrl(options.callbackRoute, baseUri),
    post_logout_redirect_uri: absoluteRouteUrl(options.signedOutRoute, baseUri),
    response_type: 'code',   // authorization code; PKCE (S256) is always used with it
    scope: options.scopes,
    userStore: new WebStorageStateStore({ store: storage }),
    stateStore: new WebStorageStateStore({ store: storage }),
    loadUserInfo: false,            // everything the application needs is in the tokens
    automaticSilentRenew: false,    // AuthService renews when a token is needed or rejected
    monitorSession: false,
    revokeTokensOnSignout: false,   // OI.Auth revokes this browser's tokens when the sign-out request arrives
  };
}

/** The real thing: oidc-client-ts, created on first use (config.json has to be loaded before the settings are known). */
export class UserManagerOidcSession implements OidcSession {
  private manager: UserManager | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly options: OiUiOptions,
  ) {}

  private get users(): UserManager {
    this.manager ??= new UserManager(
      buildUserManagerSettings(this.configService.config, this.options, document.baseURI, window.sessionStorage),
    );
    return this.manager;
  }

  getUser(): Promise<OidcUser | null> {
    return this.users.getUser();
  }

  async signinRedirect(state?: unknown): Promise<void> {
    await this.users.signinRedirect(signinArgs(state));
  }

  signinCallback(url?: string): Promise<OidcUser> {
    return this.users.signinRedirectCallback(url);
  }

  signinSilent(): Promise<OidcUser | null> {
    return this.users.signinSilent();
  }

  async signoutRedirect(): Promise<void> {
    await this.users.signoutRedirect();
  }

  async removeUser(): Promise<void> {
    await this.users.removeUser();
  }
}

export const OIDC_SESSION = new InjectionToken<OidcSession>('OIDC_SESSION', {
  providedIn: 'root',
  factory: () => new UserManagerOidcSession(inject(ConfigService), inject(OI_UI_OPTIONS)),
});
