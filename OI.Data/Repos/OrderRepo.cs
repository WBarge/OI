using Microsoft.EntityFrameworkCore;
using OI.Data.Helpers;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Data.Translators.Internal_Models;
using OI.Glue.Models;
using OI.Glue.Repos;
using Customer = OI.Data.Model.Customer;
using Order = OI.Data.Model.Order;
using OrderItem = OI.Data.Model.OrderItem;

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

        // The customer is not part of the insert, so load it for the returned order.
        if (order.CustomerId.HasValue && order.Customer == null)
        {
            await DbContext.Entry(order).Reference(o => o.Customer).LoadAsync(cancellationToken);
        }

        return order.Translate();
    }

    public async Task<IEnumerable<IOrderSearch>> FindPagedOrderRecordsAsync(        Dictionary<string, IFilterMetaData[]>? filterCriteria = null,
        int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        pageNumber = Math.Max(pageNumber, 1);
        pageSize = Math.Max(pageSize, 1);
        int skip = (int)Math.Min((long)pageSize * (pageNumber - 1), int.MaxValue);

        IQueryable<Order> filtered = await DbContext.Orders.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
        List<IOrderSearch> orders = await filtered
            .Include(o=>o.Customer)
            .Include(o=>o.OrderItems)
            .OrderBy(c => c.Customer!.LastName)
            .ThenBy(c => c.Customer!.FirstName)
            .ThenBy(c => c.Id)
            .Skip(skip)
            .Take(pageSize)
            .ToSearchResult()//rework this to not be the whole order object - just search result object
            .Cast<IOrderSearch>()
            .ToListAsync(cancellationToken);
        return orders;

    }

    public async Task<long> GetOrdersCountAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null,CancellationToken cancellationToken = default)
    {
        IQueryable<Order> filtered = await DbContext.Orders.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
        return await filtered.LongCountAsync(cancellationToken);
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
