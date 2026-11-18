// ***********************************************************************
// Author           : Bill Barge
// Created          : 08-19-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 08-19-2024
// ***********************************************************************
// <copyright file="QuickProductRequest.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Newtonsoft.Json;

namespace ProductManager.Service.Models.Request;

/// <summary>
/// Class QuickProductRequest.
/// </summary>
public class QuickProductRequest
{
    /// <summary>
    /// Gets or sets the sku.
    /// </summary>
    /// <value>The sku.</value>
    [JsonProperty(PropertyName = "sku")]
    public required string Sku { get; set; }
    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty(PropertyName = "name")]
    public required string Name { get; set; }
    /// <summary>
    /// Gets or sets the short description.
    /// </summary>
    /// <value>The short description.</value>
    [JsonProperty(PropertyName = "shortDescription")]
    public required string ShortDescription { get; set; }
    /// <summary>
    /// Gets or sets the price.
    /// </summary>
    /// <value>The price.</value>
    [JsonProperty(PropertyName = "price")]
    public required decimal Price { get; set; }
}