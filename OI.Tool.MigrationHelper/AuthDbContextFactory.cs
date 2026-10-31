using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using OI.Data.Contexts;

namespace OI.Tool.MigrationHelper;

internal class AuthDbContextFactory: IDesignTimeDbContextFactory<OiAuthDbContext>
{
    public OiAuthDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configurationRoot = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        DbContextOptionsBuilder<OiAuthDbContext> dbContextBuilder = new();

        string? conStr = configurationRoot["ConnectionString"];

        dbContextBuilder.UseSqlServer(conStr,
            b=>
            {
                b.MigrationsAssembly("OI.Data");
                b.MigrationsHistoryTable("__EFMigrationsHistory_Auth");
            });

        return new OiAuthDbContext(dbContextBuilder.Options);

    }
}
