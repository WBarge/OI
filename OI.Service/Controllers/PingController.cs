using Microsoft.AspNetCore.Mvc;

namespace OI.Service.Controllers;

/// <summary>
/// Class PingController.
/// Implements the <see cref="ControllerBase" />
/// </summary>
/// <seealso cref="ControllerBase" />
[Route("api/[controller]")]
[ApiController]
public class PingController : ControllerBase
{
    /// <summary>
    /// Will always return a 200
    /// This endpoint it to be used to validate the service is up and running
    /// </summary>
    /// <returns>IActionResult.</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult Get()
    {
        return Ok();
    }
}