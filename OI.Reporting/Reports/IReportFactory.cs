namespace OI.Reporting.Reports;

public interface IReportFactory
{
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
    BaseReport GetReport<TReportType>(Guid reportId,params (string Name, object? Value)[] properties)where TReportType : BaseReport;
}