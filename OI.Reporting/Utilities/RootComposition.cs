using OI.Business;
using OI.Data;
using OI.Integration;

namespace OI.Reporting.Utilities;

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
        DataDi.ConfigureReportingDi(services, configuration);
        BusinessDi.ConfigureReportingDi(services);

        // Lets reporting code tell the browser a report is ready: inject INotificationPublisher (OI.Glue.Notifications)
        // and call PublishAsync(NotificationTarget.User(job.CreatedBy), "report-ready", "Your report is ready").
        services.AddNotificationPublisher(configuration);
    }   

}
