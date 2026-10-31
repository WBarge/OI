using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OI.Glue.Notifications;
using OI.Hub.Hubs;

namespace OI.Hub.Controllers;

/// <summary>
/// The one door other OI applications use to reach connected browsers.
/// Needs a service token carrying the "hub:publish" scope, so a user token cannot call it.
/// </summary>
[Route("api/[controller]")]
[ApiController]
[Authorize(Policy = HubPolicies.PUBLISH)]
public class PublishController(IHubContext<AppHub, IAppClient> hub, ILogger<PublishController> logger) : ControllerBase
{
    private readonly IHubContext<AppHub, IAppClient> _hub = hub ?? throw new ArgumentNullException(nameof(hub));
    private readonly ILogger<PublishController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>Delivers a notification to a user, a group, or a topic inside a group.</summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Publish([FromBody] PublishRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Id) || string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Type))
        {
            return BadRequest("Id, Type and Title are required.");
        }

        Notification notification = new(request.Type, request.Title, request.Body, DateTimeOffset.UtcNow);

        IAppClient? target = request.Kind switch
        {
            NotificationTargetKind.User => _hub.Clients.User(request.Id),
            NotificationTargetKind.Group => _hub.Clients.Group(GroupNames.Group(request.Id)),
            NotificationTargetKind.Topic when !string.IsNullOrWhiteSpace(request.Topic)
                => _hub.Clients.Group(GroupNames.Topic(request.Id, request.Topic)),
            _ => null,
        };
        if (target is null)
        {
            return BadRequest("A topic target needs a Topic.");
        }

        await target.ReceiveNotification(notification);
        _logger.LogInformation("Published {Type} to {Kind}", request.Type, request.Kind);
        return Accepted();
    }
}
