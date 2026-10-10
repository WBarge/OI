using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

internal class CustomerRepo(OiDbContext dbContext) : BaseEfRepo<Customer>(dbContext), ICustomerRepo
{
    public async Task<ICustomer?> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        Customer? customer = await FindByIdAsync(id, cancellationToken);
        return customer?.Translate();
    }
}