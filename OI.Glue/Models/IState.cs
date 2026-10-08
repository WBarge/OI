namespace OI.Glue.Models;

public interface IState
{
    /// <summary>
    /// Gets or sets the name of the state.
    /// </summary>      
    string Name { get; set; }

    /// <summary>
    /// Gets or sets the code of the state.
    /// </summary>
    string Code { get; set; }
}