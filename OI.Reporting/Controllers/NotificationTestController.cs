using Microsoft.AspNetCore.Mvc;
using OI.Glue.Notifications;
using OI.Glue.Security;

namespace OI.Reporting.Controllers;

/// <summary>
/// Proves the path from this API to the user's browser: the UI calls this, this calls the hub, the hub pushes
/// a message to the browser, which shows it as a toast. Temporary: remove it once real notifications exist.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class NotificationTestController(
    IClientContext clientContext,
    INotificationPublisher notificationPublisher,
    ILogger<NotificationTestController> logger) : ControllerBase
{
    private readonly IClientContext _clientContext = clientContext ?? throw new ArgumentNullException(nameof(clientContext));
    private readonly INotificationPublisher _notificationPublisher = notificationPublisher ?? throw new ArgumentNullException(nameof(notificationPublisher));
    private readonly ILogger<NotificationTestController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    
    
    // hard coded on purpose: this step is about the plumbing, not the content
    public const string MessageType = "success";
    public const string MessageTitle = "Hello from Reporting";
    public const string MessageBody = "This message was sent by the Reporting API through the central hub, just for you.";

    /// <summary>Sends a fixed test message to the person who called, on every browser tab they have open.</summary>
    /// <returns>200 when the hub accepted the message; 503 when the hub could not be reached.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    public async Task<IActionResult> Send(CancellationToken cancellationToken)
    {
        if (!_clientContext.IsAuthenticated)
        {
            return Unauthorized();
        }

        bool accepted = await _notificationPublisher.PublishAsync(
            NotificationTarget.User(_clientContext.UserId), MessageType, MessageTitle, MessageBody, cancellationToken);

        if (!accepted)
        {
            _logger.LogWarning("The hub did not accept the test notification for user {UserId}", _clientContext.UserId);
            return StatusCode(StatusCodes.Status503ServiceUnavailable, new { message = "The notification hub could not be reached." });
        }

        return Ok(new { sent = true });
    }
}
