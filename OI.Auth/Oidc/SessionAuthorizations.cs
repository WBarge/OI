using System.Text.Json;
using OI.Glue.Services;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Oidc;

/// <summary>
/// Ties each UI's OpenIddict authorization to the OI.Auth sign-in (the "sid") it was created in, and ends sessions.
/// Revoking an authorization revokes its tokens, so a refresh token from that sign-in is refused at its next renewal.
/// Implements <see cref="IUserSessionRevoker"/> so the administration rules in OI.Business can end a user's sessions.
/// </summary>
public sealed class SessionAuthorizations(
    IOpenIddictApplicationManager applications,
    IOpenIddictAuthorizationManager authorizations,
    IOpenIddictTokenManager tokens,
    TimeProvider clock) : IUserSessionRevoker
{
    /// <summary>The authorization property that holds the sign-in session id.</summary>
    public const string SessionProperty = "oi_sid";

    /// <summary>
    /// The id of this user's authorization for this client in this sign-in session, creating it if it does not exist.
    /// </summary>
    public async Task<string> EnsureAsync(string userId, string clientId, string sessionId, IEnumerable<string> scopes, CancellationToken cancellationToken = default)
    {
        object application = await applications.FindByClientIdAsync(clientId, cancellationToken)
            ?? throw new InvalidOperationException("The calling client application cannot be found.");
        string applicationId = await applications.GetIdAsync(application, cancellationToken)
            ?? throw new InvalidOperationException("The calling client application has no id.");

        List<object> existing = await ToListAsync(
            authorizations.FindAsync(userId, applicationId, Statuses.Valid, AuthorizationTypes.Permanent, null, cancellationToken),
            cancellationToken);
        foreach (object authorization in existing)
        {
            if (await BelongsToSessionAsync(authorization, sessionId, cancellationToken))
            {
                return await authorizations.GetIdAsync(authorization, cancellationToken)
                    ?? throw new InvalidOperationException("The authorization has no id.");
            }
        }

        OpenIddictAuthorizationDescriptor descriptor = new()
        {
            ApplicationId = applicationId,
            Subject = userId,
            Type = AuthorizationTypes.Permanent,
            Status = Statuses.Valid,
            CreationDate = clock.GetUtcNow(),
        };
        foreach (string scope in scopes)
        {
            descriptor.Scopes.Add(scope);
        }
        descriptor.Properties[SessionProperty] = JsonSerializer.SerializeToElement(sessionId);

        object created = await authorizations.CreateAsync(descriptor, cancellationToken);
        return await authorizations.GetIdAsync(created, cancellationToken)
            ?? throw new InvalidOperationException("The new authorization has no id.");
    }

    /// <summary>Revokes every authorization (and its tokens) this user created in the given sign-in session. Returns how many.</summary>
    public async Task<int> RevokeSessionAsync(string userId, string sessionId, CancellationToken cancellationToken = default)
    {
        List<object> all = await ToListAsync(authorizations.FindBySubjectAsync(userId, cancellationToken), cancellationToken);
        int revoked = 0;
        foreach (object authorization in all)
        {
            if (!await BelongsToSessionAsync(authorization, sessionId, cancellationToken))
            {
                continue;
            }
            string? id = await authorizations.GetIdAsync(authorization, cancellationToken);
            if (id is not null)
            {
                await tokens.RevokeByAuthorizationIdAsync(id, cancellationToken);
            }
            await authorizations.TryRevokeAsync(authorization, cancellationToken);
            revoked++;
        }
        return revoked;
    }

    /// <inheritdoc />
    public async Task RevokeAllAsync(string userId, CancellationToken cancellationToken = default)
    {
        await tokens.RevokeBySubjectAsync(userId, cancellationToken);
        await authorizations.RevokeBySubjectAsync(userId, cancellationToken);
    }

    private async Task<bool> BelongsToSessionAsync(object authorization, string sessionId, CancellationToken cancellationToken)
    {
        var properties = await authorizations.GetPropertiesAsync(authorization, cancellationToken);
        return properties.TryGetValue(SessionProperty, out JsonElement value)
               && value.ValueKind == JsonValueKind.String
               && string.Equals(value.GetString(), sessionId, StringComparison.Ordinal);
    }

    // Collect first, then change: revoking while the query is still streaming would use one connection twice.
    private static async Task<List<object>> ToListAsync(IAsyncEnumerable<object> source, CancellationToken cancellationToken)
    {
        List<object> list = [];
        await foreach (object item in source.WithCancellation(cancellationToken))
        {
            list.Add(item);
        }
        return list;
    }
}
