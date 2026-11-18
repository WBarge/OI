using OI.Common.Extensions.Comparison;
using Microsoft.EntityFrameworkCore;
using ProductManager.Data.EF.Model;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Data.EF.Repos
{
    /// <summary>
    /// Represents a repository for managing product options.
    /// </summary>
    internal class ProductOptionRepo : BaseEfRepo<ProductOption>, IProductOptionRepo
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ProductOptionRepo"/> class.
        /// </summary>
        /// <param name="dbContext"></param>
        public ProductOptionRepo(ProductDbContext dbContext) : base(dbContext)
        {
        }

        /// <summary>
        /// Creates an instance of the product option.
        /// </summary>
        /// <returns></returns>
        public IProductOption CreateInstance()
        {
            return new ProductOption();
        }

        /// <summary>
        /// Adds a product option asynchronously.
        /// </summary>
        /// <param name="productOption"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<Guid> AddProductOptionAsync(IProductOption productOption, CancellationToken cancellationToken = default)
        {
            try
            {

            if (productOption == null)
            {
                throw new ArgumentException("Invalid product option type", nameof(productOption));
            }
            Product? p = await DbContext.Products.FirstOrDefaultAsync(p=>p.Id == productOption.ProductId, cancellationToken: cancellationToken);
            Option? o = await DbContext.Options.FirstOrDefaultAsync(o => o.Id == productOption.OptionId, cancellationToken: cancellationToken);
            if (p == null || o == null)
            {
                throw new ArgumentException("Invalid product or option ID", nameof(productOption));
            }


            ProductOption po = new ProductOption();
            po.ProductId = productOption.ProductId;
            po.OptionId = productOption.OptionId;
            po.Price = productOption.Price > 0 ? productOption.Price : o.Price;//ensure that the price is set to the option price if not overridden or if the caller did not put this logic in
            await InsertAsync(po, cancellationToken);
            await SaveAsync(cancellationToken);
            return po.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        /// <summary>
        /// Deletes a product option asynchronously.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        public async Task DeleteAsync(Guid id,CancellationToken cancellationToken = default)
        {
            ProductOption? po = await DbContext.ProductOptions.FirstOrDefaultAsync(po => po.Id == id, cancellationToken: cancellationToken);
            if (po.IsNotEmpty())
            {
                po!.Deleted = true;
                Update(po);
                await SaveAsync(cancellationToken);
            }
        }

    }
}