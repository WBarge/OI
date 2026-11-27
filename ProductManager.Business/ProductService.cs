// ***********************************************************************
// Author           : Bill Barge
// Created          : 08-16-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 08-20-2024
// ***********************************************************************
// <copyright file="ProductService.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using OI.Common.Extensions.Comparison;
using Microsoft.Extensions.Logging;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;
using ProductManager.Glue.Interfaces.Services;

namespace ProductManager.Business;

/// <summary>
/// Class ProductService.
/// Implements the <see cref="IProductService" />
/// </summary>
/// <seealso cref="IProductService" />
public class ProductService : IProductService
{
    /// <summary>
    /// The logger
    /// </summary>
    private readonly ILogger<ProductService> _logger;
    private readonly IProductRepo _productRepo;
    private readonly IProductOptionRepo _productOptionRepo;
    private readonly IProductCharacteristicRepo _productCharacteristicRepo;
    private readonly IProductSellRepo _productSellRepo;

    //******************************************
    // NOTE: THE CONSTRUCTOR IS AT THE MAXIMUM NUMBER OF INJECTED DEPENDENCIES.
    //       IF YOU NEED TO ADD MORE DEPENDENCIES, CONSIDER REFACTORING THE SERVICE INTO MULTIPLE SERVICES.
    //******************************************

