using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using OI.Glue.Notifications;
using OI.Integration.Notifications;

namespace OI.Integration;

public static class IntegrationDi
{
    public const string AuthClient = "oi-auth";
    public const string HubClient = "oi-hub";

    /// <summary>
    /// Registers INotificationPublisher. Needs these settings:
    ///   Auth:Authority            e.g. https://localhost:7300
    ///   Hub:BaseUrl               e.g. https://localhost:7400
    ///   Integration:ClientId      this application's id, as listed in OI.Auth's ServiceClients
    ///   Integration:ClientSecret  keep in user-secrets / environment, never in git
    /// </summary>
    public static IServiceCollection AddNotificationPublisher(this IServiceCollection services, IConfiguration configuration)
    {
        string authority = configuration["Auth:Authority"] ?? throw new InvalidOperationException("Auth:Authority is not configured.");
        string hub = configuration["Hub:BaseUrl"] ?? throw new InvalidOperationException("Hub:BaseUrl is not configured.");

        services.Configure<IntegrationOptions>(configuration.GetSection("Integration"));
        services.AddHttpClient(AuthClient, c => c.BaseAddress = new Uri(authority.TrimEnd('/') + "/"));
        services.AddHttpClient(HubClient, c => c.BaseAddress = new Uri(hub.TrimEnd('/') + "/"));

        services.TryAddSingleton(TimeProvider.System);
        services.AddSingleton<ServiceTokenProvider>();
        services.AddSingleton<INotificationPublisher, HubNotificationPublisher>();
        return services;
    }
}
