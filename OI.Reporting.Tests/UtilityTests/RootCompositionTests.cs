using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OI.Glue.Managers;
using OI.Glue.Notifications;
using OI.Glue.Repos;
using OI.Glue.Security;
using OI.Reporting.Services;
using OI.Reporting.Utilities;

namespace OI.Reporting.Tests.UtilityTests;

/// <summary>Tests for the OI.Reporting <see cref="RootComposition"/>, asserting on the public service types the controllers use.</summary>
[TestFixture, Description("Tests for the OI.Reporting RootComposition")]
public class RootCompositionTests
{
    // Never connected to: building the container does not open a connection.
    private const string FAKE_CONNECTION_STRING = "Server=(local);Database=OiReportingRootCompositionTests;Trusted_Connection=True;TrustServerCertificate=True";

    private static ServiceCollection Compose()
    {
        IConfiguration configuration = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ConnectionString"] = FAKE_CONNECTION_STRING,
            ["Auth:Authority"] = "https://auth.test",
            ["Hub:BaseUrl"] = "https://hub.test",
        }).Build();
        ServiceCollection services = new();
        services.ConfigureDi(configuration);
        return services;
    }

    [TestCase(typeof(ICompanyProfileStore))]
    [TestCase(typeof(ICompanyRepo))]
    [TestCase(typeof(INotificationPublisher))]
    [TestCase(typeof(IClientContext))]
    [TestCase(typeof(IStateManager))]
    [TestCase(typeof(IOrderManager))]
    [TestCase(typeof(ICustomerManager))]
    [TestCase(typeof(IStateRepo))]
    [TestCase(typeof(IOrderRepo))]
    [TestCase(typeof(ICustomerRepo))]
    [Description("ConfigureDi should register everything the reporting controllers and jobs depend on")]
    public void ConfigureDi_RegistersTheServices(Type serviceType)
    {
        Compose().Should().Contain(d => d.ServiceType == serviceType);
    }

    [Test, Description("ConfigureDi should register the company profile store as scoped, backed by the database")]
    public void ConfigureDi_RegistersTheProfileStoreAsScoped()
    {
        ServiceDescriptor descriptor = Compose().Single(d => d.ServiceType == typeof(ICompanyProfileStore));

        descriptor.ImplementationType.Should().Be(typeof(PersistedCompanyProfileStore));
        descriptor.Lifetime.Should().Be(ServiceLifetime.Scoped, "it reads through a scoped DbContext");
    }

    [Test, Description("ConfigureDi should register the notification publisher as a singleton")]
    public void ConfigureDi_RegistersThePublisherAsASingleton()
    {
        Compose().Single(d => d.ServiceType == typeof(INotificationPublisher)).Lifetime.Should().Be(ServiceLifetime.Singleton);
    }

    [Test, Description("ConfigureDi should fail on start-up, not at the first request, when the hub address is missing")]
    public void ConfigureDi_ThrowsWithoutTheHubAddress()
    {
        IConfiguration configuration = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ConnectionString"] = FAKE_CONNECTION_STRING,
            ["Auth:Authority"] = "https://auth.test",
        }).Build();

        Action act = () => new ServiceCollection().ConfigureDi(configuration);

        act.Should().Throw<InvalidOperationException>().WithMessage("*Hub:BaseUrl*");
    }
}
