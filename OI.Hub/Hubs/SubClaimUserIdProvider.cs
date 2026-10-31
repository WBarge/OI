using Microsoft.AspNetCore.SignalR;

namespace OI.Hub.Hubs;

/// <summary>Maps a connection's user to the token's "sub" claim, so Clients.User(id) works.</summary>
public sealed class SubClaimUserIdProvider : IUserIdProvider
{
    /// <summary>
    /// Retrieves the user ID for the specified SignalR connection based on the "sub" claim in the user's token.
    /// </summary>
    /// <param name="connection">The context of the SignalR hub connection.</param>
    /// <returns>
    /// The user ID extracted from the "sub" claim of the connection's user token, 
    /// or <c>null</c> if the claim is not present or the user is not authenticated.
    /// </returns>
    public string? GetUserId(HubConnectionContext connection) => connection.User?.FindFirst("sub")?.Value;
}