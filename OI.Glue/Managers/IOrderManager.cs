using OI.Glue.Models;

namespace OI.Glue.Managers;

public interface IOrderManager
{
    Task<IOrder> CreateOrderAsync(ICreateOrder? request, CancellationToken cancellationToken = default);
}
