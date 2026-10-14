using OI.Glue.Models;

namespace OI.Data.Helpers;

/// <summary>
/// Class FilterCriteria.
/// Implements the <see cref="IFilterMetaData" />
/// </summary>
/// <seealso cref="IFilterMetaData" />
internal class FilterCriteria : IFilterMetaData
{
    /// <summary>
    /// Gets or sets the search value.
    /// </summary>
    /// <value>The search value.</value>
    public string? SearchValue { get; set; }
    /// <summary>
    /// Gets or sets the match mode.
    /// </summary>
    /// <value>The match mode.</value>
    public string? MatchMode { get; set; }
    /// <summary>
    /// Gets or sets the logical operator.
    /// </summary>
    /// <value>The logical operator.</value>
    public string? LogicalOperator { get; set; }
}