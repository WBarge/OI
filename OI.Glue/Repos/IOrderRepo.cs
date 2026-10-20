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
}
