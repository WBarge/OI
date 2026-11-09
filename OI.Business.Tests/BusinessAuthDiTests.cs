using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Business.Tests;

[TestFixture, Description("Tests for BusinessDi.ConfigureAuthDi, the registration used by the OI.Auth application")]
public class BusinessAuthDiTests
{
    [TestCase(typeof(IAuthManager), typeof(Managers.AuthManager))]
    [TestCase(typeof(IAuthAdminManager), typeof(Managers.AuthAdminManager))]
    [Description("ConfigureAuthDi should register each auth manager as a scoped service with its implementation")]
    public void ConfigureAuthDi_RegistersManagerAsScoped(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();

        BusinessDi.ConfigureAuthDi(services);

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == implementationType && d.Lifetime == ServiceLifetime.Scoped);
    }

    [Test, Description("ConfigureAuthDi should register the default AuthPolicy")]
    public void ConfigureAuthDi_RegistersTheDefaultPolicy()
    {
        ServiceCollection services = new();

        BusinessDi.ConfigureAuthDi(services);

        using ServiceProvider provider = services.BuildServiceProvider();
        AuthPolicy policy = provider.GetRequiredService<AuthPolicy>();
        policy.MaxFailedAttempts.Should().Be(5);
        policy.MinPasswordLength.Should().Be(12);
        policy.LockoutFor.Should().Be(TimeSpan.FromMinutes(15));
    }

    [Test, Description("ConfigureAuthDi should keep a policy the application registered first")]
    public void ConfigureAuthDi_KeepsACustomPolicy()
    {
        ServiceCollection services = new();
        AuthPolicy custom = new(MaxFailedAttempts: 2, LockoutDuration: TimeSpan.FromHours(1), MinPasswordLength: 20);
        services.AddSingleton(custom);

        BusinessDi.ConfigureAuthDi(services);

        using ServiceProvider provider = services.BuildServiceProvider();
        provider.GetRequiredService<AuthPolicy>().Should().BeSameAs(custom);
        services.Count(d => d.ServiceType == typeof(AuthPolicy)).Should().Be(1, "TryAdd must not add a second policy");
    }

    [Test, Description("ConfigureAuthDi should not register the order, customer or state managers")]
    public void ConfigureAuthDi_DoesNotRegisterTheOrderManagers()
    {
        ServiceCollection services = new();

        BusinessDi.ConfigureAuthDi(services);

        services.Select(d => d.ServiceType).Should().NotContain(new[] { typeof(IStateManager), typeof(IOrderManager), typeof(ICustomerManager) },
            "the auth application has no order database");
    }

    [TestCase(typeof(IStateManager))]
    [TestCase(typeof(IOrderManager))]
    [TestCase(typeof(ICustomerManager))]
    [Description("ConfigureReportingDi should register the same order managers as the service application")]
    public void ConfigureReportingDi_RegistersTheOrderManagers(Type serviceType)
    {
        ServiceCollection services = new();

        BusinessDi.ConfigureReportingDi(services);

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Lifetime.Should().Be(ServiceLifetime.Scoped);
    }
}
