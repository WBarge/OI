namespace OI.Reporting.Managers;

public interface IReportManager
{
    Task CreateEstimateAsync(Guid reportId, Guid orderId, string userName, string userId,
        CancellationToken token = default);
}