namespace OI.Glue.Notifications;

/// <summary>
/// How any OI application asks the central hub to notify connected clients.
/// Best effort: returns false (and logs) if the hub cannot be reached, so a hub outage never fails a business operation.
/// </summary>
public interface INotificationPublisher
{
    Task<bool> PublishAsync(NotificationTarget target, string type, string title, string? body = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Same as <see cref="PublishAsync"/>, but the notification also carries an event name (see <see cref="NotificationEvents"/>)
    /// and the id of the thing the event is about, so the browser can act on it and not only show it.
    /// </summary>
    Task<bool> PublishEventAsync(NotificationTarget target, string type, string title, string? body,
        string eventName, string correlationId, CancellationToken cancellationToken = default);
}
