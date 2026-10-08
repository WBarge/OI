using Microsoft.EntityFrameworkCore;
using OI.Business;
using OI.Data;

namespace OI.Service.Utilities;

/// <summary>
/// The RootComposition class serves as the root composition point for the application's services, where various dependencies are registered and configured.
/// </summary>
public static class RootComposition
{

    /// <summary>
    /// Configures the dependency injection (DI) for the application by registering services, configuring the database context, and setting up other necessary dependencies.
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureDi(this IServiceCollection services, IConfiguration configuration)
    {
        DataDi.ConfigureDi(services, configuration);
        BusinessDi.ConfigureDi(services);
    }   

}