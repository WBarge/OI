namespace OI.Glue.Notifications;

/// <summary>
/// How any OI application asks the central hub to notify connected clients.
/// Best effort: returns false (and logs) if the hub cannot be reached, so a hub outage never fails a business operation.
/// </summary>
public interface INotificationPublisher
{
    Task<bool> PublishAsync(NotificationTarget target, string type, string title, string? body = null,
        CancellationToken cancellationToken = default);
}
