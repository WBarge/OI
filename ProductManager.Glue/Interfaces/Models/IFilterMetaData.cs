namespace ProductManager.Glue.Interfaces.Models;

public interface IFilterMetaData
{
    /// <summary>
    /// Gets or sets the search value.
    /// </summary>
    /// <value>The search value.</value>
    string? SearchValue { get; set; }

    /// <summary>
    /// Gets or sets the match mode.
    /// </summary>
    /// <value>The match mode.</value>
    string? MatchMode { get; set; }

    /// <summary>
    /// Gets or sets the logical operator.
    /// </summary>
    /// <value>The logical operator.</value>
    string? LogicalOperator { get; set; }
}