// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-31-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-31-2024
// ***********************************************************************
// <copyright file="FilterMetaData.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Newtonsoft.Json;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Service.Models.Request;

/// <summary>
/// Class FilterMetaData.
/// </summary>
public class FilterMetaData : IFilterMetaData
{
    /// <summary>
    /// Gets or sets the search value.
    /// </summary>
    /// <value>The search value.</value>
    [JsonProperty(PropertyName = "searchValue")]
    public string? SearchValue { get; set; }
    /// <summary>
    /// Gets or sets the match mode.
    /// </summary>
    /// <value>The match mode.</value>
    [JsonProperty(PropertyName = "matchMode")]
    public string? MatchMode { get; set; }
    /// <summary>
    /// Gets or sets the logical operator.
    /// </summary>
    /// <value>The logical operator.</value>
    [JsonProperty(PropertyName = "logicalOperator")]
    public string? LogicalOperator { get; set; }    

}