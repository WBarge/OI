using OI.Glue.Models;

namespace OI.Service.Models.Requests;

/// <summary>
/// request object to update a customer
/// </summary>
public class UpdateCustomer : CreateCustomer, IUpdateCustomer
{
    /// <summary>
    /// id of the customer
    /// </summary>
    public Guid Id { get; set; }
}