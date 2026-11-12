using OI.Common.Extensions.Comparison;
using OI.Glue.Notifications;
using OI.Glue.Repos;
using OI.Reporting.Reports;
using OI.Reporting.Reports.EstimateReport;

namespace OI.Reporting.Managers;

/// <summary>
/// Responsible for getting the generation of a report and storing the results
/// In other words this is orchestrating the report generation
/// All reports should require:
///     The userId of the user who is generating the report so we can notify them when the report is done
///     The userName and store in the results as the user who created the report
///     A guid to be used as the reportId so the results can be retrieved later with-out any searching
/// 
/// </summary>
public class ReportManager(ILogger<ReportManager> logger, IReportFactory reportFactory, IJobResultRepo jobResultRepo,INotificationPublisher notificationPublisher)
    : IReportManager
{
    readonly ILogger<ReportManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    readonly IReportFactory _reportFactory = reportFactory ?? throw new ArgumentNullException(nameof(reportFactory));
    readonly IJobResultRepo _jobResultRepo = jobResultRepo ?? throw new ArgumentNullException(nameof(jobResultRepo));
    readonly INotificationPublisher _notificationPublisher = notificationPublisher ?? throw new ArgumentNullException(nameof(notificationPublisher));

    public const string SUCCESS_MESSAGE_TYPE = "Success";
    public const string ERROR_MESSAGE_TYPE = "Error";
    public const string MESSAGE_TITLE = "Generated";

    /// <summary>
    /// Asynchronously creates an estimate report for a given order.
    /// </summary>
    /// <param name="reportId">
    ///     A unique identifier for the report. This ID is used to retrieve the report later.
    /// </param>
    /// <param name="orderId">
    ///     The unique identifier of the order for which the estimate report is being generated.
    /// </param>
    /// <param name="userName">
    ///     The name of the user initiating the report creation. This will be stored as the creator of the report.
    /// </param>
    /// <param name="userId"></param>
    /// <param name="token">
    ///     A cancellation token that can be used to cancel the operation. Defaults to <see cref="CancellationToken.None"/>.
    /// </param>
    /// <returns>
    /// A <see cref="Task"/> representing the asynchronous operation.
    /// </returns>
    /// <exception cref="NotImplementedException">
    /// Thrown when the method is not implemented.
    /// </exception>
    public async Task CreateEstimateAsync(Guid reportId, Guid orderId, string userName, string userId,
        CancellationToken token = default)
    {
        userName.Required(nameof(userName));

        _logger.LogInformation(
            "Starting estimate report generation for OrderId: {OrderId}, ReportId: {ReportId}, User: {UserName}", orderId,
            reportId, userName);
        string reportName = string.Empty;
        try
        {
            await _jobResultRepo.CreateJobResultPlaceholderAsync(reportId, $"Estimate for Order {orderId}", userName, token);
            
            BaseReport report = _reportFactory.GetReport<EstimateReport>(reportId, ("OrderId", orderId));
            reportName = report.ReportName;
            byte[] reportResult = await report.GenerateReportAsync(token);

            await _jobResultRepo.SaveJobResultAsync(reportId, report.ReportName, reportResult, token);

            _logger.LogInformation("Successfully generated and saved estimate report for ReportId: {ReportId}", reportId);
            await NotifyUserOfReportGeneration(userName, userId, reportName, token);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to generate estimate report for ReportId: {ReportId}", reportId);
            await NotifyUserOfReportingError(userName, userId, reportName, token);
            throw;
        }
    }

    /// <summary>
    /// Notifies a user about an error that occurred during the generation of a report.
    /// </summary>
    /// <param name="userName">The name of the user who initiated the report generation.</param>
    /// <param name="userId">The unique identifier of the user who initiated the report generation.</param>
    /// <param name="reportName">The name of the report that failed to generate.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    private async Task NotifyUserOfReportingError(string userName, string userId, string reportName,CancellationToken token)
    {
        string title = $"{reportName} {ERROR_MESSAGE_TYPE}";
        string message = $"{reportName} failed to generate by User: {userName}. Contact support or your administrator for assistance.";

        await _notificationPublisher.PublishAsync(NotificationTarget.User(userId), ERROR_MESSAGE_TYPE, title, message, token);
    }

    /// <summary>
    /// Notifies a user about the successful generation of a report.
    /// </summary>
    /// <param name="userName">The name of the user who generated the report.</param>
    /// <param name="userId">The unique identifier of the user to be notified.</param>
    /// <param name="reportName">The name of the generated report.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    private async Task NotifyUserOfReportGeneration(string userName, string userId, string reportName,CancellationToken token)
    {
        string title = $"{reportName} {MESSAGE_TITLE}";
        string message = $"{reportName} was generated successfully by User: {userName}";
            
        bool accepted = await _notificationPublisher.PublishAsync(NotificationTarget.User(userId), SUCCESS_MESSAGE_TYPE, title, message, token);

        if (!accepted)
        {
            _logger.LogWarning("The hub did not accept the test notification for user {UserId}", userId);
        }
    }
}