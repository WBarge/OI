namespace OI.Glue.Notifications;

/// <summary>
/// Machine-readable event names a notification can carry besides its message. The browser matches on these
/// strings, so they must stay in step with report-status-service.ts in the UI.
/// </summary>
public static class NotificationEvents
{
    /// <summary>A report finished and can be downloaded. The correlation id is the report id.</summary>
    public const string ReportReady = "report.ready";

    /// <summary>A report could not be generated. The correlation id is the report id.</summary>
    public const string ReportFailed = "report.failed";
}
