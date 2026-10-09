using OI.Glue.Models;

namespace OI.Glue.Managers;

public interface IStateManager
{
    /// <summary>
    /// Returns all states.
    /// </summary>
    Task<IEnumerable<IState>> ListStatesAsync(CancellationToken cancellationToken = default);
}
