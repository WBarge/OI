using OI.Data.Model;
using OI.Glue.Models;

namespace OI.Data.Translators;

internal static class CustomerTranslator
{
    public static ICustomer Translate(this Customer customer)
    {
        return new OI.Data.Translators.Internal_Models.Customer
        {
            Id = customer.Id,
            LastName = customer.LastName,
            FirstName = customer.FirstName,
            PhoneNumber = customer.PhoneNumber,
            DefaultBillingAddress1 = customer.DefaultBillingAddress1,
            DefaultBillingAddress2 = customer.DefaultBillingAddress2,
            DefaultBillingCity = customer.DefaultBillingCity,
            DefaultBillingStateCode = customer.DefaultBillingStateCode,
            DefaultBillingZipCode = customer.DefaultBillingZipCode,
            DefaultShippingAddress1 = customer.DefaultShippingAddress1,
            DefaultShippingAddress2 = customer.DefaultShippingAddress2,
            DefaultShippingCity = customer.DefaultShippingCity,
            DefaultShippingStateCode = customer.DefaultShippingStateCode,
            DefaultShippingZipCode = customer.DefaultShippingZipCode
        };
    }
}