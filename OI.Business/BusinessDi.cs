using Microsoft.Extensions.DependencyInjection;
using OI.Business.Managers;
using OI.Glue.Managers;

namespace OI.Business;

/// <summary>
/// Class BusinessDi is responsible for configuring dependency injection for the OI.Business project.
/// </summary>
public static class BusinessDi
{
    /// <summary>
    /// Configures dependency injection for the OI.Business project by registering services and dependencies with the provided IServiceCollection.
    /// </summary>
    /// <param name="services">The services.</param>
    public static void ConfigureDi(IServiceCollection services)
    {
        services.AddScoped<IStateManager, StateManager>();
        services.AddScoped<IOrderManager, OrderManager>();
    }
}