using OI.Glue.Models;

namespace OI.Service.Models.Requests;

/// <summary>Represents a request to create an order item.</summary>
public class CreateOrderItem : ICreateOrderItem
{
    /// <summary>Gets or sets the product identifier.</summary>
    public Guid ProductId { get; set; }
    /// <summary>Gets or sets the name of the order item.</summary>
    public string Name { get; set; } = string.Empty;
    /// <summary>Gets or sets the description of the order item.</summary>
    public string Description { get; set; } = string.Empty;
    /// <summary>Gets or sets the SKU of the order item.</summary>
    public string Sku { get; set; } = string.Empty;
    /// <summary>Gets or sets the unit price of the order item.</summary>
    public decimal? Price { get; set; }
    /// <summary>Gets or sets the quantity of the order item.</summary>
    public int? Quantity { get; set; }
    /// <summary>
    /// Gets or sets the total price of the order item (Price * Quantity). This value is calculated and overridden if it does not match the calculated value.
    /// </summary>
    public decimal? Total { get; set; }
}
