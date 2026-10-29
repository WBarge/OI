using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using OI.Glue.Managers;

namespace OI.Business.Tests;

[TestFixture, Description("Tests for BusinessDi")]
public class BusinessDiTests
{
    [TestCase(typeof(IStateManager), typeof(Managers.StateManager))]
    [TestCase(typeof(IOrderManager), typeof(Managers.OrderManager))]
    [TestCase(typeof(ICustomerManager), typeof(Managers.CustomerManager))]
    [Description("ConfigureServiceDi should register each manager as a scoped service with its implementation")]
    public void ConfigureDi_RegistersManagerAsScoped(Type serviceType, Type implementationType)
    {
        ServiceCollection services = new();

        BusinessDi.ConfigureServiceDi(services);

        services.Should().ContainSingle(d => d.ServiceType == serviceType)
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == implementationType && d.Lifetime == ServiceLifetime.Scoped);
    }

    [Test, Description("ConfigureServiceDi should register the three managers and nothing else")]
    public void ConfigureDi_RegistersOnlyTheThreeManagers()
    {
        ServiceCollection services = new();

        BusinessDi.ConfigureServiceDi(services);

        List<Type> registered = services.Select(d => d.ServiceType).ToList();
        registered.Should().HaveCount(3);
        registered.Should().Contain(new[] { typeof(IStateManager), typeof(IOrderManager), typeof(ICustomerManager) });
    }
}
