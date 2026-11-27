// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductCharacteristic.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using OI.Common.Extensions.Transformations;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model;

/// <summary>
/// Class ProductCharacteristic.
/// Could also be called part of a spec
/// e.g.    color red
/// Ram 16G
/// Length 16"
/// </summary>
internal class ProductCharacteristic : IProductCharacteristic
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
    /// The name backing field
    /// </summary>
    private string _name = string.Empty;
    /// <summary>
    /// The name maximum size
    /// </summary>
    internal const int NAME_MAX_SIZE = 128;

    /// <summary>
    /// Gets or sets the name.
    /// the name of the characteristic
    /// Is limited to 128 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The name.</value>
    public string Name
    {
        get => _name;
        set
        {
            _name = value.Truncate(NAME_MAX_SIZE);
        }
    }

    /// <summary>
    /// The character value backing field
    /// </summary>
    private string _charValue = string.Empty;
    /// <summary>
    /// The characteristic value maximum size
    /// </summary>
    internal const int CHARACTERISTIC_VALUE_MAX_SIZE = 128;

    /// <summary>
    /// Gets or sets the characteristic value.
    /// Is limited to 128 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The characteristic value.</value>
    public string CharacteristicValue
    {
        get => _charValue;
        set
        {
            _charValue = value.Truncate(CHARACTERISTIC_VALUE_MAX_SIZE);
        }
    }

    /// <summary>
    /// Gets or sets a value indicating whether this <see cref="ProductCharacteristic" /> is deleted.
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
    /// The product the characteristic is for
    /// </summary>
    /// <value>The product.</value>
    public Product Product { get; set; } = null!;
}