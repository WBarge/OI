using OI.Glue.Models;

namespace OI.Glue.Repos;

public interface IRefreshTokenRepo
{
    Task<RefreshTokenRecord?> FindAsync(string tokenHash, CancellationToken cancellationToken = default);
    Task IssueAsync(RefreshTokenRecord token, CancellationToken cancellationToken = default);
    /// <summary>Revokes the old token and stores its replacement in one save.</summary>
    Task RotateAsync(string oldTokenHash, DateTimeOffset revokedAt, RefreshTokenRecord replacement, CancellationToken cancellationToken = default);
    Task RevokeAsync(string tokenHash, DateTimeOffset revokedAt, CancellationToken cancellationToken = default);
    Task RevokeAllAsync(string userId, DateTimeOffset revokedAt, CancellationToken cancellationToken = default);
}
