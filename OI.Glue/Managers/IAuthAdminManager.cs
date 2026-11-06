using OI.Glue.Models;

namespace OI.Glue.Managers;

/// <summary>
/// Managing users, roles and groups. Only administrators may call this (the OI.Auth controllers enforce it),
/// and the rules here make sure an administrator cannot lock everyone out, themselves included.
/// </summary>
public interface IAuthAdminManager
{
    Task<PagedResult<AdminUser>> GetUsersAsync(string? search, int page, int pageSize, CancellationToken cancellationToken = default);
    Task<AdminResult<AdminUser>> GetUserAsync(string userId, CancellationToken cancellationToken = default);
    Task<AdminResult<AdminUser>> CreateUserAsync(NewAdminUser request, CancellationToken cancellationToken = default);
    Task<AdminResult<AdminUser>> UpdateUserAsync(string userId, UpdateAdminUser request, CancellationToken cancellationToken = default);
    Task<AdminResult> ResetPasswordAsync(string userId, string newPassword, CancellationToken cancellationToken = default);
    Task<AdminResult<AdminUser>> SetDisabledAsync(string userId, bool disabled, CancellationToken cancellationToken = default);
    Task<AdminResult> DeleteUserAsync(string userId, CancellationToken cancellationToken = default);

    Task<IReadOnlyCollection<AdminRole>> GetRolesAsync(CancellationToken cancellationToken = default);
    Task<AdminResult<AdminRole>> CreateRoleAsync(string name, CancellationToken cancellationToken = default);
    Task<AdminResult> DeleteRoleAsync(string name, CancellationToken cancellationToken = default);

    Task<IReadOnlyCollection<AdminGroup>> GetGroupsAsync(CancellationToken cancellationToken = default);
    Task<AdminResult<AdminGroupDetail>> GetGroupAsync(string name, CancellationToken cancellationToken = default);
    Task<AdminResult<AdminGroup>> CreateGroupAsync(NewAdminGroup request, CancellationToken cancellationToken = default);
    Task<AdminResult<AdminGroup>> UpdateGroupAsync(string name, string? description, CancellationToken cancellationToken = default);
    Task<AdminResult> DeleteGroupAsync(string name, CancellationToken cancellationToken = default);
}
