# @oi/ui-common

The sign-in, configuration and back-end notification code shared by the **OI UI** (`UI/orderInvoice`) and the
**ProductManager UI** (`UI/ProductAdmin`). It is an Angular library built with ng-packagr. It is not published
anywhere: both apps read its built output from `dist/oi-ui-common` (see `paths` in their `tsconfig.json`).

## What is in it

| Piece | What it does |
|---|---|
| `ConfigService` | Reads `config.json` (relative to the page's base href, so `/config.json` for the OI UI and `/products/config.json` for the ProductManager UI). |
| `AuthService` | Signs in and out, keeps the short-lived access token in memory, renews it with the long-lived refresh token, restores a session on page load. |
| `RefreshTokenStore` | Where the refresh token is kept: `localStorage` by default. **This is what makes the two UIs share one sign-in, and it only works because they share one origin.** Replacing the way a session is shared (for example with a single sign-on flow) means replacing this one class. |
| `authInterceptor` | Adds the bearer token to calls to the APIs the application listed, and renews and repeats a call that comes back 401. |
| `authGuard`, `guestGuard`, `roleGuard`, `adminGuard` | Route guards. Where they redirect is set per application. |
| `Login`, `UserMenu` | The sign-in page and the "signed in as ... / Sign out" piece for a menu bar. |
| `SignalRService`, `AppHubService`, `HubConnectionService`, `NotificationService` | The connection to the hub and the toasts for what the back end sends. An application that wants to react to notifications registers a `HUB_NOTIFICATION_HANDLER`. |

## Using it in an application

```ts
// app.config.ts
provideHttpClient(withInterceptors([authInterceptor])),
provideOiUiCommon({
  appTitle: 'Product Manager',
  homeRoute: '/products',
  forbiddenRoute: '/access-denied',
  securedUrls: (config) => [(config as MyConfig).productApiUrl],   // the token is sent here and nowhere else
}),
{ provide: OI_CONFIG_DEFAULTS, useValue: () => new MyConfig() },   // optional: defaults for settings missing from config.json
provideAppInitializer(() => startOiSession()),                      // read config.json, then restore the session
```

Inject `HubConnectionService` once in the root component to start the hub connection and the toasts.

## Working on it

Run these in this folder (a VS Code window opened on `UI\oi-ui-common`):

| Command | |
|---|---|
| `npm run build` | Builds `dist/oi-ui-common`. **Do this before building or testing either app**, which read the built output. |
| `npm run build:watch` | Rebuilds on every save, so a running app picks up your changes. |
| `npm test` | Runs the library's tests (stays running, re-runs on save). `npm test -- --watch=false` runs them once. |
| `npm run testui` (or `testui` once the PowerShell function is set up) | The same tests with the Vitest UI at http://localhost:51204/__vitest__/ |

Install once from the `UI` folder (`npm install`): the three projects share one `node_modules`.
