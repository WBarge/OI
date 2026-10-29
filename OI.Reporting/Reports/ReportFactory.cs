namespace OI.Reporting.Reports;

public class ReportFactory(IServiceProvider serviceProvider, ILogger<ReportFactory> logger)
{
    private readonly IServiceProvider _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
    private readonly ILogger<ReportFactory> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public BaseReport GetReport(Guid generationId, Report whichReport)
    {
        _logger.LogInformation("Creating report for {whichReport} who has an id of {generationId}",whichReport,generationId);
        BaseReport returnValue = whichReport switch
        {
            Report.Order => ActivatorUtilities.CreateInstance<OrderReport>(_serviceProvider, generationId),
            Report.Invoice => ActivatorUtilities.CreateInstance<InvoiceReport>(_serviceProvider, generationId),
            _ => throw new ArgumentOutOfRangeException(nameof(whichReport), whichReport, null)
        };
        return returnValue;
    }
}