using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OI.Common.Extensions.Comparison;

namespace OI.Reporting.Reports;

public class ReportFactory(IServiceProvider serviceProvider, ILogger<ReportFactory> logger) : IReportFactory
{
    private readonly IServiceProvider _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
    private readonly ILogger<ReportFactory> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Creates a report instance based on the specified report type and parameters.
    /// </summary>
    /// <param name="generationId">
    /// The unique identifier for the report generation.
    /// </param>
    /// <param name="properties">
    /// An array of name-value pairs representing additional properties to apply to the report.
    /// </param>
    /// <returns>
    /// An instance of a class derived from <see cref="BaseReport"/> corresponding to the specified report type.
    /// </returns>
    /// <exception cref="ArgumentException">
    /// Thrown when a property name in <paramref name="properties"/> is empty.
    /// </exception>
    public BaseReport GetReport<TReportType>(Guid reportId, params (string Name, object? Value)[] properties)where TReportType : BaseReport
    {
        string propertiesJson = string.Empty;
        if (properties != null)
        {
            Dictionary<string, object?> propertyMap = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
            foreach ((string name, object? value) in properties)
            {
                if (name.IsEmpty())
                {
                    throw new ArgumentException("Property name cannot be empty.", nameof(properties));
                }
                propertyMap[name] = value;
            }
            propertiesJson = JsonConvert.SerializeObject(propertyMap);
        }

        BaseReport returnValue = ActivatorUtilities.CreateInstance<TReportType>(_serviceProvider,reportId);

        _logger.LogInformation("Creating report for {whichReport} who has an id of {generationId} and the parameters of {propertiesJson}",typeof(TReportType),returnValue.GenerationId,propertiesJson);

        
        ApplyJsonProperties(returnValue, propertiesJson);
        
        return returnValue;
    }
    
    /// <summary>
    /// Applies JSON properties to the specified target object by mapping JSON keys to the object's writable properties.
    /// </summary>
    /// <param name="target">The target object to which the JSON properties will be applied.</param>
    /// <param name="json">A JSON string containing the properties to apply to the target object.</param>
    /// <exception cref="ArgumentException">
    /// Thrown when the provided JSON string is not valid or cannot be parsed.
    /// </exception>
    /// <exception cref="InvalidOperationException">
    /// Thrown when a JSON property cannot be converted to the corresponding property type of the target object.
    /// </exception>
    private static void ApplyJsonProperties(BaseReport target, string json)
    {
        if (string.IsNullOrWhiteSpace(json)) return;

        JObject obj;
        try
        {
            obj = JObject.Parse(json);
        }
        catch (JsonReaderException ex)
        {
            throw new ArgumentException("Properties JSON is not valid.", nameof(json), ex);
        }

        Type type = target.GetType();

        foreach (var jsonProp in obj.Properties())
        {
            // Case-insensitive lookup of a public instance property
            var propInfo = type.GetProperty(
                jsonProp.Name,
                BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);

            if (propInfo is null || !propInfo.CanWrite)
            {
                // Decide how strict to be: skip, log, or throw
                // throw new InvalidOperationException($"Property '{jsonProp.Name}' not found or not writable on {type.Name}.");
                continue;
            }

            try
            {
                // Converts to string, int, double, string[], List<int>, int?, etc.
                var value = jsonProp.Value.ToObject(propInfo.PropertyType);
                propInfo.SetValue(target, value);
            }
            catch (Exception ex) when (ex is JsonException || ex is FormatException || ex is InvalidCastException)
            {
                throw new InvalidOperationException(
                    $"Could not convert JSON value for '{jsonProp.Name}' to {propInfo.PropertyType.Name}.", ex);
            }
        }
    }
}