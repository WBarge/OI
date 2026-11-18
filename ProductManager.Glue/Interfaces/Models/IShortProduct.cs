namespace ProductManager.Glue.Interfaces.Models;

/// <summary>
/// Interface IShortProduct
/// </summary>
public interface IShortProduct
{
    /// <summary>
    /// Gets or sets the identifier.
    /// primary identifier for the record
    /// </summary>
    /// <value>The identifier.</value>
    Guid Id { get; set; }

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
    string ShortDescription { get; set; }

    /// <summary>
    /// Gets or sets the sku.
    /// Is limited to 12 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The sku.</value>
    string Sku { get; set; }

    /// <summary>
    /// Gets or sets the price.
    /// The amount being charged for the product .
    /// </summary>
    /// <value>The price.</value>
    decimal Price { get; set; }

    /// <summary>
    /// Gets or sets the cost.
    /// How much the product costs.
    /// </summary>
    decimal Cost { get; set; }

    /// <summary>
    /// Estimated Manufacture Price.
    /// </summary>
    decimal Estimated { get; set; }

}