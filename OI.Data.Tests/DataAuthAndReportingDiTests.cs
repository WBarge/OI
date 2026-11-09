using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using OI.Data.Contexts;
using OI.Data.Repos.Auth;
using OI.Data.Repos.Jobs;
using OI.Data.Repos.Orders;
using OI.Glue.Repos;

namespace OI.Data.Tests;

[TestFixture, Description("Tests for DataDi.ConfigureAuthDi and DataDi.ConfigureReportingDi")]
public class DataAuthAndReportingDiTests
{
    // Never connected to: building the container and resolving services does not open a connection.
    private const string FAKE_CONNECTION_STRING = "Server=(local);Database=OiDataDiTests;Trusted_Connection=True;TrustServerCertificate=True";

    private static IConfiguration CreateConfiguration()
    {
        Mock<IConfiguration> configurationMock = new();
        configurationMock.Setup(c => c["ConnectionString"]).Returns(FAKE_CONNECTION_STRING);
        return configurationMock.Object;
    }

    private static ServiceProvider ScopedProvider(ServiceCollection services) =>
        services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });

    // ---- ConfigureAuthDi

    [TestCase(typeof(IAuthRepo), typeof(AuthRepo))]
    [TestCase(typeof(IRefreshTokenRepo), typeof(RefreshTokenRepo))]
    [Description("ConfigureAuthDi should register each auth repository interface to its implementation as scoped")]
    public void ConfigureAuthDi_RegistersRepositoryAsScoped(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();

        DataDi.ConfigureAuthDi(services, CreateConfiguration());

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == implementationType && d.Lifetime == ServiceLifetime.Scoped);
    }

    [Test, Description("ConfigureAuthDi should register the auth context")]
    public void ConfigureAuthDi_RegistersTheAuthContext()
    {
        ServiceCollection services = new();

        DataDi.ConfigureAuthDi(services, CreateConfiguration());

        services.Should().Contain(d => d.ServiceType == typeof(OiAuthDbContext));
    }

    [Test, Description("ConfigureAuthDi should register only the auth context, so the order and reporting contexts never exist in that application")]
    public void ConfigureAuthDi_DoesNotRegisterTheOtherContexts()
    {
        ServiceCollection services = new();

        DataDi.ConfigureAuthDi(services, CreateConfiguration());

        services.Should().NotContain(d => d.ServiceType == typeof(OiServiceDbContext));
        services.Should().NotContain(d => d.ServiceType == typeof(OiReportingDbContext));
        services.Should().NotContain(d => d.ServiceType == typeof(IOrderRepo));
        services.Should().NotContain(d => d.ServiceType == typeof(ICompanyRepo));
    }

    [TestCase(typeof(IAuthRepo), typeof(AuthRepo))]
    [TestCase(typeof(IRefreshTokenRepo), typeof(RefreshTokenRepo))]
    [Description("Each auth repository should be resolvable from a scope, with its auth context")]
    public void ConfigureAuthDi_RepositoriesCanBeResolved(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();
        DataDi.ConfigureAuthDi(services, CreateConfiguration());
        using ServiceProvider provider = ScopedProvider(services);
        using IServiceScope scope = provider.CreateScope();

        object resolved = scope.ServiceProvider.GetRequiredService(serviceType);

        resolved.Should().BeOfType(implementationType);
    }

    [Test, Description("The auth repositories resolved in one scope should share one auth context")]
    public void ConfigureAuthDi_RepositoriesInOneScopeShareTheDbContext()
    {
        ServiceCollection services = new();
        DataDi.ConfigureAuthDi(services, CreateConfiguration());
        using ServiceProvider provider = ScopedProvider(services);
        using IServiceScope scope = provider.CreateScope();

        OiAuthDbContext first = scope.ServiceProvider.GetRequiredService<OiAuthDbContext>();
        OiAuthDbContext second = scope.ServiceProvider.GetRequiredService<OiAuthDbContext>();

        first.Should().BeSameAs(second);
    }

    // ---- ConfigureReportingDi

    [TestCase(typeof(ICompanyRepo), typeof(CompanyRepo))]
    [TestCase(typeof(IStateRepo), typeof(StateRepo))]
    [TestCase(typeof(IOrderRepo), typeof(OrderRepo))]
    [TestCase(typeof(ICustomerRepo), typeof(CustomerRepo))]
    [Description("ConfigureReportingDi should register each repository interface to its implementation as scoped")]
    public void ConfigureReportingDi_RegistersRepositoryAsScoped(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();

        DataDi.ConfigureReportingDi(services, CreateConfiguration());

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == implementationType && d.Lifetime == ServiceLifetime.Scoped);
    }

    [Test, Description("ConfigureReportingDi should register both the order context and the reporting context")]
    public void ConfigureReportingDi_RegistersBothContexts()
    {
        ServiceCollection services = new();

        DataDi.ConfigureReportingDi(services, CreateConfiguration());

        services.Should().Contain(d => d.ServiceType == typeof(OiServiceDbContext));
        services.Should().Contain(d => d.ServiceType == typeof(OiReportingDbContext));
    }

    [Test, Description("ConfigureReportingDi should not register the auth context or its repositories")]
    public void ConfigureReportingDi_DoesNotRegisterTheAuthContext()
    {
        ServiceCollection services = new();

        DataDi.ConfigureReportingDi(services, CreateConfiguration());

        services.Should().NotContain(d => d.ServiceType == typeof(OiAuthDbContext));
        services.Should().NotContain(d => d.ServiceType == typeof(IAuthRepo));
        services.Should().NotContain(d => d.ServiceType == typeof(IRefreshTokenRepo));
    }

    [Test, Description("The company repository should be resolvable from a scope, with the reporting context")]
    public void ConfigureReportingDi_CompanyRepoCanBeResolved()
    {
        ServiceCollection services = new();
        DataDi.ConfigureReportingDi(services, CreateConfiguration());
        using ServiceProvider provider = ScopedProvider(services);
        using IServiceScope scope = provider.CreateScope();

        ICompanyRepo resolved = scope.ServiceProvider.GetRequiredService<ICompanyRepo>();

        resolved.Should().BeOfType<CompanyRepo>();
    }

    // ---- the service application

    [Test, Description("ConfigureServiceDi should not register the reporting or auth contexts")]
    public void ConfigureServiceDi_DoesNotRegisterTheOtherContexts()
    {
        ServiceCollection services = new();

        DataDi.ConfigureServiceDi(services, CreateConfiguration());

        services.Should().NotContain(d => d.ServiceType == typeof(OiReportingDbContext));
        services.Should().NotContain(d => d.ServiceType == typeof(OiAuthDbContext));
        services.Should().NotContain(d => d.ServiceType == typeof(ICompanyRepo));
        services.Should().NotContain(d => d.ServiceType == typeof(IAuthRepo));
    }
}
