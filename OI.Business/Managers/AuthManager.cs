using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Logging;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Glue.Services;

namespace OI.Business.Managers;

/// <summary>
/// The sign-in rules: when a password is accepted, how failures lead to lockout, how refresh tokens
/// rotate, and what happens when one is reused. The repos only store and fetch.
/// </summary>
internal class AuthManager : IAuthManager
{
    private readonly IAuthRepo _authRepo;
    private readonly IRefreshTokenRepo _refreshTokenRepo;
    private readonly IAccessTokenFactory _accessTokenFactory;
    private readonly IPasswordService _passwords;
    private readonly AuthPolicy _policy;
    private readonly TimeProvider _clock;
    private readonly ILogger<AuthManager> _logger;
    private readonly Lazy<string> _dummyHash;

    // A rotated token presented again within this window is most likely two tabs racing, not theft.
    private static readonly TimeSpan ReuseGrace = TimeSpan.FromSeconds(10);

    public AuthManager(
        IAuthRepo authRepo,
        IRefreshTokenRepo refreshTokenRepo,
        IAccessTokenFactory accessTokenFactory,
        IPasswordService passwords,
        AuthPolicy policy,
        TimeProvider clock,
        ILogger<AuthManager> logger)
    {
        _authRepo = authRepo ?? throw new ArgumentNullException(nameof(authRepo));
        _refreshTokenRepo = refreshTokenRepo ?? throw new ArgumentNullException(nameof(refreshTokenRepo));
        _accessTokenFactory = accessTokenFactory ?? throw new ArgumentNullException(nameof(accessTokenFactory));
        _passwords = passwords ?? throw new ArgumentNullException(nameof(passwords));
        _policy = policy ?? throw new ArgumentNullException(nameof(policy));
        _clock = clock ?? throw new ArgumentNullException(nameof(clock));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        // Checked against when the email is unknown, so an unknown email takes as long as a wrong password.
        _dummyHash = new Lazy<string>(() => _passwords.Hash(Guid.NewGuid().ToString("N")));
    }

    /// <inheritdoc />
    public async Task<AuthTokens?> LoginAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        DateTimeOffset now = _clock.GetUtcNow();
        IAuthCredential? credential = await _authRepo.FindCredentialAsync(email, cancellationToken);

        bool passwordOk = _passwords.Verify(credential?.PasswordHash ?? _dummyHash.Value, password);
        if (credential is null)
        {
            return Rejected();
        }

        if (credential.LockoutEnd is { } lockoutEnd && lockoutEnd > now)
        {
            return Rejected();
        }

        if (!passwordOk)
        {
            int failures = await _authRepo.IncrementAccessFailedAsync(credential.UserId, cancellationToken);
            if (failures >= _policy.MaxFailedAttempts)
            {
                await _authRepo.SetLockoutAsync(credential.UserId, now.Add(_policy.LockoutFor), cancellationToken);
                _logger.LogWarning("User {UserId} locked out after repeated failed sign-ins", credential.UserId);
            }
            return Rejected();
        }

        if (credential.AccessFailedCount > 0)
        {
            await _authRepo.ResetAccessFailedAsync(credential.UserId, cancellationToken);
        }

        IAuthUser? user = await _authRepo.FindUserAsync(credential.UserId, cancellationToken);
        if (user is null)
        {
            return Rejected();
        }

        (string raw, RefreshTokenRecord record) = NewRefreshToken(user.Id);
        await _refreshTokenRepo.IssueAsync(record, cancellationToken);
        return BuildTokens(user, raw);
    }

    /// <inheritdoc />
    public async Task<AuthTokens?> RefreshAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        DateTimeOffset now = _clock.GetUtcNow();
        string hash = Hash(refreshToken);

        RefreshTokenRecord? stored = await _refreshTokenRepo.FindAsync(hash, cancellationToken);
        if (stored is null)
        {
            return null;
        }

        if (stored.RevokedAt is { } revokedAt)
        {
            if (now - revokedAt > ReuseGrace)
            {
                _logger.LogWarning("A revoked refresh token was reused; ending every session for user {UserId}", stored.UserId);
                await _refreshTokenRepo.RevokeAllAsync(stored.UserId, now, cancellationToken);
            }
            return null;
        }

        if (stored.ExpiresAt <= now)
        {
            return null;
        }

        IAuthUser? user = await _authRepo.FindUserAsync(stored.UserId, cancellationToken);
        if (user is null || (user.LockoutEnd is { } lockoutEnd && lockoutEnd > now))
        {
            return null;
        }

        (string raw, RefreshTokenRecord next) = NewRefreshToken(user.Id);
        await _refreshTokenRepo.RotateAsync(hash, now, next, cancellationToken);
        return BuildTokens(user, raw);
    }

    /// <inheritdoc />
    public Task LogoutAsync(string refreshToken, CancellationToken cancellationToken = default) =>
        _refreshTokenRepo.RevokeAsync(Hash(refreshToken), _clock.GetUtcNow(), cancellationToken);

    /// <inheritdoc />
    public async Task EnsureAdministratorAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        if (password.Length < _policy.MinPasswordLength)
        {
            throw new ArgumentException($"The password must be at least {_policy.MinPasswordLength} characters.", nameof(password));
        }

        foreach (string role in new[] { "Admin", "User" })
        {
            await _authRepo.EnsureRoleAsync(role, cancellationToken);
        }

        if (await _authRepo.UserExistsAsync(email, cancellationToken))
        {
            return;
        }

        string userId = await _authRepo.CreateUserAsync(new NewAuthUser(email, "Administrator", _passwords.Hash(password)), cancellationToken);
        await _authRepo.AddToRoleAsync(userId, "Admin", cancellationToken);
        // Placeholder group so the hub has something to target before group management exists.
        await _authRepo.AddClaimAsync(userId, "group", "default", cancellationToken);
        _logger.LogInformation("Created the initial administrator");
    }

    private AuthTokens? Rejected()
    {
        _logger.LogInformation("Sign-in rejected");   // never log which part failed, or the email
        return null;
    }

    private AuthTokens BuildTokens(IAuthUser user, string rawRefreshToken)
    {
        (string token, DateTimeOffset expires) = _accessTokenFactory.CreateUserToken(user);
        return new AuthTokens(token, expires, rawRefreshToken);
    }

    private (string Raw, RefreshTokenRecord Record) NewRefreshToken(string userId)
    {
        string raw = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64))
            .TrimEnd('=').Replace('+', '-').Replace('/', '_');
        DateTimeOffset now = _clock.GetUtcNow();
        return (raw, new RefreshTokenRecord(userId, Hash(raw), now, now.Add(_accessTokenFactory.RefreshTokenLifetime)));
    }

    private static string Hash(string token) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
}
