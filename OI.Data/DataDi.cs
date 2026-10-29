using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;
using OI.Data.Repos;
using OI.Glue.Repos;

namespace OI.Data;

/// <summary>
/// Class DataDi is responsible for configuring dependency injection for the OI.Data project.
/// </summary>
public static class DataDi
{
    /// <summary>
    /// Configures dependency injection for the OI.Data project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Service API application
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureServiceDi(IServiceCollection services, IConfiguration configuration)
    {

        AddCommonDependencies(services,configuration);
    }

    /// <summary>
    /// Configures dependency injection for the OI.Data project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Reporting API application
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureReportingDi(IServiceCollection services, IConfiguration configuration)
    {
        //TODO configure the data dependencies needed in the reporting service
        AddCommonDependencies(services, configuration);
    }

    /// <summary>
    /// Configure dependencies that are common to all services
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    private static void AddCommonDependencies(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextPool<OiServiceDbContext>(builder =>
        {
            builder.UseSqlServer(configuration["ConnectionString"]);
        });
        services.AddScoped<IStateRepo, StateRepo>();
        services.AddScoped<IOrderRepo, OrderRepo>();
        services.AddScoped<ICustomerRepo, CustomerRepo>();
    }

}