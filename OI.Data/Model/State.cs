using OI.Glue.Models;

namespace OI.Data.Model;

/// <summary>
/// Represents a state in the system. Each state has a unique identifier, name, and code.
/// Specifically used for billing and shipping addresses in the context of orders and customers.
/// Addresses are assumed to be in the United States, so the state code is a two-letter abbreviation.
/// This class is used to provide a list of valid states for billing and shipping addresses, ensuring that only valid state codes are used in the system aka it's a lookup table.
/// </summary>
internal class State
{
    /// <summary>
    /// Gets or sets the unique identifier for the state.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the name of the state.
    /// </summary>      
    public required string Name { get; set; }
    
    /// <summary>
    /// Gets or sets the code of the state.
    /// </summary>
    public required string Code { get; set; }
}