// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-31-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-31-2024
// ***********************************************************************
// <copyright file="ProductListRequest.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using Newtonsoft.Json;

namespace ProductManager.Service.Models.Request;

/// <summary>
/// Class ProductListRequest.
/// </summary>
public class ListRequest
{
    /// <summary>
    /// Gets or sets the page.
    /// </summary>
    /// <value>The page.</value>
    [JsonProperty(PropertyName = "page")]
    public int? Page { get; set; }
    /// <summary>
    /// Gets or sets the size of the page.
    /// </summary>
    /// <value>The size of the page.</value>
    [JsonProperty(PropertyName = "pageSize")]
    public int? PageSize{ get; set; }
    /// <summary>
    /// Gets or sets the filters.
    /// </summary>
    /// <value>The filters.</value>
    [JsonProperty(PropertyName = "filters")]
    public Dictionary<string,FilterMetaData[]>? Filters { get; set; }
}