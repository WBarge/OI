using OI.Common.Models;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Service.Models.Request
{
    /// <summary>
    /// request object to contain a full product
    /// </summary>
    public class FullProductRequest 
    {
        /// <summary>
        /// id
        /// </summary>
        public Guid Id { get; set; } = Guid.Empty;

        /// <summary>
        /// The name of the product
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// a short description for the product
        /// </summary>
        public string ShortDescription { get; set; } = string.Empty;

        /// <summary>
        /// a sku number for the product
        /// </summary>
        public string Sku { get; set; } = string.Empty;

        /// <summary>
        /// the price of the product the customer is expected to pay
        /// </summary>
        public decimal Price { get; set; } = decimal.Zero;

        /// <summary>
        /// The cost of the product
        /// </summary>
        public decimal Cost { get; set; } = decimal.Zero;

        /// <summary>
        /// The estimated manufacture price
        /// </summary>
        public decimal Estimated { get; set; } = decimal.Zero;

        /// <summary>
        /// The full description of the product
        /// </summary>
        public string? Description { get; set; } = string.Empty;

        /// <summary>
        /// the characteristics of the product
        /// </summary>
        public List<ProdChar> Characteristics { get; set; } = [];

        /// <summary>
        /// Any options that have been added to the product
        /// </summary>
        public List<ProOption> Options { get; set; } = [];

        /// <summary>
        /// Any time periods the product is on sell
        /// </summary>
        public List<ProdSell> Sells { get; set; } = [];
    }

    /// <summary>
    /// The characteristic for a product
    /// </summary>
    public class ProdChar : IProductCharacteristic
    {
        /// <summary>
        /// primary id
        /// </summary>
        public Guid Id { get; set; } = Guid.Empty;

        /// <summary>
        /// id of the product
        /// </summary>
        public Guid ProductId { get; set; } = Guid.Empty;

        /// <summary>
        /// the name of the characteristic
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// the value of the characteristic
        /// </summary>
        public string CharacteristicValue { get; set; } = string.Empty;
    }

    /// <summary>
    /// an option for the product
    /// </summary>
    public class ProOption : IFullProductOption
    {
        /// <summary>
        /// the id
        /// </summary>
        public Guid Id { get; set; } = Guid.Empty;

        /// <summary>
        /// the id of the option
        /// </summary>
        public Guid OptionId { get; set; } = Guid.Empty;

        /// <summary>
        /// the id of the product the option is for
        /// </summary>
        public Guid ProductId { get; set; } = Guid.Empty;

        /// <summary>
        /// the price of the option
        /// </summary>
        public decimal Price { get; set; } = decimal.Zero;

        /// <summary>
        /// the name of the option
        /// </summary>
        public string Name { get; set; } = string.Empty;
    }

    /// <summary>
    /// a fancy date range in which the product is on sell
    /// </summary>
    public class ProdSell : IProductSell
    {
        /// <summary>
        /// the id
        /// </summary>
        public Guid Id { get; set; } = Guid.Empty;

        /// <summary>
        /// the product id
        /// </summary>
        public Guid ProductId { get; set; } = Guid.Empty;

        /// <summary>
        /// the start date of the sell
        /// </summary>
        public DateTime Start { get; set; } = new DateTime();

        /// <summary>
        /// the end date of the sell
        /// </summary>
        public DateTime End { get; set; } = new DateTime();

        /// <summary>
        /// The sale dates as a range
        /// </summary>
        public DateRange Period { get; set; } = new DateRange();

        /// <summary>
        /// the price of the product during the sell period.
        /// </summary>
        public decimal Price { get; set; } = decimal.Zero;
    }
}