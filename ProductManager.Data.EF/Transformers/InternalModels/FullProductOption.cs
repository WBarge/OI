using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Transformers.InternalModels
{
    /// <summary>
    /// Represents a full product option.
    /// </summary>
    internal class FullProductOption : IFullProductOption
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the option identifier.
        /// </summary>
        public Guid OptionId { get; set; }

        /// <summary>
        /// Gets or sets the product identifier.
        /// </summary>
        public Guid ProductId { get; set; }

        /// <summary>
        /// Gets or sets the price.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; } = string.Empty;
    }
}