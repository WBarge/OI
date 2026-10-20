using OI.Glue.Models;

namespace OI.Glue.Repos;

public interface IOrderRepo
{
    Task<int> GetNextOrderNumberAsync(CancellationToken cancellationToken = default);
    Task<IOrder> CreateOrderAsync(ICreateOrder request, int orderNumber, bool isPending, CancellationToken cancellationToken = default);
    Task<IEnumerable<IOrderSearch>> FindPagedOrderRecordsAsync(Dictionary<string, IFilterMetaData[]> filters, int pageNumber, int size, CancellationToken cancellationToken);
    Task<long> GetOrdersCountAsync(Dictionary<string, IFilterMetaData[]> filters, CancellationToken cancellationToken);
}
