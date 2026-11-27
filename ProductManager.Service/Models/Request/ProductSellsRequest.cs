namespace ProductManager.Service.Models.Request
{
    /// <summary>
    /// Represents a request to define a sell period for a product.
    /// </summary>
    /// <remarks>
    /// This class is used to specify the details of a sell period, including the start date, end date, and price.
    /// </remarks>
    public class ProductSellsRequest
    {
        /// <summary>
        /// Gets or sets the start date and time of the sell period.
        /// </summary>
        /// <value>
        /// A <see cref="DateTime"/> representing the beginning of the sell period for the product.
        /// </value>
        /// <remarks>
        /// This property is used to define when the sell period for a product begins.
        /// Ensure that the value is earlier than the <see cref="End"/> property.
        /// </remarks>
        public DateTime Start { get; set; } 
        /// <summary>
        /// Gets or sets the end date and time of the sell period.
        /// </summary>
        /// <value>
        /// A <see cref="DateTime"/> representing the conclusion of the sell period for the product.
        /// </value>
        /// <remarks>
        /// This property is used to define when the sell period for a product ends.
        /// Ensure that the value is later than the <see cref="Start"/> property.
        /// </remarks>
        public DateTime End{ get; set; }
        /// <summary>
        /// Gets or sets the price of the product for the specified sell period.
        /// </summary>
        /// <value>
        /// The price of the product, represented as a decimal value.
        /// </value>
        /// <remarks>
        /// This property is used to define the monetary value of the product during the sell period.
        /// </remarks>
        public decimal Price{ get; set; }
    }
}