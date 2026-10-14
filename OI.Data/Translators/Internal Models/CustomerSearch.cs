using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class CustomerSearch: ICustomerSearch
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
}