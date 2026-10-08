namespace OI.Glue.Models;

public interface IOrder
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the order.
    /// </summary>
    Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the order date. The date when the order was placed.
    /// </summary>
    DateTime OrderDate { get; set; }

    /// <summary>
    /// Gets or sets the completed date. The date when the order was completed or fulfilled.
    /// </summary>
    DateTime CompletedDate { get; set; }

    /// <summary>
    /// Gets or sets the customer identifier. Foreign key to the customer who placed the order.
    /// </summary>
    Guid CustomerId { get; set; }

    /// <summary>
    /// Gets or sets the customer. The customer who placed the order.
    /// </summary>
    ICustomer Customer { get; set; }

    /// <summary>
    /// Gets or sets the billing address line 1. The first line of the billing address for the order.
    /// </summary>
    string BillingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the billing address line 2. The second line of the billing address for the order.
    /// </summary>
    string BillingAddress2 { get; set; }

    /// <summary>
    /// Gets or sets the billing city. The city of the billing address for the order.
    /// </summary>
    string BillingCity { get; set; }

    /// <summary>
    /// Gets or sets the billing state code. The state code of the billing address for the order.
    /// </summary>
    string BillingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the billing zip code. The zip code of the billing address for the order.
    /// </summary>
    string BillingZipCode { get; set; }

    /// <summary>
    /// Gets or sets the shipping address line 1. The first line of the shipping address for the order.
    /// </summary>
    string ShippingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the shipping address line 2. The second line of the shipping address for the order.
    /// </summary>
    string ShippingAddress2 { get; set; }

    /// <summary>
    /// Gets or sets the shipping city. The city of the shipping address for the order.
    /// </summary>
    string ShippingCity { get; set; }

    /// <summary>
    /// Gets or sets the shipping state code. The state code of the shipping address for the order.
    /// </summary>
    string ShippingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the shipping zip code. The zip code of the shipping address for the order.
    /// </summary>
    string ShippingZipCode { get; set; }

    /// <summary>
    /// Gets or sets the order items. The collection of items included in the order.
    /// </summary>
    IEnumerable<IOrderItem> OrderItems { get; set; }

    /// <summary>
    /// Gets or sets the subtotal amount. The total cost of the order items before shipping and taxes.
    /// </summary>
    decimal SubTotal { get; set; }

    /// <summary>
    /// Gets or sets the shipping amount. The cost of shipping for the order.
    /// </summary>
    decimal Shipping { get; set; }

    /// <summary>
    /// Gets or sets the tax amount. The total tax applied to the order.
    /// </summary>
    decimal Tax { get; set; }

    /// <summary>
    /// Gets or sets the total amount. The final total cost of the order, including items, shipping, and taxes.
    /// </summary>
    decimal Total { get; set; }
}