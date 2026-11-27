// ***********************************************************************
// Author           : Bill Barge
// Created          : 08-16-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 08-20-2024
// ***********************************************************************
// <copyright file="IProductRepo.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Repos;

/// <summary>
/// Interface IProductRepo
/// </summary>
public interface IProductRepo
{
    /// <summary>
    /// Gets the records that matches the filter criteria
    /// </summary>
    /// <param name="filterCriteria">The filter criteria.</param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="pageSize">Size of the page.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>Task&lt;IEnumerable&lt;IProduct&gt;&gt;.</returns>
    Task<IEnumerable<IProduct>> FindPagedProductRecordsAsync(Dictionary<string, IFilterMetaData[]> filterCriteria = null!,
        int pageNumber =1 , int pageSize = 10, CancellationToken cancellationToken = default);
    /// <summary>
    /// Gets the product count asynchronous.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>Task&lt;System.Int64&gt;.</returns>
    Task<long> GetProductCountAsync(CancellationToken cancellationToken);
    /// <summary>
    /// Gets the instance.
    /// </summary>
    /// <returns>IProduct.</returns>
    IProduct CreateInstance();
    /// <summary>
    /// Adds the minimum product asynchronous.
    /// </summary>
    /// <param name="product">The product.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>Task.</returns>
    Task<Guid> AddMinimumProductAsync(IProduct product,CancellationToken cancellationToken = default);
    /// <summary>
    /// Deletes the asynchronous.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>Task.</returns>
    Task DeleteAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Gets the product asynchronous.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>IProduct.</returns>
    Task<IFullProduct?> GetProductAsync(Guid id, CancellationToken cancellationToken);

    Task UpdateProductAsync(IFullProduct product, CancellationToken cancellationToken = default);
}