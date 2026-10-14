using Newtonsoft.Json;

namespace OI.Service.Models.Requests;

/// <summary>
/// The body of a paged list request: which page to return, how big a page is, and optional filters.
/// </summary>
public class ListRequest
{
    /// <summary>Gets or sets the 1-based page number. Missing or below 1 means the first page.</summary>
    [JsonProperty(PropertyName = "page")]
    public int? Page { get; set; }

    /// <summary>Gets or sets the page size. Missing or below 1 means the service default.</summary>
    [JsonProperty(PropertyName = "pageSize")]
    public int? PageSize { get; set; }

    /// <summary>Gets or sets the filters, keyed by the name of the property to filter on.</summary>
    [JsonProperty(PropertyName = "filters")]
    public Dictionary<string, FilterMetaData[]>? Filters { get; set; }
}
