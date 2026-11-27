using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using OI.Auth.Models.Requests;
using OI.Auth.Security;

namespace OI.Auth.Controllers;

/// <summary>
/// Service tokens for other OI applications. People do not sign in here: they sign in through the OpenID Connect
/// endpoints (see <see cref="ConnectController"/>).
/// </summary>
[Route("api/[controller]")]
[ApiController]
[AllowAnonymous]   // an application has to be able to ask for its token before it has one
public class AuthController(ServiceClientRegistry serviceClients, AccessTokenFactory tokenFactory, ILogger<AuthController> logger) : ControllerBase
{
    private readonly ServiceClientRegistry _serviceClients = serviceClients ?? throw new ArgumentNullException(nameof(serviceClients));
    private readonly AccessTokenFactory _tokenFactory = tokenFactory ?? throw new ArgumentNullException(nameof(tokenFactory));
    private readonly ILogger<AuthController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// For other OI applications (not browsers): exchanges a client id and secret for a short-lived
    /// service token, e.g. so Reporting can publish to the hub.
    /// </summary>
    [HttpPost("service-token")]
    [EnableRateLimiting("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult ServiceToken([FromBody] ServiceTokenRequest request)
    {
        ServiceClient? client = _serviceClients.Validate(request.ClientId, request.ClientSecret);
        if (client is null)
        {
            _logger.LogWarning("Service token rejected");
            return Unauthorized();
        }

        (string token, DateTimeOffset expires) = _tokenFactory.CreateServiceToken(client);
        return Ok(new { accessToken = token, accessTokenExpires = expires });
    }
}
