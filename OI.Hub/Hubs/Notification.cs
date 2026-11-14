namespace OI.Hub.Hubs;

/// <summary>
/// Represents a notification containing details such as type, title, optional body, and timestamp.
/// </summary>
/// <param name="Type">The type or category of the notification.</param>
/// <param name="Title">The title or subject of the notification.</param>
/// <param name="Body">The optional body or content of the notification.</param>
/// <param name="At">The timestamp indicating when the notification was created.</param>
/// <param name="Event">Optional machine-readable event name (for example "report.ready") the browser can act on.</param>
/// <param name="CorrelationId">Optional id of the thing the event is about (for example the report id).</param>
public sealed record Notification(string Type, string Title, string? Body, DateTimeOffset At,
    string? Event = null, string? CorrelationId = null);