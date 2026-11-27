using OI.Common.Extensions.Comparison;
using Microsoft.EntityFrameworkCore;
using ProductManager.Data.EF.Helpers;
using ProductManager.Data.EF.Model;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Data.EF.Repos
{
    /// <summary>
    /// Represents a repository for managing <see cref="Option"/> entities.
    /// </summary>
    internal class OptionRepo : BaseEfRepo<Option>, IOptionRepo
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="OptionRepo"/> class.
        /// </summary>
        /// <param name="dbContext"></param>
        public OptionRepo(ProductDbContext dbContext) : base(dbContext)
        {
        }

        /// <summary>
        /// Finds paged product records based on filter criteria.
        /// </summary>
        /// <param name="filterCriteria"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<IEnumerable<IOption>> FindPagedProductRecordsAsync(
            Dictionary<string, IFilterMetaData[]> filterCriteria = null!,
            int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            filterCriteria ??= new Dictionary<string, IFilterMetaData[]>();
            IFilterMetaData[] list = new IFilterMetaData[1];
            list[0] = new FilterCriteria()
            {
                SearchValue = "False",
                MatchMode = FilteringEngine.EQUALS_COMPARISON,
                LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
            };
            filterCriteria.Add("Deleted", list);
            IEnumerable<IOption> results =
                await FindByConditionPagedAsync(filterCriteria, pageNumber, pageSize, cancellationToken);
            return results;
        }

        /// <summary>
        /// Gets the count of non-deleted options.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<long> GetOptionCountAsync(CancellationToken cancellationToken = default)
        {
            long result = 0;
            await Task.Run(() =>
            {
                result = DbContext.Options.Where(o => o.Deleted == false).LongCount();
                return Task.CompletedTask;
            }, cancellationToken).WaitAsync(cancellationToken);
            return result;
        }

        /// <summary>
        /// Creates an instance of an option.
        /// </summary>
        /// <returns></returns>
        public IOption CreateInstance()
        {
            return Create();
        }

        /// <summary>
        /// Adds a new option.
        /// </summary>
        /// <param name="option"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Guid> AddOptionAsync(IOption option, CancellationToken cancellationToken = default)
        {
            string localName = option.Name ?? throw new ArgumentException(nameof(option.Name));
            decimal localPrice = option.Price <= 0 ? throw new ArgumentException(nameof(option.Price)) : option.Price;
            decimal localCost = option.Cost <= 0 ? throw new ArgumentException(nameof(option.Cost)) : option.Cost;

            Option p = Create();
            p.Name = localName;
            p.Description = option.Description;
            p.Price = localPrice;
            p.Cost = localCost;
            p.Estimated = option.Estimated;
            try
            {
                await InsertAsync(p, cancellationToken);
                await SaveAsync(cancellationToken);
            }
            catch(Exception ex)
            {
                throw new Exception("Error creating option", ex);
            }
            return p.Id;
        }

        /// <summary>
        /// Updates an existing option.
        /// </summary>
        /// <param name="option"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<bool> UpdateOptionAsync(IOption option, CancellationToken cancellationToken = default)
        {
            Option? existingOption = await DbContext.Options.FirstOrDefaultAsync(p => p.Id == option.Id, cancellationToken: cancellationToken);
            if (existingOption == null)
            {
                return false;
            }

            existingOption.Name = option.Name ?? existingOption.Name;
            existingOption.Description = option.Description ?? existingOption.Description;
            existingOption.Price = option.Price <= 0 ? existingOption.Price : option.Price;
            existingOption.Cost = option.Cost <= 0 ? existingOption.Cost : option.Cost;
            existingOption.Estimated = option.Estimated <= 0 ? existingOption.Estimated : option.Estimated; 

            Update(existingOption);
            await SaveAsync(cancellationToken);
            return true;
        }

        /// <summary>
        /// Marks an option as deleted.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            Option p = await this.DbContext.Options.FirstAsync(p => p.Id == id, cancellationToken: cancellationToken);
            if (p.IsNotEmpty())
            {
                p.Deleted = true;
                Update(p);
                await SaveAsync(cancellationToken);
            }
        }

        /// <summary>
        /// Retrieves an option by its ID.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<IOption?> GetOptionAsync(Guid id, CancellationToken cancellationToken)
        {
            IOption? returnValue = null;
            Option? p = await DbContext.Options
                .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

            if (p.IsNotEmpty())
            {
                returnValue = p;
            }

            return returnValue;
        }

    }
}