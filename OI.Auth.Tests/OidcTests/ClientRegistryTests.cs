using FluentAssertions;
using Microsoft.Extensions.Configuration;
using OI.Auth.Oidc;

namespace OI.Auth.Tests.OidcTests;

[TestFixture, Description("Tests for ClientRegistry: the applications allowed to sign people in")]
public class ClientRegistryTests
{
    private static ClientRegistry Registry(params (string Key, string Value)[] settings) =>
        new(new ConfigurationBuilder().AddInMemoryCollection(settings.Select(s => new KeyValuePair<string, string?>(s.Key, s.Value))).Build());

    private static ClientRegistry TwoClients() => Registry(
        ("Clients:0:ClientId", "oi-ui"),
        ("Clients:0:RedirectUris:0", "http://localhost:4201/auth/callback"),
        ("Clients:0:RedirectUris:1", "https://oi.example.com/auth/callback"),
        ("Clients:0:PostLogoutRedirectUris:0", "http://localhost:4201/signed-out"),
        ("Clients:1:ClientId", "postman-dev"),
        ("Clients:1:AllowPasswordGrant", "true"));

    [Test, Description("Clients should be empty when the section is missing")]
    public void Clients_AreEmptyWithoutTheSection()
    {
        Registry().Clients.Should().BeEmpty();
    }

    [Test, Description("Clients should read each entry from the section")]
    public void Clients_AreReadFromTheSection()
    {
        ClientRegistry sut = TwoClients();

        sut.Clients.Select(c => c.ClientId).Should().Equal("oi-ui", "postman-dev");
        sut.Clients[0].RedirectUris.Should().Equal("http://localhost:4201/auth/callback", "https://oi.example.com/auth/callback");
        sut.Clients[0].PostLogoutRedirectUris.Should().Equal("http://localhost:4201/signed-out");
    }

    [TestCase("postman-dev", true)]
    [TestCase("oi-ui", false)]
    [TestCase("unknown", false)]
    [TestCase("POSTMAN-DEV", false)]
    [TestCase("", false)]
    [TestCase(null, false)]
    [Description("AllowsPasswordGrant should be true only for a client marked for it, matched exactly")]
    public void AllowsPasswordGrant_OnlyForAMarkedClient(string? clientId, bool expected)
    {
        TwoClients().AllowsPasswordGrant(clientId).Should().Be(expected);
    }

    [Test, Description("AllowedOrigins should be the distinct origins of every registered address, with no path")]
    public void AllowedOrigins_AreTheOriginsOfTheRegisteredAddresses()
    {
        TwoClients().AllowedOrigins().Should().BeEquivalentTo("http://localhost:4201", "https://oi.example.com");
    }

    [Test, Description("AllowedOrigins should skip an address that is not an absolute address, and list an origin once")]
    public void AllowedOrigins_SkipBadAddressesAndRepeats()
    {
        ClientRegistry sut = Registry(
            ("Clients:0:ClientId", "a"),
            ("Clients:0:RedirectUris:0", "http://localhost:4201/auth/callback"),
            ("Clients:0:RedirectUris:1", "not an address"),
            ("Clients:0:PostLogoutRedirectUris:0", "http://localhost:4201/signed-out"));

        sut.AllowedOrigins().Should().Equal("http://localhost:4201");
    }

    [Test, Description("AllowedOrigins should be empty when there are no clients")]
    public void AllowedOrigins_AreEmptyWithoutClients()
    {
        Registry().AllowedOrigins().Should().BeEmpty();
    }
}
