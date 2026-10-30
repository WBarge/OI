using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using OI.Data.Contexts;

namespace OI.Tool.MigrationHelper;

internal class ReportingDbContextFactory: IDesignTimeDbContextFactory<OiReportingDbContext>
{
    public OiReportingDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configurationRoot = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        DbContextOptionsBuilder<OiReportingDbContext> dbContextBuilder = new();

        string? conStr = configurationRoot["ConnectionString"];

        dbContextBuilder.UseSqlServer(conStr,
            b=>
            {
                b.MigrationsAssembly("OI.Data");
                b.MigrationsHistoryTable("__EFMigrationsHistory_Reporting");
            });

        return new OiReportingDbContext(dbContextBuilder.Options);

    }
}