using OI.Glue.Models;
using OI.Glue.Notifications;
using OI.Glue.Repos;
using OI.Glue.Security;

namespace OI.Reporting.Managers;

/// <summary>
/// Manages the results of reports, including retrieval and notification handling when there is no report result yet.
/// </summary>
/// <remarks>
/// This class is responsible for interacting with the job result repository to fetch report data,
/// publishing notifications when reports are unavailable, and ensuring secure access to report-related operations.
/// </remarks>
public class ReportResultManager(ILogger<ReportResultManager> logger,IJobResultRepo jobResultRepo,IClientContext clientContext,INotificationPublisher notificationPublisher) : IReportResultManager
{
    private readonly ILogger<ReportResultManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly IJobResultRepo _jobResultRepo = jobResultRepo ?? throw new ArgumentNullException(nameof(jobResultRepo));
    private readonly IClientContext _clientContext = clientContext ?? throw new ArgumentNullException(nameof(clientContext));
    private readonly INotificationPublisher _notificationPublisher = notificationPublisher ?? throw new ArgumentNullException(nameof(notificationPublisher));

    /// <summary>
    /// Retrieves the report data associated with the specified report ID.
    /// </summary>
    /// <param name="reportId">
    /// The unique identifier of the report to retrieve.
    /// </param>
    /// <param name="token">
    /// A <see cref="CancellationToken"/> to observe while waiting for the task to complete. Optional.
    /// </param>
    /// <returns>
    /// A task that represents the asynchronous operation. The task result contains the report data as a byte array,
    /// or <c>null</c> if the report data is missing.
    /// </returns>
    /// <exception cref="ArgumentNullException">
    /// Thrown if the <paramref name="reportId"/> is invalid or not provided.
    /// </exception>
    /// <remarks>
    /// If the report data is missing, a notification will be sent to the user indicating that the report is unavailable.
    /// </remarks>
    public async Task<byte[]?> GetReportAsync(Guid reportId, CancellationToken token = default)
    {
        JobResult result = await _jobResultRepo.GetResultFileAsync(reportId, token);
        if (result.Data == null || result.Data.Length == 0)
        {
            await NotifyUserOfReportMissing(result.Name ?? "Report",reportId, token);
            return null;
        }
        return result.Data;
    }
    
    /// <summary>
    /// Notifies the user that the requested report is missing or unavailable.
    /// </summary>
    /// <param name="reportName">The name of the report that is unavailable.</param>
    /// <param name="reportId">The unique identifier of the report.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    /// <remarks>
    /// This method logs a warning message and sends a notification to the user to inform them
    /// that the requested report is currently unavailable.
    /// </remarks>
    private async Task NotifyUserOfReportMissing(string reportName,Guid reportId,CancellationToken token)
    {
        string message = $"The {reportName} is currently unavailable. Please try again later.";
        _logger.LogWarning("{_clientContext.DisplayName} requested {reportName} which is currently unavailable. JobId(ReportId) is {reportId}", _clientContext.DisplayName, reportName, reportId);
        await _notificationPublisher.PublishAsync(NotificationTarget.User(_clientContext.UserId), "Warning", $"{reportName} is currently unavailable", message, token);
    }

}