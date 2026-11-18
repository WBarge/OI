// ***********************************************************************
// Author           : Bill Barge
// Created          : 10-16-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 10-16-2024
// ***********************************************************************
// <copyright file="FullProduct.cs" company="ProductManager.Data.EF">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using ProductManager.Glue.Interfaces.Models;
using System.Runtime.CompilerServices;

[assembly:InternalsVisibleTo("ProductManager.Service.Tests")]
namespace ProductManager.Data.EF.Transformers.InternalModels
{
    /// <summary>
    /// Class FullProduct.
    /// Implements the <see cref="IFullProduct" />
    /// </summary>
    /// <seealso cref="IFullProduct" />
    internal class FullProduct : IFullProduct
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="shortDescription"></param>
        /// <param name="sku"></param>
        /// <param name="price"></param>
        /// <param name="description"></param>
        /// <param name="est"></param>
        /// <param name="characteristics"></param>
        /// <param name="options"></param>
        /// <param name="sells"></param>
        /// <param name="cost"></param>
        public FullProduct(Guid id, 
            string name, 
            string shortDescription, 
            string sku, 
            decimal price, 
            string? description,
            decimal cost,
            decimal est,
            IEnumerable<IProductCharacteristic> characteristics, 
            IEnumerable<IFullProductOption> options, 
            IEnumerable<IProductSell> sells)
        {
            Id = id;
            Name = name;
            ShortDescription = shortDescription;
            Sku = sku;
            Price = price;
            Description = description;
            Cost = cost;
            Estimated = est;
            Characteristics = characteristics;
            Options = options;
            Sells = sells;
        }

        /// <summary>
        /// Gets or sets the identifier.
        /// primary identifier for the record
        /// </summary>
        /// <value>The identifier.</value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// the name of the product
        /// Is limited to 128 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The name.</value>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the short description.
        /// A short description for the product
        /// Is limited to 256 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The short description.</value>
        public string ShortDescription { get; set; }
        /// <summary>
        /// Gets or sets the sku.
        /// Is limited to 12 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The sku.</value>
        public string Sku { get; set; }
        /// <summary>
        /// Gets or sets the price.
        /// How much the product costs.
        /// </summary>
        /// <value>The price.</value>
        public decimal Price { get; set; }

        public decimal Cost { get; set; }

        public decimal Estimated { get; set; }
        /// <summary>
        /// Gets or sets the description.
        /// The full description of the product.
        /// Is optional
        /// </summary>
        /// <value>The description.</value>
        public string? Description { get; set; }
        /// <summary>
        /// Gets or sets the characteristics.
        /// </summary>
        /// <value>The characteristics.</value>
        public IEnumerable<IProductCharacteristic> Characteristics { get; set; }
        /// <summary>
        /// Gets or sets the options.
        /// </summary>
        /// <value>The options.</value>
        public IEnumerable<IFullProductOption> Options { get; set; }
        /// <summary>
        /// Gets or sets the sells.
        /// </summary>
        /// <value>The sells.</value>
        public IEnumerable<IProductSell> Sells { get; set; }
    }
}