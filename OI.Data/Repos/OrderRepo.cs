using Microsoft.EntityFrameworkCore;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

internal class OrderRepo(OiDbContext dbContext) : BaseEfRepo<Order>(dbContext), IOrderRepo
{
    public async Task<int> GetNextOrderNumberAsync(CancellationToken cancellationToken = default)
    {
        OrderCounter counter = await DbContext.OrderCounters.FirstAsync(cancellationToken);
        int orderNumber = counter.NextOrderNumber;
        counter.NextOrderNumber++;
        counter.Modified = DateTime.UtcNow;
        DbContext.OrderCounters.Update(counter);
        await SaveAsync(cancellationToken);
        return orderNumber;
    }

    public async Task<IOrder> CreateOrderAsync(ICreateOrder request, int orderNumber, bool isPending, CancellationToken cancellationToken = default)
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = orderNumber,
            OrderDate = request.OrderDate ?? DateTime.UtcNow,
            CompletedDate = null,
            IsPending = isPending,
            CustomerId = request.CustomerId,
            BillingAddress1 = request.BillingAddress1,
            BillingAddress2 = request.BillingAddress2,
            BillingCity = request.BillingCity,
            BillingStateCode = request.BillingStateCode,
            BillingZipCode = request.BillingZipCode,
            ShippingAddress1 = request.ShippingAddress1,
            ShippingAddress2 = request.ShippingAddress2,
            ShippingCity = request.ShippingCity,
            ShippingStateCode = request.ShippingStateCode,
            ShippingZipCode = request.ShippingZipCode,
            SubTotal = request.SubTotal ?? 0m,
            Shipping = request.Shipping ?? 0m,
            Tax = request.Tax ?? 0m,
            Total = request.Total ?? 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };
        if (request.OrderItems != null && request.OrderItems.Any())
        {
            foreach (ICreateOrderItem createOrderItemRequest in request.OrderItems)
            {
                OrderItem newItem = CreateOrderItem(createOrderItemRequest, order.Id);
                order.OrderItems.Add(newItem);
            }
        }

        await InsertAsync(order, cancellationToken);
        await SaveAsync(cancellationToken);

        return order.Translate();
    }

    private OrderItem CreateOrderItem(ICreateOrderItem request, Guid orderId)
    {
        return new OrderItem()
        {
            Id = Guid.NewGuid(),
            ProductId = request.ProductId,
            OrderId = orderId,
            Name = request.Name,
            Description = request.Description,
            Sku = request.Sku,
            Price = request.Price ?? decimal.Zero,
            Quantity = request.Quantity ?? 0,
            Total = request.Total ?? decimal.Zero,
            Created = DateTime.UtcNow
        };
    }
}
