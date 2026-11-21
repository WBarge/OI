namespace OI.Reporting.Managers;

public interface IReportManager
{
    Task CreateEstimateAsync(Guid reportId, Guid orderId, string userName, string userId, CancellationToken token = default);
    Task CreateOrderAsync(Guid reportId, Guid orderId, string userName, string userId, CancellationToken token = default);
    Task CreateInvoiceAsync(Guid reportId, Guid orderId, string userName, string userId, CancellationToken token = default);
    Task CreateCustomerList(Guid reportId, string userName, string userId, CancellationToken token = default);
}