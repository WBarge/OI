using CrossCutting.Extensions;

namespace OI.Data.Model;

/// <summary>
/// Represents an item in an order. Each order can have multiple items, each representing a product and its quantity.
/// </summary>
internal class OrderItem
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the order item
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the order identifier. Foreign key to the order this item belongs to
    /// </summary>
    public Guid OrderId { get; set; }

    /// <summary>
    /// Gets or sets the order. The order this item belongs to
    /// </summary>
    public Order? Order { get; set; }

    /// <summary>
    /// Gets or sets the product identifier. ID to the product this item represents from the product catalog
    /// </summary>
    public Guid ProductId { get; set; }

    /// <summary>
    /// Internal storage for the product name
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
    public string Name { 
        get=>_name;
        set
        {
            _name = value.Truncate(NAME_MAX_SIZE); 
        }
    }

    /// <summary>
    /// The short description backing field
    /// </summary>
    private string _description = string.Empty;
    /// <summary>
    /// The short description maximum size
    /// </summary>
    internal const int DESCRIPTION_MAX_SIZE = 256;

    /// <summary>
    /// Gets or sets the short description.
    /// A short description for the product
    /// Is limited to 256 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The short description.</value>
    public string Description 
    { 
        get=>_description;
        set
        {
            
            _description = value.Truncate(DESCRIPTION_MAX_SIZE); 
        }
    }

    /// <summary>
    /// The internal storage for the SKU
    /// </summary>
    private string _sku = string.Empty;

    /// <summary>
    /// The sku maximum size
    /// </summary>
    internal const int SKU_MAX_SIZE = 12;

    /// <summary>
    /// Gets or sets the sku.
    /// Is limited to 12 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The sku.</value>
    public string Sku 
    { 
        get=>_sku;
        set
        {
            
            _sku = value.Truncate(SKU_MAX_SIZE); 
        }
    }

    /// <summary>
    /// Gets or sets the price.
    /// How much the product costs.
    /// </summary>
    /// <value>The price.</value>
    public decimal Price { get; set; }

    /// <summary>
    /// The number of this product in the order.
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// The total for this order item. Price * Quantity
    /// </summary>
    public decimal Total { get; set; }

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