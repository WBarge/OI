using OI.Common.Extensions.Transformations;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model
{
    /// <summary>
    /// Represents an option for a product.
    /// </summary>
    internal class Option : IOption
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The name backing field
        /// </summary>
        private string _name = string.Empty;

        /// <summary>
        /// The name maximum size
        /// </summary>
        internal const int NAME_MAX_SIZE = 128;

        /// <summary>
        /// Gets or sets the name.
        /// the name of the product
        /// Is limited to 128 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get => _name;
            set
            {
                _name = value.Truncate(NAME_MAX_SIZE);
            }
        }

        /// <summary>
        /// Gets or sets the description.
        /// The full description of the product.
        /// Is optional
        /// </summary>
        /// <value>The description.</value>
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the price.
        /// How much the product costs.
        /// </summary>
        /// <value>The price.</value>
        public decimal Price { get; set; }

        /// <summary>
        /// The cost of the option
        /// </summary>
        public decimal Cost { get; set; }

        /// <summary>
        /// The estimated detail price of the option
        /// </summary>
        public decimal Estimated { get; set; }


        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="ProductOption" /> is deleted.
        /// </summary>
        /// <value><c>true</c> if deleted; otherwise, <c>false</c>.</value>
        public bool Deleted { get; set; }

        /// <summary>
        /// Gets or sets the created.
        /// represents when the record was created
        /// </summary>
        /// <value>The created.</value>
        public DateTime Created { get; set; }

        /// <summary>
        /// Gets or sets the modified.
        /// represents when the record was last changed
        /// </summary>
        /// <value>The modified.</value>
        public DateTime? Modified { get; set; }

    }
}