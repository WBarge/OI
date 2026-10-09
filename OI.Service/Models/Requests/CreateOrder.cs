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
    /// <summary>Gets or sets the order items. Optional; if provided, SubTotal and Total are recalculated.</summary>
    public IEnumerable<ICreateOrderItem>? OrderItems { get; set; }
}