    /// <summary>
    /// Initializes a new instance of the <see cref="ProductService" /> class.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="productRepo">The product repo.</param>
    /// <param name="productOptionRepo"></param>
    /// <param name="productCharacteristicRepo"></param>
    /// <param name="productSellRepo"></param>
    /// <exception cref="ArgumentNullException">logger</exception>
    /// <exception cref="ArgumentNullException">productRepo</exception>
    public ProductService(ILogger<ProductService> logger,
        IProductRepo productRepo,
        IProductOptionRepo productOptionRepo,
        IProductCharacteristicRepo productCharacteristicRepo, 
        IProductSellRepo productSellRepo)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _productRepo = productRepo ?? throw new ArgumentNullException(nameof(productRepo));
        _productOptionRepo = productOptionRepo ?? throw new ArgumentNullException(nameof(productOptionRepo));
        _productCharacteristicRepo = productCharacteristicRepo ?? throw new ArgumentNullException(nameof(productCharacteristicRepo));
        _productSellRepo = productSellRepo ?? throw new ArgumentNullException(nameof(productSellRepo));
    }

    /// <summary>
    /// Get short products as an asynchronous operation.
    /// </summary>
    /// <param name="filters">The filters.</param>
    /// <param name="page">The page.</param>
    /// <param name="pageSize">Size of the page.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task&lt;IEnumerable`1&gt; representing the asynchronous operation.</returns>
    public async Task<IEnumerable<IProduct>> GetProductsAsync(Dictionary<string, IFilterMetaData[]> filters,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        _logger.LogDebug("GetProductsAsync called");
        return await _productRepo.FindPagedProductRecordsAsync(filters, page, pageSize, cancellationToken);
    }

    /// <summary>
    /// Get product count as an asynchronous operation.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task&lt;System.Int64&gt; representing the asynchronous operation.</returns>
    public async Task<long> GetProductCountAsync(CancellationToken cancellationToken = default)
    {
        return await _productRepo.GetProductCountAsync(cancellationToken);
    }

    /// <summary>
    /// Create minimum viable product as an asynchronous operation.
    /// </summary>
    /// <param name="sku">The sku.</param>
    /// <param name="name">The name.</param>
    /// <param name="shortDescription">The short description.</param>
    /// <param name="price">The price.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    public async Task<Guid> CreateMinimumViableProductAsync(string sku, string name, string shortDescription, decimal price,
        CancellationToken cancellationToken = default)
    {
        IProduct p = _productRepo.CreateInstance();
        p.Name = name;
        p.ShortDescription = shortDescription;
        p.Sku = sku;
        p.Price = price;
        p.Description = "Currently unavailable";
        return await _productRepo.AddMinimumProductAsync(p, cancellationToken);
    }

    /// <summary>
    /// Delete product as an asynchronous operation.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    public async Task DeleteProductAsync(Guid id,CancellationToken cancellationToken = default)
    {
        await _productRepo.DeleteAsync(id, cancellationToken);
    }

    /// <summary>
    /// Get product as an asynchronous operation.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task&lt;IFullProduct&gt; representing the asynchronous operation.</returns>
    public async Task<IFullProduct?> GetProductAsync(Guid id,CancellationToken cancellationToken = default)
    {
       return await _productRepo.GetProductAsync(id, cancellationToken);
    }

    /// <summary>
    /// Adds a product option to the repository with an optional price override.
    /// </summary>
    /// <param name="productId">The unique identifier of the product to which the option will be added.</param>
    /// <param name="optionId">The unique identifier of the option to add to the product.</param>
    /// <param name="priceOverride">
    /// The price override for the product option. If the value is greater than zero, it will be used as the price; 
    /// otherwise, the price will default to zero.
    /// </param>
    /// <param name="cancellationToken">
    /// A <see cref="CancellationToken"/> that can be used to cancel the asynchronous operation.
    /// </param>
    /// <returns>
    /// A task that represents the asynchronous operation. The task result contains a boolean value indicating 
    /// whether the product option was successfully added.
    /// </returns>
    /// <exception cref="ArgumentException">
    /// Thrown when either <paramref name="productId"/> or <paramref name="optionId"/> is an empty GUID.
    /// </exception>
    public async Task<bool> AddProductOptionAsync(Guid productId, Guid optionId, decimal priceOverride, CancellationToken cancellationToken = default)
    {
        if (productId == Guid.Empty || optionId == Guid.Empty)
        {
            throw new ArgumentException("Invalid product or option ID");
        }
        IProductOption productOption = _productOptionRepo.CreateInstance();
        productOption.ProductId = productId;
        productOption.OptionId = optionId;
        productOption.Price = priceOverride > 0 ? priceOverride : decimal.Zero;
        await _productOptionRepo.AddProductOptionAsync(productOption, cancellationToken);
        return true;
    }

    /// <summary>
    /// Deletes a product option identified by the specified <paramref name="id"/>.
    /// </summary>
    /// <param name="id">The unique identifier of the product option to delete.</param>
    /// <param name="cancellationToken">
    /// A <see cref="CancellationToken"/> that can be used to cancel the operation.
    /// </param>
    /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
    public async Task DeleteProductOptionAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await _productOptionRepo.DeleteAsync(id, cancellationToken);
    }

    /// <summary>
    /// Retrieves a collection of product characteristics associated with the specified product.
    /// </summary>
    /// <param name="productId">The unique identifier of the product whose characteristics are to be listed.</param>
    /// <param name="cancellationToken">
    /// A <see cref="CancellationToken"/> to observe while waiting for the task to complete. Defaults to <see cref="CancellationToken.None"/>.
    /// </param>
    /// <returns>
    /// A task that represents the asynchronous operation. The task result contains an <see cref="IEnumerable{T}"/> of <see cref="IProductCharacteristic"/> 
    /// representing the characteristics of the specified product.
    /// </returns>
    /// <remarks>
    /// This method delegates the operation to the underlying product characteristic repository.
    /// </remarks>
    public async Task<IEnumerable<IProductCharacteristic>> ListProductCharacteristicsAsync(Guid productId, CancellationToken cancellationToken = default)
    {
        return await _productCharacteristicRepo.ListProductCharacteristicsAsync(productId, cancellationToken);
    }

    /// <summary>
    /// Adds a new characteristic to a product.
    /// </summary>
    /// <param name="productId">The unique identifier of the product to which the characteristic will be added.</param>
    /// <param name="name">The name of the characteristic.</param>
    /// <param name="value">The value of the characteristic.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>A <see cref="Guid"/> representing the unique identifier of the newly added product characteristic.</returns>
    /// <exception cref="ArgumentException">
    /// Thrown when <paramref name="productId"/> is an empty GUID, or when <paramref name="name"/> or <paramref name="value"/> is null or empty.
    /// </exception>
    public async Task<Guid> AddProductCharacteristicAsync(Guid productId, string name, string value, CancellationToken cancellationToken = default)
    {
        if (productId == Guid.Empty || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(value))
        {
            throw new ArgumentException("Invalid product or characteristic ID or value");
        }
        IProductCharacteristic productCharacteristic = _productCharacteristicRepo.CreateInstance();
        productCharacteristic.ProductId = productId;
        productCharacteristic.Name = name;
        productCharacteristic.CharacteristicValue = value;

        return await _productCharacteristicRepo.AddProductCharacteristicAsync(productCharacteristic, cancellationToken);

    }

    /// <summary>
    /// Deletes a product characteristic by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the product characteristic to delete.</param>
    /// <param name="cancellationToken">
    /// A <see cref="CancellationToken"/> that can be used to cancel the operation.
    /// </param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task DeleteProductCharacteristicAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await _productCharacteristicRepo.DeleteAsync(id, cancellationToken);
    }

    /// <summary>
    /// Adds a new sell period for a product.
    /// </summary>
    /// <param name="productId">The unique identifier of the product.</param>
    /// <param name="start">The start date of the sell period.</param>
    /// <param name="end">The end date of the sell period.</param>
    /// <param name="price">The price of the product during the sell period.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>The unique identifier of the newly created sell period.</returns>
    /// <exception cref="ArgumentException">
    /// Thrown when any of the parameters are invalid, such as an empty product ID, start date, end date, or price.
    /// </exception>
    public async Task<Guid> AddSellPeriodAsync(Guid productId, DateTime start, DateTime end, decimal price, CancellationToken cancellationToken = default)
    {
        if (productId.IsEmpty() || start.IsEmpty() || end.IsEmpty() || price.IsEmpty() || price == decimal.Zero)
        {
            throw new ArgumentException("All parameters are required");
        }

        IProductSell ps = _productSellRepo.CreateInstance();
        ps.ProductId = productId;
        ps.Start = start;
        ps.End = end;
        ps.Price = price;
        Guid result = await _productSellRepo.AddProductSellAsync(ps, cancellationToken);
        return result;
    }

    /// <summary>
    /// Deletes a sell period from the system by flagging it as deleted.
    /// </summary>
    /// <param name="id">The unique identifier of the sell period to delete.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task DeleteSellPeriodAsync(Guid id, CancellationToken token = default)
    {
        await _productSellRepo.DeleteAsync(id, token);
    }

    /// <summary>
    /// Updates the specified product asynchronously, ensuring that overlapping or redundant 
    /// product sells are removed before updating the product in the repository.
    /// </summary>
    /// <param name="product">
    /// The product to be updated. Must implement <see cref="ProductManager.Glue.Interfaces.Models.IFullProduct"/>.
    /// </param>
    /// <param name="cancellationToken">
    /// A token to monitor for cancellation requests. Defaults to <see cref="CancellationToken.None"/>.
    /// </param>
    /// <exception cref="ArgumentNullException">
    /// Thrown when the <paramref name="product"/> parameter is <c>null</c>.
    /// </exception>
    /// <remarks>
    /// If the product's <c>Sells</c> collection contains overlapping or redundant entries, 
    /// they will be removed before the product is updated in the repository.
    /// If the <c>Sells</c> collection is empty, no update will be performed.
    /// </remarks>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task UpdateProductAsync(IFullProduct product, CancellationToken cancellationToken = default)
    {
        if (product == null)
        {
            throw new ArgumentNullException(nameof(product));
        }

        if (product.Sells.Any())
        {
            List<IProductSell> originalList = product.Sells.ToList();
            List<IProductSell> toRemove = new List<IProductSell>();
            //leave as old nested for-each for maintainability
            foreach (IProductSell productSell in originalList)
            {
                foreach (IProductSell otherSell in originalList)
                {
                    if (otherSell == productSell)
                    {
                        continue;
                    }

                    if (
                        (otherSell.Period.WithIn(productSell.Period) || otherSell.Period.Overlaps(productSell.Period)) &&
                        !(toRemove.Contains(otherSell) || toRemove.Contains(productSell))
                        )
                    {
                        toRemove.Add(otherSell);
                    }
                }
            }

            foreach (IProductSell productSell in toRemove)
            {
                originalList.Remove(productSell);    
            }

            if (originalList.Count != product.Sells.Count())
            {
                product.Sells = originalList;
            }
        }
        await _productRepo.UpdateProductAsync(product,cancellationToken);
    }
}   