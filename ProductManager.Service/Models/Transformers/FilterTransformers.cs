using ProductManager.Glue.Interfaces.Models;
using ProductManager.Service.Models.Request;

namespace ProductManager.Service.Models.Transformers;

/// <summary>
/// Class FilterTransformers.
/// </summary>
public static class FilterTransformers
{
    /// <summary>
    /// Transforms the filters.
    /// </summary>
    /// <param name="request">The request.</param>
    /// <returns>System.Nullable&lt;Dictionary&lt;System.String, IFilterMetaData[]&gt;&gt;.</returns>
    public static Dictionary<string, IFilterMetaData[]> TransformFilters(ListRequest request)
    {
        Dictionary<string, IFilterMetaData[]>? filters = null;
        if (request.Filters != null)
        {
            filters = request.Filters.
                ToDictionary(requestFilter => requestFilter.Key, 
                    requestFilter => requestFilter.Value.Cast<IFilterMetaData>().ToArray());
        }

        return filters!;
    }

}