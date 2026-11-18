using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Services;

public interface IProductService
{
    /// <summary>
    /// Gets the short products asynchronous.
    /// </summary>
    /// <param name="filters">The filters.</param>
    /// <param name="page">The page.</param>
    /// <param name="pageSize">Size of the page.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>Task&lt;IEnumerable&lt;IShortProduct&gt;&gt;.</returns>
    Task<IEnumerable<IProduct>> GetProductsAsync(Dictionary<string, IFilterMetaData[]> filters,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default);
    Task<long> GetProductCountAsync(CancellationToken  cancellationToken = default);
    Task<Guid> CreateMinimumViableProductAsync(string sku, string name, string shortDescription, decimal price,CancellationToken cancellationToken = default);
    Task DeleteProductAsync(Guid id,CancellationToken cancellationToken = default);
    Task<IFullProduct?> GetProductAsync(Guid id, CancellationToken cancellationToken = default);
    Task<bool> AddProductOptionAsync(Guid productId, Guid optionId, decimal priceOverride, CancellationToken cancellationToken = default);
    Task DeleteProductOptionAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<IProductCharacteristic>> ListProductCharacteristicsAsync(Guid productId, CancellationToken cancellationToken = default);
    Task<Guid> AddProductCharacteristicAsync(Guid productId, string name, string value, CancellationToken cancellationToken = default);
    Task DeleteProductCharacteristicAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Guid> AddSellPeriodAsync(Guid productId, DateTime start, DateTime end, decimal price, CancellationToken cancellationToken = default);
    Task DeleteSellPeriodAsync(Guid id, CancellationToken token = default);
    Task UpdateProductAsync(IFullProduct product, CancellationToken cancellationToken = default);
}