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

    /// <summary>
    /// Gets one page of the customers that match the filter criteria, ordered by last name, then first name.
    /// Returns the lightweight <see cref="ICustomerSearch"/> model (id, first name, last name, phone number), not the full customer.
    /// </summary>
    /// <param name="filterCriteria">The filter criteria keyed by customer property name. Null or empty returns every customer.</param>
    /// <param name="pageNumber">The 1-based page number. Values below 1 are treated as 1.</param>
    /// <param name="pageSize">The number of customers per page. Values below 1 are treated as 1.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>The customers on the requested page; empty when the page is past the last record.</returns>
    Task<IEnumerable<ICustomerSearch>> FindPagedCustomerRecordsAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null,
        int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the total number of customers.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>The number of customer records.</returns>
    Task<long> GetCustomerCountAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null,CancellationToken cancellationToken = default);

    /// <summary>
    /// Adds a customer. The repo assigns the id and the created date.
    /// </summary>
    /// <param name="request">The customer to add. The values are saved as given; validation is the caller's job.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>The saved customer, including its new id.</returns>
    Task<ICustomer> CreateCustomerAsync(ICreateCustomer request, CancellationToken cancellationToken = default);

    Task UpdateCustomerAsync(IUpdateCustomer request, CancellationToken token = default);
}