namespace OI.Hub.Hubs;

/// <summary>
/// Named GroupNames, not Groups: inside a Hub, "Groups" is the hub's own IGroupManager property
/// and would shadow a static class of that name.
/// </summary>
public static class GroupNames
{
    /// <summary>
    /// Generates a unique group name based on the provided group identifier.
    /// </summary>
    /// <param name="groupId">The identifier of the group.</param>
    /// <returns>A string representing the unique group name.</returns>
    public static string Group(string groupId) => $"group:{groupId}";

    /// <summary>
    /// Generates a unique topic-specific group name based on the provided group identifier and topic.
    /// </summary>
    /// <param name="groupId">The identifier of the group.</param>
    /// <param name="topic">The specific topic within the group.</param>
    /// <returns>A string representing the unique topic-specific group name.</returns>
    public static string Topic(string groupId, string topic) => $"group:{groupId}:topic:{topic}";
}