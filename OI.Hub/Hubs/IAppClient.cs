namespace OI.Hub.Hubs;

/// <summary>Methods the server can call on browsers. Strongly typed, so no magic strings.</summary>
public interface IAppClient
{
    /// <summary>
    /// Receives a message sent to the client.
    /// </summary>
    /// <param name="from">The identifier of the sender.</param>
    /// <param name="text">The content of the message.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task ReceiveMessage(string from, string text);

    /// <summary>
    /// Receives a notification sent to the client.
    /// </summary>
    /// <param name="notification">The notification object containing details such as type, title, body, and timestamp.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task ReceiveNotification(Notification notification);
}