using OI.Glue.Models;

namespace OI.Glue.Managers;

public interface ICustomerManager
{
    /// <summary>
    /// A list of customer using filter criteria
    /// </summary>
    /// <param name="filters"></param>
    /// <param name="page"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<PagedResult<ICustomerSearch>> GetCustomersPagedAsync(Dictionary<string, IFilterMetaData[]>? filters,
        int? page,
        int? pageSize,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the total number of customers.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    Task<long> GetCustomerCountAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets a single customer, including the default billing and shipping addresses.
    /// </summary>
    /// <returns>The customer, or null when no customer has the id.</returns>
    Task<ICustomer?> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Validates and adds a customer.
    /// Surrounding spaces are trimmed and blank optional values are saved as null.
    /// </summary>
    /// <param name="request">The customer to add.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>The saved customer, including its new id.</returns>
    /// <remarks>
    /// Throws a RequiredObjectException when the request is null, and a RequestException when a required value is missing
    /// or a value is longer than its column allows. Both are reported to the client as 400 Bad Request.
    /// </remarks>
    Task<ICustomer> CreateCustomerAsync(ICreateCustomer? request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates the customer in the system
    /// </summary>
    /// <param name="request"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task UpdateCustomerAsync(IUpdateCustomer request, CancellationToken token = default);
}
