# OI settings reference

Every configuration setting the OI applications read, what it means, and where it goes.
**When you add a setting to any application, add it here in the same commit.**

Last full review: 21.11.26 (single sign-on through OI.Auth, OpenID Connect with PKCE). Checked against the code, not from memory.

---

## 1. How settings reach an application

Later sources override earlier ones:

1. `appsettings.json` (in git: non-secret defaults only)
2. `appsettings.{ASPNETCORE_ENVIRONMENT}.json` (e.g. `appsettings.Development.json`; git-ignored for OI.Service, OI.Reporting and ProductManager.Service)
3. **user-secrets**: loaded **only when `ASPNETCORE_ENVIRONMENT=Development`**, and only for projects that have a `UserSecretsId` (**OI.Auth** and **OI.Reporting** today)
4. **environment variables**
5. command-line arguments

**In a deployment user-secrets do not exist.** Anything listed as a secret below must come from environment
variables (or the host's secret store feeding them).

Environment variable names: replace `:` with `__`. List items use their index:

| Setting | Environment variable |
|---|---|
| `Auth:Authority` | `Auth__Authority` |
| `ServiceClients:0:Secret` | `ServiceClients__0__Secret` |
| `ServiceClients:0:Scopes:0` | `ServiceClients__0__Scopes__0` |
| `Cors:Origins` (list) | `Cors__Origins__0`, `Cors__Origins__1` ... |
| `Clients:0:RedirectUris:0` | `Clients__0__RedirectUris__0` |
| `Oidc:EncryptionKey` | `Oidc__EncryptionKey` |
| `ForwardedHeaders:KnownProxies:0` | `ForwardedHeaders__KnownProxies__0` |

Where local-only values go in development:

| Application | Secrets / local values |
|---|---|
| OI.Auth | user-secrets (`dotnet user-secrets list --project OI.Auth`). The `Clients`, `Branding` and `Oidc` values that are not secret can live in `appsettings.json`. |
| OI.Reporting | user-secrets, or its git-ignored `appsettings.Development.json` |
| OI.Service | git-ignored `appsettings.Development.json` (no `UserSecretsId`; run `dotnet user-secrets init --project OI.Service` if you want secrets) |
| OI.Hub | nothing: it has no secrets |
| ProductManager.Service | its own git-ignored `appsettings.Development.json` (holds `ConnectionString`). Its `Auth` values are not secret and ship in `appsettings.json`. |

---

## 2. Settings by application

"Secret" means: never put it in git. "Required" means the application cannot do its job without it.

### OI.Auth: the identity provider (signs people in, issues tokens, owns users)

OI.Auth serves the OpenID Connect endpoints (`/connect/authorize`, `/connect/token`, `/connect/logout`, `/.well-known/openid-configuration`,
`/.well-known/jwks.json`), the login page (`/account/login`) and the user administration API. Both UIs sign people in through it.

| Key | Secret | Required | Meaning | Dev value | If missing or wrong |
|---|---|---|---|---|---|
| `ConnectionString` | **yes** | yes | SQL Server connection to the **auth** database: users, roles, claims, groups, **OpenIddict's tables (registered clients, authorizations, tokens)** and the **shared Data Protection key ring**. Auth applies its migrations to it on every start. Every Auth instance must use the same database. | | Startup fails when it migrates. |
| `Jwt:Issuer` | no | yes | Auth's own **public** address. Written into every token and into `/.well-known/openid-configuration`. Must be the one name browsers and the other applications use (not an individual server's address). Written as an absolute address, so `https://localhost:7300` becomes `https://localhost:7300/` inside tokens: that is expected. | `https://localhost:7300` | Startup throws (empty), or tokens carry an issuer the other applications do not expect. |
| `Jwt:Audience` | no | no | Who the tokens are for. Default `oi`. Every user token is stamped with it. Must equal `Auth:Audience` in every other application. | `oi` | **Every API rejects every token (401).** |
| `Jwt:AccessTokenMinutes` | no | no | Life of a user's access token. Default 15. A role change, a lockout or a sign-out in the other UI takes this long (at most) to reach a tab that is already signed in. | 15 | |
| `Jwt:ServiceTokenMinutes` | no | no | Life of an application's service token. Default 10. | 10 | |
| `Jwt:RefreshTokenDays` | no | no | How long a signed-in tab can go without renewing before it must sign in again. Each renewal starts the period again. Default 7. | 7 | |
| `Jwt:SigningKeyPem` | **yes** | yes outside Development | RSA **private** key, PEM, 2048 bits or more (4096 recommended), written on one line with `\n` for line breaks. Signs every access token, ID token and service token. **Identical on every instance.** | *(empty: a temporary key is made at each start)* | Outside Development: startup throws. In Development: every restart invalidates every token. |
| `Oidc:SessionHours` | no | no | How long the OI.Auth sign-in cookie lasts (sliding). While it is valid, opening a new tab or the other UI signs in **without a password**. Tabs already signed in are not affected by it. Default 8. | 8 | |
| `Oidc:EncryptionKey` | **yes** | yes outside Development | **Base64 of exactly 32 random bytes** (44 characters). Encrypts authorization codes and refresh tokens. **Identical on every instance.** See section 6. | *(empty: a temporary key is made at each start)* | Outside Development: startup throws. Wrong length or not Base64: startup throws. A different value on two instances: sign-ins that land on the other instance fail. In Development with no value: every restart signs everyone out. |
| `Oidc:PasswordGrantEnabled` | no | no | **Development only.** Lets a client marked `AllowPasswordGrant` (`postman-dev`) trade an email and password for tokens at `/connect/token`, so the APIs can be tested in Postman with no browser. Ignored outside Development, whatever it says. Default `false`. | `true` on a developer machine that uses Postman, otherwise `false` | |
| `Clients:N:ClientId` | no | yes, one block per browser application | The id a browser application signs in as: `oi-ui`, `product-admin`, and `postman-dev` (Development tool). Must equal `clientId` in that application's `app.config.ts`. Copied into OpenIddict's table at every start. | `oi-ui` | OI.Auth refuses every sign-in from an unknown client id. |
| `Clients:N:DisplayName` | no | no | A readable name. | `Order Invoice` | |
| `Clients:N:RedirectUris:M` | no | yes for a browser application | The **exact** addresses OI.Auth may send the browser back to after signing in: the application's `/auth/callback`. No wildcards. Include every address the application is served from. | `http://localhost:4201/auth/callback` | OI.Auth refuses the request (`invalid_request`) and never redirects to an address that is not listed. |
| `Clients:N:PostLogoutRedirectUris:M` | no | yes for a browser application | The exact addresses OI.Auth may send the browser to after signing out: the application's `/signed-out`. | `http://localhost:4201/signed-out` | Sign-out cannot return to the application. |
| `Clients:N:AllowPasswordGrant` | no | no | Marks the client as the Development password-grant client (`postman-dev`). Never set on a browser application. | `true` for `postman-dev` only | |
| `Branding:LogoUrl` | no | no | Where the **browser** loads the company logo shown on the login page: OI.Reporting's anonymous `GET api/CompanyProfile/logo`. Empty: no logo. Its origin is added to the login page's content-security policy. | `https://localhost:7267/api/CompanyProfile/logo` | No logo (nothing breaks). The logo exists only after someone has signed in to the OI UI once (that is what sends it to Reporting). |
| `ForwardedHeaders:KnownProxies` | no | when behind a load balancer or gateway | IP addresses of the load balancers or gateways in front of Auth. When this or `KnownNetworks` is set, Auth believes `X-Forwarded-For`, `X-Forwarded-Proto` and `X-Forwarded-Host` **from those addresses only**. Empty (the default): the headers are ignored. | *(empty)* | Behind a balancer that ends HTTPS, with this empty: Auth thinks requests are plain http, so OpenIddict refuses them and the cookie is not set. **Sign-in fails.** |
| `ForwardedHeaders:KnownNetworks` | no | same | Address ranges (CIDR, e.g. `10.0.0.0/24`) the balancers are in. | *(empty)* | Same as above. |
| `Seed:AdminEmail` | no | first run only | Creates the first administrator (role Admin, group `default`) if no such user exists. | | **Silent:** no users exist, so nobody can sign in. |
| `Seed:AdminPassword` | **yes** | first run only | That user's password, **at least 12 characters** or startup throws. Remove both `Seed` keys once the user exists. | | Same as above. |
| `ServiceClients:N:ClientId` | no | yes, one block per calling application | The id of an application allowed to request service tokens, e.g. `oi-reporting`. | `oi-reporting` | Auth answers 401 to that application. |
| `ServiceClients:N:Secret` | **yes** | yes | That application's shared secret. Long random value. Must equal `Integration:ClientSecret` in the caller. | | 401 from Auth; the caller's hub notifications fail. |
| `ServiceClients:N:Scopes:M` | no | yes | What that application may do. Only `hub:publish` exists today (the hub's publish endpoint demands it). | `hub:publish` | The hub rejects the token (403). |
| `Cors:Origins` | no | **no longer read** | Auth's browser access is now limited to the origins of the addresses in `Clients` (their redirect and post-logout addresses). This key can be deleted. | | |

### OI.Reporting: reports, and the first caller of the hub

| Key | Secret | Required | Meaning | Dev value | If missing or wrong |
|---|---|---|---|---|---|
| `ConnectionString` | **yes** | yes | SQL Server connection. One key serves **both** the reporting context and the order (Service) context that Reporting also registers, and both are migrated on start. | | Startup fails. |
| `HangFireConnectionstring` | **yes** | yes | SQL Server connection to where the HangFire DB lives.  It is important that the data is created.  The system will take care of the schema. | | Startup fails. |
| `Auth:Authority` | no | yes | Address of OI.Auth. Used to fetch the signing keys that validate tokens **and** to request this application's service token. | `https://localhost:7300` | Startup throws `Auth:Authority is not configured`. |
| `Auth:Audience` | no | no | Default `oi`. Must equal `Jwt:Audience` in Auth. | `oi` | Every request is rejected (401). |
| `Hub:BaseUrl` | no | yes | Address of OI.Hub, where notifications are published. | `https://localhost:7400` | Startup throws `Hub:BaseUrl is not configured`. |
| `Integration:ClientId` | no | yes | This application's identity when it asks Auth for a service token. Must match a `ServiceClients:N:ClientId` in Auth. | `oi-reporting` | The endpoint that publishes returns 500. |
| `Integration:ClientSecret` | **yes** | yes | The matching secret. | | **Misleading:** Auth rejects it, and the test endpoint answers 503 "hub could not be reached". Auth's log says "Service token rejected". |

Reporting has **one anonymous endpoint**: `GET api/CompanyProfile/logo`, used by the OI.Auth login page (the browser loads it directly, so it must be reachable from browsers). It serves only the logo image (PNG, JPG or GIF, recognised by the file's own first bytes; anything else, including SVG, is refused with 404), tells the browser to keep it for 5 minutes, and is limited to 60 requests per minute per IP. Every other endpoint still needs a token.

### OI.Service: orders, customers, states

| Key | Secret | Required | Meaning | Dev value | If missing or wrong |
|---|---|---|---|---|---|
| `ConnectionString` | **yes** | yes | SQL Server connection to the **order** database. Migrated on every start. | | Startup fails. |
| `Auth:Authority` | no | yes | Address of OI.Auth, used to fetch the signing keys. | `https://localhost:7300` | Startup throws `Auth:Authority is not configured`. |
| `Auth:Audience` | no | no | Default `oi`. | `oi` | Every request is rejected (401). |

### OI.Hub: live notifications to browsers (no database, no secrets)

| Key | Secret | Required | Meaning | Dev value | If missing or wrong |
|---|---|---|---|---|---|
| `Auth:Authority` | no | yes | Address of OI.Auth, used to fetch the signing keys. | `https://localhost:7300` | Startup throws. |
| `Auth:Audience` | no | no | Default `oi`. | `oi` | Every connection and publish is rejected. |
| `Cors:Origins` | no | **yes in deployment** | The exact origins the Angular apps are served from (scheme + host + port), as a list: **one entry per UI**, because the OI UI and the ProductManager UI no longer share an origin. In development: `http://localhost:4201` (OI UI) and `http://localhost:4200` (ProductManager UI). | `["http://localhost:4201", "http://localhost:4200"]` | A UI whose origin is missing cannot connect to the hub (the browser blocks it). |

### ProductManager.Service: the product catalog (its own database)

Product data is read by every OI application and by the OI UI, and changed only from the ProductManager UI.
Reading (every `GET`, plus the two read-only `POST` endpoints `Products` and `Options` that take a filter) needs **any valid token**:
a signed-in user or another application's service token. Changing data (every other `POST`, `PUT` and `DELETE`) needs a
signed-in **administrator** (role `Admin`, user token). `api/Ping` needs no token.

| Key | Secret | Required | Meaning | Dev value | If missing or wrong |
|---|---|---|---|---|---|
| `ConnectionString` | **yes** | yes | SQL Server connection to the **product** database (`ProductsEF`). Migrated on every start. | | Startup fails when it migrates. |
| `Auth:Authority` | no | yes | Address of OI.Auth, used to fetch the signing keys. Ships in `appsettings.json`. | `https://localhost:7300` | Startup throws `Auth:Authority is not configured`. |
| `Auth:Audience` | no | no | Default `oi`. Must equal `Jwt:Audience` in Auth. Ships in `appsettings.json`. | `oi` | Every request except `api/Ping` is rejected (401). |

### OI.Tool.MigrationHelper: developer tool, never deployed

| Key | Secret | Meaning |
|---|---|---|
| `ConnectionString` | **yes** | Used only when generating migrations (`Add-Migration`). Read from its `appsettings.json` (see section 8). |

### ProductManager.Tool.EF: developer tool, never deployed

| Key | Secret | Meaning |
|---|---|---|
| `ConnectionString` | **yes** | Used only when generating ProductManager migrations (`Add-Migration`). Read from its `appsettings.json`, which is git-ignored: the copy that ships holds a placeholder, replace it locally. |

### UI (Angular): `UI/orderInvoice/deploy/config/config.json`

Served to every visitor, so **never put a secret here**. It is copied to the site root by `angular.json`; edit it per environment.

| Key | Meaning | Dev value |
|---|---|---|
| `oiApiUrl` | OI.Service API, ending in `/api/` | `https://localhost:7128/api/` |
| `authApiUrl` | OI.Auth API, ending in `/api/` | `https://localhost:7300/api/` |
| `reportingApiUrl` | OI.Reporting API, ending in `/api/` | `https://localhost:7267/api/` |
| `hubUrl` | The hub endpoint, ending in `/hubs/app` | `https://localhost:7400/hubs/app` |
| `productApiUrl` | ProductManager.Service, ending in `/api/`. The auth token **is** sent to it: reading products needs any valid token. | `https://localhost:7253/api/` |
| `productUiUrl` | The **full address** of the ProductManager UI, opened in a new window by the **Products** menu item (administrators only). It is a different origin from this app now, so a relative address no longer works. | `http://localhost:4200/` |
| `disableAddresses`, `HideShippingAddress`, `EnableCustomProducts` | Feature switches | |
| `companyName`, `companyAddress`, `companyCity`, `companyState`, `companyZip`, `companyEmail`, `companyPhone` | The company details printed on reports. Sent to OI.Reporting (`PUT api/CompanyProfile`) once per page load, after a user is signed in. Leave a value `""` to leave it off. | |
| `companyLogoUrl` | Where the browser can read the logo image, e.g. `/company-logo.png`. The UI downloads it and uploads the file with the details; the name after the last `/` becomes the resource name. `""` means no logo. Must be readable by the browser (same site, or CORS allowed), max 2 MB. | |

### UI (Angular): `UI/ProductAdmin/deploy/config/config.json` (the ProductManager UI)

Served to every visitor, so **never put a secret here**. Copied to the site root (`/config.json`) by `angular.json`. Only administrators can use this UI. It is served at the root of its own address (`http://localhost:4200/`), **not** under `/products/`.

| Key | Meaning | Dev value |
|---|---|---|
| `authApiUrl` | OI.Auth API, ending in `/api/` | `https://localhost:7300/api/` |
| `productApiUrl` | ProductManager.Service, ending in `/api/` | `https://localhost:7253/api/` |
| `hubUrl` | The hub endpoint, ending in `/hubs/app`. The same hub as the OI UI, so notifications reach either UI. | `https://localhost:7400/hubs/app` |

**Each UI is served from its own address** (scheme + host + port). They need nothing in common: both sign in through OI.Auth, and OI.Auth's session
cookie is what lets a person who signed in to one UI open the other without a password.

The sign-in address is **not** a UI setting: each UI works it out from `authApiUrl` (it drops the trailing `api/`). The id each UI signs in
as (`oi-ui`, `product-admin`) is in its `app.config.ts`, not in `config.json`, and must match OI.Auth's `Clients` settings.

---

## 3. Values that must match

| These | Must equal | If they differ |
|---|---|---|
| `ServiceClients:N:ClientId` and `Secret` (Auth) | `Integration:ClientId` and `ClientSecret` (calling app) | Service token refused |
| `Jwt:Audience` (Auth) | `Auth:Audience` in Service, Reporting, Hub, ProductManager.Service | Every token rejected |
| `Jwt:Issuer` (Auth) | `Auth:Authority` in Service, Reporting, Hub, ProductManager.Service (the same address), and the address behind `authApiUrl` in both UIs | Keys cannot be fetched, or fetched from the wrong place; the UIs sign in against the wrong server |
| `Jwt:SigningKeyPem`, `Oidc:EncryptionKey`, `ConnectionString` (Auth) | The same value on **every Auth instance** | Tokens signed by one instance are refused by the APIs; a sign-in that starts on one instance cannot finish on another; the cookie cannot be read |
| `Clients:N:ClientId` (Auth) | `clientId` in that UI's `app.config.ts` (`oi-ui`, `product-admin`) | OI.Auth refuses every sign-in from that UI |
| `Clients:N:RedirectUris` and `PostLogoutRedirectUris` (Auth) | The address the UI is actually served from, plus `/auth/callback` and `/signed-out`, **exactly** (scheme, host, port, path) | Signing in or out fails with an error from OI.Auth; it never redirects to an address that is not listed |
| `Cors:Origins` (Hub) | The origin of **each** UI | That UI cannot connect to the hub |
| `Branding:LogoUrl` (Auth) | Reporting's public address + `/api/CompanyProfile/logo` | No logo on the login page |
| `authApiUrl`, `productApiUrl`, `hubUrl` (ProductManager UI) | The deployed addresses of those applications | The ProductManager UI cannot reach them |
| `productUiUrl` (OI UI) | The address the ProductManager UI is served from | The Products menu item opens the wrong page |
| `ConnectionString` (ProductManager.Service) | The product database only | Product data would be written to the wrong database |
| `authApiUrl`, `oiApiUrl`, `reportingApiUrl`, `hubUrl` (UI) | The deployed addresses of those applications | The UI cannot reach them |
| `ConnectionString` (Service) and (Reporting) | The same order database | Reporting would read different orders than Service writes |

Auth's `ConnectionString` may point at a different database (see `DBNotes.txt`). Never point two different contexts' tables at one another's schema.

## 4. Values that change per environment

`Jwt:Issuer`, `Auth:Authority` (x3 apps), `Hub:BaseUrl`, `Hub` `Cors:Origins`, all of `Clients` (the addresses), `Branding:LogoUrl`, `ForwardedHeaders`, the URLs in both UIs' `config.json`
files (`orderInvoice` and `ProductAdmin`), all four `ConnectionString` values, every secret (`Jwt:SigningKeyPem`, `Oidc:EncryptionKey`, service client secrets, the seed password), and `ASPNETCORE_ENVIRONMENT`.

---

## 5. Deployment checklist

**Before any application starts**
- [ ] Databases exist and each application's login can create and alter tables (the applications migrate on start; see section 7)
- [ ] The Auth migration for OpenIddict and the key ring has been generated and is in the build (section 7, "First start of the new sign-in")
- [ ] `Auth:Authority` is an **https** address that every other application and every browser can reach
- [ ] Secrets are generated once and kept (section 6): the signing key and the encryption key are the same on every Auth instance
- [ ] If Auth sits behind a load balancer or gateway that ends HTTPS: its addresses are in `ForwardedHeaders` (and it sends `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-For`)
- [ ] The two UIs are served from **their own** HTTPS addresses (they can be on different hosts; no shared gateway is needed for sign-in)

**OI.Auth**
- [ ] `ConnectionString`
- [ ] `Jwt__Issuer` (public address), `Jwt__Audience`
- [ ] `Jwt__SigningKeyPem`, `Oidc__EncryptionKey` (the same on every instance)
- [ ] `Clients__0__ClientId` = `oi-ui` with its `RedirectUris` (`https://<oi-ui-host>/auth/callback`) and `PostLogoutRedirectUris` (`https://<oi-ui-host>/signed-out`)
- [ ] `Clients__1__ClientId` = `product-admin` with its two address lists (`https://<product-ui-host>/auth/callback`, `/signed-out`)
- [ ] **No** `postman-dev` client and `Oidc__PasswordGrantEnabled` not set (the password grant never works outside Development, but leave nothing lying around)
- [ ] `Branding__LogoUrl` (Reporting's public address + `/api/CompanyProfile/logo`)
- [ ] `ForwardedHeaders__KnownProxies__0` or `ForwardedHeaders__KnownNetworks__0` (when behind a balancer)
- [ ] `ServiceClients__0__ClientId`, `__Secret`, `__Scopes__0` (one block per calling application)
- [ ] `Seed__AdminEmail`, `Seed__AdminPassword` for the first run only, then remove them

**OI.Service**
- [ ] `ConnectionString` (order database)
- [ ] `Auth__Authority`, `Auth__Audience`

**OI.Reporting**
- [ ] `ConnectionString` (same order database as Service)
- [ ] `HangFireConnectionstring` the database jobs will be stored in.  Can be the same as other applications but recommend a different db name if the db server is the same.
- [ ] `Auth__Authority`, `Auth__Audience`, `Hub__BaseUrl`
- [ ] `Integration__ClientId`, `Integration__ClientSecret` (same values as the Auth service client)
- [ ] Reachable from browsers (the login page loads the logo from it)

**ProductManager.Service**
- [ ] `ConnectionString` (product database)
- [ ] `Auth__Authority`, `Auth__Audience`

**OI.Hub**
- [ ] `Auth__Authority`, `Auth__Audience`
- [ ] `Cors__Origins__0` = the OI UI's origin, `Cors__Origins__1` = the ProductManager UI's origin

**UI**
- [ ] `orderInvoice` `config.json` edited for this environment (all the URLs, including `productApiUrl` and `productUiUrl` as a full address)
- [ ] `ProductAdmin` `config.json` edited for this environment (served at its site root)

**After starting**
- [ ] The login page (`https://<auth>/account/login`) shows "Log-In" and the company logo (once someone has signed in to the OI UI at least once)
- [ ] A fresh browser at the OI UI is sent to OI.Auth to sign in, then lands back on the page it asked for
- [ ] Orders load (proves Service accepts Auth's tokens)
- [ ] **Hub Test** page says "Connected" and the test message arrives (proves Hub, CORS, the service client secret and Reporting)
- [ ] As an administrator, **Products** opens the ProductManager UI in a new window **without asking for a password** (proves single sign-on across origins)
- [ ] Signing out of one UI lands on its "You have been signed out" page; the other UI is signed out by its next renewal (at most `Jwt:AccessTokenMinutes` later)
- [ ] As a non-administrator, the ProductManager UI shows its access-denied page, while the OI UI still lists products
- [ ] An address that is not registered for a client is refused by OI.Auth (try `/connect/authorize` with a made-up `redirect_uri`)

---

## 6. Generating secrets

Shared service secret (PowerShell 5.1 / Package Manager Console):

```powershell
$bytes = New-Object byte[] 36
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes); $rng.Dispose()
[Convert]::ToBase64String($bytes)
```

Encryption key for authorization codes and refresh tokens (`Oidc:EncryptionKey`: 32 random bytes, Base64; works in Windows PowerShell 5.1 and PowerShell 7):

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes); $rng.Dispose()
[Convert]::ToBase64String($bytes)
```

In development, to keep sign-ins across restarts of OI.Auth, store one in user-secrets:
`dotnet user-secrets set "Oidc:EncryptionKey" "<the value>" --project OI.Auth`

Signing key (Git for Windows ships `openssl`):

```powershell
& "C:\Program Files\Git\usr\bin\openssl.exe" genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out oi-auth.pem
$pem = " " + ((Get-Content oi-auth.pem -Raw) -replace "`r?`n", "\n")   # value for Jwt:SigningKeyPem
Remove-Item oi-auth.pem                                                   # never commit the file
```

---

## 7. Behaviour worth knowing before deploying

- **First start of the new sign-in.** OI.Auth's model now holds OpenIddict's tables and the Data Protection key table, and no longer holds `RefreshTokens`.
  Until the migration exists, OI.Auth **refuses to start** (EF reports pending model changes). Generate it once (Package Manager Console, startup project
  `OI.Tool.MigrationHelper`, default project `OI.Data`): `Add-Migration AddOpenIddict -Context OiAuthDbContext -OutputDir Migrations/Auth`. It creates the new tables and drops
  `RefreshTokens`. Users, roles and groups are untouched; everyone signs in again once.
- **Applications migrate their own databases on every start** (`HandleDbSchema`). Each login needs permission to change schema, or migrations must be run as a separate step. Service and Reporting both migrate the order database, so starting both against a brand-new database at the same moment can race: start Service first.
- **`Auth:Authority` must be https.** The token validation refuses plain http metadata; the failure appears when the first token is validated, not at startup. OpenIddict also refuses plain http requests, which is why OI.Auth must be told about a balancer that ends HTTPS (`ForwardedHeaders`).
- **Keys are fetched and cached.** After the signing key changes, other applications can reject new tokens for several minutes.
- **The hub only reaches browsers connected at that moment.** Nothing is stored for later. A person with the OI UI and the ProductManager UI open in two windows has two connections, so each message shows in both windows.
- **How sign-in works.** A UI with no session sends the browser to OI.Auth (`/connect/authorize`, PKCE). If the OI.Auth cookie is valid (`Oidc:SessionHours`, default 8) the browser is sent straight back with a code; otherwise the login page asks for the password. The UI trades the code for an access token, an ID token and a refresh token.
- **Each browser tab has its own sign-in.** Tokens are kept in the tab's `sessionStorage`, so two tabs never use the same refresh token. Closing a tab ends it; opening another signs in again without a password while the OI.Auth cookie lasts. A **duplicated** tab starts with a copy of the original's tokens: when one of the two renews, the other holds an old refresh token. OpenIddict allows a short grace period (30 seconds) for that; after it the old token is treated as stolen and **both tabs are signed out**. Open a new tab instead of duplicating one.
- **Renewal.** The UI renews with the refresh token when it needs a token (about a minute before expiry, or after a 401). Each renewal re-reads the user, so a changed role or group is picked up, and a disabled, locked or deleted user is refused.
- **Sign-out.** Signing out ends this browser's sign-in at OI.Auth (the OI.Auth cookie, and the tokens issued during it). The same person's other browsers and devices stay signed in. The *other UI in this browser* is signed out when it next renews (at most `Jwt:AccessTokenMinutes` later); a token already issued works until it expires.
- **Administrators ending someone's sessions** (disable, lock, delete, role changes made in the Admin screens) revoke all of that user's tokens at OI.Auth; their access tokens already issued still run out on their own (at most `Jwt:AccessTokenMinutes`).
- **The `postman-dev` password grant** exists only in Development with `Oidc:PasswordGrantEnabled=true`, only for a client marked `AllowPasswordGrant`, and only for a client listed in `Clients`. Production ignores it.
- **The product API's write endpoints are admin-only on the server**, not just hidden in the UI; its read endpoints accept any valid token.
- **More than one OI.Hub instance needs a Redis backplane.** It is not built yet, so there is no setting for it.
- **Expired OpenIddict tokens and authorizations are not deleted yet** (see "Not done yet"). The tables grow slowly; nothing breaks.
- **Not settings (hard-coded):** lockout after 5 failed sign-ins for 15 minutes, minimum password length 12, rate limits per IP per minute (service-token 10, `/connect/token` 60, login page / authorize / logout 30, Reporting's logo 60), the hub path `/hubs/app`, token claim names (`sub`, `name`, `role`, `group`, `token_use`, `scope`), the cookie name `oi.auth.session`, the logo cache time (5 minutes), the authorization code life (5 minutes) and ID token life (20 minutes) which are OpenIddict's defaults, the refresh token reuse grace period (30 seconds), and the scopes the UIs ask for (`openid profile email offline_access`).

## 8. Open items (decide before a real deployment)

1. `OI.Service/appsettings.json` has no `Auth` section in git (11.02.26). It exists only in a local file, so a fresh checkout does not start. It is not a secret, so commit it, or supply `Auth__Authority` per environment.
2. `OI.Reporting/appsettings.json` needs `Auth` and `Hub` sections in git as well (they are in the hub hook-up zip).
3. CORS: **Auth** is now restricted to the origins of the registered `Clients` addresses, and **Hub** to `Cors:Origins`. Service, Reporting and ProductManager.Service still allow **any origin**. Decide whether to restrict them in production.
4. There is no startup check of required settings: each missing setting fails in a different place, and some fail silently (the "Silent" rows above). OI.Auth is the exception: it now refuses to start without `Jwt:Issuer`, and outside Development without `Oidc:EncryptionKey`.
5. Only one signing key is supported, so rotating it signs everyone out and needs a restart of Auth.
6. Service-client secrets live in configuration. Rotating one means changing it in Auth and in the calling application, then restarting both.
7. The Data Protection key ring (which protects the OI.Auth cookie) is stored **unencrypted** in the auth database. For production, protect it (for example `ProtectKeysWithCertificate`), or restrict who can read that table.

## 9. Not done yet

- **A Hangfire job that deletes expired OpenIddict tokens and authorizations.** The job calls an OI.Auth endpoint to prune. To decide: which application hosts Hangfire, how it authenticates to OI.Auth (the existing `service-token` with a new scope such as `auth:prune`), the schedule, and how long to keep revoked tokens (they help detect reuse).
- A Redis backplane for several OI.Hub instances.
- A rate limiter shared by several OI.Auth instances (each limits its own traffic today, so the effective limit is higher by the number of instances).

---

## 10. Everything in `appsettings.json`: one file per server application

If you choose to keep **all** settings in `appsettings.json`, this is what each application's file looks like. It is here so the settings can be
translated to another configuration system (environment variables, a secrets store, a deployment tool). The values are the **development** values.
Secrets are shown as `<SECRET: ...>`: **replace them, and never commit real secrets** (the server projects' `appsettings.json` files are git-ignored).
JSON cannot hold comments, so what each value means is in the tables above and in the notes under each example.

Environment variable names: `:` becomes `__`, and list items take their index (`Clients__0__RedirectUris__0`).

### 10.1 OI.Auth

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionString": "<SECRET: SQL Server connection string for the auth database>",
  "Jwt": {
    "Issuer": "https://localhost:7300",
    "Audience": "oi",
    "AccessTokenMinutes": 15,
    "ServiceTokenMinutes": 10,
    "RefreshTokenDays": 7,
    "SigningKeyPem": "<SECRET: RSA private key on one line with \\n for line breaks; leave empty in Development>"
  },
  "Oidc": {
    "SessionHours": 8,
    "EncryptionKey": "<SECRET: Base64 of 32 random bytes; leave empty in Development>",
    "PasswordGrantEnabled": false
  },
  "Clients": [
    {
      "ClientId": "oi-ui",
      "DisplayName": "Order Invoice",
      "RedirectUris": [ "http://localhost:4201/auth/callback" ],
      "PostLogoutRedirectUris": [ "http://localhost:4201/signed-out" ]
    },
    {
      "ClientId": "product-admin",
      "DisplayName": "Product Manager",
      "RedirectUris": [ "http://localhost:4200/auth/callback" ],
      "PostLogoutRedirectUris": [ "http://localhost:4200/signed-out" ]
    },
    {
      "ClientId": "postman-dev",
      "DisplayName": "Postman (Development only)",
      "AllowPasswordGrant": true
    }
  ],
  "Branding": {
    "LogoUrl": "https://localhost:7267/api/CompanyProfile/logo"
  },
  "ForwardedHeaders": {
    "KnownProxies": [],
    "KnownNetworks": []
  },
  "ServiceClients": [
    {
      "ClientId": "oi-reporting",
      "Secret": "<SECRET: long random value, the same as Integration:ClientSecret in OI.Reporting>",
      "Scopes": [ "hub:publish" ]
    }
  ],
  "Seed": {
    "AdminEmail": "admin@example.com",
    "AdminPassword": "<SECRET: at least 12 characters; remove the whole Seed section after the first run>"
  }
}
```

Notes: `Cors` is no longer read by OI.Auth. `postman-dev` and `PasswordGrantEnabled` are for a developer machine only (set `PasswordGrantEnabled` to `true` there). In a
deployment, replace the `Clients` addresses with the UIs' real addresses, remove `postman-dev`, set `ForwardedHeaders` if there is a load balancer, and supply the three `<SECRET>` values.

| Secret | Per environment | Same on every instance |
|---|---|---|
| `ConnectionString`, `Jwt:SigningKeyPem`, `Oidc:EncryptionKey`, `ServiceClients:N:Secret`, `Seed:AdminPassword` | `Jwt:Issuer`, `Clients` addresses, `Branding:LogoUrl`, `ForwardedHeaders`, `ConnectionString` | `Jwt:*`, `Oidc:*`, `Clients`, `ServiceClients`, `ConnectionString` |

### 10.2 OI.Service

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionString": "<SECRET: SQL Server connection string for the order database>",
  "Auth": {
    "Authority": "https://localhost:7300",
    "Audience": "oi"
  }
}
```

Secret: `ConnectionString`. Per environment: `ConnectionString`, `Auth:Authority`.

### 10.3 OI.Reporting

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionString": "<SECRET: SQL Server connection string for the order database (the same one OI.Service uses)>",
  "HangFireConnectionstring": "<SECRET: SQL Server connection string for the Hangfire database>",
  "Auth": {
    "Authority": "https://localhost:7300",
    "Audience": "oi"
  },
  "Hub": {
    "BaseUrl": "https://localhost:7400"
  },
  "Integration": {
    "ClientId": "oi-reporting",
    "ClientSecret": "<SECRET: the same value as ServiceClients:0:Secret in OI.Auth>"
  }
}
```

Secrets: `ConnectionString`, `HangFireConnectionstring`, `Integration:ClientSecret`. Per environment: both connection strings, `Auth:Authority`, `Hub:BaseUrl`.

### 10.4 OI.Hub

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Auth": {
    "Authority": "https://localhost:7300",
    "Audience": "oi"
  },
  "Cors": {
    "Origins": [ "http://localhost:4201", "http://localhost:4200" ]
  }
}
```

No secrets. Per environment: `Auth:Authority`, `Cors:Origins` (one entry per UI).

### 10.5 ProductManager.Service

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionString": "<SECRET: SQL Server connection string for the product database>",
  "Auth": {
    "Authority": "https://localhost:7300",
    "Audience": "oi"
  }
}
```

Secret: `ConnectionString`. Per environment: `ConnectionString`, `Auth:Authority`.

The two UIs have no `appsettings.json`: their settings are in `config.json` (section 2). The developer tools (`OI.Tool.MigrationHelper`, `ProductManager.Tool.EF`) are never deployed and need only a `ConnectionString`.
