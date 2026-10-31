namespace OI.Glue.Models;

/// <summary>Only the SHA-256 hash of a refresh token is ever stored.</summary>
public sealed record RefreshTokenRecord(
    string UserId,
    string TokenHash,
    DateTimeOffset CreatedAt,
    DateTimeOffset ExpiresAt,
    DateTimeOffset? RevokedAt = null,
    string? ReplacedByHash = null);
