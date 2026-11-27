using System.Security.Cryptography;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OI.Auth.Oidc;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;
using OI.Auth.Utilities;
using OpenIddict.Server;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Tests.OidcTests;

[TestFixture, Description("Tests for OidcServerSetup: the encryption key and how OpenIddict is configured from settings")]
public class OidcServerSetupTests
{
    private static readonly string ValidKey = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    private static readonly string SigningPem = RSA.Create(2048).ExportPkcs8PrivateKeyPem();

    private static EncryptingCredentials Create(string? key, string environment = "Production") =>
        OidcServerSetup.CreateEncryptionCredentials(new OidcOptions { EncryptionKey = key }, new FakeHostEnvironment(environment), NullLogger.Instance);

    // ---- encryption key

    [Test, Description("CreateEncryptionCredentials should use the configured 32 byte key")]
    public void CreateEncryptionCredentials_UsesTheConfiguredKey()
    {
        EncryptingCredentials credentials = Create(ValidKey);

        credentials.Alg.Should().Be(SecurityAlgorithms.Aes256KW);
        credentials.Enc.Should().Be(SecurityAlgorithms.Aes256CbcHmacSha512);
        ((SymmetricSecurityKey)credentials.Key).Key.Should().Equal(Convert.FromBase64String(ValidKey));
    }

    [Test, Description("CreateEncryptionCredentials should refuse a key that is not Base64")]
    public void CreateEncryptionCredentials_RefusesTextThatIsNotBase64()
    {
        Action act = () => Create("this is not base64!");

        act.Should().Throw<InvalidOperationException>().WithMessage("*Base64*");
    }

    [TestCase(16)]
    [TestCase(31)]
    [TestCase(33)]
    [TestCase(64)]
    [Description("CreateEncryptionCredentials should refuse a key that is not exactly 32 bytes")]
    public void CreateEncryptionCredentials_RefusesTheWrongLength(int bytes)
    {
        Action act = () => Create(Convert.ToBase64String(RandomNumberGenerator.GetBytes(bytes)));

        act.Should().Throw<InvalidOperationException>().WithMessage("*32 bytes*");
    }

    [TestCase("")]
    [TestCase("   ")]
    [TestCase(null)]
    [Description("CreateEncryptionCredentials should make a temporary key in Development when none is set")]
    public void CreateEncryptionCredentials_InventsAKeyInDevelopment(string? key)
    {
        EncryptingCredentials first = Create(key, "Development");
        EncryptingCredentials second = Create(key, "Development");

        ((SymmetricSecurityKey)first.Key).Key.Should().HaveCount(32);
        ((SymmetricSecurityKey)first.Key).Key.Should().NotEqual(((SymmetricSecurityKey)second.Key).Key);
    }

    [TestCase("Production")]
    [TestCase("Staging")]
    [Description("CreateEncryptionCredentials should refuse to start outside Development without a key: instances would not agree on one")]
    public void CreateEncryptionCredentials_RequiresAKeyOutsideDevelopment(string environment)
    {
        Action act = () => Create(null, environment);

        act.Should().Throw<InvalidOperationException>().WithMessage("*Oidc:EncryptionKey*");
    }

    // ---- the server options, as built from settings

    private static OpenIddictServerOptions ServerOptions(string environment, params (string Key, string Value)[] extra)
    {
        Dictionary<string, string?> settings = new()
        {
            ["ConnectionString"] = "Server=.;Database=x;Trusted_Connection=True;",
            ["Jwt:Issuer"] = "https://auth.test",
            ["Jwt:AccessTokenMinutes"] = "30",
            ["Jwt:RefreshTokenDays"] = "3",
            ["Jwt:SigningKeyPem"] = SigningPem,
            ["Oidc:EncryptionKey"] = ValidKey,
        };
        foreach ((string key, string value) in extra)
        {
            settings[key] = value;
        }

        ServiceCollection services = new();
        services.AddLogging();
        services.AddSingleton<IHostEnvironment>(new FakeHostEnvironment(environment));
        services.ConfigureDi(new ConfigurationBuilder().AddInMemoryCollection(settings).Build());
        ServiceProvider provider = services.BuildServiceProvider();
        return provider.GetRequiredService<IOptions<OpenIddictServerOptions>>().Value;
    }

