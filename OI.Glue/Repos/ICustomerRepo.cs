using OI.Glue.Models;

namespace OI.Glue.Repos;

/// <summary>
/// Data access for customers.
/// </summary>
public interface ICustomerRepo
{
    /// <summary>
    /// Gets a customer by id.
    /// </summary>
    /// <param name="id">The customer id.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>The customer, or null when no customer has that id.</returns>
    Task<ICustomer?> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default);
}