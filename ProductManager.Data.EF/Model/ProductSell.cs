// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductSell.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using OI.Common.Models;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model;

/// <summary>
/// Class ProductSell.
/// represent a date range a product is on sell
/// </summary>
internal class ProductSell : IProductSell
{
    /// <summary>
    /// Gets or sets the identifier.
    /// primary identifier for the record
    /// </summary>
    /// <value>The identifier.</value>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the product identifier.
    /// </summary>
    /// <value>The product identifier.</value>
    public Guid ProductId { get; set; }

    /// <summary>
    /// Gets or sets the start date of the sell.
    /// </summary>
    /// <value>The start.</value>
    public DateTime Start { get; set; }

    /// <summary>
    /// Gets or sets the end date of the sell.
    /// </summary>
    /// <value>The end.</value>
    public DateTime End { get; set; }

    /// <summary>
    /// Gets or sets the time period.
    /// represents the time period the sell is valid aka going on
    /// </summary>
    /// <value>The period.</value>
    public DateRange Period
    {
        get => new(Start, End);
        set
        {
            Start = value.Start;
            End = value.End;
        }
    }

    /// <summary>
    /// Gets or sets the price for the date range.
    /// </summary>
    /// <value>The price.</value>
    public decimal Price { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this <see cref="ProductSell" /> is deleted.
    /// </summary>
    /// <value><c>true</c> if deleted; otherwise, <c>false</c>.</value>
    public bool Deleted { get; set; }

    /// <summary>
    /// Gets or sets the created.
    /// represents when the record was created
    /// </summary>
    /// <value>The created.</value>
    public DateTime Created { get; set; }

    /// <summary>
    /// Gets or sets the modified.
    /// represents when the record was last changed
    /// </summary>
    /// <value>The modified.</value>
    public DateTime? Modified { get; set; }

    /// <summary>
    /// Gets or sets the product.
    /// The product the sell is for
    /// </summary>
    /// <value>The product.</value>
    public Product Product { get; set; } = null!;
}