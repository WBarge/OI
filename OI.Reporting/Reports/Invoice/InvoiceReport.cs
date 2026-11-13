using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.Invoice;

public class InvoiceReport(ILogger<InvoiceReport> logger,Guid reportId) : BaseReport(reportId, logger)
{
    private readonly ILogger<InvoiceReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    public override string ReportName { get { return "Invoice Report"; } }
    protected override Task BuildDataModelAsync()
    {
        try
        {
            _logger.LogDebug("Building data model for Invoice Report.");
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
            _logger.LogDebug("Building report document for Invoice Report.");
            throw new NotImplementedException();
        }
        catch (Exception exception)
        {
            return Task.FromException<IDocument>(exception);
        }
    }
}