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
        OiServiceDbContext serviceDbContext = provider.GetRequiredService<OiServiceDbContext>();
        serviceDbContext.Required(nameof(serviceDbContext));
        serviceDbContext.Database.Migrate();

    }
}