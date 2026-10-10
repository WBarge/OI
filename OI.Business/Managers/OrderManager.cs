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
internal class OrderManager(IOrderRepo orderRepo, ICustomerRepo customerRepo, ILogger<OrderManager> logger) : IOrderManager
{
    private readonly IOrderRepo _orderRepo = orderRepo ?? throw new ArgumentNullException(nameof(orderRepo));
    private readonly ICustomerRepo _customerRepo = customerRepo ?? throw new ArgumentNullException(nameof(customerRepo));
    private readonly ILogger<OrderManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Creates an order in the system
    /// </summary>
    /// <param name="request">The order to create.  IF this is null then an empty order will be created and returned. An unknown customerId will be cleared</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <exception cref="RequestException"></exception>
    public async Task<IOrder> CreateOrderAsync(ICreateOrder? request, CancellationToken cancellationToken = default)
    {
        request ??= new DefaultCreateOrder();
        _logger.LogInformation("Creating order for customer {CustomerId}", request.CustomerId);
        await ApplyCustomerDefaultAddressesAsync(request, cancellationToken);
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

    /// <summary>
    /// When the request names an existing customer, fills in the billing and/or shipping address from the customer's defaults.
    /// Each address is treated as a unit: it is only filled in when none of its fields were supplied on the request,
    /// so a partly supplied address is never mixed with the customer's default.
    /// </summary>
    private async Task ApplyCustomerDefaultAddressesAsync(ICreateOrder request, CancellationToken cancellationToken)
    {
        if (request.CustomerId is not { } customerId || customerId == Guid.Empty)
        {
            request.CustomerId = null;
            return;
        }
        ICustomer? customer = await _customerRepo.GetCustomerByIdAsync(customerId, cancellationToken);
        if (customer == null)
        {
            _logger.LogInformation("Customer {CustomerId} was not found; using the addresses on the request as supplied", customerId);
            _logger.LogInformation("Setting the customer to empty");
            request.CustomerId = null;
            return;
        }

        bool billingSupplied = HasAnyValue(request.BillingAddress1, request.BillingAddress2, request.BillingCity, request.BillingStateCode, request.BillingZipCode);
        bool customerHasBilling = HasAnyValue(customer.DefaultBillingAddress1, customer.DefaultBillingAddress2, customer.DefaultBillingCity, customer.DefaultBillingStateCode, customer.DefaultBillingZipCode);
        if (!billingSupplied && customerHasBilling)
        {
            request.BillingAddress1 = customer.DefaultBillingAddress1 ?? string.Empty;
            request.BillingAddress2 = customer.DefaultBillingAddress2 ?? string.Empty;
            request.BillingCity = customer.DefaultBillingCity ?? string.Empty;
            request.BillingStateCode = customer.DefaultBillingStateCode ?? string.Empty;
            request.BillingZipCode = customer.DefaultBillingZipCode ?? string.Empty;
            _logger.LogInformation("Populated the billing address from the defaults of customer {CustomerId}", customerId);
        }

        bool shippingSupplied = HasAnyValue(request.ShippingAddress1, request.ShippingAddress2, request.ShippingCity, request.ShippingStateCode, request.ShippingZipCode);
        bool customerHasShipping = HasAnyValue(customer.DefaultShippingAddress1, customer.DefaultShippingAddress2, customer.DefaultShippingCity, customer.DefaultShippingStateCode, customer.DefaultShippingZipCode);
        if (!shippingSupplied && customerHasShipping)
        {
            request.ShippingAddress1 = customer.DefaultShippingAddress1 ?? string.Empty;
            request.ShippingAddress2 = customer.DefaultShippingAddress2 ?? string.Empty;
            request.ShippingCity = customer.DefaultShippingCity ?? string.Empty;
            request.ShippingStateCode = customer.DefaultShippingStateCode ?? string.Empty;
            request.ShippingZipCode = customer.DefaultShippingZipCode ?? string.Empty;
            _logger.LogInformation("Populated the shipping address from the defaults of customer {CustomerId}", customerId);
        }
    }

    /// <summary>
    /// does any of the strings passed in have a value
    /// </summary>
    /// <param name="values"></param>
    /// <returns></returns>
    private static bool HasAnyValue(params string?[] values)
    {
        return values.Any(value => !string.IsNullOrWhiteSpace(value));
    }

    /// <summary>
    /// used by the CreateOrderAsync method for when the order parameter is null.
    /// </summary>
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