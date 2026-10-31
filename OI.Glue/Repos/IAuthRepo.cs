using OI.Glue.Models;

namespace OI.Glue.Repos;

/// <summary>Persistence only. Every rule (passwords, lockout, who may sign in) lives in IAuthManager.</summary>
public interface IAuthRepo
{
    Task<IAuthCredential?> FindCredentialAsync(string email, CancellationToken cancellationToken = default);
    Task<IAuthUser?> FindUserAsync(string userId, CancellationToken cancellationToken = default);

    /// <summary>Adds one to the stored failure count and returns the new count.</summary>
    Task<int> IncrementAccessFailedAsync(string userId, CancellationToken cancellationToken = default);
    Task ResetAccessFailedAsync(string userId, CancellationToken cancellationToken = default);
    /// <summary>Locks the user out until the given time and clears the failure count.</summary>
    Task SetLockoutAsync(string userId, DateTimeOffset lockoutEnd, CancellationToken cancellationToken = default);

    Task<bool> UserExistsAsync(string email, CancellationToken cancellationToken = default);
    Task<string> CreateUserAsync(NewAuthUser user, CancellationToken cancellationToken = default);
    Task EnsureRoleAsync(string role, CancellationToken cancellationToken = default);
    Task AddToRoleAsync(string userId, string role, CancellationToken cancellationToken = default);
    Task AddClaimAsync(string userId, string type, string value, CancellationToken cancellationToken = default);
}
