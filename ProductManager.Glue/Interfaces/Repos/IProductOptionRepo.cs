using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Repos
{
    public interface IProductOptionRepo
    {
        /// <summary>
        /// Creates an instance of the product option.
        /// </summary>
        /// <returns></returns>
        IProductOption CreateInstance();

        /// <summary>
        /// Adds a product option asynchronously.
        /// </summary>
        /// <param name="productOption"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        Task<Guid> AddProductOptionAsync(IProductOption productOption, CancellationToken cancellationToken = default);

        /// <summary>
        /// Deletes a product option asynchronously.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        Task DeleteAsync(Guid id,CancellationToken cancellationToken = default);
    }
}