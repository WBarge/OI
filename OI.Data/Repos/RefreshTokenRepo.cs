using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

internal class RefreshTokenRepo(OiAuthDbContext authDbContext) : IRefreshTokenRepo
{
    public async Task<RefreshTokenRecord?> FindAsync(string tokenHash, CancellationToken cancellationToken = default)
    {
        RefreshToken? t = await authDbContext.RefreshTokens.AsNoTracking()
            .SingleOrDefaultAsync(x => x.TokenHash == tokenHash, cancellationToken);
        return t is null ? null : new RefreshTokenRecord(t.UserId, t.TokenHash, t.CreatedAt, t.ExpiresAt, t.RevokedAt, t.ReplacedByHash);
    }

    public async Task IssueAsync(RefreshTokenRecord token, CancellationToken cancellationToken = default)
    {
        authDbContext.RefreshTokens.Add(ToEntity(token));
        await authDbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task RotateAsync(string oldTokenHash, DateTimeOffset revokedAt, RefreshTokenRecord replacement, CancellationToken cancellationToken = default)
    {
        RefreshToken old = await authDbContext.RefreshTokens.SingleAsync(x => x.TokenHash == oldTokenHash, cancellationToken);
        old.RevokedAt = revokedAt;
        old.ReplacedByHash = replacement.TokenHash;
        authDbContext.RefreshTokens.Add(ToEntity(replacement));
        await authDbContext.SaveChangesAsync(cancellationToken);
    }

    public Task RevokeAsync(string tokenHash, DateTimeOffset revokedAt, CancellationToken cancellationToken = default) =>
        authDbContext.RefreshTokens
            .Where(x => x.TokenHash == tokenHash && x.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.RevokedAt, revokedAt), cancellationToken);

    public Task RevokeAllAsync(string userId, DateTimeOffset revokedAt, CancellationToken cancellationToken = default) =>
        authDbContext.RefreshTokens
            .Where(x => x.UserId == userId && x.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.RevokedAt, revokedAt), cancellationToken);

    private static RefreshToken ToEntity(RefreshTokenRecord r) => new()
    {
        UserId = r.UserId,
        TokenHash = r.TokenHash,
        CreatedAt = r.CreatedAt,
        ExpiresAt = r.ExpiresAt,
        RevokedAt = r.RevokedAt,
        ReplacedByHash = r.ReplacedByHash,
    };
}
