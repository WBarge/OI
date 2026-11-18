using Microsoft.EntityFrameworkCore;
using ProductManager.Data.EF.Model;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Data.EF.Repos
{
    /// <summary>
    ///  provides a repository for managing product characteristics in the database using Entity Framework.
    /// </summary>
    internal class ProductCharacteristicRepo : BaseEfRepo<ProductCharacteristic>, IProductCharacteristicRepo
    {
        /// <summary>
        /// creates a new instance of the <see cref="ProductCharacteristicRepo"/> class.
        /// </summary>
        /// <param name="dbContext"></param>
        public ProductCharacteristicRepo(ProductDbContext dbContext) : base(dbContext)
        {
        }

        /// <summary>
        /// Creates an instance of the product characteristic.
        /// </summary>
        /// <returns></returns>
        public IProductCharacteristic CreateInstance()
        {
            return new ProductCharacteristic();
        }

        /// <summary>
        /// gets a list of product characteristics for a specific product asynchronously.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<IEnumerable<IProductCharacteristic>> ListProductCharacteristicsAsync(Guid productId, CancellationToken cancellationToken = default)
        {
            List<IProductCharacteristic> productCharacteristics = await DbContext.ProductCharacteristics
                .Where(pc => !pc.Deleted && pc.ProductId == productId && !pc.Deleted)
                .Select(pc => (IProductCharacteristic)pc)
                .ToListAsync(cancellationToken);
            return productCharacteristics;
        }

        /// <summary>
        /// Adds a product characteristic to the database.
        /// </summary>
        /// <param name="productCharacteristic"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<Guid> AddProductCharacteristicAsync(IProductCharacteristic productCharacteristic, CancellationToken cancellationToken = default)
        {
            if (productCharacteristic == null)
            {
                throw new ArgumentException("Invalid product characteristic type", nameof(productCharacteristic));
            }
            Product? p = await DbContext.Products.FirstOrDefaultAsync(p => p.Id == productCharacteristic.ProductId, cancellationToken: cancellationToken);
            if (p == null)
            {
                throw new ArgumentException("Invalid product ID", nameof(productCharacteristic));
            }
            ProductCharacteristic pc = new ProductCharacteristic();
            pc.ProductId = productCharacteristic.ProductId;
            pc.Name = productCharacteristic.Name;
            pc.CharacteristicValue = productCharacteristic.CharacteristicValue;
            await InsertAsync(pc, cancellationToken);
            await SaveAsync(cancellationToken);
            return pc.Id;
        }

        /// <summary>
        /// removes a product characteristic from the database by marking it as deleted.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            ProductCharacteristic? pc = await DbContext.ProductCharacteristics.FirstOrDefaultAsync(pc => pc.Id == id, cancellationToken: cancellationToken);
            if (pc != null)
            {
                pc.Deleted = true;
                Update(pc);
                await SaveAsync(cancellationToken);
            }
        }

    }
}