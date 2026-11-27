// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductOption.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model;

/// <summary>
/// Class ProductOption.
/// Represents an option for a product - can cost extra
/// </summary>
internal class ProductOption : IProductOption
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
    /// Gets or sets the option identifier.
    /// </summary>
    /// <value>The option identifier.</value>
    public Guid OptionId { get; set; }

    /// <summary>
    /// Gets or sets the price.
    /// How much the product costs.
    /// </summary>
    /// <value>The price.</value>
    public decimal Price { get; set; }

    /// <summary>
    /// The cost of the product
    /// </summary>
    public decimal Cost { get; set; }

    /// <summary>
    /// The estimated detail price of the product
    /// </summary>
    public decimal Estimated { get; set; }


    /// <summary>
    /// Gets or sets a value indicating whether this <see cref="ProductOption" /> is deleted.
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
    /// The product the option is for
    /// </summary>
    /// <value>The product.</value>
    public Product Product { get; set; } = null!;

    /// <summary>
    /// Gets or sets the option.
    /// </summary>
    /// <value>The option.</value>
    public Option Option { get; set; } = null!;
}