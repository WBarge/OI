using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using ProductManager.Data.EF;

namespace ProductManager.Tool.EF;

internal class DbContextFactory: IDesignTimeDbContextFactory<ProductDbContext>
{
    public ProductDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configurationRoot = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        DbContextOptionsBuilder<ProductDbContext> dbContextBuilder = new();

        string? conStr = configurationRoot["ConnectionString"];

        dbContextBuilder.UseSqlServer(conStr,
            b=>b.MigrationsAssembly("ProductManager.Data.EF")
        );

        return new ProductDbContext(dbContextBuilder.Options);
    }
}