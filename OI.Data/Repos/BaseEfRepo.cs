// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="BaseEfRepo.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using OI.Data.Helpers;
using OI.Glue.Models;

namespace OI.Data.Repos;

/// <summary>
/// Class BaseEfRepo.
/// To be used when the repo represents the table in the db
/// </summary>
/// <typeparam name="T"></typeparam>
internal abstract class BaseEfRepo<T> where T : class
{
    /// <summary>
    /// Gets the database context.
    /// </summary>
    /// <value>The database context.</value>
    protected OiDbContext DbContext { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="BaseEfRepo{T}" /> class.
    /// </summary>
    /// <param name="dbContext">The database context.</param>
    /// <exception cref="ArgumentNullException">dbContext</exception>
    protected BaseEfRepo(OiDbContext dbContext)
    {
        DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    /// <summary>
    /// get all records as an asynchronous operation.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>List&lt;T&gt;.</returns>
    protected virtual async Task<List<T>> GetAllRecordsAsync(CancellationToken cancellationToken = default)
    {
        return await DbContext.Set<T>().ToListAsync(cancellationToken);
    }

    /// <summary>
    /// get all records paged as an asynchronous operation.
    /// </summary>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="pageSize">Size of the page.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>List&lt;T&gt;.</returns>
    protected virtual async Task<List<T>> GetAllRecordsPagedAsync(int pageNumber = 1, int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        return await DbContext.Set<T>().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToListAsync(cancellationToken);
    }


    /// <summary>
    /// Find by condition paged as an asynchronous operation.
    /// </summary>
    /// <param name="filterCriteria"></param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="pageSize">Size of the page.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task&lt;List`1&gt; representing the asynchronous operation.</returns>
    protected virtual async Task<List<T>> FindByConditionPagedAsync(Dictionary<string, IFilterMetaData[]> filterCriteria = null!, int pageNumber = 1,
        int pageSize = 10, CancellationToken cancellationToken = default)
    {
        IQueryable<T> query = await DbContext.Set<T>().BuildFilterQueryAsync(filterCriteria,cancellationToken);
        List<T> results = await query.ToListAsync(cancellationToken: cancellationToken);
        await Task.Run(() =>
        {
            results = results.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList();
            return Task.CompletedTask;
        }, cancellationToken);
        return results;
    }

    /// <summary>
    /// find by condition as an asynchronous operation.
    /// </summary>
    /// <param name="expression">The expression.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>List&lt;T&gt;.</returns>
    protected virtual async Task<List<T>> FindByConditionAsync(Expression<Func<T, bool>> expression,
        CancellationToken cancellationToken = default)
    {
        return await DbContext.Set<T>().Where(expression).ToListAsync(cancellationToken);
    }

    /// <summary>
    /// Find a record by the primary key
    /// assumes the ids are guids
    /// </summary>
    /// <param name="id"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    protected virtual async Task<T?> FindByIdAsync(Guid id,CancellationToken token=default)
    {
        // ReSharper disable once MethodSupportsCancellation
        return await DbContext.Set<T>().FindAsync(id, token);
    }

    /// <summary>
    /// Creates this instance.
    /// </summary>
    /// <returns>T.</returns>
    protected virtual T Create() => Activator.CreateInstance<T>();

    /// <summary>
    /// insert as an asynchronous operation.
    /// </summary>
    /// <param name="entity">The entity.</param>
    /// <param name="token"></param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    protected virtual async Task InsertAsync(T entity, CancellationToken token = default)
    {
        Type entityType = typeof(T);
        entityType.GetProperty("Created")?.SetValue(entity, DateTime.UtcNow);
        await DbContext.Set<T>().AddAsync(entity,token);
    }

    /// <summary>
    /// Updates the specified entity.
    /// </summary>
    /// <param name="entity">The entity.</param>
    protected virtual void Update(T entity)
    {
        Type entityType = typeof(T);
        entityType.GetProperty("Modified")?.SetValue(entity, DateTime.UtcNow);
        DbContext.Set<T>().Update(entity);
    }

    /// <summary>
    /// Deletes the specified entity.
    /// </summary>
    /// <param name="entity">The entity.</param>
    protected virtual void Delete(T entity)
    {
        DbContext.Set<T>().Remove(entity);
    }

    /// <summary>
    /// save as an asynchronous operation.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    protected async Task SaveAsync(CancellationToken cancellationToken = default)
    {
        await DbContext.SaveChangesAsync(cancellationToken);
    }
}