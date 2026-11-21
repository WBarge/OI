/**
 * Generated bundle index. Do not edit.
 */
import * as i0 from "@angular/core";
import { EnvironmentProviders, InjectionToken, OnDestroy } from "@angular/core";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
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
  /** The sign-in route. Default /login */
  loginRoute: string;
  /** Where a signed-in user goes instead of the sign-in page. Default /home */
  homeRoute: string;
  /** Where a signed-in user who lacks the required role is sent. Default: homeRoute */
  forbiddenRoute: string;
  /** The heading on the sign-in page. Default "Sign in" */
  appTitle: string;
}
export declare const OI_UI_OPTIONS: InjectionToken<OiUiOptions>;
/**
 * Register once in app.config.ts. Anything not given keeps its default
 * (forbiddenRoute follows homeRoute unless set).
 */
export declare function provideOiUiCommon(options: Partial<OiUiOptions> & Pick<OiUiOptions, 'securedUrls'>): EnvironmentProviders;
/**
 * The start-up every application needs, in the order that matters: read config.json, then quietly sign back in
 * if a refresh token was kept. Call it from the application's app initializer.
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
   * The address is relative on purpose: it is worked out from the page's base href, so the OI UI (served at /)
   * reads /config.json and the ProductManager UI (served at /products/) reads /products/config.json.
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
/** The key the refresh token is kept under. Unchanged from the OI UI, so people already signed in stay signed in. */
export declare const REFRESH_KEY = "oi.refresh";
/**
 * Where the long-lived refresh token is kept between page loads.
 *
 * Today it is the browser's localStorage, which every window on the SAME ORIGIN shares: that sharing is what gives
 * the OI UI and the ProductManager UI one sign-in. This interface is the one place that assumption lives. A different
 * way of sharing a session (for example a single sign-on flow) replaces this class and nothing else.
 */
export interface RefreshTokenStore {
  /** The stored token, or null when there is none. */
  get(): string | null;
  /** Remember a token (replaces the one that was there). */
  set(token: string): void;
  /** Forget the token. */
  clear(): void;
  /**
   * Calls back when ANOTHER window removed the token (it signed out). Returns a function that stops listening.
   */
  onExternalRemoval(callback: () => void): () => void;
}
export declare class LocalStorageRefreshTokenStore implements RefreshTokenStore {
  get(): string | null;
  set(token: string): void;
  clear(): void;
  onExternalRemoval(callback: () => void): () => void;
}
export declare const REFRESH_TOKEN_STORE: InjectionToken<RefreshTokenStore>;
/**
 * What happened when we tried to renew the session.
 * refreshed:   there is a new access token
 * rejected:    the server refused the refresh token (expired, revoked, user locked out): sign in again
 * unavailable: the server could not be reached or failed: nothing is known about the session, so keep it
 */
export type RefreshOutcome = 'refreshed' | 'rejected' | 'unavailable';
/**
 * Keeps the signed-in session.
 *  - The access token (15 minutes) lives in memory only.
 *  - The refresh token (7 days, replaced every time it is used) lives in the RefreshTokenStore (localStorage by default) so a reload,
 *    a new tab, or coming back tomorrow does not ask for a password again. The trade-off is that a
 *    script running on the page could read it, which is why the Angular templates must never bypass sanitising.
 */
export declare class AuthService {
  private http;
  private configService;
  private router;
  private options;
  private store;
  private readonly accessToken;
  private readonly claims;
  private refreshInFlight;
  private sessionEnding;
  readonly isAuthenticated: import("@angular/core").Signal<boolean>;
  /** The user's id (the token's "sub"), which is how the Admin screens recognise the signed-in user's own row. */
  readonly userId: import("@angular/core").Signal<string>;
  readonly userName: import("@angular/core").Signal<string>;
  readonly roles: import("@angular/core").Signal<string[]>;
  readonly groups: import("@angular/core").Signal<string[]>;
  constructor();
  private get authUrl();
  /** For the interceptor. */
  get currentToken(): string | null;
  /** Called by the app initializer: quietly sign back in if a refresh token was kept from last time. */
  restore(): Promise<void>;
  /** Rejects with the HttpErrorResponse when the sign-in is refused (401), throttled (429) or unreachable (0). */
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  /** The session cannot be kept alive. Forget it and go to the sign-in page, remembering where the user was. */
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
  /**
   * Every tab shares one refresh token and each use replaces it. Two tabs refreshing at the same moment
   * would use the same one twice, so they take turns (Web Locks) and the second reads the replacement.
   */
  private refreshAcrossTabs;
  private doRefresh;
  private applySession;
  private clearSession;
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
/** Everything except the sign-in page. Sends a signed-out user to the sign-in route and remembers where they were going. */
export declare const authGuard: CanActivateFn;
/** The sign-in page itself: a user who is already signed in has no reason to see it. */
export declare const guestGuard: CanActivateFn;
export declare const roleGuard: (role: string) => CanActivateFn;
/**
 * The Admin screens. The server enforces the same rule on every admin endpoint, so this only saves a non-admin
 * from landing on a page whose every call would be refused.
 */
export declare const adminGuard: CanActivateFn;
export declare class Login {
  private auth;
  private router;
  private options;
  /** The heading on the card (set once per application in provideOiUiCommon). */
  protected readonly title: string;
  /** Both come from the query string (withComponentInputBinding): /login?returnUrl=/customers&reason=expired */
  readonly returnUrl: import("@angular/core").InputSignal<string | undefined>;
  readonly reason: import("@angular/core").InputSignal<string | undefined>;
  protected readonly email: import("@angular/core").WritableSignal<string>;
  protected readonly password: import("@angular/core").WritableSignal<string>;
  protected readonly busy: import("@angular/core").WritableSignal<boolean>;
  protected readonly error: import("@angular/core").WritableSignal<string | null>;
  protected readonly sessionExpired: import("@angular/core").Signal<boolean>;
  protected readonly canSubmit: import("@angular/core").Signal<boolean>;
  protected signIn(): Promise<void>;
  private describe;
  static ɵfac: i0.ɵɵFactoryDeclaration<Login, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<Login, "app-login", never, {
    "returnUrl": {
      "alias": "returnUrl";
      "required": false;
      "isSignal": true;
    };
    "reason": {
      "alias": "reason";
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
 * link such as /login?returnUrl=https://evil.example cannot send the user to another site.
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