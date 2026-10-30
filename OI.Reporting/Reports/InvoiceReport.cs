namespace OI.Reporting.Reports;

public class InvoiceReport(ILogger<InvoiceReport> logger, Guid generationId) : BaseReport(generationId)
{
    private readonly ILogger<InvoiceReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
}