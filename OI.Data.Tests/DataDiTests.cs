using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
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
    [Description("ConfigureDi should register each repository interface to its implementation as scoped")]
    public void ConfigureDi_RegistersRepositoryAsScoped(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();

        DataDi.ConfigureDi(services, CreateConfiguration());

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == implementationType && d.Lifetime == ServiceLifetime.Scoped);
    }

    [Test, Description("ConfigureDi should register the DbContext")]
    public void ConfigureDi_RegistersDbContext()
    {
        ServiceCollection services = new();

        DataDi.ConfigureDi(services, CreateConfiguration());

        services.Should().Contain(d => d.ServiceType == typeof(OiDbContext));
    }


    [TestCase(typeof(IStateRepo), typeof(StateRepo))]
    [TestCase(typeof(IOrderRepo), typeof(OrderRepo))]
    [TestCase(typeof(ICustomerRepo), typeof(CustomerRepo))]
    [Description("Each repository should be resolvable from a scope, with its DbContext")]
    public void ConfigureDi_RepositoriesCanBeResolved(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();
        DataDi.ConfigureDi(services, CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        using IServiceScope scope = provider.CreateScope();

        object resolved = scope.ServiceProvider.GetRequiredService(serviceType);

        resolved.Should().BeOfType(implementationType);
    }

    [Test, Description("The repositories resolved in one scope should share one DbContext, so a manager's repos see each other's changes")]
    public void ConfigureDi_RepositoriesInOneScopeShareTheDbContext()
    {
        ServiceCollection services = new();
        DataDi.ConfigureDi(services, CreateConfiguration());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        using IServiceScope scope = provider.CreateScope();

        OiDbContext first = scope.ServiceProvider.GetRequiredService<OiDbContext>();
        OiDbContext second = scope.ServiceProvider.GetRequiredService<OiDbContext>();

        first.Should().BeSameAs(second);
    }

    private static IConfiguration CreateConfiguration()
    {
        Mock<IConfiguration> configurationMock = new();
        configurationMock.Setup(c => c["ConnectionString"]).Returns(FAKE_CONNECTION_STRING);
        return configurationMock.Object;
    }
}
