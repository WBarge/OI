using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using OI.Data.Contexts;
using OI.Data.Repos;
using OI.Glue.Repos;

namespace OI.Data.Tests;

[TestFixture, Description("Tests for DataDi")]
public class DataDiTests
{
    // Never connected to: building the container and resolving services does not open a connection.
    private const string FAKE_CONNECTION_STRING = "Server=(local);Database=OiDataDiTests;Trusted_Connection=True;TrustServerCertificate=True";

    [TestCase(typeof(IStateRepo), typeof(StateRepo))]
    [TestCase(typeof(IOrderRepo), typeof(OrderRepo))]
    [TestCase(typeof(ICustomerRepo), typeof(CustomerRepo))]
    [Description("ConfigureServiceDi should register each repository interface to its implementation as scoped")]
    public void ConfigureDi_RegistersRepositoryAsScoped(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();

        DataDi.ConfigureServiceDi(services, CreateConfiguration());

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == implementationType && d.Lifetime == ServiceLifetime.Scoped);
    }

    [Test, Description("ConfigureServiceDi should register the ServiceDbContext")]
    public void ConfigureDi_RegistersDbContext()
    {
        ServiceCollection services = new();

        DataDi.ConfigureServiceDi(services, CreateConfiguration());

        services.Should().Contain(d => d.ServiceType == typeof(OiServiceDbContext));
    }


    [TestCase(typeof(IStateRepo), typeof(StateRepo))]
    [TestCase(typeof(IOrderRepo), typeof(OrderRepo))]
    [TestCase(typeof(ICustomerRepo), typeof(CustomerRepo))]
    [Description("Each repository should be resolvable from a scope, with its ServiceDbContext")]
    public void ConfigureDi_RepositoriesCanBeResolved(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();
        DataDi.ConfigureServiceDi(services, CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        using IServiceScope scope = provider.CreateScope();

        object resolved = scope.ServiceProvider.GetRequiredService(serviceType);

        resolved.Should().BeOfType(implementationType);
    }

    [Test, Description("The repositories resolved in one scope should share one ServiceDbContext, so a manager's repos see each other's changes")]
    public void ConfigureDi_RepositoriesInOneScopeShareTheDbContext()
    {
        ServiceCollection services = new();
        DataDi.ConfigureServiceDi(services, CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        using IServiceScope scope = provider.CreateScope();

        OiServiceDbContext first = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        OiServiceDbContext second = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();

        first.Should().BeSameAs(second);
    }

    private static IConfiguration CreateConfiguration()
    {
        Mock<IConfiguration> configurationMock = new();
        configurationMock.Setup(c => c["ConnectionString"]).Returns(FAKE_CONNECTION_STRING);
        return configurationMock.Object;
    }
}
