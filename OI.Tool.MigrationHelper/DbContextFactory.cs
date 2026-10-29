using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using OI.Data.Contexts;

namespace OI.Tool.MigrationHelper;

internal class DbContextFactory: IDesignTimeDbContextFactory<OiServiceDbContext>
{
    public OiServiceDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configurationRoot = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        DbContextOptionsBuilder<OiServiceDbContext> dbContextBuilder = new();

        string? conStr = configurationRoot["ConnectionString"];

        dbContextBuilder.UseSqlServer(conStr,
            b=>b.MigrationsAssembly("OI.Data")
        );

        return new OiServiceDbContext(dbContextBuilder.Options);

    }
}