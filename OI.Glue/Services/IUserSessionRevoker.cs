namespace OI.Glue.Services;

/// <summary>
/// Ends every sign-in session a user has (their refresh tokens stop working), e.g. when an administrator
/// disables the user, resets their password or reduces their access. Implemented by the OI.Auth application,
/// which owns the token store, so Business code never sees it.
/// </summary>
public interface IUserSessionRevoker
{
    /// <summary>Revokes every authorization and token issued to the user. Access tokens already issued run out on their own.</summary>
    Task RevokeAllAsync(string userId, CancellationToken cancellationToken = default);
}
