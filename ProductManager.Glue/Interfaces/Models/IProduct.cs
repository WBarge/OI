namespace ProductManager.Glue.Interfaces.Models;

/// <summary>
/// Interface IFullProduct
/// Extends the <see cref="IShortProduct" />
/// </summary>
/// <seealso cref="IShortProduct" />
public interface IProduct :IShortProduct
{
    /// <summary>
    /// Gets or sets the description.
    /// The full description of the product.
    /// Is optional
    /// </summary>
    /// <value>The description.</value>
    string? Description { get; set; }
}