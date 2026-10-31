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
    /// Only the contexts the calling application registered are migrated.
    /// </summary>
    /// <param name="services">The services.</param>
    public static void HandleDbSchema(this IServiceCollection services)
    {
        using ServiceProvider provider = services.BuildServiceProvider();
        using IServiceScope scope = provider.CreateScope();

        //**************************************************************************************
        //a context may not be present depending on which application is invoking this helper.
        //GetService (not GetRequiredService) returns null for a context that was not registered;
        //GetRequiredService would throw, e.g. in OI.Service, which has no reporting context.
        //**************************************************************************************
        MigrateIfRegistered<OiServiceDbContext>(scope.ServiceProvider);
        MigrateIfRegistered<OiReportingDbContext>(scope.ServiceProvider);
        MigrateIfRegistered<OiAuthDbContext>(scope.ServiceProvider);
    }

    private static void MigrateIfRegistered<TContext>(IServiceProvider provider) where TContext : DbContext
    {
        provider.GetService<TContext>()?.Database.Migrate();
    }
}
