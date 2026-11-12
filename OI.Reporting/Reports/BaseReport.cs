using OI.Common.Extensions.Comparison;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports;

public abstract class BaseReport()
{
    public Guid GenerationId { get; }

    protected BaseReport(Guid id) : this()
    {
        id.Required(nameof(id));//enforce the id used to identify the report
        GenerationId = id;
    }

    // The name of the report, used for logging and identification purposes
    public abstract string ReportName { get; }
    
    protected CancellationToken CancellationToken { get; set; }
    
    protected bool ShouldStop{ get{ return CancellationToken.IsCancellationRequested; }}

    public async Task<byte[]> GenerateReportAsync(CancellationToken cancellationToken = default)
    {
        CancellationToken = cancellationToken;
        
        await BuildDataModelAsync();
        IDocument generatedReport = await BuildReportDocumentAsync();

        byte[] reportBytes = generatedReport.GeneratePdf();

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