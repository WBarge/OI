using OI.Auth.Security;
using OI.Business;
using OI.Data;
using OI.Glue.Services;

namespace OI.Auth.Utilities;

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
        DataDi.ConfigureAuthDi(services, configuration);
        BusinessDi.ConfigureAuthDi(services);

        services.AddSingleton(TimeProvider.System);
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SECTION));
        services.AddSingleton<SigningKeyProvider>();
        services.AddSingleton<AccessTokenFactory>();
        services.AddSingleton<IAccessTokenFactory>(sp => sp.GetRequiredService<AccessTokenFactory>());
        services.AddSingleton<IPasswordService, IdentityPasswordService>();
        services.AddSingleton<ServiceClientRegistry>();
    }

}
