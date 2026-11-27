using Microsoft.Extensions.Logging;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Glue.Services;

namespace OI.Business.Managers;

/// <summary>
/// The sign-in rules: when a password is accepted and how failures lead to lockout. The repos only store and fetch.
/// Tokens are not issued here: OI.Auth (OpenIddict) issues and renews them for a user this class has accepted.
/// </summary>
internal class AuthManager : IAuthManager
{
    private readonly IAuthRepo _authRepo;
    private readonly IPasswordService _passwords;
    private readonly AuthPolicy _policy;
    private readonly TimeProvider _clock;
    private readonly ILogger<AuthManager> _logger;
    private readonly Lazy<string> _dummyHash;

    public AuthManager(
        IAuthRepo authRepo,
        IPasswordService passwords,
        AuthPolicy policy,
        TimeProvider clock,
        ILogger<AuthManager> logger)
    {
        _authRepo = authRepo ?? throw new ArgumentNullException(nameof(authRepo));
        _passwords = passwords ?? throw new ArgumentNullException(nameof(passwords));
        _policy = policy ?? throw new ArgumentNullException(nameof(policy));
        _clock = clock ?? throw new ArgumentNullException(nameof(clock));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        // Checked against when the email is unknown, so an unknown email takes as long as a wrong password.
        _dummyHash = new Lazy<string>(() => _passwords.Hash(Guid.NewGuid().ToString("N")));
    }

    /// <inheritdoc />
    public async Task<IAuthUser?> ValidateCredentialsAsync(string email, string password, CancellationToken cancellationToken = default)
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

        return user;
    }

    /// <inheritdoc />
    public async Task<IAuthUser?> FindActiveUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        IAuthUser? user = await _authRepo.FindUserAsync(userId, cancellationToken);
        if (user is null || (user.LockoutEnd is { } lockoutEnd && lockoutEnd > _clock.GetUtcNow()))
        {
            return null;
        }
        return user;
    }

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
        // The first administrator starts in the "default" group. More groups are created and assigned in the Admin screens.
        await _authRepo.AddToGroupAsync(userId, "default", cancellationToken);
        _logger.LogInformation("Created the initial administrator");
    }

    private IAuthUser? Rejected()
    {
        _logger.LogInformation("Sign-in rejected");   // never log which part failed, or the email
        return null;
    }
}
