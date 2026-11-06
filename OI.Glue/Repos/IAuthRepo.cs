using OI.Glue.Models;

namespace OI.Glue.Repos;

/// <summary>
/// Persistence only for users, roles and groups: sign-in, bootstrapping and the administration screens.
/// Every rule (passwords, lockout, who may sign in, who may administer what) lives in IAuthManager and IAuthAdminManager.
/// </summary>
public interface IAuthRepo
{
    // ---- sign-in
    Task<IAuthCredential?> FindCredentialAsync(string email, CancellationToken cancellationToken = default);
    Task<IAuthUser?> FindUserAsync(string userId, CancellationToken cancellationToken = default);

    /// <summary>Adds one to the stored failure count and returns the new count.</summary>
    Task<int> IncrementAccessFailedAsync(string userId, CancellationToken cancellationToken = default);
    Task ResetAccessFailedAsync(string userId, CancellationToken cancellationToken = default);
    /// <summary>Locks the user out until the given time and clears the failure count.</summary>
    Task SetLockoutAsync(string userId, DateTimeOffset lockoutEnd, CancellationToken cancellationToken = default);

    // ---- creating users, roles and memberships one at a time (bootstrapping)
    Task<bool> UserExistsAsync(string email, CancellationToken cancellationToken = default);
    Task<string> CreateUserAsync(NewAuthUser user, CancellationToken cancellationToken = default);
    Task EnsureRoleAsync(string role, CancellationToken cancellationToken = default);
    Task AddToRoleAsync(string userId, string role, CancellationToken cancellationToken = default);
    Task AddClaimAsync(string userId, string type, string value, CancellationToken cancellationToken = default);
    /// <summary>Puts the user in the group, creating the group first if it does not exist. Does nothing if they are already in it.</summary>
    Task AddToGroupAsync(string userId, string groupName, CancellationToken cancellationToken = default);

    // ---- users (administration)
    /// <summary>One page of users ordered by email. Page is 1-based. The search matches part of the email or the name.</summary>
    Task<PagedResult<AdminUser>> FindUsersAsync(string? search, int page, int pageSize, CancellationToken cancellationToken = default);
    Task<AdminUser?> GetUserAsync(string userId, CancellationToken cancellationToken = default);
    /// <summary>Creates the user with these roles and groups in one save. Roles and groups that do not exist are ignored.</summary>
    Task<string> CreateUserAsync(NewAuthUser user, IReadOnlyCollection<string> roles, IReadOnlyCollection<string> groups, CancellationToken cancellationToken = default);
    /// <summary>Changes the name and makes the user's roles and groups exactly the ones given.</summary>
    Task UpdateUserAsync(string userId, string displayName, IReadOnlyCollection<string> roles, IReadOnlyCollection<string> groups, CancellationToken cancellationToken = default);
    Task SetPasswordHashAsync(string userId, string passwordHash, CancellationToken cancellationToken = default);
    /// <summary>Disabling locks the user out for good; enabling clears every lockout and the failed-attempt count.</summary>
    Task SetDisabledAsync(string userId, bool disabled, CancellationToken cancellationToken = default);
    /// <summary>Removes the user and everything that belongs to them (roles, groups, claims, refresh tokens).</summary>
    Task DeleteUserAsync(string userId, CancellationToken cancellationToken = default);
    /// <summary>How many users have the role and are not disabled.</summary>
    Task<int> CountEnabledUsersInRoleAsync(string role, CancellationToken cancellationToken = default);

    // ---- roles (administration)
    Task<IReadOnlyCollection<AdminRole>> ListRolesAsync(CancellationToken cancellationToken = default);
    Task CreateRoleAsync(string name, CancellationToken cancellationToken = default);
    Task DeleteRoleAsync(string name, CancellationToken cancellationToken = default);

    // ---- groups (administration)
    Task<IReadOnlyCollection<AdminGroup>> ListGroupsAsync(CancellationToken cancellationToken = default);
    Task<AdminGroupDetail?> GetGroupAsync(string name, CancellationToken cancellationToken = default);
    Task CreateGroupAsync(string name, string? description, CancellationToken cancellationToken = default);
    Task UpdateGroupDescriptionAsync(string name, string? description, CancellationToken cancellationToken = default);
    /// <summary>Deletes the group and its memberships. Returns the ids of the users who were in it.</summary>
    Task<IReadOnlyCollection<string>> DeleteGroupAsync(string name, CancellationToken cancellationToken = default);
}
