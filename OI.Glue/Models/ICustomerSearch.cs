namespace OI.Glue.Models;

/// <summary>
/// A customer as shown in a customer search/list: just enough to identify the customer.
/// Deliberately separate from <see cref="ICustomer"/>, which carries the default addresses used when creating orders.
/// </summary>
public interface ICustomerSearch
{
    /// <summary>
    /// Gets or sets the identifier. Primary key of the customer.
    /// </summary>
    Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the first name.
    /// </summary>
    string FirstName { get; set; }

    /// <summary>
    /// Gets or sets the last name.
    /// </summary>
    string LastName { get; set; }

    /// <summary>
    /// Gets or sets the phone number.
    /// </summary>
    string PhoneNumber { get; set; }
}
