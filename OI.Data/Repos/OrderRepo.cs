using CrossCutting.Exceptions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using OI.Data.Helpers;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

internal class OrderRepo(OiDbContext dbContext) : BaseEfRepo<Order>(dbContext), IOrderRepo
{
    /// <summary>
    /// gets an order from the persistence store
    /// </summary>
    /// <param name="orderId"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    public async Task<IOrder?> GetOrderAsync(Guid orderId, CancellationToken token = default)
    {
        Order? result = await DbContext.Orders
            .Where(o => o.Id == orderId)
            .Include(o => o.Customer)
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(token);

        return result.Translate();
    }

    /// <summary>
    /// gets the next available order number
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
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

        return order.Translate()!;
    }

    /// <summary>
    /// gets a limited order view based on the criteria passed in
    /// </summary>
    /// <param name="filterCriteria"></param>
    /// <param name="pageNumber"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<IEnumerable<IOrderSearch>> FindPagedOrderRecordsAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null, int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default)
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
    /// <summary>
    /// gets the number of records in the system that meet the criteria passed in
    /// </summary>
    /// <param name="filterCriteria"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<long> GetOrdersCountAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null,CancellationToken cancellationToken = default)
    {
        IQueryable<Order> filtered = await DbContext.Orders.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
        return await filtered.LongCountAsync(cancellationToken);
    }

    /// <summary>
    /// updates the order
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <exception cref="RequiredObjectException"></exception>
    public async Task UpdateOrder(IUpdateOrder request, CancellationToken cancellationToken = default)
    {
        Order? order = await DbContext.Orders
            .Where(o => o.Id == request.Id)
            .Include(o => o.Customer)
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(cancellationToken);

        if (order == null)
        {
            throw new RequiredObjectException("invalid order id");
        }

        order.OrderDate = request.OrderDate ?? DateTime.UtcNow;
        order.CustomerId = request.CustomerId;
        order.BillingAddress1 = request.BillingAddress1;
        order.BillingAddress2 = request.BillingAddress2;
        order.BillingCity = request.BillingCity;
        order.BillingStateCode = request.BillingStateCode;
        order.BillingZipCode = request.BillingZipCode;
        order.ShippingAddress1 = request.ShippingAddress1;
        order.ShippingAddress2 = request.ShippingAddress2;
        order.ShippingCity = request.ShippingCity;
        order.ShippingStateCode = request.ShippingStateCode;
        order.ShippingZipCode = request.ShippingZipCode;
        order.SubTotal = request.SubTotal ?? 0m;
        order.Shipping = request.Shipping ?? 0m;
        order.Tax = request.Tax ?? 0m;
        order.Total = request.Total ?? 0m;
        order.Modified = DateTime.UtcNow;

        if (request.OrderItems != null && request.OrderItems.Any())
        {
            //List<OrderItem> orderItems = await this.DbContext.OrderItems
            //    .Where(oi => oi.OrderId == order.Id)
            //    .ToListAsync<OrderItem>(cancellationToken);
            order.OrderItems ??= [];
            foreach (ICreateOrderItem createOrderItemRequest in request.OrderItems)
            {
                OrderItem convertedItem = CreateOrderItem(createOrderItemRequest, order.Id);
                OrderItem? foundItem = order.OrderItems!.FirstOrDefault(o => o.ProductId == createOrderItemRequest.ProductId);
                if (foundItem != null)
                {
                    foundItem.Quantity = convertedItem.Quantity;
                    foundItem.Total = convertedItem.Total;

                }
                else
                {
                    await DbContext.OrderItems.AddAsync(convertedItem,cancellationToken);
                }
            }
        }

        try
        {
            await SaveAsync(cancellationToken);
            if (request.OrderItems!.Count() != order.OrderItems!.Count())
            {
                order = await DbContext.Orders
                    .Where(o => o.Id == request.Id)
                    .Include(o => o.Customer)
                    .Include(o => o.OrderItems)
                    .FirstOrDefaultAsync(cancellationToken);
                foreach (OrderItem orderOrderItem in order.OrderItems)
                {
                    bool missing = request.OrderItems!.FirstOrDefault(o => o.ProductId == orderOrderItem.ProductId) == null;
                    if (missing)
                    {
                        order.OrderItems.Remove(orderOrderItem);
                    }
                }
                await SaveAsync(cancellationToken);
            }


        }
        catch (Exception x)
        {
            throw x;
        }
    }

    /// <summary>
    /// creates an order
    /// </summary>
    /// <param name="request"></param>
    /// <param name="orderId"></param>
    /// <returns></returns>
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
            Total = request.Total ?? (request.Price ?? decimal.Zero) * (request.Quantity ?? 0),
            Created = DateTime.UtcNow
        };
    }
}
