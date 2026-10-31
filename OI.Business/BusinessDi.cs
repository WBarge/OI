using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using OI.Business.Managers;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Business;

/// <summary>
/// Class BusinessDi is responsible for configuring dependency injection for the OI.Business project.
/// </summary>
public static class BusinessDi
{
    /// <summary>
    /// Configures dependency injection for the OI.Business project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Service API application
    /// </summary>
    /// <param name="services">The services.</param>
    public static void ConfigureServiceDi(IServiceCollection services)
    {
        AddCommonDependencies(services);
    }

    /// <summary>
    /// Configures dependency injection for the OI.Business project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Reporting API application
    /// </summary>
    /// <param name="services">The services.</param>
    public static void ConfigureReportingDi(IServiceCollection services)
    {
        AddCommonDependencies(services);
    }

    /// <summary>
    /// Configures dependency injection for the OI.Business project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Auth API application.
    /// Deliberately does not register the order managers.
    /// The application must also provide IPasswordService, IAccessTokenFactory and TimeProvider.
    /// Register your own AuthPolicy first to change the lockout or password rules.
    /// </summary>
    /// <param name="services">The services.</param>
    public static void ConfigureAuthDi(IServiceCollection services)
    {
        services.TryAddSingleton(new AuthPolicy());
        services.AddScoped<IAuthManager, AuthManager>();
    }

    /// <summary>
    /// Configure dependencies that are common to all services
    /// </summary>
    /// <param name="services"></param>
    private static void AddCommonDependencies(IServiceCollection services)
    {
        services.AddScoped<IStateManager, StateManager>();
        services.AddScoped<IOrderManager, OrderManager>();
        services.AddScoped<ICustomerManager, CustomerManager>();
    }

}
