using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Data.EF;

/// <summary>
/// Class DiHelper.
/// </summary>
public static class DataDi
{
    /// <summary>
    /// Configures the di.
    /// </summary>
    /// <param name="services">The services.</param>
    /// <param name="configuration">The configuration.</param>
    public static void ConfigureDi(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextPool<ProductDbContext>(builder =>
        {
            builder.UseSqlServer(configuration["ConnectionString"]);
        });
        services.AddTransient<IProductRepo, ProductRepo>();
        services.AddTransient<ICharacteristicRepo, CharacteristicRepo>();
        services.AddTransient<IOptionRepo, OptionRepo>();
        services.AddTransient<IProductOptionRepo, ProductOptionRepo>();
        services.AddTransient<IProductCharacteristicRepo, ProductCharacteristicRepo>();
        services.AddTransient<IProductSellRepo, ProductSellRepo>();
    }
}