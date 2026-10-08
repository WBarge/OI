namespace OI.Glue.Models;

public interface ICustomer
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the customer.
    /// </summary>
    Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the last name.
    /// </summary>  
    string LastName { get; set; }

    /// <summary>
    /// Gets or sets the first name.
    /// </summary>
    string? FirstName { get; set; }

    /// <summary>
    /// Gets or sets the email address.
    /// </summary>
    string PhoneNumber { get; set; }

    /// <summary>
    /// Gets or sets the default billing address line 1.
    /// </summary>
    string? DefaultBillingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the default billing address line 2.
    /// </summary>
    string? DefaultBillingAddress2 { get; set; }

    /// <summary>
    /// Gets or sets the default billing city.
    /// </summary>
    string? DefaultBillingCity { get; set; }

    /// <summary>
    /// Gets or sets the default billing state code.
    /// </summary>
    string? DefaultBillingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the default billing zip code.
    /// </summary>
    string? DefaultBillingZipCode { get; set; }

    /// <summary>
    /// Gets or sets the default shipping address line 1.
    /// </summary>
    string? DefaultShippingAddress1 { get; set; }

    /// <summary>
    /// Gets or sets the default shipping address line 2.
    /// </summary>
    string? DefaultShippingAddress2 { get; set; }

    /// <summary>
    /// Gets or sets the default shipping city.
    /// </summary>
    string? DefaultShippingCity { get; set; }

    /// <summary>
    /// Gets or sets the default shipping state code.
    /// </summary>
    string? DefaultShippingStateCode { get; set; }

    /// <summary>
    /// Gets or sets the default shipping zip code.
    /// </summary>
    string? DefaultShippingZipCode { get; set; }
}