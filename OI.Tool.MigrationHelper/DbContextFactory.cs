using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using OI.Data;

namespace OI.Tool.MigrationHelper;

internal class DbContextFactory: IDesignTimeDbContextFactory<OiDbContext>
{
    public OiDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configurationRoot = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        DbContextOptionsBuilder<OiDbContext> dbContextBuilder = new();

        string? conStr = configurationRoot["ConnectionString"];

        dbContextBuilder.UseSqlServer(conStr,
            b=>b.MigrationsAssembly("OI.Data")
        );

        return new OiDbContext(dbContextBuilder.Options);

    }
}