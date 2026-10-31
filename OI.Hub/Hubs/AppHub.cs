using Microsoft.AspNetCore.SignalR;

namespace OI.Hub.Hubs;

/// <summary>
/// What browsers connect to. Only user tokens get in (see AddOiAuthorization); other applications
/// do not connect here, they publish through PublishController.
/// </summary>
public class AppHub : Hub<IAppClient>
{
    private string UserId => Context.User!.FindFirst("sub")!.Value;
    private HashSet<string> MyGroupIds => Context.User!.FindAll("group").Select(c => c.Value).ToHashSet();

    /// <summary>
    /// Handles the event when a client connects to the hub.
    /// </summary>
    /// <remarks>
    /// This method is invoked whenever a new connection is established or re-established.
    /// It ensures that the client is added to the appropriate groups based on their membership
    /// information derived from the validated token. Group membership is re-applied on every
    /// reconnect, as it is lost when a connection drops.
    /// </remarks>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public override async Task OnConnectedAsync()
    {
        // Membership comes from the validated token, never from the browser. This runs again on
        // every reconnect, which matters because group membership is lost when a connection drops.
        foreach (string groupId in MyGroupIds)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, GroupNames.Group(groupId));
        }
        await base.OnConnectedAsync();
    }

    /// <summary>
    /// Message everyone in one of the caller's own groups.
    /// </summary>
    public Task SendToMyGroup(string groupId, string text)
    {
        EnsureMember(groupId);
        return Clients.Group(GroupNames.Group(groupId)).ReceiveMessage(UserId, text);
    }

    /// <summary>
    /// Opt in to a topic inside one of the caller's own groups.
    /// </summary>
    public Task Subscribe(string groupId, string topic)
    {
        EnsureMember(groupId);
        return Groups.AddToGroupAsync(Context.ConnectionId, GroupNames.Topic(groupId, topic));
    }

    /// <summary>
    /// Unsubscribes the caller from a specific topic within one of their own groups.
    /// </summary>
    /// <param name="groupId">The identifier of the group the caller belongs to.</param>
    /// <param name="topic">The specific topic within the group to unsubscribe from.</param>
    /// <returns>A task that represents the asynchronous operation of removing the caller from the topic-specific group.</returns>
    public Task Unsubscribe(string groupId, string topic) =>
        Groups.RemoveFromGroupAsync(Context.ConnectionId, GroupNames.Topic(groupId, topic));

    /// <summary>
    /// Ensures that the caller is a member of the specified group.
    /// </summary>
    /// <param name="groupId">The identifier of the group to check membership for.</param>
    /// <exception cref="HubException">
    /// Thrown when the caller is not a member of the specified group.
    /// </exception>
    private void EnsureMember(string groupId)
    {
        if (!MyGroupIds.Contains(groupId))
        {
            throw new HubException("You are not a member of that group.");
        }
    }

    // Deliberately no browser-callable "send to any user".
    // Sending to a user comes from a
    // server application through PublishController.
    // May want to put this in later to support chat between clients
}
