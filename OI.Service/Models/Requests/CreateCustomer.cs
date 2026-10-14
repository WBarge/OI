using OI.Glue.Models;

namespace OI.Service.Models.Requests;

/// <summary>
/// Represents the request body for adding a customer.
/// The id is not part of the request because the system assigns it.
/// </summary>
public class CreateCustomer : ICreateCustomer
{
    /// <summary>
    /// last name for the customer
    /// </summary>
    public required string LastName { get; set; } = string.Empty;
    /// <summary>
    /// first name for the customer
    /// </summary>
    public string? FirstName { get; set; }
    /// <summary>
    /// phone number for the customer
    /// </summary>
    public required string PhoneNumber { get; set; } = string.Empty;
    /// <summary>
    /// default billing address line 1
    /// </summary>
    public string? DefaultBillingAddress1 { get; set; }
    /// <summary>
    /// default billing address line 2
    /// </summary>
    public string? DefaultBillingAddress2 { get; set; }
    /// <summary>
    /// default billing address city
    /// </summary>
    public string? DefaultBillingCity { get; set; }
    /// <summary>
    /// default billing address state
    /// </summary>
    public string? DefaultBillingStateCode { get; set; }
    /// <summary>
    /// default bill address zip
    /// </summary>
    public string? DefaultBillingZipCode { get; set; }
    /// <summary>
    /// default shipping address line 1
    /// </summary>
    public string? DefaultShippingAddress1 { get; set; }
    /// <summary>
    /// default shipping address line 2
    /// </summary>
    public string? DefaultShippingAddress2 { get; set; }
    /// <summary>
    /// default shipping address city
    /// </summary>
    public string? DefaultShippingCity { get; set; }
    /// <summary>
    /// default shipping address state
    /// </summary>
    public string? DefaultShippingStateCode { get; set; }
    /// <summary>
    /// default shipping address zip
    /// </summary>
    public string? DefaultShippingZipCode { get; set; }
}