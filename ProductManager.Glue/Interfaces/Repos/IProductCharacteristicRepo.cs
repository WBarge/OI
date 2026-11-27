using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Repos
{
    public interface IProductCharacteristicRepo
    {
        /// <summary>
        /// Creates an instance of the product characteristic.
        /// </summary>
        /// <returns></returns>
        IProductCharacteristic CreateInstance();

        /// <summary>
        /// gets a list of product characteristics for a specific product asynchronously.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IEnumerable<IProductCharacteristic>> ListProductCharacteristicsAsync(Guid productId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Adds a product characteristic to the database.
        /// </summary>
        /// <param name="productCharacteristic"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        Task<Guid> AddProductCharacteristicAsync(IProductCharacteristic productCharacteristic, CancellationToken cancellationToken = default);

        /// <summary>
        /// removes a product characteristic from the database by marking it as deleted.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}