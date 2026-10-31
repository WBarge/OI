using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using OI.Auth.Models.Requests;
using OI.Auth.Security;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Controllers;

/// <summary>Sign-in, token refresh, sign-out and service tokens.</summary>
[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthManager authManager, ServiceClientRegistry serviceClients, AccessTokenFactory tokenFactory, ILogger<AuthController> logger) : ControllerBase
{
    private readonly IAuthManager _authManager = authManager ?? throw new ArgumentNullException(nameof(authManager));
    private readonly ServiceClientRegistry _serviceClients = serviceClients ?? throw new ArgumentNullException(nameof(serviceClients));
    private readonly AccessTokenFactory _tokenFactory = tokenFactory ?? throw new ArgumentNullException(nameof(tokenFactory));
    private readonly ILogger<AuthController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>Exchanges an email and password for an access token and a refresh token.</summary>
    /// <returns>The tokens, or 401 for any rejected sign-in (the response never says why).</returns>
    [HttpPost("login")]
    [EnableRateLimiting("login")]
    [ProducesResponseType<AuthTokens>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        AuthTokens? tokens = await _authManager.LoginAsync(request.Email, request.Password, cancellationToken);
        return tokens is null ? Unauthorized() : Ok(tokens);
    }

    /// <summary>Trades a refresh token for a new access token and a new refresh token.</summary>
    [HttpPost("refresh")]
    [EnableRateLimiting("login")]
    [ProducesResponseType<AuthTokens>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest request, CancellationToken cancellationToken)
    {
        AuthTokens? tokens = await _authManager.RefreshAsync(request.RefreshToken, cancellationToken);
        return tokens is null ? Unauthorized() : Ok(tokens);
    }

    /// <summary>Revokes the refresh token so it cannot be used again.</summary>
    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Logout([FromBody] RefreshRequest request, CancellationToken cancellationToken)
    {
        await _authManager.LogoutAsync(request.RefreshToken, cancellationToken);
        return NoContent();
    }

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
