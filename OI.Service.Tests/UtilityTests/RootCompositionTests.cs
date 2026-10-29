using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OI.Glue.Managers;
using OI.Glue.Repos;
using OI.Service.Utilities;

namespace OI.Service.Tests.UtilityTests;

/// <summary>
/// Tests for <see cref="RootComposition"/>. The managers, repositories and DbContext are internal to their
/// assemblies, so these tests assert on the public service types the controllers depend on.
/// </summary>
[TestFixture, Description("Tests for RootComposition")]
public class RootCompositionTests
{
    // Never connected to: building the container and resolving services does not open a connection.
    private const string FAKE_CONNECTION_STRING = "Server=(local);Database=OiRootCompositionTests;Trusted_Connection=True;TrustServerCertificate=True";

    [TestCase(typeof(IStateManager))]
    [TestCase(typeof(IOrderManager))]
    [TestCase(typeof(ICustomerManager))]
    [Description("ConfigureServiceDi should register every manager the controllers depend on")]
    public void ConfigureDi_RegistersManagers(Type serviceType)
    {
        ServiceCollection services = new();

        services.ConfigureDi(CreateConfiguration());

        services.Should().Contain(d => d.ServiceType == serviceType,
            $"{serviceType.Name} is injected into a controller and would fail at the first request if it were missing");
    }

    [TestCase(typeof(IStateRepo))]
    [TestCase(typeof(IOrderRepo))]
    [TestCase(typeof(ICustomerRepo))]
    [Description("ConfigureServiceDi should register every repository the managers depend on")]
    public void ConfigureDi_RegistersRepositories(Type serviceType)
    {
        ServiceCollection services = new();

        services.ConfigureDi(CreateConfiguration());

        services.Should().Contain(d => d.ServiceType == serviceType);
    }

    [TestCase(typeof(IStateManager))]
    [TestCase(typeof(IOrderManager))]
    [TestCase(typeof(ICustomerManager))]
    [TestCase(typeof(IStateRepo))]
    [TestCase(typeof(IOrderRepo))]
    [TestCase(typeof(ICustomerRepo))]
    [Description("ConfigureServiceDi should register managers and repositories as scoped so they share the request's DbContext")]
    public void ConfigureDi_RegistersServicesAsScoped(Type serviceType)
    {
        ServiceCollection services = new();

        services.ConfigureDi(CreateConfiguration());

        ServiceDescriptor descriptor = services.Single(d => d.ServiceType == serviceType);
        descriptor.Lifetime.Should().Be(ServiceLifetime.Scoped,
            "a singleton would capture a scoped DbContext, and a transient would not share one per request");
    }

    [Test, Description("ConfigureServiceDi should register each service type only once")]
    public void ConfigureDi_RegistersEachServiceTypeOnce()
    {
        ServiceCollection services = new();
        Type[] serviceTypes =
        [
            typeof(IStateManager), typeof(IOrderManager), typeof(ICustomerManager),
            typeof(IStateRepo), typeof(IOrderRepo), typeof(ICustomerRepo)
        ];

        services.ConfigureDi(CreateConfiguration());

        foreach (Type serviceType in serviceTypes)
        {
            services.Count(d => d.ServiceType == serviceType).Should().Be(1, serviceType.Name);
        }
    }

    [TestCase(typeof(IStateManager))]
    [TestCase(typeof(IOrderManager))]
    [TestCase(typeof(ICustomerManager))]
    [Description("The container built from ConfigureServiceDi should be able to create each manager with all of its dependencies")]
    public void ConfigureDi_ManagersCanBeResolvedFromAScope(Type serviceType)
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.ConfigureDi(CreateConfiguration());

        // ValidateScopes proves no scoped service is being captured by a longer-lived one.
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        using IServiceScope scope = provider.CreateScope();

        object? resolved = scope.ServiceProvider.GetService(serviceType);

        resolved.Should().NotBeNull();
        resolved.Should().BeAssignableTo(serviceType);
    }

    [Test, Description("A manager resolved twice in the same scope should be the same instance")]
    public void ConfigureDi_ManagerIsSharedWithinAScope()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.ConfigureDi(CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        using IServiceScope scope = provider.CreateScope();

        IOrderManager first = scope.ServiceProvider.GetRequiredService<IOrderManager>();
        IOrderManager second = scope.ServiceProvider.GetRequiredService<IOrderManager>();

        second.Should().BeSameAs(first);
    }

    [Test, Description("A manager resolved in two different scopes should be two different instances")]
    public void ConfigureDi_ManagerIsNotSharedAcrossScopes()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.ConfigureDi(CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });

        IOrderManager first;
        using (IServiceScope scope = provider.CreateScope())
        {
            first = scope.ServiceProvider.GetRequiredService<IOrderManager>();
        }

        using IServiceScope otherScope = provider.CreateScope();
        IOrderManager second = otherScope.ServiceProvider.GetRequiredService<IOrderManager>();

        second.Should().NotBeSameAs(first);
    }

    [Test, Description("Scoped services should not be resolvable from the root provider, which protects against captured DbContexts")]
    public void ConfigureDi_ManagersCannotBeResolvedFromTheRootProvider()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.ConfigureDi(CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });

        Action act = () => provider.GetRequiredService<IOrderManager>();

        act.Should().Throw<InvalidOperationException>();
    }

    private static IConfiguration CreateConfiguration()
    {
        return new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["ConnectionString"] = FAKE_CONNECTION_STRING })
            .Build();
    }
}
