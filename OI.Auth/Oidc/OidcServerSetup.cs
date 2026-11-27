using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OI.Auth.Security;
using OI.Glue.Services;
using OpenIddict.Server;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Oidc;

/// <summary>
/// The whole sign-in setup in one place: OpenIddict (the protocol endpoints and the token store) and the OI.Auth
/// sign-in cookie. Everything that has to be read from settings or from another service (the signing key, the issuer,
/// the lifetimes) is supplied through the options pattern, so it is read when the application starts and never
/// hard-coded here.
/// </summary>
public static class OidcServerSetup
{
    /// <summary>The cookie's name in the browser.</summary>
    public const string CookieName = "oi.auth.session";

    /// <summary>Registers OpenIddict, the sign-in cookie and the services that go with them.</summary>
    public static IServiceCollection AddOiSignIn(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<OidcOptions>(configuration.GetSection(OidcOptions.SECTION));
        services.Configure<BrandingOptions>(configuration.GetSection(BrandingOptions.SECTION));
        services.AddSingleton<ClientRegistry>();
        services.AddSingleton<PasswordGrantGate>();
        services.AddScoped<SessionAuthorizations>();
        services.AddScoped<IUserSessionRevoker>(sp => sp.GetRequiredService<SessionAuthorizations>());

        // One chain: OI.Data adds the storage (AddOiAuthStores, because only OI.Data may name the database context),
        // and this application says how the server behaves.
        services.AddOpenIddict()
            .AddOiAuthStores()
            .AddServer(options =>
            {
                options.SetAuthorizationEndpointUris("/connect/authorize")
                       .SetTokenEndpointUris("/connect/token")
                       .SetEndSessionEndpointUris("/connect/logout")
                       .SetJsonWebKeySetEndpointUris("/.well-known/jwks.json");   // same address the keys have always been published at

                // Browser applications: authorization code with PKCE, renewed with rotating refresh tokens.
                options.AllowAuthorizationCodeFlow()
                       .AllowRefreshTokenFlow()
                       .RequireProofKeyForCodeExchange();

                // "openid" is always known. offline_access is what allows a refresh token to be issued.
                options.RegisterScopes(Scopes.Email, Scopes.Profile, Scopes.OfflineAccess);

                // The access token is a plain signed JWT so every other API can read it with just our public key.
                // (Authorization codes and refresh tokens stay encrypted: see the encryption key below.)
                options.DisableAccessTokenEncryption();

                // The endpoints themselves are MVC actions (ConnectController): OpenIddict checks the request first, then calls them.
                options.UseAspNetCore()
                       .EnableAuthorizationEndpointPassthrough()
                       .EnableEndSessionEndpointPassthrough()
                       .EnableTokenEndpointPassthrough();
            });

        // Everything that needs a value from settings or from another service. Read when the application starts.
        services.AddOptions<OpenIddictServerOptions>()
            .Configure<SigningKeyProvider, IOptions<JwtOptions>, IOptions<OidcOptions>, IHostEnvironment, ILoggerFactory>(
                (server, keys, jwt, oidc, environment, loggers) =>
                {
                    if (string.IsNullOrWhiteSpace(jwt.Value.Issuer))
                    {
                        throw new InvalidOperationException("Jwt:Issuer must be configured (the public address of OI.Auth, e.g. https://localhost:7300).");
                    }

                    server.Issuer = new Uri(jwt.Value.NormalizedIssuer, UriKind.Absolute);
                    server.AccessTokenLifetime = TimeSpan.FromMinutes(jwt.Value.AccessTokenMinutes);
                    server.RefreshTokenLifetime = TimeSpan.FromDays(jwt.Value.RefreshTokenDays);

                    // The same key (and key id) AccessTokenFactory signs service tokens with: the other APIs can check both.
                    server.SigningCredentials.Add(new SigningCredentials(keys.SigningKey, SecurityAlgorithms.RsaSha256));
                    server.EncryptionCredentials.Add(CreateEncryptionCredentials(oidc.Value, environment, loggers.CreateLogger(typeof(OidcServerSetup))));

                    // The password grant exists only in Development and only when switched on (and only for a client marked for it).
                    if (environment.IsDevelopment() && oidc.Value.PasswordGrantEnabled)
                    {
                        server.GrantTypes.Add(GrantTypes.Password);
                    }
                });

        services.AddAuthentication()
            .AddCookie(SessionCookie.Scheme, options =>
            {
                options.Cookie.Name = CookieName;
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.Lax;   // sent when a UI sends the browser here, not on requests made by other sites' scripts
                options.LoginPath = "/account/login";
                options.SlidingExpiration = true;
            });
        services.AddOptions<CookieAuthenticationOptions>(SessionCookie.Scheme)
            .Configure<IOptions<OidcOptions>>((cookie, oidc) =>
                cookie.ExpireTimeSpan = TimeSpan.FromHours(Math.Max(1, oidc.Value.SessionHours)));

        return services;
    }

    /// <summary>The key that protects authorization codes and refresh tokens (AES-256, 32 bytes).</summary>
    public static EncryptingCredentials CreateEncryptionCredentials(OidcOptions options, IHostEnvironment environment, ILogger logger)
    {
        byte[] key;
        if (!string.IsNullOrWhiteSpace(options.EncryptionKey))
        {
            try
            {
                key = Convert.FromBase64String(options.EncryptionKey);
            }
            catch (FormatException ex)
            {
                throw new InvalidOperationException("Oidc:EncryptionKey must be Base64 text.", ex);
            }
            if (key.Length != 32)
            {
                throw new InvalidOperationException("Oidc:EncryptionKey must be exactly 32 bytes (a 44 character Base64 value).");
            }
        }
        else if (environment.IsDevelopment())
        {
            logger.LogWarning("Oidc:EncryptionKey is not set. Using a temporary key: sign-in sessions stop working when this application restarts.");
            key = RandomNumberGenerator.GetBytes(32);
        }
        else
        {
            throw new InvalidOperationException("Oidc:EncryptionKey must be configured outside Development.");
        }

        return new EncryptingCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.Aes256KW, SecurityAlgorithms.Aes256CbcHmacSha512);
    }
}
