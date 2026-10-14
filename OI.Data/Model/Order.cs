namespace OI.Data.Model;

/// <summary>
/// Represents an order in the system. Each order is associated with a customer and can have multiple order items, along with billing and shipping information.
/// </summary>
internal class Order
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the order.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the order number. A sequential number assigned to the order.
    /// </summary>
    public int OrderNumber { get; set; }

    /// <summary>
    /// Gets or sets the order date. The date when the order was placed.
    /// </summary>
    public DateTime OrderDate { get; set; }

    /// <summary>
    /// Gets or sets the completed date. The date when the order was completed or fulfilled.
    /// </summary>
    public DateTime? CompletedDate { get; set; }

    /// <summary>
    /// Gets or sets the customer identifier. Foreign key to the customer who placed the order.
    /// </summary>
    public Guid? CustomerId { get; set; }
    
    /// <summary>
    /// Gets or sets the customer. The customer who placed the order.
    /// </summary>
    public Customer? Customer { get; set; }

    /// <summary>
    /// Gets or sets the billing address line 1. The first line of the billing address for the order.
    /// </summary>
    public string? BillingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the billing address line 2. The second line of the billing address for the order.
    /// </summary>
    public string? BillingAddress2 { get; set; }

    /// <summary>
    /// Gets or sets the billing city. The city of the billing address for the order.
    /// </summary>
    public string? BillingCity { get; set; }

    /// <summary>
    /// Gets or sets the billing state code. The state code of the billing address for the order.
    /// </summary>
    public string? BillingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the billing zip code. The zip code of the billing address for the order.
    /// </summary>
    public string? BillingZipCode { get; set; }
    
    /// <summary>
    /// Gets or sets the shipping address line 1. The first line of the shipping address for the order.
    /// </summary>
    public string? ShippingAddress1 { get; set; }
    
    /// <summary>
    /// Gets or sets the shipping address line 2. The second line of the shipping address for the order.
    /// </summary>
    public string? ShippingAddress2 { get; set; }
    
    /// <summary>
    /// Gets or sets the shipping city. The city of the shipping address for the order.
    /// </summary>
    public string? ShippingCity { get; set; }
    
    /// <summary>
    /// Gets or sets the shipping state code. The state code of the shipping address for the order.
    /// </summary>
    public string? ShippingStateCode { get; set; }
    
    /// <summary>
    /// Gets or sets the shipping zip code. The zip code of the shipping address for the order.
    /// </summary>
    public string? ShippingZipCode { get; set; }

    /// <summary>
    /// Gets or sets the order items. The collection of items included in the order.
    /// </summary>
    public ICollection<OrderItem>? OrderItems { get; set; }

    /// <summary>
    /// Gets or sets the subtotal amount. The total cost of the order items before shipping and taxes.
    /// </summary>
    public decimal SubTotal { get; set; }

    /// <summary>
    /// Gets or sets the shipping amount. The cost of shipping for the order.
    /// </summary>
    public decimal Shipping { get; set; }

    /// <summary>
    /// Gets or sets the tax amount. The total tax applied to the order.
    /// </summary>
    public decimal Tax { get; set; }

    /// <summary>
    /// Gets or sets the total amount. The final total cost of the order, including items, shipping, and taxes.
    /// </summary>
    public decimal Total { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the order is pending. True when the order has been created but not yet processed.
    /// </summary>
    public bool IsPending { get; set; }

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