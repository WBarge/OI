using OI.Common.Extensions.Comparison;
using OI.Glue.Notifications;
using OI.Glue.Repos;
using OI.Reporting.Reports;
using OI.Reporting.Reports.CustomerReports;
using OI.Reporting.Reports.EstimateReport;
using OI.Reporting.Reports.InvoiceReport;
using OI.Reporting.Reports.OrderReport;

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
    private readonly ILogger<ReportManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly IReportFactory _reportFactory = reportFactory ?? throw new ArgumentNullException(nameof(reportFactory));
    private readonly IJobResultRepo _jobResultRepo = jobResultRepo ?? throw new ArgumentNullException(nameof(jobResultRepo));
    private readonly INotificationPublisher _notificationPublisher = notificationPublisher ?? throw new ArgumentNullException(nameof(notificationPublisher));

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
    public async Task CreateEstimateAsync(Guid reportId, Guid orderId, string userName, string userId, CancellationToken token = default)
    {
        userName.Required(nameof(userName));

        _logger.LogInformation("Starting estimate report generation for OrderId: {OrderId}, ReportId: {ReportId}, User: {UserName}", orderId, reportId, userName);

        await CreateAndSaveReport<EstimateReport>(reportId, $"Estimate for Order {orderId}", userName, userId, token, ("OrderId", orderId));

       _logger.LogInformation("Successfully generated and saved estimate report for ReportId: {ReportId}", reportId);
    }

    /// <summary>
    /// Asynchronously creates an order report for a given order.
    /// </summary>
    /// <param name="reportId">
    ///     A unique identifier for the report. This ID is used to retrieve the report later.
    /// </param>
    /// <param name="orderId">
    ///     The unique identifier of the order for which the order report is being generated.
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
    /// </exception>
    public async Task CreateOrderAsync(Guid reportId, Guid orderId, string userName, string userId, CancellationToken token = default)
    {
        userName.Required(nameof(userName));

        _logger.LogInformation("Starting order report generation for OrderId: {OrderId}, ReportId: {ReportId}, User: {UserName}", orderId, reportId, userName);

        await CreateAndSaveReport<OrderReport>(reportId, $"The Order document for {orderId}", userName, userId, token, ("OrderId", orderId));

        _logger.LogInformation("Successfully generated and saved order report for ReportId: {ReportId}", reportId);
    }

    /// <summary>
    /// Asynchronously creates an invoice report for a given order.
    /// </summary>
    /// <param name="reportId">
    ///     A unique identifier for the report. This ID is used to retrieve the report later.
    /// </param>
    /// <param name="orderId">
    ///     The unique identifier of the order for which the order report is being generated.
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
    /// </exception>
    public async Task CreateInvoiceAsync(Guid reportId, Guid orderId, string userName, string userId, CancellationToken token = default)
    {
        userName.Required(nameof(userName));

        _logger.LogInformation(
            "Starting Invoice report generation for OrderId: {OrderId}, ReportId: {ReportId}, User: {UserName}", orderId, reportId, userName);

        await CreateAndSaveReport<InvoiceReport>(reportId, $"Estimate for Order {orderId}", userName, userId, token, ("OrderId", orderId));

        _logger.LogInformation("Successfully generated and saved invoice report for ReportId: {ReportId}", reportId);
    }

    /// <summary>
    /// Creates and saves a Customer List report.
    /// </summary>
    /// <param name="reportId">The identifier of the report to create.</param>
    /// <param name="userName">The name of the user requesting the report.</param>
    /// <param name="userId">The identifier of the user requesting the report.</param>
    /// <param name="token">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task CreateCustomerList(Guid reportId, string userName, string userId, CancellationToken token = default)
    {
        userName.Required(nameof(userName));

        _logger.LogInformation(
            "Starting Customer List report generation , ReportId: {ReportId}, User: {UserName}", reportId, userName);

        await CreateAndSaveReport<CustomerList>(reportId, $"Customer List", userName, userId, token, []);

        _logger.LogInformation("Successfully generated and saved Customer List report for ReportId: {ReportId}", reportId);

    }

    /// <summary>
    ///  Creates and saves the report in the DB
    /// </summary>
    /// <typeparam name="TReportType"></typeparam>
    /// <param name="reportId">an id to uniquely id the report</param>
    /// <param name="reportingName">the name of the report that will show as a job result name</param>
    /// <param name="userName"></param>
    /// <param name="userId"></param>
    /// <param name="token"></param>
    /// <param name="properties">the properties needed to generate the report done via property injection</param>
    /// <returns></returns>
    private async Task CreateAndSaveReport<TReportType>(Guid reportId,string reportingName,string userName, string userId,CancellationToken token,params (string Name, object? Value)[] properties) where TReportType : BaseReport
    {
        string reportName = string.Empty;
        try
        {
            //This is an async process so we want to create a job record in case the user tries to get the report before its finished
            await _jobResultRepo.CreateJobResultPlaceholderAsync(reportId, reportingName,userName, token);
            
            BaseReport report = _reportFactory.GetReport<TReportType>(reportId,properties );
            reportName = report.ReportName;
            byte[] reportResult = await report.GenerateReportAsync(token);

            await _jobResultRepo.SaveJobResultAsync(reportId, report.ReportName, reportResult, token);

            await NotifyUserOfReportGeneration(userName, userId, reportName, reportId, token);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to generate order report for ReportId: {ReportId}", reportId);
            await NotifyUserOfReportingError(userName, userId, reportName, reportId, token);
            throw;
        }
    }
    
    /// <summary>
    /// Notifies a user about an error that occurred during the generation of a report.
    /// </summary>
    /// <param name="userName">The name of the user who initiated the report generation.</param>
    /// <param name="userId">The unique identifier of the user who initiated the report generation.</param>
    /// <param name="reportName">The name of the report that failed to generate.</param>
    /// <param name="reportId">The id of the report, so the browser knows which report failed.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    private async Task NotifyUserOfReportingError(string userName, string userId, string reportName, Guid reportId, CancellationToken token)
    {
        string title = $"{reportName} {ERROR_MESSAGE_TYPE}";
        string message = $"{reportName} failed to generate by User: {userName}. Contact support or your administrator for assistance.";

        await _notificationPublisher.PublishEventAsync(NotificationTarget.User(userId), ERROR_MESSAGE_TYPE, title, message,
            NotificationEvents.ReportFailed, reportId.ToString(), token);
    }

    /// <summary>
    /// Notifies a user about the successful generation of a report.
    /// </summary>
    /// <param name="userName">The name of the user who generated the report.</param>
    /// <param name="userId">The unique identifier of the user to be notified.</param>
    /// <param name="reportName">The name of the generated report.</param>
    /// <param name="reportId">The id of the report, so the browser knows which report is ready to download.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    private async Task NotifyUserOfReportGeneration(string userName, string userId, string reportName, Guid reportId, CancellationToken token)
    {
        string title = $"{reportName} {MESSAGE_TITLE}";
        string message = $"{reportName} was generated successfully by User: {userName}";
            
        bool accepted = await _notificationPublisher.PublishEventAsync(NotificationTarget.User(userId), SUCCESS_MESSAGE_TYPE, title, message,
            NotificationEvents.ReportReady, reportId.ToString(), token);

        if (!accepted)
        {
            _logger.LogWarning("The hub did not accept the test notification for user {UserId}", userId);
        }
    }
}