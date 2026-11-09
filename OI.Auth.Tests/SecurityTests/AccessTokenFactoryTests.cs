using FluentAssertions;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Moq;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;
using OI.Glue.Models;

namespace OI.Auth.Tests.SecurityTests;

[TestFixture, Description("Tests for AccessTokenFactory: the signed tokens for users and for other applications")]
public class AccessTokenFactoryTests
{
    private static IAuthUser UserWith(string[]? roles = null, string? email = "pat@example.com", params (string Type, string Value)[] claims)
    {
        Mock<IAuthUser> user = new();
        user.SetupGet(u => u.Id).Returns("user-1");
        user.SetupGet(u => u.Email).Returns(email);
        user.SetupGet(u => u.DisplayName).Returns("Pat Example");
        user.SetupGet(u => u.Roles).Returns(roles ?? []);
        user.SetupGet(u => u.Claims).Returns(claims.Select(c => new KeyValuePair<string, string>(c.Type, c.Value)).ToList());
        return user.Object;
    }

    private static JsonWebToken Read(string token) => new JsonWebTokenHandler().ReadJsonWebToken(token);

    private static string[] Values(JsonWebToken jwt, string type) => jwt.Claims.Where(c => c.Type == type).Select(c => c.Value).ToArray();

    // ---- lifetime

    [Test, Description("RefreshTokenLifetime should be the number of days in the options")]
    public void RefreshTokenLifetime_IsTheConfiguredNumberOfDays()
    {
        AccessTokenFactory sut = AuthTestSupport.Factory(new JwtOptions { Issuer = "https://auth.test", RefreshTokenDays = 30 });

        sut.RefreshTokenLifetime.Should().Be(TimeSpan.FromDays(30));
    }

    [Test, Description("RefreshTokenLifetime should default to seven days")]
    public void RefreshTokenLifetime_DefaultsToSevenDays()
    {
        AuthTestSupport.Factory().RefreshTokenLifetime.Should().Be(TimeSpan.FromDays(7));
    }

    // ---- user tokens

    [Test, Description("CreateUserToken should expire after the configured number of minutes")]
    public void CreateUserToken_ExpiresAfterTheConfiguredMinutes()
    {
        AccessTokenFactory sut = AuthTestSupport.Factory(new JwtOptions { Issuer = "https://auth.test", AccessTokenMinutes = 20 });

        (string token, DateTimeOffset expires) = sut.CreateUserToken(UserWith());

        expires.Should().Be(AuthTestSupport.Now.AddMinutes(20));
        Read(token).ValidTo.Should().Be(expires.UtcDateTime);
    }

