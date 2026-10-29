using CrossCutting.Exceptions;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Helpers;
using OI.Data.Translators;
using OI.Data.Translators.Internal_Models;
using OI.Glue.Models;
using OI.Glue.Repos;
using Customer = OI.Data.Model.Orders.Customer;

namespace OI.Data.Repos;

internal class CustomerRepo(OiServiceDbContext serviceDbContext) : BaseEfRepo<Customer>(serviceDbContext), ICustomerRepo
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

        IQueryable<Customer> filtered = await ServiceDbContext.Customers.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
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
        IQueryable<Customer> filtered = await ServiceDbContext.Customers.BuildFilterQueryAsync(filterCriteria!, cancellationToken);
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

    public async Task UpdateCustomerAsync(IUpdateCustomer request, CancellationToken token = default)
    {
        Customer? preexisting = await base.FindByIdAsync(request.Id,token);
        if (preexisting == null)
        {
            throw new RequiredObjectException("customer was not found");
        }

        preexisting.LastName = request.LastName;
        preexisting.FirstName = request.FirstName;
        preexisting.PhoneNumber = request.PhoneNumber;
        preexisting.DefaultBillingAddress1 = request.DefaultBillingAddress1;
        preexisting.DefaultBillingAddress2 = request.DefaultBillingAddress2;
        preexisting.DefaultBillingCity = request.DefaultBillingCity;
        preexisting.DefaultBillingStateCode = request.DefaultBillingStateCode;
        preexisting.DefaultBillingZipCode = request.DefaultBillingZipCode;
        preexisting.DefaultShippingAddress1 = request.DefaultShippingAddress1;
        preexisting.DefaultShippingAddress2 = request.DefaultShippingAddress2;
        preexisting.DefaultShippingCity = request.DefaultShippingCity;
        preexisting.DefaultShippingStateCode = request.DefaultShippingStateCode;
        preexisting.DefaultShippingZipCode = request.DefaultShippingZipCode;

        base.Update(preexisting);
        await SaveAsync(token);
    }
}
