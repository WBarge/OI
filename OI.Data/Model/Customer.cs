namespace OI.Data.Model;

/// <summary>
/// Represents a customer in the system. Each customer can have multiple orders, and may have default billing and shipping addresses.
/// </summary>
internal class Customer
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the customer.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the last name.
    /// </summary>  
    public required string LastName { get; set; }

    /// <summary>
    /// Gets or sets the first name.
    /// </summary>
    public string? FirstName { get; set; }

    /// <summary>
    /// Gets or sets the email address.
    /// </summary>
    public required string PhoneNumber { get; set; }

    /// <summary>
    /// Gets or sets the default billing address line 1.
    /// </summary>
    public string? DefaultBillingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the default billing address line 2.
    /// </summary>
    public string? DefaultBillingAddress2 { get; set; }

    /// <summary>
    /// Gets or sets the default billing city.
    /// </summary>
    public string? DefaultBillingCity { get; set; }

    /// <summary>
    /// Gets or sets the default billing state code.
    /// </summary>
    public string? DefaultBillingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the default billing zip code.
    /// </summary>
    public string? DefaultBillingZipCode { get; set; }
    
    /// <summary>
    /// Gets or sets the default shipping address line 1.
    /// </summary>
    public string? DefaultShippingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the default shipping address line 2.
    /// </summary>
    public string? DefaultShippingAddress2 { get; set; }
    
    /// <summary>
    /// Gets or sets the default shipping city.
    /// </summary>
    public string? DefaultShippingCity { get; set; }

    /// <summary>
    /// Gets or sets the default shipping state code.
    /// </summary>
    public string? DefaultShippingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the default shipping zip code.
    /// </summary>
    public string? DefaultShippingZipCode { get; set; }

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