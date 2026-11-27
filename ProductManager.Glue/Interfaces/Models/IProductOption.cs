namespace ProductManager.Glue.Interfaces.Models;

public interface IProductOption
{
    /// <summary>
    /// Gets or sets the identifier.
    /// primary identifier for the record
    /// </summary>
    /// <value>The identifier.</value>
    Guid Id { get; set; }

    Guid OptionId { get; set; }

    /// <summary>
    /// Gets or sets the product identifier.
    /// </summary>
    /// <value>The product identifier.</value>
    Guid ProductId { get; set; }


    /// <summary>
    /// Gets or sets the price.
    /// How much the product costs.
    /// </summary>
    /// <value>The price.</value>
    decimal Price { get; set; }
}