    [Test, Description("CreateUserToken should start the token now, not earlier or later")]
    public void CreateUserToken_StartsNow()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith());

        JsonWebToken jwt = Read(token);
        jwt.ValidFrom.Should().Be(AuthTestSupport.Now.UtcDateTime);
        jwt.IssuedAt.Should().Be(AuthTestSupport.Now.UtcDateTime);
    }

    [Test, Description("CreateUserToken should name the issuer and the audience from the options")]
    public void CreateUserToken_NamesIssuerAndAudience()
    {
        AccessTokenFactory sut = AuthTestSupport.Factory(new JwtOptions { Issuer = "https://auth.example", Audience = "orders" });

        (string token, _) = sut.CreateUserToken(UserWith());

        JsonWebToken jwt = Read(token);
        jwt.Issuer.Should().Be("https://auth.example");
        jwt.Audiences.Should().Equal("orders");
    }

    [Test, Description("CreateUserToken should carry the user's id, name and the user token marker")]
    public void CreateUserToken_CarriesTheIdentityClaims()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith());

        JsonWebToken jwt = Read(token);
        Values(jwt, "sub").Should().Contain("user-1");
        Values(jwt, "name").Should().Contain("Pat Example");
        Values(jwt, "token_use").Should().Contain("user", "a user token must never pass for a service token");
    }

    [Test, Description("CreateUserToken should carry the email when the user has one")]
    public void CreateUserToken_CarriesTheEmail()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith(email: "pat@example.com"));

        Values(Read(token), "email").Should().Equal("pat@example.com");
    }

    [TestCase(null)]
    [TestCase("")]
    [Description("CreateUserToken should leave the email claim out when the user has no email")]
    public void CreateUserToken_OmitsAMissingEmail(string? email)
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith(email: email));

        Values(Read(token), "email").Should().BeEmpty();
    }

    [Test, Description("CreateUserToken should add one role claim for each of the user's roles")]
    public void CreateUserToken_CarriesEveryRole()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith(["Admin", "User"]));

        Values(Read(token), "role").Should().BeEquivalentTo("Admin", "User");
    }

    [Test, Description("CreateUserToken should add no role claim for a user with no roles")]
    public void CreateUserToken_HasNoRolesForAUserWithNone()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith([]));

        Values(Read(token), "role").Should().BeEmpty();
    }

    [Test, Description("CreateUserToken should carry the user's stored claims, such as their groups")]
    public void CreateUserToken_CarriesStoredClaims()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(
            UserWith(["User"], "pat@example.com", ("group", "sales-west"), ("group", "default"), ("department", "tools")));

        JsonWebToken jwt = Read(token);
        Values(jwt, "group").Should().BeEquivalentTo("sales-west", "default");
        Values(jwt, "department").Should().Equal("tools");
    }

    [TestCase("sub", "attacker")]
    [TestCase("SUB", "attacker")]
    [TestCase("jti", "attacker")]
    [TestCase("iss", "https://evil.example")]
    [TestCase("aud", "evil")]
    [TestCase("exp", "9999999999")]
    [TestCase("nbf", "0")]
    [TestCase("iat", "0")]
    [TestCase("name", "Someone Else")]
    [TestCase("email", "attacker@example.com")]
    [TestCase("role", "Admin")]
    [TestCase("Role", "Admin")]
    [TestCase("scope", "hub:publish")]
    [TestCase("token_use", "service")]
    [TestCase("client_id", "oi-reporting")]
    [Description("CreateUserToken should not let a stored claim overwrite a claim the factory sets itself")]
    public void CreateUserToken_IgnoresStoredClaimsThatAreReserved(string type, string value)
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith(["User"], "pat@example.com", (type, value)));

        JsonWebToken jwt = Read(token);
        jwt.Claims.Where(c => string.Equals(c.Type, type, StringComparison.OrdinalIgnoreCase)).Select(c => c.Value)
            .Should().NotContain(value, $"a stored \"{type}\" claim must not reach the token");
        Values(jwt, "token_use").Should().Equal("user");
        Values(jwt, "sub").Should().Equal("user-1");
    }

    [Test, Description("CreateUserToken should give every token its own id")]
    public void CreateUserToken_GivesEveryTokenAUniqueId()
    {
        AccessTokenFactory sut = AuthTestSupport.Factory();

        string first = Values(Read(sut.CreateUserToken(UserWith()).Token), "jti").Single();
        string second = Values(Read(sut.CreateUserToken(UserWith()).Token), "jti").Single();

        first.Should().NotBeNullOrEmpty();
        first.Should().NotBe(second);
    }

    [Test, Description("CreateUserToken should sign with RS256 and name the signing key")]
    public void CreateUserToken_SignsWithRs256AndTheKeyId()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith());

        JsonWebToken jwt = Read(token);
        jwt.Alg.Should().Be("RS256");
        jwt.Kid.Should().Be(AuthTestSupport.SharedKeys.Value.KeyId);
    }

    [Test, Description("CreateUserToken should produce a token that validates against the public half of the key")]
    public async Task CreateUserToken_ValidatesWithThePublicKey()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith(["Admin"]));
        SigningKeyProvider keys = AuthTestSupport.SharedKeys.Value;

        TokenValidationResult result = await new JsonWebTokenHandler().ValidateTokenAsync(token, new TokenValidationParameters
        {
            ValidIssuer = "https://auth.test",
            ValidAudience = "oi",
            IssuerSigningKey = new RsaSecurityKey(keys.PublicParameters) { KeyId = keys.KeyId },
            ValidateLifetime = false,
        });

        result.IsValid.Should().BeTrue("other applications validate tokens with only the public key");
    }

    [Test, Description("CreateUserToken should produce a token that fails validation against a different key")]
    public async Task CreateUserToken_FailsValidationWithAnotherKey()
    {
        (string token, _) = AuthTestSupport.Factory().CreateUserToken(UserWith());
        using System.Security.Cryptography.RSA other = System.Security.Cryptography.RSA.Create(2048);

        TokenValidationResult result = await new JsonWebTokenHandler().ValidateTokenAsync(token, new TokenValidationParameters
        {
            ValidIssuer = "https://auth.test",
            ValidAudience = "oi",
            IssuerSigningKey = new RsaSecurityKey(other.ExportParameters(false)),
            ValidateLifetime = false,
        });

        result.IsValid.Should().BeFalse();
    }

    // ---- service tokens

    [Test, Description("CreateServiceToken should expire after the configured number of service minutes")]
    public void CreateServiceToken_ExpiresAfterTheConfiguredMinutes()
    {
        AccessTokenFactory sut = AuthTestSupport.Factory(new JwtOptions { Issuer = "https://auth.test", ServiceTokenMinutes = 5 });

        (string token, DateTimeOffset expires) = sut.CreateServiceToken(new ServiceClient { ClientId = "oi-reporting", Secret = "s" });

        expires.Should().Be(AuthTestSupport.Now.AddMinutes(5));
        Read(token).ValidTo.Should().Be(expires.UtcDateTime);
    }

    [Test, Description("CreateServiceToken should default to ten minutes")]
    public void CreateServiceToken_DefaultsToTenMinutes()
    {
        (_, DateTimeOffset expires) = AuthTestSupport.Factory().CreateServiceToken(new ServiceClient { ClientId = "oi-reporting" });

        expires.Should().Be(AuthTestSupport.Now.AddMinutes(10));
    }

    [Test, Description("CreateServiceToken should identify the client and mark the token as a service token")]
    public void CreateServiceToken_IdentifiesTheClient()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(new ServiceClient { ClientId = "oi-reporting" });

        JsonWebToken jwt = Read(token);
        Values(jwt, "sub").Should().Contain("oi-reporting");
        Values(jwt, "client_id").Should().Contain("oi-reporting");
        Values(jwt, "token_use").Should().Contain("service", "the hub tells a service token from a user token by this claim");
    }

    [Test, Description("CreateServiceToken should carry one scope claim for each scope of the client")]
    public void CreateServiceToken_CarriesTheScopes()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(
            new ServiceClient { ClientId = "oi-reporting", Scopes = ["hub:publish", "reports:read"] });

        Values(Read(token), "scope").Should().BeEquivalentTo("hub:publish", "reports:read");
    }

    [Test, Description("CreateServiceToken should carry no scope for a client that has none")]
    public void CreateServiceToken_HasNoScopesForAClientWithNone()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(new ServiceClient { ClientId = "oi-reporting" });

        Values(Read(token), "scope").Should().BeEmpty();
    }

    [Test, Description("CreateServiceToken should never carry a role, a name or an email")]
    public void CreateServiceToken_CarriesNoUserClaims()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(
            new ServiceClient { ClientId = "oi-reporting", Scopes = ["hub:publish"] });

        JsonWebToken jwt = Read(token);
        Values(jwt, "role").Should().BeEmpty();
        Values(jwt, "name").Should().BeEmpty();
        Values(jwt, "email").Should().BeEmpty();
    }

    [Test, Description("CreateServiceToken should name the issuer and the audience, and give every token its own id")]
    public void CreateServiceToken_NamesIssuerAudienceAndId()
    {
        AccessTokenFactory sut = AuthTestSupport.Factory();
        ServiceClient client = new() { ClientId = "oi-reporting" };

        JsonWebToken first = Read(sut.CreateServiceToken(client).Token);
        JsonWebToken second = Read(sut.CreateServiceToken(client).Token);

        first.Issuer.Should().Be("https://auth.test");
        first.Audiences.Should().Equal("oi");
        Values(first, "jti").Single().Should().NotBe(Values(second, "jti").Single());
    }
}
