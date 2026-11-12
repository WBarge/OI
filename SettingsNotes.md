# OI settings reference

Every configuration setting the OI applications read, what it means, and where it goes.
**When you add a setting to any application, add it here in the same commit.**

Last full review: 11.02.26 (checked against the code, not from memory).

---

## 1. How settings reach an application

Later sources override earlier ones:

1. `appsettings.json` (in git: non-secret defaults only)
2. `appsettings.{ASPNETCORE_ENVIRONMENT}.json` (e.g. `appsettings.Development.json`; git-ignored for OI.Service and OI.Reporting)
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

Where local-only values go in development:

| Application | Secrets / local values |
|---|---|
| OI.Auth | user-secrets (`dotnet user-secrets list --project OI.Auth`) |
| OI.Reporting | user-secrets, or its git-ignored `appsettings.Development.json` |
| OI.Service | git-ignored `appsettings.Development.json` (no `UserSecretsId`; run `dotnet user-secrets init --project OI.Service` if you want secrets) |
| OI.Hub | nothing: it has no secrets |

---

## 2. Settings by application

"Secret" means: never put it in git. "Required" means the application cannot do its job without it.

### OI.Auth: issues tokens, owns users

| Key | Secret | Required | Meaning | Dev value | If missing or wrong |
|---|---|---|---|---|---|
| `ConnectionString` | **yes** | yes | SQL Server connection to the **auth** database (users, roles, claims, refresh tokens). Auth applies its migrations to it on every start. | | Startup fails when it migrates. |
| `Jwt:Issuer` | no | yes | Auth's own public address. Written into every token and into `/.well-known/openid-configuration`. Set it to the address other applications use for `Auth:Authority`. | `https://localhost:7300` | Tokens carry a different issuer than the address others fetch keys from. |
| `Jwt:Audience` | no | no | Who the tokens are for. Default `oi`. Must equal `Auth:Audience` in every other application. | `oi` | **Every API rejects every token (401).** |
| `Jwt:AccessTokenMinutes` | no | no | Life of a user's access token. Default 15. | 15 | |
| `Jwt:ServiceTokenMinutes` | no | no | Life of an application's service token. Default 10. | 10 | |
| `Jwt:RefreshTokenDays` | no | no | How long a user stays signed in without using the app. Default 7. | 7 | |
| `Jwt:SigningKeyPem` | **yes** | yes outside Development | RSA **private** key, PEM, 4096 bits or more, written on one line with `\n` for line breaks. Signs every token. | *(empty: a temporary key is made at each start)* | Outside Development: startup throws. In Development: **tokens stop working whenever Auth restarts**, and other apps can reject new tokens for several minutes. |
| `Seed:AdminEmail` | no | first run only | Creates the first administrator (role Admin, group `default`) if no such user exists. | | **Silent:** no users exist, so nobody can sign in. |
| `Seed:AdminPassword` | **yes** | first run only | That user's password, **at least 12 characters** or startup throws. Remove both `Seed` keys once the user exists. | | Same as above. |
| `ServiceClients:N:ClientId` | no | yes, one block per calling application | The id of an application allowed to request service tokens, e.g. `oi-reporting`. | `oi-reporting` | Auth answers 401 to that application. |
| `ServiceClients:N:Secret` | **yes** | yes | That application's shared secret. Long random value. Must equal `Integration:ClientSecret` in the caller. | | 401 from Auth; the caller's hub notifications fail. |
| `ServiceClients:N:Scopes:M` | no | yes | What that application may do. Only `hub:publish` exists today (the hub's publish endpoint demands it). | `hub:publish` | The hub rejects the token (403). |
| `Cors:Origins` | no | **not used** | Present in `appsettings.json` but Auth's CORS code that reads it is commented out; Auth currently allows any origin (see section 8). | | |

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
| `Cors:Origins` | no | **yes in deployment** | The exact origin(s) the Angular app is served from (scheme + host + port), as a list. | `["http://localhost:4201"]` | **Silent:** if the key is missing the code falls back to `http://localhost:4201`, so in production browsers are blocked and the page shows "Not connected". |

### OI.Tool.MigrationHelper: developer tool, never deployed

| Key | Secret | Meaning |
|---|---|---|
| `ConnectionString` | **yes** | Used only when generating migrations (`Add-Migration`). Read from its `appsettings.json` (see section 8). |

### UI (Angular): `UI/orderInvoice/deploy/config/config.json`

Served to every visitor, so **never put a secret here**. It is copied to the site root by `angular.json`; edit it per environment.

| Key | Meaning | Dev value |
|---|---|---|
| `oiApiUrl` | OI.Service API, ending in `/api/` | `https://localhost:7128/api/` |
| `authApiUrl` | OI.Auth API, ending in `/api/` | `https://localhost:7300/api/` |
| `reportingApiUrl` | OI.Reporting API, ending in `/api/` | `https://localhost:7267/api/` |
| `hubUrl` | The hub endpoint, ending in `/hubs/app` | `https://localhost:7400/hubs/app` |
| `productApiUrl` | The separate product API (not in this solution). The auth token is **not** sent to it. | `https://localhost:7253/api/` |
| `disableAddresses`, `HideShippingAddress`, `EnableCustomProducts` | Feature switches | |
| `companyName`, `companyAddress`, `companyCity`, `companyState`, `companyZip`, `companyEmail`, `companyPhone` | The company details printed on reports. Sent to OI.Reporting (`PUT api/CompanyProfile`) once per page load, after a user is signed in. Leave a value `""` to leave it off. | |
| `companyLogoUrl` | Where the browser can read the logo image, e.g. `/company-logo.png`. The UI downloads it and uploads the file with the details; the name after the last `/` becomes the resource name. `""` means no logo. Must be readable by the browser (same site, or CORS allowed), max 2 MB. | |

---

## 3. Values that must match

| These | Must equal | If they differ |
|---|---|---|
| `ServiceClients:N:ClientId` and `Secret` (Auth) | `Integration:ClientId` and `ClientSecret` (calling app) | Service token refused |
| `Jwt:Audience` (Auth) | `Auth:Audience` in Service, Reporting, Hub | Every token rejected |
| `Jwt:Issuer` (Auth) | `Auth:Authority` in Service, Reporting, Hub (the same address) | Keys cannot be fetched, or fetched from the wrong place |
| `Cors:Origins` (Hub) | The address the Angular app is actually served from | Hub connection blocked by the browser |
| `authApiUrl`, `oiApiUrl`, `reportingApiUrl`, `hubUrl` (UI) | The deployed addresses of those applications | The UI cannot reach them |
| `ConnectionString` (Service) and (Reporting) | The same order database | Reporting would read different orders than Service writes |

Auth's `ConnectionString` may point at a different database (see `DBNotes.txt`). Never point two different contexts' tables at one another's schema.

## 4. Values that change per environment

`Jwt:Issuer`, `Auth:Authority` (x3 apps), `Hub:BaseUrl`, `Cors:Origins`, all five URLs in the UI's `config.json`, all three
`ConnectionString` values, every secret, and `ASPNETCORE_ENVIRONMENT`.

---

## 5. Deployment checklist

**Before any application starts**
- [ ] Databases exist and each application's login can create and alter tables (the applications migrate on start; see section 7)
- [ ] `Auth:Authority` is an **https** address that every other application can reach
- [ ] A signing key is generated once and kept (section 6); the same key is used on every Auth instance

**OI.Auth**
- [ ] `ConnectionString`
- [ ] `Jwt:Issuer` (public address), `Jwt:Audience`
- [ ] `Jwt:SigningKeyPem`
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

**OI.Hub**
- [ ] `Auth__Authority`, `Auth__Audience`
- [ ] `Cors__Origins__0` = the Angular app's origin

**UI**
- [ ] `config.json` edited for this environment (all five URLs)

**After starting**
- [ ] Sign in works (proves Auth, its database and the seed user)
- [ ] Orders load (proves Service accepts Auth's tokens)
- [ ] **Hub Test** page says "Connected" and the test message arrives (proves Hub, CORS, the service client secret and Reporting)

---

## 6. Generating secrets

Shared service secret (PowerShell 5.1 / Package Manager Console):

```powershell
$bytes = New-Object byte[] 36
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes); $rng.Dispose()
[Convert]::ToBase64String($bytes)
```

Signing key (Git for Windows ships `openssl`):

```powershell
& "C:\Program Files\Git\usr\bin\openssl.exe" genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out oi-auth.pem
$pem = " " + ((Get-Content oi-auth.pem -Raw) -replace "`r?`n", "\n")   # value for Jwt:SigningKeyPem
Remove-Item oi-auth.pem                                                   # never commit the file
```

---

## 7. Behaviour worth knowing before deploying

- **Applications migrate their own databases on every start** (`HandleDbSchema`). Each login needs permission to change schema, or migrations must be run as a separate step. Service and Reporting both migrate the order database, so starting both against a brand-new database at the same moment can race: start Service first.
- **`Auth:Authority` must be https.** The token validation refuses plain http metadata; the failure appears when the first token is validated, not at startup.
- **Keys are fetched and cached.** After the signing key changes, other applications can reject new tokens for several minutes.
- **The hub only reaches browsers connected at that moment.** Nothing is stored for later.
- **More than one OI.Hub instance needs a Redis backplane.** It is not built yet, so there is no setting for it.
- **Not settings (hard-coded):** lockout after 5 failed sign-ins for 15 minutes, minimum password length 12, sign-in / refresh / service-token limit of 10 requests per minute per IP, the hub path `/hubs/app`, token claim names (`sub`, `name`, `role`, `group`, `token_use`, `scope`).

## 8. Open items (decide before a real deployment)

1. `OI.Service/appsettings.json` has no `Auth` section in git (11.02.26). It exists only in a local file, so a fresh checkout does not start. It is not a secret, so commit it, or supply `Auth__Authority` per environment.
2. `OI.Reporting/appsettings.json` needs `Auth` and `Hub` sections in git as well (they are in the hub hook-up zip).
3. CORS: Auth, Service and Reporting allow **any origin**. Hub is restricted to `Cors:Origins`. Auth's `Cors:Origins` entry is ignored. Decide which applications should be restricted in production.
4. There is no startup check of required settings: each missing setting fails in a different place, and some fail silently (the "Silent" rows above).
5. Only one signing key is supported, so rotating it signs everyone out and needs a restart of Auth.
6	. Service-client secrets live in configuration. Rotating one means changing it in Auth and in the calling application, then restarting both.
