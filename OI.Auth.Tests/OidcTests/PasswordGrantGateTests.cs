using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using OI.Auth.Oidc;
using OI.Auth.Tests.TestSupport;

namespace OI.Auth.Tests.OidcTests;

[TestFixture, Description("Tests for PasswordGrantGate: the three locks on the Development-only password grant")]
public class PasswordGrantGateTests
{
    private static PasswordGrantGate Gate(string environment, bool enabled, bool clientMarked)
    {
        IConfiguration config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Clients:0:ClientId"] = "postman-dev",
            ["Clients:0:AllowPasswordGrant"] = clientMarked ? "true" : "false",
        }).Build();
        return new PasswordGrantGate(new FakeHostEnvironment(environment), Options.Create(new OidcOptions { PasswordGrantEnabled = enabled }), new ClientRegistry(config));
    }

    [TestCase("Development", true, true, true)]
    [TestCase("Development", true, false, false)]
    [TestCase("Development", false, true, false)]
    [TestCase("Development", false, false, false)]
    [TestCase("Production", true, true, false)]
    [TestCase("Production", true, false, false)]
    [TestCase("Production", false, true, false)]
    [TestCase("Staging", true, true, false)]
    [Description("IsOpenFor should be true only when the environment is Development, the setting is on and the client is marked")]
    public void IsOpenFor_NeedsAllThreeLocks(string environment, bool enabled, bool clientMarked, bool expected)
    {
        Gate(environment, enabled, clientMarked).IsOpenFor("postman-dev").Should().Be(expected);
    }

    [TestCase("oi-ui")]
    [TestCase("")]
    [TestCase(null)]
    [Description("IsOpenFor should be false for any other client, even with everything else open")]
    public void IsOpenFor_IsClosedForOtherClients(string? clientId)
    {
        Gate("Development", true, true).IsOpenFor(clientId).Should().BeFalse();
    }
}
