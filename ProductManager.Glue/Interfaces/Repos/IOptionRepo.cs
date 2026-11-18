using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Repos
{
    public interface IOptionRepo
    {
        /// <summary>
        /// Finds paged product records based on filter criteria.
        /// </summary>
        /// <param name="filterCriteria"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IEnumerable<IOption>> FindPagedProductRecordsAsync(
            Dictionary<string, IFilterMetaData[]> filterCriteria = null!,
            int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets the count of non-deleted options.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<long> GetOptionCountAsync(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates an instance of an option.
        /// </summary>
        /// <returns></returns>
        IOption CreateInstance();

        /// <summary>
        /// Adds a new option.
        /// </summary>
        /// <param name="option"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<Guid> AddOptionAsync(IOption option, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates an existing option.
        /// </summary>
        /// <param name="option"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<bool> UpdateOptionAsync(IOption option, CancellationToken cancellationToken = default);

        /// <summary>
        /// Marks an option as deleted.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Retrieves an option by its ID.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IOption?> GetOptionAsync(Guid id, CancellationToken cancellationToken);
    }
}