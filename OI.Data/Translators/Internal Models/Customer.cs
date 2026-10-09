using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class Customer : ICustomer
{
    public Guid Id { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;
    public string? DefaultBillingAddress1 { get; set; }
    public string? DefaultBillingAddress2 { get; set; }
    public string? DefaultBillingCity { get; set; }
    public string? DefaultBillingStateCode { get; set; }
    public string? DefaultBillingZipCode { get; set; }
    public string? DefaultShippingAddress1 { get; set; }
    public string? DefaultShippingAddress2 { get; set; }
    public string? DefaultShippingCity { get; set; }
    public string? DefaultShippingStateCode { get; set; }
    public string? DefaultShippingZipCode { get; set; }
}