    [Test, Description("The server should use the Jwt settings for the issuer and the token lifetimes")]
    public void Server_UsesTheJwtSettings()
    {
        OpenIddictServerOptions options = ServerOptions("Production");

        options.Issuer!.AbsoluteUri.Should().Be("https://auth.test/");
        options.AccessTokenLifetime.Should().Be(TimeSpan.FromMinutes(30));
        options.RefreshTokenLifetime.Should().Be(TimeSpan.FromDays(3));
    }

    [Test, Description("The server should sign with the same key (and key id) that signs service tokens")]
    public void Server_SignsWithTheServiceTokenKey()
    {
        OpenIddictServerOptions options = ServerOptions("Production");

        options.SigningCredentials.Should().ContainSingle();
        options.SigningCredentials[0].Algorithm.Should().Be(SecurityAlgorithms.RsaSha256);
        options.SigningCredentials[0].Kid.Should().NotBeNullOrEmpty();
    }

    [Test, Description("The server should issue plain signed access tokens that the other APIs can read, and keep codes and refresh tokens encrypted")]
    public void Server_LeavesAccessTokensReadableAndEncryptsTheRest()
    {
        OpenIddictServerOptions options = ServerOptions("Production");

        options.DisableAccessTokenEncryption.Should().BeTrue();
        options.EncryptionCredentials.Should().ContainSingle();
    }

    [Test, Description("The server should allow only the authorization code and refresh token flows by default, and require PKCE")]
    public void Server_AllowsOnlyTheBrowserFlows()
    {
        OpenIddictServerOptions options = ServerOptions("Production");

        options.GrantTypes.Should().BeEquivalentTo(GrantTypes.AuthorizationCode, GrantTypes.RefreshToken);
        options.ResponseTypes.Should().BeEquivalentTo(ResponseTypes.Code);
        options.RequireProofKeyForCodeExchange.Should().BeTrue();
    }

    [Test, Description("The server should advertise the scopes the UIs ask for, including the one that allows refresh tokens")]
    public void Server_RegistersTheUserScopes()
    {
        ServerOptions("Production").Scopes.Should().Contain(new[] { Scopes.OpenId, Scopes.Email, Scopes.Profile, Scopes.OfflineAccess });
    }

    [TestCase("Development", "true", true)]
    [TestCase("Development", "false", false)]
    [TestCase("Production", "true", false)]
    [Description("The server should accept the password grant only in Development with the setting on")]
    public void Server_PasswordGrantNeedsDevelopmentAndTheSetting(string environment, string enabled, bool expected)
    {
        OpenIddictServerOptions options = ServerOptions(environment, ("Oidc:PasswordGrantEnabled", enabled));

        options.GrantTypes.Contains(GrantTypes.Password).Should().Be(expected);
    }

    [Test, Description("The server should refuse to start without a public address for the issuer")]
    public void Server_RefusesToStartWithoutAnIssuer()
    {
        Action act = () => ServerOptions("Production", ("Jwt:Issuer", ""));

        act.Should().Throw<InvalidOperationException>().WithMessage("*Jwt:Issuer*");
    }

    [Test, Description("The sign-in cookie should last as long as Oidc:SessionHours says")]
    public void Cookie_LastsAsLongAsTheSessionHours()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddSingleton<IHostEnvironment>(new FakeHostEnvironment("Production"));
        services.ConfigureDi(new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ConnectionString"] = "Server=.;Database=x;Trusted_Connection=True;",
            ["Jwt:Issuer"] = "https://auth.test",
            ["Jwt:SigningKeyPem"] = SigningPem,
            ["Oidc:SessionHours"] = "5",
        }).Build());
        using ServiceProvider provider = services.BuildServiceProvider();

        var cookie = provider.GetRequiredService<IOptionsMonitor<Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions>>().Get(SessionCookie.Scheme);

        cookie.ExpireTimeSpan.Should().Be(TimeSpan.FromHours(5));
        cookie.SlidingExpiration.Should().BeTrue();
        cookie.Cookie.HttpOnly.Should().BeTrue();
        cookie.Cookie.SecurePolicy.Should().Be(Microsoft.AspNetCore.Http.CookieSecurePolicy.Always);
        cookie.Cookie.SameSite.Should().Be(Microsoft.AspNetCore.Http.SameSiteMode.Lax);
    }
}
