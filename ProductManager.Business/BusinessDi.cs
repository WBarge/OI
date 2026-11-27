using Microsoft.Extensions.DependencyInjection;
using ProductManager.Glue.Interfaces.Services;

namespace ProductManager.Business;

/// <summary>
/// Class BusinessDi.
/// </summary>
public static class BusinessDi
{
    /// <summary>
    /// Configures the di.
    /// </summary>
    /// <param name="services">The services.</param>
    public static void ConfigureDi(IServiceCollection services)
    {
        services.AddTransient<IProductService, ProductService>();
        services.AddTransient<ICharacteristicService, CharacteristicService>();
        services.AddTransient<IOptionService, OptionService>();
    }
}