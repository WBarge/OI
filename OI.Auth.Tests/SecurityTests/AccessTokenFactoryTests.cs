using FluentAssertions;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;

namespace OI.Auth.Tests.SecurityTests;

[TestFixture, Description("Tests for AccessTokenFactory: the signed service tokens for other applications")]
public class AccessTokenFactoryTests
{
    private static JsonWebToken Read(string token) => new JsonWebTokenHandler().ReadJsonWebToken(token);

    private static string[] Values(JsonWebToken jwt, string type) => jwt.Claims.Where(c => c.Type == type).Select(c => c.Value).ToArray();

    private static readonly ServiceClient Client = new() { ClientId = "oi-reporting", Scopes = ["hub:publish"] };

    // ---- signing

    [Test, Description("CreateServiceToken should sign with RS256 and name the signing key")]
    public void CreateServiceToken_SignsWithRs256AndTheKeyId()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(Client);

        JsonWebToken jwt = Read(token);
        jwt.Alg.Should().Be("RS256");
        jwt.Kid.Should().Be(AuthTestSupport.SharedKeys.Value.KeyId);
    }

    [Test, Description("CreateServiceToken should produce a token that validates against the public half of the key")]
    public async Task CreateServiceToken_ValidatesWithThePublicKey()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(Client);
        SigningKeyProvider keys = AuthTestSupport.SharedKeys.Value;

        TokenValidationResult result = await new JsonWebTokenHandler().ValidateTokenAsync(token, new TokenValidationParameters
        {
            ValidIssuer = AuthTestSupport.DefaultOptions().NormalizedIssuer,
            ValidAudience = "oi",
            IssuerSigningKey = new RsaSecurityKey(keys.PublicParameters) { KeyId = keys.KeyId },
            ValidateLifetime = false,
        });

        result.IsValid.Should().BeTrue("other applications validate tokens with only the public key");
    }

    [Test, Description("CreateServiceToken should produce a token that fails validation against a different key")]
    public async Task CreateServiceToken_FailsValidationWithAnotherKey()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(Client);
        using System.Security.Cryptography.RSA other = System.Security.Cryptography.RSA.Create(2048);

        TokenValidationResult result = await new JsonWebTokenHandler().ValidateTokenAsync(token, new TokenValidationParameters
        {
            ValidIssuer = AuthTestSupport.DefaultOptions().NormalizedIssuer,
            ValidAudience = "oi",
            IssuerSigningKey = new RsaSecurityKey(other.ExportParameters(false)),
            ValidateLifetime = false,
        });

        result.IsValid.Should().BeFalse();
    }

    [Test, Description("CreateServiceToken should write the issuer exactly as OpenIddict does (an absolute address), or the APIs would reject service tokens")]
    public void CreateServiceToken_WritesTheNormalizedIssuer()
    {
        (string token, _) = AuthTestSupport.Factory().CreateServiceToken(Client);

        Read(token).Issuer.Should().Be("https://auth.test/");
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

        first.Issuer.Should().Be("https://auth.test/");
        first.Audiences.Should().Equal("oi");
        Values(first, "jti").Single().Should().NotBe(Values(second, "jti").Single());
    }
}
