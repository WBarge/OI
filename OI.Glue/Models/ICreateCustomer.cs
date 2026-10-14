namespace OI.Glue.Models;

/// <summary>
/// The values needed to add a customer. The id and the audit dates are not here because the system assigns them.
/// </summary>
public interface ICreateCustomer
{
    string LastName { get; set; }
    string? FirstName { get; set; }
    string PhoneNumber { get; set; }
    string? DefaultBillingAddress1 { get; set; }
    string? DefaultBillingAddress2 { get; set; }
    string? DefaultBillingCity { get; set; }
    string? DefaultBillingStateCode { get; set; }
    string? DefaultBillingZipCode { get; set; }
    string? DefaultShippingAddress1 { get; set; }
    string? DefaultShippingAddress2 { get; set; }
    string? DefaultShippingCity { get; set; }
    string? DefaultShippingStateCode { get; set; }
    string? DefaultShippingZipCode { get; set; }
}