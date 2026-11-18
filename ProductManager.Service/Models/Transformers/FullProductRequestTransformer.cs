using ProductManager.Glue.Interfaces.Models;
using ProductManager.Service.Models.Request;

namespace ProductManager.Service.Models.Transformers
{
    /// <summary>
    /// 
    /// </summary>
    public static class FullProductRequestTransformer
    {
        /// <summary>
        /// Transforms a <see cref="FullProductRequest"/> into an <see cref="IFullProduct"/>.
        /// </summary>
        /// <param name="request">the request to transform</param>
        /// <returns>an <see cref="IFullProduct"/> populated from the request</returns>
        /// <exception cref="ArgumentNullException">thrown when <paramref name="request"/> is null</exception>
        public static IFullProduct TransformFullProductRequest(this FullProductRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);

            return new FullProduct
            {
                Id = request.Id,
                Name = request.Name,
                ShortDescription = request.ShortDescription,
                Sku = request.Sku,
                Price = request.Price,
                Cost = request.Cost,
                Estimated = request.Estimated,
                Description = request.Description,

                // ProdChar already implements IProductCharacteristic, ProOption already
                // implements IFullProductOption, and ProdSell already implements
                // IProductSell, but List<T> is not covariant so each item needs to be
                // upcast to the interface type before being exposed as IEnumerable<TInterface>.
                Characteristics = request.Characteristics
                    .Select(c => (IProductCharacteristic)c)
                    .ToList(),

                Options = request.Options
                    .Select(o => (IFullProductOption)o)
                    .ToList(),

                Sells = request.Sells
                    .Select(s => (IProductSell)s)
                    .ToList()
            };
        }

        private class FullProduct : IFullProduct
        {
            public Guid Id { get; set; } = Guid.Empty;
            public string Name { get; set; } = string.Empty;
            public string ShortDescription { get; set; } = string.Empty;
            public string Sku { get; set; } = string.Empty;
            public decimal Price { get; set; } = decimal.Zero;
            public decimal Cost { get; set; } = decimal.Zero;
            public decimal Estimated { get; set; } = decimal.Zero;
            public string? Description { get; set; }  = string.Empty;
            public IEnumerable<IProductCharacteristic> Characteristics { get; set; } = null!;
            public IEnumerable<IFullProductOption> Options { get; set; } = null!;
            public IEnumerable<IProductSell> Sells { get; set; } = null!;
        }
    }
}
