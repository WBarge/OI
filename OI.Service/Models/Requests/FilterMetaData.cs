using Newtonsoft.Json;
using OI.Glue.Models;

namespace OI.Service.Models.Requests;

/// <summary>
/// A single filter condition sent by the client (search value, how to match it, and how to combine it with the previous condition).
/// </summary>
public class FilterMetaData : IFilterMetaData
{
    /// <summary>Gets or sets the search value.</summary>
    [JsonProperty(PropertyName = "searchValue")]
    public string? SearchValue { get; set; }

    /// <summary>Gets or sets the match mode, e.g. equals, startsWith, contains.</summary>
    [JsonProperty(PropertyName = "searchValue")]
    public string? MatchMode { get; set; }

    /// <summary>Gets or sets the logical operator used to combine this condition with the previous one, e.g. and, or.</summary>
    [JsonProperty(PropertyName = "logicalOperator")]
    public string? LogicalOperator { get; set; }
}
