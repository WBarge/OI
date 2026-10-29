namespace OI.Reporting.Reports;

public abstract class BaseReport(Guid generationId)
{
    public Guid GenerationId { get; set; } = generationId;
}