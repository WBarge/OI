using CrossCutting.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;

namespace OI.Data.DBSchemaHelper;

/// <summary>
/// Class DBSchemaExtension.
/// </summary>
public static class DbSchemaExtension
{
    /// <summary>
    /// Handles the database schema creation and migrations.
    /// </summary>
    /// <param name="services">The services.</param>
    public static void HandleDbSchema(this IServiceCollection services)
    {
        ServiceProvider provider = services.BuildServiceProvider();
        //**************************************************************************************
        //a context may not be present depending on which application is invoking this helper
        //**************************************************************************************
        OiServiceDbContext serviceDbContext = provider.GetRequiredService<OiServiceDbContext>();
        if (serviceDbContext != null)
        {
            serviceDbContext.Required(nameof(serviceDbContext));
            serviceDbContext.Database.Migrate();
        }

        OiReportingDbContext reportDbContext = provider.GetRequiredService<OiReportingDbContext>();
        if (reportDbContext != null)
        {
            reportDbContext.Required(nameof(reportDbContext));
            reportDbContext.Database.Migrate();
        }
    }
}