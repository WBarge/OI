using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Repos
{
    public interface IProductSellRepo
    {
        /// <summary>
        /// Creates an instance of the product sell
        /// </summary>
        /// <returns></returns>
        IProductSell CreateInstance();

        /// <summary>
        /// gets all the sell periods for a product
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        Task<IEnumerable<IProductSell>> ListProductSellsAsync(Guid productId, CancellationToken token = default);

        /// <summary>
        /// Adds a product sell to the database
        /// </summary>
        /// <param name="productSell"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        Task<Guid> AddProductSellAsync(IProductSell productSell, CancellationToken token = default);

        /// <summary>
        /// removes a product sell from the system by flagging it as deleted
        /// </summary>
        /// <param name="id"></param>
        /// <param name="token"></param>
        Task DeleteAsync(Guid id, CancellationToken token=default);
    }
}