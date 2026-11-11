using OI.Business;
using OI.Data;
using OI.Integration.Security;

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
        DataDi.ConfigureServiceDi(services, configuration);
        BusinessDi.ConfigureServiceDi(services);
        
        // Lets controllers and managers ask who is calling: inject IClientContext (OI.Glue.Security).
        // The middleware that fills it in is added in Program.cs with app.UseClientContext().
        services.AddClientContext();
    }   

}