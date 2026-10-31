using OI.Glue.Models;

namespace OI.Glue.Managers;

public interface IAuthManager
{
    /// <summary>Null means the credentials were not accepted.</summary>
    Task<AuthTokens?> LoginAsync(string email, string password, CancellationToken cancellationToken = default);
    /// <summary>Trades a refresh token for a new pair. Null means the token was not accepted.</summary>
    Task<AuthTokens?> RefreshAsync(string refreshToken, CancellationToken cancellationToken = default);
    Task LogoutAsync(string refreshToken, CancellationToken cancellationToken = default);
    /// <summary>
    /// Creates the Admin and User roles and, if it does not exist yet, the first administrator.
    /// There is no public registration endpoint, so this is how the first user comes to exist.
    /// </summary>
    Task EnsureAdministratorAsync(string email, string password, CancellationToken cancellationToken = default);
}
