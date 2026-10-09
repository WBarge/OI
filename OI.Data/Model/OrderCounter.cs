namespace OI.Data.Model;

/// <summary>
/// Represents a counter for tracking the next available order number.
/// </summary>
internal class OrderCounter
{
    /// <summary>
    /// Gets or sets the identifier. Primary key for the order counter.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the next order number. The next available order number to assign.
    /// </summary>
    public int NextOrderNumber { get; set; }

    /// <summary>
    /// Gets or sets the created.
    /// represents when the record was created
    /// </summary>
    public DateTime Created { get; set; }

    /// <summary>
    /// Gets or sets the modified.
    /// represents when the record was last changed
    /// </summary>
    public DateTime? Modified { get; set; }
}
