using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Repos;
using OI.Glue.Repos;

namespace OI.Data;

/// <summary>
/// Class DataDi is responsible for configuring dependency injection for the OI.Data project.
/// </summary>
public static class DataDi
{
    /// <summary>
    /// Configures dependency injection for the OI.Data project by registering services and dependencies with the provided IServiceCollection.
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureDi(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextPool<OiDbContext>(builder =>
        {
            builder.UseSqlServer(configuration["ConnectionString"]);
        });

        services.AddScoped<IStateRepo, StateRepo>();
        services.AddScoped<IOrderRepo, OrderRepo>();
    }
}