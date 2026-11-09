using FluentAssertions;
using Microsoft.Extensions.Configuration;
using OI.Auth.Security;

namespace OI.Auth.Tests.SecurityTests;

[TestFixture, Description("Tests for ServiceClientRegistry: which applications may ask for a service token")]
public class ServiceClientRegistryTests
{
    private static ServiceClientRegistry RegistryWith(params (string Key, string? Value)[] settings)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(settings.Select(s => new KeyValuePair<string, string?>(s.Key, s.Value)))
            .Build();
        return new ServiceClientRegistry(configuration);
    }

    private static ServiceClientRegistry ReportingAndBilling() => RegistryWith(
        ("ServiceClients:0:ClientId", "oi-reporting"),
        ("ServiceClients:0:Secret", "reporting-secret-value"),
        ("ServiceClients:0:Scopes:0", "hub:publish"),
        ("ServiceClients:0:Scopes:1", "reports:read"),
        ("ServiceClients:1:ClientId", "oi-billing"),
        ("ServiceClients:1:Secret", "billing-secret-value"),
        ("ServiceClients:1:Scopes:0", "billing:write"));

    [Test, Description("ServiceClient should start with empty text and no scopes")]
    public void ServiceClient_HasExpectedDefaults()
    {
        ServiceClient sut = new();

        sut.ClientId.Should().BeEmpty();
        sut.Secret.Should().BeEmpty();
        sut.Scopes.Should().BeEmpty();
    }

    [Test, Description("Validate should return the client, with its scopes, for a matching id and secret")]
    public void Validate_ReturnsTheClientForTheRightSecret()
    {
        ServiceClient? client = ReportingAndBilling().Validate("oi-reporting", "reporting-secret-value");

        client.Should().NotBeNull();
        client!.ClientId.Should().Be("oi-reporting");
        client.Scopes.Should().Equal("hub:publish", "reports:read");
    }

    [Test, Description("Validate should pick the right client when several are configured")]
    public void Validate_PicksTheMatchingClient()
    {
        ServiceClient? client = ReportingAndBilling().Validate("oi-billing", "billing-secret-value");

        client!.ClientId.Should().Be("oi-billing");
        client.Scopes.Should().Equal("billing:write");
    }

    [Test, Description("Validate should reject a wrong secret")]
    public void Validate_RejectsAWrongSecret()
    {
        ReportingAndBilling().Validate("oi-reporting", "not-the-secret").Should().BeNull();
    }

    [Test, Description("Validate should reject another client's secret")]
    public void Validate_RejectsAnotherClientsSecret()
    {
        ReportingAndBilling().Validate("oi-reporting", "billing-secret-value").Should().BeNull();
    }

    [Test, Description("Validate should reject an unknown client id")]
    public void Validate_RejectsAnUnknownClient()
    {
        ReportingAndBilling().Validate("oi-unknown", "reporting-secret-value").Should().BeNull();
    }

    [Test, Description("Validate should compare the client id exactly, including case")]
    public void Validate_ComparesTheClientIdExactly()
    {
        ReportingAndBilling().Validate("OI-REPORTING", "reporting-secret-value").Should().BeNull();
    }

    [TestCase("reporting-secret-value ")]
    [TestCase("REPORTING-SECRET-VALUE")]
    [TestCase("")]
    [Description("Validate should reject a secret that differs only by a space, by case or by being empty")]
    public void Validate_RejectsNearMissSecrets(string secret)
    {
        ReportingAndBilling().Validate("oi-reporting", secret).Should().BeNull();
    }

    [Test, Description("Validate should reject everything when no clients are configured")]
    public void Validate_RejectsEverythingWhenNothingIsConfigured()
    {
        ServiceClientRegistry sut = RegistryWith();

        sut.Validate("oi-reporting", "reporting-secret-value").Should().BeNull();
        sut.Validate("", "").Should().BeNull();
    }

    [Test, Description("Validate should reject a client that has no secret configured, even for an empty secret")]
    public void Validate_RejectsAClientWithoutASecret()
    {
        ServiceClientRegistry sut = RegistryWith(("ServiceClients:0:ClientId", "oi-reporting"));

        sut.Validate("oi-reporting", "").Should().BeNull("an unset secret must never mean \"anything goes\"");
        sut.Validate("oi-reporting", "anything").Should().BeNull();
    }

    [Test, Description("Validate should return a client with no scopes when none are configured")]
    public void Validate_ReturnsAClientWithNoScopes()
    {
        ServiceClientRegistry sut = RegistryWith(
            ("ServiceClients:0:ClientId", "oi-reporting"),
            ("ServiceClients:0:Secret", "reporting-secret-value"));

        ServiceClient? client = sut.Validate("oi-reporting", "reporting-secret-value");

        client.Should().NotBeNull();
        client!.Scopes.Should().BeEmpty();
    }
}
