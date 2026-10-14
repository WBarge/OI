using Microsoft.AspNetCore.Mvc;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Service.Controllers;

/// <summary>
/// Controller for state-related endpoints.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class StatesController(IStateManager stateManager, ILogger<StatesController> logger) : ControllerBase
{
    private readonly IStateManager _stateManager = stateManager ?? throw new ArgumentNullException(nameof(stateManager));
    private readonly ILogger<StatesController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Returns all states.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>A list of all states.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<IState>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllStates(CancellationToken cancellationToken)
    {
        _logger.LogInformation("GET api/states called");
        IEnumerable<IState> states = await _stateManager.ListStatesAsync(cancellationToken);
        _logger.LogInformation("Returning {Count} states", states.Count());
        return Ok(states);
    }
}
