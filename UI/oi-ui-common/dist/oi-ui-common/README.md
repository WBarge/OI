# @oi/ui-common

The sign-in, configuration and back-end notification code shared by the **OI UI** (`UI/orderInvoice`) and the
**ProductManager UI** (`UI/ProductAdmin`). It is an Angular library built with ng-packagr. It is not published
anywhere: both apps read its built output from `dist/oi-ui-common` (see `paths` in their `tsconfig.json`).

## What is in it

| Piece | What it does |
|---|---|
| `ConfigService` | Reads `config.json` (relative to the page's base href: both UIs are served at the root of their own address, so `/config.json`). |
| `AuthService` | Signs in and out through **OI.Auth** (OpenID Connect, authorization code with PKCE), keeps the short-lived access token, renews it with the refresh token, restores a session on page load. No password is ever typed into a UI. |
| `OidcSession`, `OIDC_SESSION` | The seam over **oidc-client-ts** that `AuthService` uses (redirect to OI.Auth, trade the code for tokens, renew, sign out). Tokens are kept in the tab's **`sessionStorage`**, so each browser tab has its own sign-in. Replace it in tests with a fake. |
| `authInterceptor` | Adds the bearer token to calls to the APIs the application listed, and renews and repeats a call that comes back 401. |
| `authGuard`, `roleGuard`, `adminGuard` | Route guards. A signed-out user is sent to OI.Auth and comes back to the page they asked for. Where `roleGuard` redirects is set per application. |
| `AuthCallback`, `SignedOut` | The two pages OI.Auth sends the browser back to: after signing in (`/auth/callback`, trades the code and carries on) and after signing out (`/signed-out`, with a Sign in button). Register both **without a guard**. |
| `UserMenu` | The "signed in as ... / Sign out" piece for a menu bar. |
| `SignalRService`, `AppHubService`, `HubConnectionService`, `NotificationService` | The connection to the hub and the toasts for what the back end sends. An application that wants to react to notifications registers a `HUB_NOTIFICATION_HANDLER`. |

Single sign-on across the two UIs comes from **OI.Auth's own session cookie** (on OI.Auth's address), not from anything the UIs share. They can be served
from different hosts and ports.

## Using it in an application

```ts
// app.config.ts
provideHttpClient(withInterceptors([authInterceptor])),
provideOiUiCommon({
  appTitle: 'Product Manager',
  clientId: 'product-admin',            // the id registered in OI.Auth's "Clients" settings
  homeRoute: '/products',
  forbiddenRoute: '/access-denied',
  securedUrls: (config) => [(config as MyConfig).productApiUrl],   // the token is sent here and nowhere else
}),
{ provide: OI_CONFIG_DEFAULTS, useValue: () => new MyConfig() },   // optional: defaults for settings missing from config.json
provideAppInitializer(() => startOiSession()),                      // read config.json, then pick this tab's session back up
```

Routes: register `{ path: 'auth/callback', component: AuthCallback }` and `{ path: 'signed-out', component: SignedOut }` with no guard, and put `authGuard`
on everything else. The addresses `<origin>/auth/callback` and `<origin>/signed-out` must be registered for the application's client id in OI.Auth's `Clients` settings.
The options `scopes`, `callbackRoute` and `signedOutRoute` have defaults (`openid profile email offline_access`, `/auth/callback`, `/signed-out`).

Inject `HubConnectionService` once in the root component to start the hub connection and the toasts.

## Working on it

Run these in this folder (a VS Code window opened on `UI\oi-ui-common`):

| Command | |
|---|---|
| `npm run build` | Builds `dist/oi-ui-common`. **Do this before building or testing either app**, which read the built output. |
| `npm run build:watch` | Rebuilds on every save, so a running app picks up your changes. |
| `npm test` | Runs the library's tests (stays running, re-runs on save). `npm test -- --watch=false` runs them once. |
| `npm run testui` (or `testui` once the PowerShell function is set up) | The same tests with the Vitest UI at http://localhost:51204/__vitest__/ |

Install once from the `UI` folder (`npm install`): the three projects share one `node_modules`. The library needs `oidc-client-ts` (a peer dependency, installed through the two apps).
