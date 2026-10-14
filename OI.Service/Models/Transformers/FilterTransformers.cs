using OI.Glue.Models;
using OI.Service.Models.Requests;

namespace OI.Service.Models.Transformers;

/// <summary>
/// Converts request models into the types the business layer works with.
/// </summary>
public static class FilterTransformers
{
    /// <summary>
    /// Transforms the filters on a list request into the dictionary the business layer expects.
    /// </summary>
    /// <param name="request">The request.</param>
    /// <returns>The filters, or null when the request has none.</returns>
    public static Dictionary<string, IFilterMetaData[]> TransformFilters(ListRequest request)
    {
        Dictionary<string, IFilterMetaData[]>? filters = null;
        if (request.Filters != null)
        {
            filters = request.Filters?.ToDictionary(
                requestFilter => requestFilter.Key,
                requestFilter => (requestFilter.Value ?? []).Cast<IFilterMetaData>().ToArray());
        }
        return filters!;
    }
}
