/**
 * Generated bundle index. Do not edit.
 */
import * as i0 from "@angular/core";
import { EnvironmentProviders, InjectionToken, OnDestroy, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { UserManagerSettings } from "oidc-client-ts";
import { CanActivateFn } from "@angular/router";
import { HubConnection, HubConnectionState, IRetryPolicy, LogLevel } from "@microsoft/signalr";
import { Observable } from "rxjs";
/**
 * The settings every UI that uses this library has in its config.json. Each application extends it with
 * its own settings (see the Configuration class in the OI UI and ProductAdminConfig in the ProductManager UI).
 */
export interface OiBaseConfig {
  /** OI.Auth API, ending in /api/ */
  authApiUrl: string;
  /** The SignalR hub endpoint, ending in /hubs/app */
  hubUrl: string;
}
/** What differs from one application to the next. Everything else in the library behaves the same everywhere. */
export interface OiUiOptions {
  /**
   * The address prefixes the bearer token is sent to, worked out from the loaded config.json.
   * The token is only ever sent to an API that is known to accept it, so list those and nothing else
   * (never the auth API's own sign-in, refresh and sign-out calls).
   */
  securedUrls: (config: OiBaseConfig) => string[];
  /** The id this application is registered under in OI.Auth's "Clients" settings, e.g. "oi-ui" or "product-admin". */
  clientId: string;
  /** What the application asks OI.Auth for when it signs in. Default "openid profile email offline_access" (offline_access is what allows a refresh token). */
  scopes: string;
  /** The route that finishes a sign-in: OI.Auth sends the browser back here with a code. Must match a registered redirect address. Default /auth/callback */
  callbackRoute: string;
  /** The route OI.Auth sends the browser to after signing out. Must match a registered post-logout address. Default /signed-out */
  signedOutRoute: string;
  /** Where a signed-in user goes instead of the sign-in page. Default /home */
  homeRoute: string;
  /** Where a signed-in user who lacks the required role is sent. Default: homeRoute */
  forbiddenRoute: string;
  /** The name shown on the sign-in and signed-out pages. Default "Sign in" */
  appTitle: string;
}
export declare const OI_UI_OPTIONS: InjectionToken<OiUiOptions>;
/**
 * Register once in app.config.ts. Anything not given keeps its default
 * (forbiddenRoute follows homeRoute unless set).
 */
export declare function provideOiUiCommon(options: Partial<OiUiOptions> & Pick<OiUiOptions, 'securedUrls' | 'clientId'>): EnvironmentProviders;
/**
 * The start-up every application needs, in the order that matters: read config.json, then quietly sign back in
 * if this tab was already signed in (a page reload). Call it from the application's app initializer.
 */
export declare function startOiSession(): Promise<void>;
/**
 * Optional: gives the configuration its defaults, so a setting missing from config.json still has a value.
 * An application provides a function that returns a new instance of its own configuration class.
 */
export declare const OI_CONFIG_DEFAULTS: InjectionToken<() => OiBaseConfig>;
export declare class ConfigService<T extends OiBaseConfig = OiBaseConfig> {
  private http;
  private defaults;
  private _config;
  /**
   * Called once by the app initializer.
   * The address is relative on purpose: it is worked out from the page's base href, so each application reads the
   * config.json served next to it (both UIs are served at the root of their own address: /config.json).
   */
  load(): Promise<void>;
  /** False until load() has finished. The auth interceptor checks this because it also sees the request that loads the configuration. */
  get isLoaded(): boolean;
  /** Synchronous access after startup. */
  get config(): T;
  static ɵfac: i0.ɵɵFactoryDeclaration<ConfigService<any>, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
/**
 * Thrown by the auth interceptor when the session could not be kept alive and the user is being sent
 * to the sign-in page. The error handler recognises it and stays quiet: the page change is the message.
 */
export declare class SessionEndedError extends HttpErrorResponse {
  constructor(url: string | null);
}
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
export declare function authorityFrom(authApiUrl: string): string;
/** A route as the full address the browser is sent back to. The router's base href is respected (e.g. /app/ + auth/callback). */
export declare function absoluteRouteUrl(route: string, baseUri: string): string;
/**
 * A fresh random value for each sign-in. It is sent to OI.Auth, which writes it into the ID token it returns, and
 * oidc-client-ts refuses an ID token whose nonce is not this one (a sign-in response replayed from another session).
 */
export declare function newNonce(): string;
/** What a sign-in request carries beyond the settings: the application's own state, and the nonce. */
export declare function signinArgs(state?: unknown): {
  state: unknown;
  nonce: string;
};
/** The oidc-client-ts settings for this application: one place that says what the browser asks OI.Auth for. */
export declare function buildUserManagerSettings(config: OiBaseConfig, options: OiUiOptions, baseUri: string, storage: Storage): UserManagerSettings;
/** The real thing: oidc-client-ts, created on first use (config.json has to be loaded before the settings are known). */
export declare class UserManagerOidcSession implements OidcSession {
  private readonly configService;
  private readonly options;
  private manager;
  constructor(configService: ConfigService, options: OiUiOptions);
  private get users();
  getUser(): Promise<OidcUser | null>;
  signinRedirect(state?: unknown): Promise<void>;
  signinCallback(url?: string): Promise<OidcUser>;
  signinSilent(): Promise<OidcUser | null>;
  signoutRedirect(): Promise<void>;
  removeUser(): Promise<void>;
}
export declare const OIDC_SESSION: InjectionToken<OidcSession>;
/**
 * What happened when we tried to renew the session.
 * refreshed:   there is a new access token
 * rejected:    the server refused the refresh token (expired, revoked, user locked out): sign in again
 * unavailable: the server could not be reached or failed: nothing is known about the session, so keep it
 */
export type RefreshOutcome = 'refreshed' | 'rejected' | 'unavailable';
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
export declare class AuthService {
  private router;
  private options;
  private oidc;
  private readonly accessToken;
  private readonly claims;
  private refreshInFlight;
  private sessionEnding;
  private signInStarted;
  readonly isAuthenticated: import("@angular/core").Signal<boolean>;
  /** The user's id (the token's "sub"), which is how the Admin screens recognise the signed-in user's own row. */
  readonly userId: import("@angular/core").Signal<string>;
  readonly userName: import("@angular/core").Signal<string>;
  readonly roles: import("@angular/core").Signal<string[]>;
  readonly groups: import("@angular/core").Signal<string[]>;
  /** For the interceptor. */
  get currentToken(): string | null;
  /**
   * Called by the app initializer: pick the session back up if this tab was already signed in (a page reload).
   * A token that has run out is renewed with the refresh token. Nothing is stored: nobody is signed in.
   */
  restore(): Promise<void>;
  /**
   * Sends the browser to OI.Auth to sign in. If the person already has an OI.Auth session (the other application, another tab)
   * they come straight back signed in without typing a password. Where they were going is remembered and restored afterwards.
   * Rejects if the sign-in cannot be started (OI.Auth cannot be reached).
   */
  signIn(returnUrl?: string): Promise<void>;
  /**
   * Finishes a sign-in on the callback page: trades the code in the address for tokens and returns where the person was going.
   * Rejects when OI.Auth refused (sign-in cancelled, bad or reused code) or cannot be reached.
   */
  completeSignIn(url?: string): Promise<string>;
  /** Ends the session here and at OI.Auth (which ends this browser's tokens), then lands on the signed-out page. */
  logout(): Promise<void>;
  /**
   * The session cannot be kept alive. Forget it and go back to OI.Auth, remembering where the user was. If their OI.Auth session
   * is still valid they come straight back signed in; if not, they are asked for a password.
   */
  sessionExpired(): Promise<void>;
  /** Single flight: concurrent callers (interceptor, SignalR) share one request. */
  refresh(): Promise<RefreshOutcome>;
  /**
   * Called when a request came back 401. If another request already got a newer token since this one
   * was sent, there is nothing to renew: just retry with the newer token.
   */
  renewAfterRejection(rejectedToken: string | null): Promise<RefreshOutcome>;
  /** For SignalR's accessTokenFactory. Renews first if the token is about to expire. */
  getAccessToken(): Promise<string>;
  private doRefresh;
  private reject;
  private isRefusal;
  private isFresh;
  /** Takes the tokens into use. False when the access token cannot be read (nothing is changed then). */
  private applyUser;
  private clearSession;
  /** Forgets the user kept in this tab's storage. Best effort. */
  private forget;
  /** Reads the payload for display and expiry only. The server is what enforces access. */
  private decode;
  static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
/**
 * Adds the bearer token to calls to the APIs the application listed in its options (securedUrls). When one comes back 401 the
 * session is renewed once and the call is repeated, so the user never notices a token expiring.
 * If it cannot be renewed the user is sent to the sign-in page.
 *
 * Calls to anything not listed are left alone: the token is only ever sent to an API that is known to accept it.
 */
export declare const authInterceptor: HttpInterceptorFn;
/**
 * Everything except the sign-in plumbing pages. Sends a signed-out user to OI.Auth to sign in and remembers where they were
 * going; they come back to that page signed in (straight away, with no password, if they already have an OI.Auth session).
 * The navigation is cancelled because the browser is leaving this application.
 * If OI.Auth cannot be reached, the user lands on the signed-out page with a message and a Try again button.
 */
export declare const authGuard: CanActivateFn;
export declare const roleGuard: (role: string) => CanActivateFn;
/**
 * The Admin screens. The server enforces the same rule on every admin endpoint, so this only saves a non-admin
 * from landing on a page whose every call would be refused.
 */
export declare const adminGuard: CanActivateFn;
/**
 * Where OI.Auth sends the browser back to after signing in (the application's callbackRoute). It trades the code in the address
 * for tokens and carries on to the page the person was going to. If that fails (sign-in cancelled, a code used twice) it says so
 * and offers to try again. Register it on the callbackRoute with no guard.
 */
export declare class AuthCallback implements OnInit {
  private auth;
  private router;
  private options;
  /** The name of the application (set once per application in provideOiUiCommon). */
  protected readonly title: string;
  protected readonly failed: import("@angular/core").WritableSignal<boolean>;
  protected readonly starting: import("@angular/core").WritableSignal<boolean>;
  ngOnInit(): void;
  protected tryAgain(): Promise<void>;
  private finish;
  static ɵfac: i0.ɵɵFactoryDeclaration<AuthCallback, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AuthCallback, "oi-auth-callback", never, {}, {}, never, never, true, never>;
}
/**
 * Where OI.Auth sends the browser after signing out (the application's signedOutRoute): "You have been signed out" and a
 * Sign in button. It is also where a failed attempt to reach OI.Auth lands (?error=unavailable), with a message.
 * Register it on the signedOutRoute with no guard.
 */
export declare class SignedOut {
  private auth;
  private options;
  /** The name of the application (set once per application in provideOiUiCommon). */
  protected readonly title: string;
  /** From the query string (withComponentInputBinding): /signed-out?error=unavailable */
  readonly error: import("@angular/core").InputSignal<string | undefined>;
  protected readonly startFailed: import("@angular/core").WritableSignal<boolean>;
  protected readonly starting: import("@angular/core").WritableSignal<boolean>;
  protected readonly unavailable: import("@angular/core").Signal<boolean>;
  protected signIn(): Promise<void>;
  static ɵfac: i0.ɵɵFactoryDeclaration<SignedOut, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<SignedOut, "oi-signed-out", never, {
    "error": {
      "alias": "error";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** "Signed in as <name>" and a Sign out button. Put it at the end of an application's menu bar. */
export declare class UserMenu {
  protected readonly auth: AuthService;
  protected signOut(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<UserMenu, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<UserMenu, "oi-user-menu", never, {}, {}, never, never, true, never>;
}
/**
 * Where to go after signing in. Only a path inside this app is accepted, so a crafted
 * address cannot send the user to another site. The sign-in plumbing pages (the callback and the signed-out page)
 * are never a place to return to, or signing in could loop.
 */
export declare function safeReturnUrl(url: string | null | undefined, fallback?: string): string;
export type Severity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
export declare class NotificationService {
  private msgService;
  private send;
  success(summary: string, detail: string, life?: number): void;
  info(summary: string, detail: string, life?: number): void;
  warn(summary: string, detail: string, life?: number): void;
  error(summary: string, detail: string, life?: number): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<NotificationService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
export interface SignalRConfig {
  /** Full hub URL, e.g. https://localhost:5001/hubs/chat */
  url: string;
  /** Return a JWT (or null) for each connection attempt. */
  accessTokenFactory?: () => string | Promise<string>;
  logLevel?: LogLevel;
}
/** Retries after 0s, 2s, 5s, 10s, 30s, then every 30s forever. */
export declare class BackoffRetryPolicy implements IRetryPolicy {
  private readonly delays;
  nextRetryDelayInMilliseconds(ctx: {
    previousRetryCount: number;
  }): number;
}
export type HubConnectionFactory = (config: SignalRConfig) => HubConnection;
/** Builds the real connection. */
export declare const defaultHubConnectionFactory: HubConnectionFactory;
/** How the service gets its connection. A token, so a spec can hand it a stand-in and test without a server. */
export declare const HUB_CONNECTION_FACTORY: InjectionToken<HubConnectionFactory>;
export declare class SignalRService implements OnDestroy {
  private readonly createConnection;
  private connection?;
  /** Set by stop(), so a connection attempt that is still retrying gives up instead of reconnecting after sign-out. */
  private stopRequested;
  private readonly _state;
  private readonly _error;
  readonly state: import("@angular/core").Signal<HubConnectionState>;
  readonly error: import("@angular/core").Signal<string | null>;
  readonly isConnected: import("@angular/core").Signal<boolean>;
  /** Build the connection. Register handlers with on() before calling start(). */
  configure(config: SignalRConfig): void;
  /** Start the connection. Retries the *initial* connect, which
   *  withAutomaticReconnect does not do on its own. */
  start(maxAttempts?: number): Promise<void>;
  stop(): Promise<void>;
  /** Subscribe to a server -> client method. Returns an unsubscribe function. */
  on<T extends unknown[]>(method: string, handler: (...args: T) => void): () => void;
  /** Same as on(), as an Observable. Emits the first argument (or the tuple if several). */
  listen<T = unknown>(method: string): Observable<T>;
  /** Fire-and-forget client -> server call. */
  send(method: string, ...args: unknown[]): Promise<void>;
  /** Client -> server call that returns the hub method's result. */
  invoke<T = void>(method: string, ...args: unknown[]): Promise<T>;
  /** Server -> client streaming (IAsyncEnumerable / ChannelReader on the hub). */
  stream<T>(method: string, ...args: unknown[]): Observable<T>;
  ngOnDestroy(): void;
  private requireConnection;
  static ɵfac: i0.ɵɵFactoryDeclaration<SignalRService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
export interface AppNotification {
  type: string;
  title: string;
  body?: string;
  at: string;
  /** Set when the notification is more than a message, for example 'report.ready'. See report-status-service.ts. */
  event?: string;
  /** What the event is about; for the report events, the report id. */
  correlationId?: string;
}
/** Typed facade over SignalRService for the central hub (OI.Hub: AppHub / IAppClient). */
export declare class AppHubService {
  private hub;
  private auth;
  private configService;
  /**
   * Builds the connection (once) without starting it, so handlers can be attached before any message can arrive.
   * The token is read again on every (re)connect, so refreshed tokens are picked up.
   */
  configure(): void;
  /** Call after sign-in. */
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  readonly messages$: Observable<[string, string]>;
  readonly notifications$: Observable<AppNotification>;
  sendToMyGroup(groupId: string, text: string): Promise<void>;
  subscribe(groupId: string, topic: string): Promise<void>;
  unsubscribe(groupId: string, topic: string): Promise<void>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AppHubService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
/**
 * Something else in the application that wants to see every notification the hub delivers
 * (the OI UI uses this to tell its pages that a report is ready). Register with { provide: HUB_NOTIFICATION_HANDLER, useExisting: ..., multi: true }.
 */
export interface HubNotificationHandler {
  handle(notification: AppNotification): void;
  /** The user signed out: forget anything remembered from notifications. */
  clear(): void;
}
export declare const HUB_NOTIFICATION_HANDLER: InjectionToken<HubNotificationHandler[]>;
/**
 * Keeps the browser connected to the central hub for as long as someone is signed in, and shows
 * what the back end sends as toasts. It is started by injecting it once (each application's root component does).
 *
 *  - signed in   -> connect, and listen for notifications
 *  - signed out  -> stop listening and disconnect
 *  - hub down    -> try again every 30 seconds while still signed in
 *
 * The hub only reaches browsers that are connected at that moment; nothing is stored for later.
 */
export declare class HubConnectionService {
  private auth;
  private appHub;
  private notifications;
  private handlers;
  private subscription?;
  private retryTimer?;
  /** Sign-in and sign-out can happen in quick succession; the work is done strictly one after another. */
  private queue;
  constructor();
  private enqueue;
  private start;
  private connect;
  private retry;
  private stop;
  private cancelRetry;
  private show;
  static ɵfac: i0.ɵɵFactoryDeclaration<HubConnectionService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}