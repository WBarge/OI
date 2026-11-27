namespace ProductManager.Glue.Interfaces.Models
{
    /// <summary>
    /// Represents an option for a product.
    /// </summary>
    public interface IOption
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// the name of the product
        /// Is limited to 128 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The name.</value>
        string Name { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// The full description of the product.
        /// Is optional
        /// </summary>
        /// <value>The description.</value>
        string? Description { get; set; }

        /// <summary>
        /// Gets or sets the price.
        /// How much the product costs.
        /// </summary>
        /// <value>The price.</value>
        decimal Price { get; set; }

        /// <summary>
        /// The cost of the option
        /// </summary>
        public decimal Cost { get; set; }

        /// <summary>
        /// The estimated detail price of the option
        /// </summary>
        public decimal Estimated { get; set; }

    }
}