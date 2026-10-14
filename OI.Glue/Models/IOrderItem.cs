namespace OI.Glue.Models;

public interface IOrderItem
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the order item
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// the name of the product
    /// Is limited to 128 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The name.</value>
    string Name { get; set; }

    /// <summary>
    /// Gets or sets the short description.
    /// A short description for the product
    /// Is limited to 256 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The short description.</value>
    string Description { get; set; }

    /// <summary>
    /// Gets or sets the sku.
    /// Is limited to 12 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The sku.</value>
    string Sku { get; set; }

    /// <summary>
    /// Gets or sets the price.
    /// How much the product costs.
    /// </summary>
    /// <value>The price.</value>
    decimal Price { get; set; }

    /// <summary>
    /// The number of this product in the order.
    /// </summary>
    int Quantity { get; set; }

    /// <summary>
    /// The total for this order item. Price * Quantity
    /// </summary>
    decimal Total { get; set; }
}