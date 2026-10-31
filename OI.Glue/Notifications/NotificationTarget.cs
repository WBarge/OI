using System.Text.Json.Serialization;

namespace OI.Glue.Notifications;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum NotificationTargetKind { User, Group, Topic }

/// <summary>Who should receive a notification. Build one with the factory methods.</summary>
public sealed record NotificationTarget(NotificationTargetKind Kind, string Id, string? Topic = null)
{
    /// <summary>One user, on every device they have open. Id is the user's id (the token's "sub").</summary>
    public static NotificationTarget User(string userId) => new(NotificationTargetKind.User, userId);
    /// <summary>Everyone currently connected who belongs to the group.</summary>
    public static NotificationTarget Group(string groupId) => new(NotificationTargetKind.Group, groupId);
    /// <summary>Members of the group who opted in to the topic.</summary>
    public static NotificationTarget GroupTopic(string groupId, string topic) => new(NotificationTargetKind.Topic, groupId, topic);
}

/// <summary>The body of POST api/publish on OI.Hub. Shared so the sender and the hub cannot drift apart.</summary>
public sealed record PublishRequest(NotificationTargetKind Kind, string Id, string? Topic, string Type, string Title, string? Body);
