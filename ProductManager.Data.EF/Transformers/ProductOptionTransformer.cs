using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Transformers.InternalModels;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Transformers
{
    /// <summary>
    /// Provides methods for transforming product options.
    /// </summary>
    internal static class ProductOptionTransformer
    {
        /// <summary>
        /// Transforms a ProductOption to a IFullProductOption.
        /// </summary>
        /// <param name="productOption"></param>
        /// <returns></returns>
        public static IFullProductOption? Transform(ProductOption? productOption)
        {
            IFullProductOption? returnValue = null;
            if (productOption != null)
            {
                returnValue = new FullProductOption();
                returnValue.Id = productOption.Id;
                returnValue.OptionId = productOption.OptionId;
                returnValue.ProductId = productOption.ProductId;
                returnValue.Price = productOption.Price;
                returnValue.Name = productOption.Option?.Name!;
            }
            return returnValue;
        }
    }
}