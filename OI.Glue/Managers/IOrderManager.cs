using OI.Glue.Models;

namespace OI.Glue.Managers;

public interface IOrderManager
{
    Task<IOrder> CreateOrderAsync(ICreateOrder? request, CancellationToken cancellationToken = default);
    Task<PagedResult<IOrderSearch>> GetOrdersPagedAsync(Dictionary<string, IFilterMetaData[]> filters, int? requestPage,
        int? requestPageSize, CancellationToken cancellationToken = default);

    Task UpdateOrderAsync(IUpdateOrder request, CancellationToken cancellationToken= default);
    Task<IOrder?> GetOrderByIdAsync(Guid id, CancellationToken token = default);
}
