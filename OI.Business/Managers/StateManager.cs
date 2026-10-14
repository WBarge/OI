using Microsoft.Extensions.Logging;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Managers;

/// <summary>
/// Manages state-related business logic.
/// </summary>
internal class StateManager(IStateRepo stateRepo, ILogger<StateManager> logger) : IStateManager
{
    private readonly IStateRepo _stateRepo = stateRepo ?? throw new ArgumentNullException(nameof(stateRepo));
    private readonly ILogger<StateManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <inheritdoc />
    public async Task<IEnumerable<IState>> ListStatesAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Listing all states");
        IEnumerable<IState> states = await _stateRepo.ListStatesAsync(cancellationToken);
        _logger.LogInformation("Returning {Count} states", states.Count());
        return states;
    }
}
