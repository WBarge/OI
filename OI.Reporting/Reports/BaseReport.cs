using OI.Common.Extensions.Comparison;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports;

public abstract class BaseReport()
{
    public Guid GenerationId { get; }
    private readonly ILogger _logger;
    protected BaseReport(Guid id, ILogger logger) : this()
    {
        id.Required(nameof(id));//enforce the id used to identify the report
        GenerationId = id;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    // The name of the report, used for logging and identification purposes
    public abstract string ReportName { get; }
    
    protected CancellationToken CancellationToken { get; set; }
    
    protected bool ShouldStop{ get{ return CancellationToken.IsCancellationRequested; }}

    public async Task<byte[]> GenerateReportAsync(CancellationToken cancellationToken = default)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        CancellationToken = cancellationToken;
        
        await BuildDataModelAsync();
        IDocument generatedReport = await BuildReportDocumentAsync();
        byte[] reportBytes;

        try
        {
            reportBytes = generatedReport.GeneratePdf();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating report document for {ReportName} with GenerationId: {GenerationId}", ReportName, GenerationId);
            throw;
        }

        return reportBytes;
    }

    protected abstract Task BuildDataModelAsync();
    protected abstract Task<IDocument> BuildReportDocumentAsync();
    
    protected virtual Task SaveReportAsync(byte[] reportBytes)
    {
        // Default implementation does nothing. Derived classes can override to save the report.
        return Task.CompletedTask;
    }
}