using System.Reflection;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OI.Auth.Controllers;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;

namespace OI.Auth.Tests.ControllerTests;

[TestFixture, Description("Tests for DiscoveryController: the two documents other applications use to find our signing key")]
public class DiscoveryControllerTests
{
    private static DiscoveryController Create(string issuer = "https://auth.test") =>
        new(AuthTestSupport.SharedKeys.Value, Options.Create(new JwtOptions { Issuer = issuer }));

    private static JsonDocument JsonOf(IActionResult result) =>
        JsonDocument.Parse(JsonSerializer.Serialize(result.Should().BeOfType<OkObjectResult>().Subject.Value));

    // ---- openid-configuration

    [Test, Description("Configuration should name the issuer exactly as configured")]
    public void Configuration_NamesTheIssuer()
    {
        using JsonDocument json = JsonOf(Create("https://auth.test").Configuration());

        json.RootElement.GetProperty("issuer").GetString().Should().Be("https://auth.test");
    }

    [Test, Description("Configuration should point to the key set under the issuer")]
    public void Configuration_PointsToTheKeySet()
    {
        using JsonDocument json = JsonOf(Create("https://auth.test").Configuration());

        json.RootElement.GetProperty("jwks_uri").GetString().Should().Be("https://auth.test/.well-known/jwks.json");
    }

    [Test, Description("Configuration should not double the slash when the issuer ends with one")]
    public void Configuration_TrimsATrailingSlashFromTheIssuerForTheKeySetAddress()
    {
        using JsonDocument json = JsonOf(Create("https://auth.test/").Configuration());

        json.RootElement.GetProperty("jwks_uri").GetString().Should().Be("https://auth.test/.well-known/jwks.json");
        json.RootElement.GetProperty("issuer").GetString().Should().Be("https://auth.test/", "the issuer must match the tokens' iss claim exactly");
    }

    [Test, Description("Configuration should say tokens are signed with RS256")]
    public void Configuration_ListsRs256()
    {
        using JsonDocument json = JsonOf(Create().Configuration());

        json.RootElement.GetProperty("id_token_signing_alg_values_supported").EnumerateArray()
            .Select(e => e.GetString()).Should().Equal("RS256");
    }

    // ---- jwks

    [Test, Description("Jwks should publish exactly one key")]
    public void Jwks_PublishesOneKey()
    {
        using JsonDocument json = JsonOf(Create().Jwks());

        json.RootElement.GetProperty("keys").GetArrayLength().Should().Be(1);
    }

    [Test, Description("Jwks should describe the key as an RSA signing key for RS256, with the provider's key id")]
    public void Jwks_DescribesTheKey()
    {
        using JsonDocument json = JsonOf(Create().Jwks());

        JsonElement key = json.RootElement.GetProperty("keys")[0];
        key.GetProperty("kty").GetString().Should().Be("RSA");
        key.GetProperty("use").GetString().Should().Be("sig");
        key.GetProperty("alg").GetString().Should().Be("RS256");
        key.GetProperty("kid").GetString().Should().Be(AuthTestSupport.SharedKeys.Value.KeyId);
    }

    [Test, Description("Jwks should publish the public modulus and exponent of the signing key")]
    public void Jwks_PublishesThePublicKey()
    {
        using JsonDocument json = JsonOf(Create().Jwks());

        JsonElement key = json.RootElement.GetProperty("keys")[0];
        Base64UrlEncoder.DecodeBytes(key.GetProperty("n").GetString()!).Should().Equal(AuthTestSupport.SharedKeys.Value.PublicParameters.Modulus);
        Base64UrlEncoder.DecodeBytes(key.GetProperty("e").GetString()!).Should().Equal(AuthTestSupport.SharedKeys.Value.PublicParameters.Exponent);
    }

    [Test, Description("Jwks should never publish any part of the private key")]
    public void Jwks_NeverPublishesThePrivateKey()
    {
        using JsonDocument json = JsonOf(Create().Jwks());

        JsonElement key = json.RootElement.GetProperty("keys")[0];
        foreach (string privatePart in new[] { "d", "p", "q", "dp", "dq", "qi" })
        {
            key.TryGetProperty(privatePart, out _).Should().BeFalse($"\"{privatePart}\" is part of the private key");
        }
    }

    // ---- protection

    [Test, Description("The controller should allow anonymous callers, because other applications fetch the keys without a token")]
    public void Controller_AllowsAnonymousCallers()
    {
        typeof(DiscoveryController).GetCustomAttribute<AllowAnonymousAttribute>().Should().NotBeNull();
    }

    [TestCase(nameof(DiscoveryController.Configuration), "/.well-known/openid-configuration")]
    [TestCase(nameof(DiscoveryController.Jwks), "/.well-known/jwks.json")]
    [Description("Each document should be served at its well-known address")]
    public void Endpoint_IsAGetAtItsWellKnownAddress(string methodName, string template)
    {
        HttpGetAttribute? attribute = typeof(DiscoveryController).GetMethod(methodName)!.GetCustomAttribute<HttpGetAttribute>();

        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be(template);
    }
}
