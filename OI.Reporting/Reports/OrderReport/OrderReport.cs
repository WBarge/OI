using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.OrderReport;

public class OrderReport(ILogger<OrderReport> logger,Guid reportId) : BaseReport(reportId, logger)
{
    private readonly ILogger<OrderReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public override string ReportName { get { return "Order Report"; } }
    
    protected override Task BuildDataModelAsync()
    {
        try
        {
            _logger.LogDebug("Building data model for Order Report.");
            throw new NotImplementedException();
        }
        catch (Exception exception)
        {
            return Task.FromException(exception);
        }
    }

    protected override Task<IDocument> BuildReportDocumentAsync()
    {
        try
        {
            _logger.LogDebug("Building report document for Order Report.");
            throw new NotImplementedException();
        }
        catch (Exception exception)
        {
            return Task.FromException<IDocument>(exception);
        }
    }
}