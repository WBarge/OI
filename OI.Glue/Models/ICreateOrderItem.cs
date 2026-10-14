namespace OI.Glue.Models;

public interface ICreateOrderItem
{
    /// <summary>Gets or sets the product identifier.</summary>
    Guid ProductId { get; set; }
    /// <summary>Gets or sets the name of the order item.</summary>
    string Name { get; set; }
    /// <summary>Gets or sets the description of the order item.</summary>
    string Description { get; set; }
    /// <summary>Gets or sets the SKU of the order item.</summary>
    string Sku { get; set; }
    /// <summary>Gets or sets the unit price of the order item.</summary>
    decimal? Price { get; set; }
    /// <summary>Gets or sets the quantity of the order item.</summary>
    int? Quantity { get; set; }
    /// <summary>
    /// Gets or sets the total price of the order item (Price * Quantity). This value is calculated and overridden if it does not match the calculated value.
    /// </summary>
    decimal? Total { get; set; }
}
