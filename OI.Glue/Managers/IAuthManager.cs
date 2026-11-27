using OI.Glue.Models;

namespace OI.Glue.Managers;

public interface IAuthManager
{
    /// <summary>
    /// Checks an email and password. Applies the lockout rules (and counts the failure). Null means the credentials
    /// were not accepted; the reason is never revealed. Issuing tokens is not done here: the OI.Auth login page
    /// starts the sign-in session and OpenIddict issues the tokens.
    /// </summary>
    Task<IAuthUser?> ValidateCredentialsAsync(string email, string password, CancellationToken cancellationToken = default);

    /// <summary>
    /// The user, if they still exist and are not locked out or disabled. Null otherwise. Used each time a session
    /// asks for a code or renews a token, so a deleted or locked account stops being signed in.
    /// </summary>
    Task<IAuthUser?> FindActiveUserAsync(string userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates the Admin and User roles and, if it does not exist yet, the first administrator.
    /// There is no public registration endpoint, so this is how the first user comes to exist.
    /// </summary>
    Task EnsureAdministratorAsync(string email, string password, CancellationToken cancellationToken = default);
}
