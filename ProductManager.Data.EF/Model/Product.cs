// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-10-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="Product.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using OI.Common.Extensions.Transformations;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model;

/// <summary>
/// Class Product.
/// Represents a product
/// </summary>
internal class Product : IProduct
{
    /// <summary>
    /// Gets or sets the identifier.
    /// primary identifier for the record
    /// </summary>
    /// <value>The identifier.</value>
    public Guid Id { get; set; }

    /// <summary>
    /// The name backing field
    /// </summary>
    private string _name = string.Empty;
    /// <summary>
    /// The name maximum size
    /// </summary>
    internal const int NAME_MAX_SIZE = 128;


    /// <summary>
    /// Gets or sets the name.
    /// the name of the product
    /// Is limited to 128 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The name.</value>
    public string Name { 
        get=>_name;
        set
        {
            _name = value.Truncate(NAME_MAX_SIZE); 
        }
    }

    /// <summary>
    /// The short description backing field
    /// </summary>
    private string _shortDescription = string.Empty;
    /// <summary>
    /// The short description maximum size
    /// </summary>
    internal const int SHORT_DESCRIPTION_MAX_SIZE = 256;

    /// <summary>
    /// Gets or sets the short description.
    /// A short description for the product
    /// Is limited to 256 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The short description.</value>
    public string ShortDescription 
    { 
        get=>_shortDescription;
        set
        {
            
            _shortDescription = value.Truncate(SHORT_DESCRIPTION_MAX_SIZE); 
        }
    }

    /// <summary>
    /// The sku
    /// </summary>
    private string _sku = string.Empty;

    /// <summary>
    /// The sku maximum size
    /// </summary>
    internal const int SKU_MAX_SIZE = 12;

    /// <summary>
    /// Gets or sets the sku.
    /// Is limited to 12 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The sku.</value>
    public string Sku 
    { 
        get=>_sku;
        set
        {
            
            _sku = value.Truncate(SKU_MAX_SIZE); 
        }
    }

    /// <summary>
    /// Gets or sets the description.
    /// The full description of the product.
    /// Is optional
    /// </summary>
    /// <value>The description.</value>
    public string? Description { get; set; }

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
    /// Gets or sets a value indicating whether this <see cref="Product" /> is deleted.
    /// </summary>
    /// <value><c>true</c> if deleted; otherwise, <c>false</c>.</value>
    public bool Deleted { get;set; }

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
    /// Gets or sets the options.
    /// represents the options available for the product
    /// </summary>
    /// <value>The options.</value>
    public ICollection<ProductOption> Options { get; set; } = new List<ProductOption>();

    /// <summary>
    /// Gets or sets the characteristics.
    /// represents the characteristics of the product
    /// </summary>
    /// <value>The characteristics.</value>
    public ICollection<ProductCharacteristic> Characteristics { get; set; } = new List<ProductCharacteristic>();

    /// <summary>
    /// Gets or sets the reductions.
    /// Represents time periods in which a product is on sale
    /// </summary>
    /// <value>The reductions.</value>
    public ICollection<ProductSell> Reductions { get; set; } = new List<ProductSell>();

}