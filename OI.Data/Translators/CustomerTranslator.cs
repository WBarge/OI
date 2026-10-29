using OI.Data.Model.Orders;
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

    /// <summary>
    /// Projects customers to <see cref="ICustomerSearch"/>: id, first name, last name and phone number.
    /// Expressed as a query projection so EF only selects those four columns.
    /// </summary>
    /// <param name="customers">The customers to project.</param>
    /// <returns>The projected customers.</returns>
    public static IQueryable<Internal_Models.CustomerSearch> ToSearch(this IQueryable<Customer> customers)
    {
        return customers.Select(c => new Internal_Models.CustomerSearch
        {
            Id = c.Id,
            FirstName = c.FirstName ?? string.Empty,
            LastName = c.LastName,
            PhoneNumber = c.PhoneNumber
        });
    }
}