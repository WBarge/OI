using FluentAssertions;
using OI.Auth.Security;

namespace OI.Auth.Tests.ModelTests;

[TestFixture, Description("Tests for JwtOptions")]
public class JwtOptionsTests
{
    [Test, Description("The configuration section should be named Jwt")]
    public void Section_IsJwt()
    {
        JwtOptions.SECTION.Should().Be("Jwt");
    }

    [Test, Description("JwtOptions should default to a 15 minute access token, a 10 minute service token and a 7 day refresh token")]
    public void Options_HaveTheExpectedLifetimes()
    {
        JwtOptions sut = new();

        sut.AccessTokenMinutes.Should().Be(15);
        sut.ServiceTokenMinutes.Should().Be(10);
        sut.RefreshTokenDays.Should().Be(7);
    }

    [Test, Description("JwtOptions should default to the oi audience, no issuer and no signing key")]
    public void Options_HaveTheExpectedIdentityDefaults()
    {
        JwtOptions sut = new();

        sut.Audience.Should().Be("oi");
        sut.Issuer.Should().BeEmpty("the issuer must be set to this application's address");
        sut.SigningKeyPem.Should().BeNull("a key is never built into the application");
    }

    [TestCase("https://localhost:7300", "https://localhost:7300/")]
    [TestCase("https://localhost:7300/", "https://localhost:7300/")]
    [TestCase("https://auth.example.com/auth", "https://auth.example.com/auth")]
    [Description("NormalizedIssuer should be the absolute address OpenIddict writes into every token")]
    public void NormalizedIssuer_IsTheAbsoluteAddress(string issuer, string expected)
    {
        new JwtOptions { Issuer = issuer }.NormalizedIssuer.Should().Be(expected);
    }

    [Test, Description("NormalizedIssuer should fail when no issuer is set")]
    public void NormalizedIssuer_FailsWhenThereIsNoIssuer()
    {
        Action act = () => _ = new JwtOptions().NormalizedIssuer;

        act.Should().Throw<UriFormatException>();
    }
}
