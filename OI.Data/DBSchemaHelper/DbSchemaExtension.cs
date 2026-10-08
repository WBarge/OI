using CrossCutting.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

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
        OiDbContext dbContext = provider.GetRequiredService<OiDbContext>();
        dbContext.Required(nameof(dbContext));
        dbContext.Database.Migrate();

    }
}