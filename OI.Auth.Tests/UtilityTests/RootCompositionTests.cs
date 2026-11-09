using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;
using OI.Auth.Utilities;
using OI.Glue.Managers;
using OI.Glue.Repos;
using OI.Glue.Security;
using OI.Glue.Services;

namespace OI.Auth.Tests.UtilityTests;

/// <summary>
/// Tests for the OI.Auth <see cref="RootComposition"/>. The managers, repositories and DbContext are internal to their
/// assemblies, so these tests assert on the public service types the controllers depend on.
/// </summary>
[TestFixture, Description("Tests for the OI.Auth RootComposition")]
public class RootCompositionTests
{
    // Never connected to: building the container and resolving services does not open a connection.
    private const string FAKE_CONNECTION_STRING = "Server=(local);Database=OiAuthRootCompositionTests;Trusted_Connection=True;TrustServerCertificate=True";

    private static IConfiguration CreateConfiguration(params (string Key, string Value)[] extra)
    {
        Dictionary<string, string?> settings = new()
        {
            ["ConnectionString"] = FAKE_CONNECTION_STRING,
            ["Jwt:Issuer"] = "https://auth.test",
            ["Jwt:AccessTokenMinutes"] = "30",
        };
        foreach ((string key, string value) in extra) settings[key] = value;
        return new ConfigurationBuilder().AddInMemoryCollection(settings).Build();
    }

    private static ServiceCollection Compose()
    {
        ServiceCollection services = new();
        services.ConfigureDi(CreateConfiguration());
        return services;
    }

    [TestCase(typeof(IAuthManager))]
    [TestCase(typeof(IAuthAdminManager))]
    [TestCase(typeof(IAuthRepo))]
    [TestCase(typeof(IRefreshTokenRepo))]
    [TestCase(typeof(IPasswordService))]
    [TestCase(typeof(IAccessTokenFactory))]
    [TestCase(typeof(IClientContext))]
    [TestCase(typeof(AccessTokenFactory))]
    [TestCase(typeof(SigningKeyProvider))]
    [TestCase(typeof(ServiceClientRegistry))]
    [TestCase(typeof(TimeProvider))]
    [Description("ConfigureDi should register everything the auth controllers and managers depend on")]
    public void ConfigureDi_RegistersTheServices(Type serviceType)
    {
        ServiceCollection services = Compose();

        services.Should().Contain(d => d.ServiceType == serviceType,
            $"{serviceType.Name} is needed at the first request and would fail there if it were missing");
    }

    [TestCase(typeof(IAuthManager))]
    [TestCase(typeof(IAuthAdminManager))]
    [TestCase(typeof(IAuthRepo))]
    [TestCase(typeof(IRefreshTokenRepo))]
    [Description("ConfigureDi should register the managers and repositories as scoped so they share the request's DbContext")]
    public void ConfigureDi_RegistersManagersAndReposAsScoped(Type serviceType)
    {
        ServiceCollection services = Compose();

        services.Single(d => d.ServiceType == serviceType).Lifetime.Should().Be(ServiceLifetime.Scoped);
    }

    [TestCase(typeof(IPasswordService))]
    [TestCase(typeof(IAccessTokenFactory))]
    [TestCase(typeof(AccessTokenFactory))]
    [TestCase(typeof(SigningKeyProvider))]
    [TestCase(typeof(ServiceClientRegistry))]
    [TestCase(typeof(TimeProvider))]
    [Description("ConfigureDi should register the key, token and password services as singletons, so there is one signing key")]
    public void ConfigureDi_RegistersTheSecurityServicesAsSingletons(Type serviceType)
    {
        ServiceCollection services = Compose();

        services.Single(d => d.ServiceType == serviceType).Lifetime.Should().Be(ServiceLifetime.Singleton);
    }

    [Test, Description("ConfigureDi should use the Identity password hasher")]
    public void ConfigureDi_UsesTheIdentityPasswordService()
    {
        ServiceCollection services = Compose();

        services.Single(d => d.ServiceType == typeof(IPasswordService)).ImplementationType.Should().Be(typeof(IdentityPasswordService));
    }

    [Test, Description("ConfigureDi should use the system clock")]
    public void ConfigureDi_UsesTheSystemClock()
    {
        ServiceCollection services = Compose();

        services.Single(d => d.ServiceType == typeof(TimeProvider)).ImplementationInstance.Should().BeSameAs(TimeProvider.System);
    }

    [Test, Description("ConfigureDi should bind the Jwt section of the configuration to JwtOptions")]
    public void ConfigureDi_BindsTheJwtOptions()
    {
        ServiceCollection services = Compose();
        using ServiceProvider provider = services.BuildServiceProvider();

        JwtOptions options = provider.GetRequiredService<IOptions<JwtOptions>>().Value;

        options.Issuer.Should().Be("https://auth.test");
        options.AccessTokenMinutes.Should().Be(30);
        options.Audience.Should().Be("oi", "settings that are not configured keep their defaults");
    }

    [Test, Description("IAccessTokenFactory should resolve to the same instance as AccessTokenFactory, so the controller and the managers sign with one factory")]
    public void ConfigureDi_ShareOneAccessTokenFactory()
    {
        ServiceCollection services = Compose();
        services.AddLogging();
        services.AddSingleton<IHostEnvironment>(new FakeHostEnvironment(Environments.Development));
        using ServiceProvider provider = services.BuildServiceProvider();

        IAccessTokenFactory asInterface = provider.GetRequiredService<IAccessTokenFactory>();
        AccessTokenFactory asClass = provider.GetRequiredService<AccessTokenFactory>();

        asInterface.Should().BeSameAs(asClass);
    }

    [Test, Description("ConfigureDi should register only the auth data context, never the order or reporting contexts")]
    public void ConfigureDi_DoesNotRegisterTheOrderServices()
    {
        ServiceCollection services = Compose();

        services.Should().NotContain(d => d.ServiceType == typeof(IOrderManager));
        services.Should().NotContain(d => d.ServiceType == typeof(ICustomerManager));
        services.Should().NotContain(d => d.ServiceType == typeof(IStateManager));
        services.Should().NotContain(d => d.ServiceType == typeof(IOrderRepo));
        services.Should().NotContain(d => d.ServiceType == typeof(ICompanyRepo));
    }
}
