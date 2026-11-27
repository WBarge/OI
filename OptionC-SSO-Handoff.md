# Option C handoff: real single sign-on (OpenID Connect) for the OI UI and the ProductManager UI

**Read this whole file first.** It is written so a brand-new chat session can carry out Option C with no other context.
It describes the system as it stands after the ProductMerge change ("Option A"), what Option C replaces, and the steps.

---

## 0. How to start the new session

Attach (drag in) these files, then paste the kickoff prompt below.

Files to attach:

1. This file (`OptionC-SSO-Handoff.md`)
2. `SettingsNotes.md`
3. `UI/oi-ui-common/README.md`
4. `UI/oi-ui-common/src/services/refresh-token-store.ts`
5. `UI/oi-ui-common/src/services/auth-service.ts`
6. `UI/oi-ui-common/src/options/oi-ui-options.ts`
7. `OI.Auth/Controllers/AuthController.cs`
8. `OI.Auth/Program.cs`
9. `OI.Auth/Security/AccessTokenFactory.cs`, `OI.Auth/Security/JwtOptions.cs`, `OI.Auth/Security/ServiceClientRegistry.cs`
10. `OI.Auth/appsettings.json` and `OI.Hub/appsettings.json` (your local copies; remove secrets first)

The new session can also read the repository itself from GitHub (https://github.com/WBarge/OI.git, branch `ProductMerge`, or wherever the merge landed).

Kickoff prompt:

> I want you to implement "Option C" from the attached handoff file: replace the shared-origin sign-in with a real
> OpenID Connect authorization-code flow (with PKCE), where OI.Auth is the identity provider, so the OI UI and the
> ProductManager UI can be served from DIFFERENT origins and still share one sign-in. Read the whole handoff first, then
> give me the plan and the questions you need answered. Do not generate anything until I say go. I am on Windows 10, I use
> Visual Studio 2026 for the back end (open `OI.slnx`) and Visual Studio Code for the UIs (three windows: `UI\orderInvoice`,
> `UI\ProductAdmin`, `UI\oi-ui-common`). Browser for debugging: Chrome SxS at
> `C:\Users\Admin\AppData\Local\Google\Chrome SxS\Application\chrome.exe` (every launch.json entry that opens a browser must
> keep that `runtimeExecutable`). Deliver the way the last change was delivered: a zip I drag onto the OI folder plus a
> numbered steps text file plus a how-it-works text file. You cannot build .NET here, so I will paste back build errors.

---

## 1. Where things stand (after the ProductMerge change)

### The applications

| Application | Where | Address in development |
|---|---|---|
| OI.Auth (issues tokens) | `OI.Auth` | https://localhost:7300 |
| OI.Service (orders API) | `OI.Service` | https://localhost:7128 |
| OI.Reporting | `OI.Reporting` | https://localhost:7267 |
| OI.Hub (SignalR) | `OI.Hub` | https://localhost:7400 |
| ProductManager.Service (product API) | `ProductManager.Service` | https://localhost:7253 |
| OI UI (Angular) | `UI/orderInvoice` | http://localhost:4201 (browse via the proxy) |
| ProductManager UI (Angular) | `UI/ProductAdmin` | http://localhost:4200 (browse via the proxy) |
| Shared Angular library | `UI/oi-ui-common` (`@oi/ui-common`) | built to `UI/oi-ui-common/dist/oi-ui-common` |
| Dev proxy (one address for both UIs) | `UI/dev-proxy` | http://localhost:4300 (`npm run dev-proxy` in `UI`) |

### How sign-in works today ("Option A")

- `OI.Auth` signs people in with `POST api/Auth/login` (email and password) and returns an RS256 access token (about 15 minutes)
  and a refresh token (7 days, replaced every time it is used). `POST api/Auth/refresh`, `POST api/Auth/logout`, and
  `POST api/Auth/service-token` (applications calling each other) also live in `AuthController`.
- The signing keys are published for the other services (the discovery controller). Every other API validates the access token
  with `AddOiJwtBearer` and `AddOiAuthorization` from `OI.Integration`. They never hold a signing secret.
- Both UIs use the SAME code, from the shared library `@oi/ui-common`: `AuthService`, `authInterceptor`, the guards, the `Login` page.
- The refresh token is kept in the browser's `localStorage` under the key `oi.refresh` through the `RefreshTokenStore` interface
  (`UI/oi-ui-common/src/services/refresh-token-store.ts`). `localStorage` is shared by every window on the same origin
  (scheme + host + port), which is the ONLY reason the two UIs share a sign-in. The access token lives in memory.
- Windows coordinate through Web Locks (only one window renews at a time) and `storage` events (signing out in one window signs the
  others out).
- Because that sharing depends on a shared origin, the two UIs must be served from ONE origin: the OI UI at `/` and the
  ProductManager UI at `/products/` (`ng build` uses base href `/products/`). In development `UI/dev-proxy` provides that; in
  production a gateway or reverse proxy (IIS Application Request Routing assumed) does.
- Who may do what in the product API: reading needs any valid token (a user or another application); changing needs the `Admin`
  role (the `AdminOnly` policy, now in `OI.Integration/Security/AdminPolicy.cs`). The ProductManager UI is for administrators
  only (`adminGuard` on every route).
- Notifications: both UIs connect to OI.Hub with the access token; OI.Hub allows the origins listed in `Cors:Origins`.

### The limitation Option C removes

If the two UIs are on different origins (different host or port), they cannot share `localStorage`, so each asks for its own
sign-in. Option C makes sign-in a redirect to OI.Auth, which keeps the single session, so UIs on any origin share it.

---

## 2. Target design for Option C

OI.Auth becomes an OpenID Connect provider. The UIs become public (browser) clients using the **authorization code flow with PKCE**.

1. **Authorization endpoint** `GET /connect/authorize` on OI.Auth: `client_id`, `redirect_uri`, `response_type=code`, `scope`, `state`,
   `code_challenge`, `code_challenge_method=S256`. If the person has an OI.Auth session cookie it returns a code at once (that
   is the single sign-on); otherwise it shows a hosted login page, then returns the code.
2. **Hosted login page** served by OI.Auth (the only place a password is typed), with the session cookie (`HttpOnly`, `Secure`,
   `SameSite=Lax`) on the OI.Auth origin.
3. **Token endpoint** `POST /connect/token`: exchanges the code plus the PKCE verifier for the same access token (and a refresh
   token) OI.Auth issues today. `grant_type=refresh_token` renews it.
4. **End-session endpoint** `GET /connect/logout`: ends the OI.Auth session and, optionally, tells each registered UI
   (front-channel logout) so a sign-out in one UI signs the others out.
5. **Client registry** (settings, like `ServiceClients`): each UI registered with its `client_id`, allowed `redirect_uri` list and
   `post_logout_redirect_uri` list. Exact-match only, no wildcards.
6. **Discovery document** `/.well-known/openid-configuration` plus the existing keys, so the library need not hard-code addresses.
7. Existing back-end APIs do not change: they keep validating the same access tokens.
8. `service-token` for application-to-application calls is unchanged.

### What changes in the Angular library (the one place the UIs differ from today)

- `RefreshTokenStore` / the way `AuthService` signs in is the swap point. Add an alternative implementation (for example
  `OidcSession`) that: redirects to `/connect/authorize` with PKCE, handles the callback route, exchanges the code, and renews through the
  token endpoint. The `oi.refresh` shared `localStorage` token goes away; each UI keeps its own tokens (they no longer need to be shared).
- The `Login` page in the library is replaced by "redirecting to sign-in" (the password page is on OI.Auth).
- Guards, the interceptor, `UserMenu` and the hub connection keep working because they only use `AuthService`'s public surface
  (`isAuthenticated`, `currentToken`, `roles`, `userName`, `restore`, `logout`, `renewAfterRejection`, `sessionExpired`).
  Preserve that surface and its specs.
- `provideOiUiCommon(options)` gains the OI.Auth address / client id / scopes, per application.

### Things to decide (ask the owner)

- Silent renewal: refresh tokens in the browser, or the hidden-iframe/`prompt=none` approach? (Recommendation: refresh tokens with
  rotation, as today.)
- Front-channel logout across UIs, or accept that other UIs notice at their next renewal?
- Keep Option A's shared `localStorage` as a fallback? (Recommendation: no; remove it, one way only.)
- The hosted login page: simple server-rendered page in OI.Auth, or a small Angular page?
- Production addresses of each UI, for the registered redirect URIs.

---

## 3. Steps (outline; the new session turns this into the full plan)

1. **Read** this file, `SettingsNotes.md`, the library README and the files listed in section 0. Ask the owner the decisions above.
2. **OI.Auth: client registry and discovery.** Add a `Clients` section to settings and a registry class beside `ServiceClientRegistry`.
   Add the discovery document. Tests.
3. **OI.Auth: authorization endpoint, session cookie and hosted login page.** PKCE verification, one-time short-lived codes,
   exact `redirect_uri` matching, `state` echo. Tests (including wrong verifier, reused code, unregistered redirect).
4. **OI.Auth: token endpoint (`authorization_code`, `refresh_token`) and end-session endpoint.** Reuse `AccessTokenFactory` and the
   refresh-token repository so the tokens are the same shape the other APIs already accept. Tests.
5. **Library: OIDC sign-in.** New implementation behind the existing `AuthService` surface: authorize redirect with PKCE, callback
   route, code exchange, renewal, logout redirect. Keep the Web-Locks coordination for renewal inside one origin. Specs.
6. **Both apps:** register the callback route and the new options in `app.config.ts`; remove the `Login` route (or make it the
   redirect); update `launch.json` URLs only if the addresses change.
7. **Settings and CORS:** each UI's origin in OI.Auth `Cors`/client registry and in OI.Hub `Cors:Origins`; update `SettingsNotes.md`.
8. **Remove Option A's single-origin requirement from the deployment checklist** in `SettingsNotes.md` and from the gateway notes;
   the gateway may remain but is no longer required for sign-in.
9. **Verify** the acceptance checks below, in development and on a deployment where the UIs are on different hosts.

## 4. Acceptance checks

- A fresh browser at either UI is sent to OI.Auth to sign in, then lands back on the page it asked for.
- Signing in through one UI means the other UI is signed in without asking (single sign-on), even on a different origin.
- Signing out in either UI ends both (front-channel or at next renewal, per the decision).
- A non-administrator signed in to the ProductManager UI sees the access-denied page; the OI UI's product reads still work for them.
- A crafted `redirect_uri` that is not registered is refused; a replayed code and a wrong PKCE verifier are refused.
- All existing tests still pass (the .NET solution `OI.slnx`; the three UI projects). The known failing OI UI specs listed in the
  ProductMerge steps (9 tests in 3 files) are old and unrelated.

## 5. Constraints that carry over

- Keep every `ProductManager.*` project name and namespace as they are.
- The Chrome SxS `runtimeExecutable` path above must stay on every `launch.json` entry that opens a browser.
- The OI UI's own `.vscode` files are git-ignored: give the owner exact manual edits rather than overwriting them.
- API `appsettings.Development.json` files are the owner's; do not overwrite them, give exact edits instead.
- Delivery: a zip to drag over the OI folder, a numbered steps text file (with the deletions as explicit steps), and a how-it-works text file.
