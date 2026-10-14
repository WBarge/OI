using Microsoft.EntityFrameworkCore;
using OI.Data.Helpers;
using OI.Data.Translators;
using OI.Data.Translators.Internal_Models;
using OI.Glue.Models;
using OI.Glue.Repos;
using Customer = OI.Data.Model.Customer;

namespace OI.Data.Repos;

internal class CustomerRepo(OiDbContext dbContext) : BaseEfRepo<Customer>(dbContext), ICustomerRepo
{
    /// <summary>
    /// Get the customer by id
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<ICustomer?> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        Customer? customer = await FindByIdAsync(id, cancellationToken);
        return customer?.Translate();
    }

    /// <summary>
    /// Gets one page of customers that match the filter criteria.
    /// The query is ordered (last name, first name, id) so that paging is stable between requests,
    /// and the paging and the four-column projection both happen in the database.
    /// </summary>
    public async Task<IEnumerable<ICustomerSearch>> FindPagedCustomerRecordsAsync(
        Dictionary<string, IFilterMetaData[]>? filterCriteria = null,
        int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        pageNumber = Math.Max(pageNumber, 1);
        pageSize = Math.Max(pageSize, 1);
        int skip = (int)Math.Min((long)pageSize * (pageNumber - 1), int.MaxValue);

        IQueryable<Customer> filtered = await DbContext.Customers.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
        List<CustomerSearch> customers = await filtered
            .OrderBy(c => c.LastName)
            .ThenBy(c => c.FirstName)
            .ThenBy(c => c.Id)
            .Skip(skip)
            .Take(pageSize)
            .ToSearch()
            .ToListAsync(cancellationToken);
        return customers;
    }

    /// <summary>
    /// Gets the total number of customers.
    /// </summary>
    public async Task<long> GetCustomerCountAsync(Dictionary<string, IFilterMetaData[]>? filterCriteria = null,CancellationToken cancellationToken = default)
    {
        IQueryable<Customer> filtered = await DbContext.Customers.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
        return await filtered.LongCountAsync(cancellationToken);
    }

    /// <summary>
    /// adds a new customer
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<ICustomer> CreateCustomerAsync(ICreateCustomer request, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        Customer customer = new()
        {
            Id = Guid.NewGuid(),
            LastName = request.LastName,
            FirstName = request.FirstName,
            PhoneNumber = request.PhoneNumber,
            DefaultBillingAddress1 = request.DefaultBillingAddress1,
            DefaultBillingAddress2 = request.DefaultBillingAddress2,
            DefaultBillingCity = request.DefaultBillingCity,
            DefaultBillingStateCode = request.DefaultBillingStateCode,
            DefaultBillingZipCode = request.DefaultBillingZipCode,
            DefaultShippingAddress1 = request.DefaultShippingAddress1,
            DefaultShippingAddress2 = request.DefaultShippingAddress2,
            DefaultShippingCity = request.DefaultShippingCity,
            DefaultShippingStateCode = request.DefaultShippingStateCode,
            DefaultShippingZipCode = request.DefaultShippingZipCode,
        };

        await InsertAsync(customer, cancellationToken);
        await SaveAsync(cancellationToken);
        return customer.Translate();
    }
}
