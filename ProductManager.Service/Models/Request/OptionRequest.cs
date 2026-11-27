using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Service.Models.Request
{
    /// <summary>
    /// Represents the request model for an option.
    /// </summary>
    public class OptionRequest : IOption
    {
        /// <summary>
        /// Gets or sets the identifier of the option.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the option.
        /// </summary>
        public string Name { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets the description of the option.
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Gets or sets the price of the option.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Gets or sets the cost of the option.
        /// </summary>
        public decimal Cost { get; set; }
        /// <summary>
        /// Gets or sets the estimated detail price of the option.
        /// </summary>
        public decimal Estimated { get; set; }
    }
}