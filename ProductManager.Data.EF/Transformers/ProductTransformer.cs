using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Transformers.InternalModels;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Transformers
{
    /// <summary>
    /// Class ProductTransformer.
    /// </summary>
    internal static class ProductTransformer
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public static IFullProduct? Transform(Product? product)
        {
            IFullProduct? returnValue = null;
            if (product != null)
            {
                returnValue = new FullProduct(product.Id,
                    product.Name,
                    product.ShortDescription,
                    product.Sku,
                    product.Price,
                    product.Description,
                    product.Cost,
                    product.Estimated,
                    (product.Characteristics ?? new List<ProductCharacteristic>()).Cast<IProductCharacteristic>(),
                    (product.Options ?? new List<ProductOption>()).Select(ProductOptionTransformer.Transform).Cast<IFullProductOption>(),
                    (product.Reductions ?? new List<ProductSell>()).Cast<IProductSell>());
            }
            return returnValue;
        }
    }
}