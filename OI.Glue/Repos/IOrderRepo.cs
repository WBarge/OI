using OI.Glue.Models;

namespace OI.Glue.Repos;

public interface IOrderRepo
{
    Task<IOrder?> GetOrderAsync(Guid orderId, CancellationToken token = default);
    Task<int> GetNextOrderNumberAsync(CancellationToken cancellationToken = default);
    Task<IOrder> CreateOrderAsync(ICreateOrder request, int orderNumber, bool isPending, CancellationToken cancellationToken = default);
    Task<IEnumerable<IOrderSearch>> FindPagedOrderRecordsAsync(Dictionary<string, IFilterMetaData[]> filters, int pageNumber, int size, CancellationToken cancellationToken= default);
    Task<long> GetOrdersCountAsync(Dictionary<string, IFilterMetaData[]> filters, CancellationToken cancellationToken= default);
    Task UpdateOrder(IUpdateOrder request, CancellationToken cancellationToken = default);
    Task SetCancelationDataForOrderAsync(Guid id, string clientContextDisplayName, CancellationToken token);

    Task<IEnumerable<IOrderSearch>> FindPagedCanceledOrderRecordsAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null, int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default);

    Task<long> GetCanceledOrdersCountAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null, CancellationToken cancellationToken = default);
}
