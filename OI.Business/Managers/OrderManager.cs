using CrossCutting.Exceptions;
using CrossCutting.Extensions;
using Microsoft.Extensions.Logging;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Managers;

/// <summary>
/// Manages order-related business logic.
/// </summary>
internal class OrderManager(IOrderRepo orderRepo, ILogger<OrderManager> logger) : IOrderManager
{
    private readonly IOrderRepo _orderRepo = orderRepo ?? throw new ArgumentNullException(nameof(orderRepo));
    private readonly ILogger<OrderManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <inheritdoc />
    public async Task<IOrder> CreateOrderAsync(ICreateOrder? request, CancellationToken cancellationToken = default)
    {
        request ??= new DefaultCreateOrder();
        _logger.LogInformation("Creating order for customer {CustomerId}", request.CustomerId);
        request.OrderDate ??= DateTime.UtcNow;
        request.Shipping ??= decimal.Zero;
        request.Tax ??= decimal.Zero;
        request.SubTotal ??= decimal.Zero;
        request.Total ??= decimal.Zero;
        if (request.OrderItems != null && request.OrderItems.Any())
        {
            decimal calculatedSubTotal = decimal.Zero;
            foreach (ICreateOrderItem createOrderItemRequest in request.OrderItems)
            {
                if (createOrderItemRequest.ProductId.IsEmpty())
                {
                    throw new RequestException(nameof(ICreateOrderItem.ProductId));
                }
                createOrderItemRequest.Price ??= decimal.Zero;
                createOrderItemRequest.Quantity ??= 0;
                createOrderItemRequest.Total ??= decimal.Zero;

                decimal? calculatedItemTotal = createOrderItemRequest.Price * createOrderItemRequest.Quantity;
                if (createOrderItemRequest.Total != calculatedItemTotal)
                {
                    _logger.LogInformation("Overriding OrderItem Total from {Requested} to calculated {Calculated}", createOrderItemRequest.Total, calculatedItemTotal);
                    createOrderItemRequest.Total = calculatedItemTotal;
                }
                calculatedSubTotal += calculatedItemTotal ?? decimal.Zero;
            }
            if (request.SubTotal != calculatedSubTotal)
            {
                _logger.LogInformation("Overriding SubTotal from {Requested} to calculated {Calculated}", request.SubTotal, calculatedSubTotal);
                request.SubTotal = calculatedSubTotal;
            }
        }
        decimal? calculatedTotal = request.SubTotal + request.Shipping + request.Tax;
        if (request.Total != calculatedTotal)
        {
            _logger.LogInformation("Overriding Total from {Requested} to calculated {Calculated}", request.Total, calculatedTotal);
            request.Total = calculatedTotal;
        }
        int orderNumber = await _orderRepo.GetNextOrderNumberAsync(cancellationToken);
        _logger.LogInformation("Assigned order number {OrderNumber}", orderNumber);
        const bool IS_PENDING = true;
        IOrder order = await _orderRepo.CreateOrderAsync(request, orderNumber, IS_PENDING, cancellationToken);
        _logger.LogInformation("Created order {OrderNumber}", order.OrderNumber);
        return order;
    }

    private sealed class DefaultCreateOrder : ICreateOrder
    {
        public Guid? CustomerId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string BillingAddress1 { get; set; } = string.Empty;
        public string BillingAddress2 { get; set; } = string.Empty;
        public string BillingCity { get; set; } = string.Empty;
        public string BillingStateCode { get; set; } = string.Empty;
        public string BillingZipCode { get; set; } = string.Empty;
        public string ShippingAddress1 { get; set; } = string.Empty;
        public string ShippingAddress2 { get; set; } = string.Empty;
        public string ShippingCity { get; set; } = string.Empty;
        public string ShippingStateCode { get; set; } = string.Empty;
        public string ShippingZipCode { get; set; } = string.Empty;
        public decimal? SubTotal { get; set; }
        public decimal? Shipping { get; set; }
        public decimal? Tax { get; set; }
        public decimal? Total { get; set; }
        public IEnumerable<ICreateOrderItem>? OrderItems { get; set; }
    }
}
