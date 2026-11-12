namespace OI.Reporting.Managers;

public interface IReportResultManager
{
    Task<byte[]?> GetReportAsync(Guid reportId, CancellationToken token = default);
}