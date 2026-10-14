using OI.Glue.Models;

namespace OI.Service.Models.Requests;

/// <summary>
/// Represents the request body for creating an order.
/// </summary>
public class CreateOrder : ICreateOrder
{
    /// <summary>Gets or sets the customer identifier.</summary>
    public Guid? CustomerId { get; set; }
    /// <summary>Gets or sets the order date. If not provided, defaults to UTC now.</summary>
    public DateTime? OrderDate { get; set; }
    /// <summary>Gets or sets the billing address line 1.</summary>
    public string BillingAddress1 { get; set; } = string.Empty;
    /// <summary>Gets or sets the billing address line 2.</summary>
    public string BillingAddress2 { get; set; } = string.Empty;
    /// <summary>Gets or sets the billing city.</summary>
    public string BillingCity { get; set; } = string.Empty;
    /// <summary>Gets or sets the billing state code.</summary>
    public string BillingStateCode { get; set; } = string.Empty;
    /// <summary>Gets or sets the billing zip code.</summary>
    public string BillingZipCode { get; set; } = string.Empty;
    /// <summary>Gets or sets the shipping address line 1.</summary>
    public string ShippingAddress1 { get; set; } = string.Empty;
    /// <summary>Gets or sets the shipping address line 2.</summary>
    public string ShippingAddress2 { get; set; } = string.Empty;
    /// <summary>Gets or sets the shipping city.</summary>
    public string ShippingCity { get; set; } = string.Empty;
    /// <summary>Gets or sets the shipping state code.</summary>
    public string ShippingStateCode { get; set; } = string.Empty;
    /// <summary>Gets or sets the shipping zip code.</summary>
    public string ShippingZipCode { get; set; } = string.Empty;
    /// <summary>Gets or sets the subtotal. If not provided, defaults to zero.</summary>
    public decimal? SubTotal { get; set; }
    /// <summary>Gets or sets the shipping cost. If not provided, defaults to zero.</summary>
    public decimal? Shipping { get; set; }
    /// <summary>Gets or sets the tax amount. If not provided, defaults to zero.</summary>
    public decimal? Tax { get; set; }
    /// <summary>Gets or sets the total. If not provided, defaults to zero.</summary>
    public decimal? Total { get; set; }

    /// <summary>
    /// Gets or sets the order items. Optional; if provided, SubTotal and Total are recalculated.
    /// Typed as the concrete <see cref="CreateOrderItem"/> so System.Text.Json can deserialize it
    /// (it cannot deserialize interface types).
    /// </summary>
    public IEnumerable<CreateOrderItem>? OrderItems { get; set; }

    /// <summary>
    /// Explicit <see cref="ICreateOrder"/> view of <see cref="OrderItems"/>.
    /// The getter returns the same <see cref="CreateOrderItem"/> instances, so changes made to the items
    /// through the interface (defaults, recalculated totals) are visible on this request.
    /// The setter keeps any <see cref="CreateOrderItem"/> as-is and copies other implementations.
    /// Explicit interface members are ignored by System.Text.Json, so this does not affect (de)serialization.
    /// </summary>
    IEnumerable<ICreateOrderItem>? ICreateOrder.OrderItems
    {
        get => OrderItems;
        set => OrderItems = value?.Select(ToCreateOrderItem).ToList();
    }

    private static CreateOrderItem ToCreateOrderItem(ICreateOrderItem item)
    {
        return item as CreateOrderItem ?? new CreateOrderItem
        {
            ProductId = item.ProductId,
            Name = item.Name,
            Description = item.Description,
            Sku = item.Sku,
            Price = item.Price,
            Quantity = item.Quantity,
            Total = item.Total
        };
    }
}