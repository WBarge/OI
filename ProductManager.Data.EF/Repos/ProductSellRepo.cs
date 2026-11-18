using Microsoft.EntityFrameworkCore;
using ProductManager.Data.EF.Model;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Data.EF.Repos
{
    /// <summary>
    /// provides a repository for managing product sells
    /// </summary>
    internal class ProductSellRepo:BaseEfRepo<ProductSell>, IProductSellRepo
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        public ProductSellRepo(ProductDbContext dbContext) : base(dbContext) { }

        /// <summary>
        /// Creates an instance of the product sell
        /// </summary>
        /// <returns></returns>
        public IProductSell CreateInstance()
        {
            return new ProductSell();
        }

        /// <summary>
        /// gets all the sell periods for a product
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<IEnumerable<IProductSell>> ListProductSellsAsync(Guid productId, CancellationToken token = default)
        {
            List<IProductSell> productSells = await DbContext.Sells
                .Where(ps => ps.ProductId == productId && !ps.Deleted)
                .Select(ps => (IProductSell)ps)
                .ToListAsync(token);
            return productSells;
        }

        /// <summary>
        /// Adds a product sell to the database
        /// </summary>
        /// <param name="productSell"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<Guid> AddProductSellAsync(IProductSell productSell, CancellationToken token = default)
        {
            if (productSell == null)
            {
                throw new ArgumentException("Invalid product sell type", nameof(productSell));
            }
            Product? p = await DbContext.Products.FirstOrDefaultAsync(p => p.Id == productSell.ProductId, token);
            if (p == null)
            {
                throw new ArgumentException("Invalid product ID", nameof(productSell));
            }

            ProductSell ps = new ProductSell();
            ps.ProductId = productSell.ProductId;
            ps.Start = productSell.Start;
            ps.End = productSell.End;
            ps.Price = productSell.Price;
            await InsertAsync(ps, token);
            await SaveAsync(token);
            return ps.Id;
        }

        /// <summary>
        /// removes a product sell from the system by flagging it as deleted
        /// </summary>
        /// <param name="id"></param>
        /// <param name="token"></param>
        public async Task DeleteAsync(Guid id, CancellationToken token=default)
        {
            ProductSell? ps = await DbContext.Sells.FirstOrDefaultAsync(ps => ps.Id == id, token);
            if (ps != null)
            {
                ps.Deleted = true;
                Update(ps);
                await SaveAsync(token);
            }
        }

    }
}