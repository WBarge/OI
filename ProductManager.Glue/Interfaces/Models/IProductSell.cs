using OI.Common.Models;

namespace ProductManager.Glue.Interfaces.Models;

public interface IProductSell
{
    /// <summary>
    /// Gets or sets the identifier.
    /// primary identifier for the record
    /// </summary>
    /// <value>The identifier.</value>
    Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the product identifier.
    /// </summary>
    /// <value>The product identifier.</value>
    Guid ProductId { get; set; }

    /// <summary>
    /// Gets or sets the start date of the sell.
    /// </summary>
    /// <value>The start.</value>
    DateTime Start { get; set; }

    /// <summary>
    /// Gets or sets the end date of the sell.
    /// </summary>
    /// <value>The end.</value>
    DateTime End { get; set; }

    /// <summary>
    /// Gets or sets the time period.
    /// represents the time period the sell is valid aka going on
    /// </summary>
    /// <value>The period.</value>
    DateRange Period { get; set; }

    /// <summary>
    /// Gets or sets the price for the date range.
    /// </summary>
    /// <value>The price.</value>
    decimal Price { get; set; }
}