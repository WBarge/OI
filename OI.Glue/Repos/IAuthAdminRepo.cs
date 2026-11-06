using OI.Glue.Models;

namespace OI.Glue.Repos;

/// <summary>Persistence only for the administration screens. Every rule lives in IAuthAdminManager.</summary>
public interface IAuthAdminRepo
{
    // ---- users
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

    // ---- roles
    Task<IReadOnlyCollection<AdminRole>> ListRolesAsync(CancellationToken cancellationToken = default);
    Task CreateRoleAsync(string name, CancellationToken cancellationToken = default);
    Task DeleteRoleAsync(string name, CancellationToken cancellationToken = default);

    // ---- groups
    Task<IReadOnlyCollection<AdminGroup>> ListGroupsAsync(CancellationToken cancellationToken = default);
    Task<AdminGroupDetail?> GetGroupAsync(string name, CancellationToken cancellationToken = default);
    Task CreateGroupAsync(string name, string? description, CancellationToken cancellationToken = default);
    Task UpdateGroupDescriptionAsync(string name, string? description, CancellationToken cancellationToken = default);
    /// <summary>Deletes the group and its memberships. Returns the ids of the users who were in it.</summary>
    Task<IReadOnlyCollection<string>> DeleteGroupAsync(string name, CancellationToken cancellationToken = default);
}
