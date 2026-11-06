using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Glue.Security;
using OI.Glue.Services;

namespace OI.Business.Managers;

/// <summary>
/// The rules for managing users, roles and groups. The OI.Auth controllers only let administrators in; what is
/// decided here is what an administrator may do: never lock everyone out (the last active administrator is
/// protected), never lock yourself out, and take a user's sessions away when their access is reduced.
/// </summary>
internal class AuthAdminManager : IAuthAdminManager
{
    internal const string ADMIN_ROLE_NAME = "Admin";
    internal const string LAST_ADMINISTRATOR_MESSAGE = "There must always be at least one active administrator.";
    internal const int MAX_PASSWORD_LENGTH = 128;
    internal static readonly string[] BuiltInRoles = [ADMIN_ROLE_NAME, "User"];

    private static readonly TimeSpan PatternTimeout = TimeSpan.FromMilliseconds(250);
    private static readonly Regex EmailPattern = new(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled, PatternTimeout);
    private static readonly Regex RoleNamePattern = new(@"^[A-Za-z][A-Za-z0-9 _-]{1,49}$", RegexOptions.Compiled, PatternTimeout);
    private static readonly Regex GroupNamePattern = new(@"^[a-z0-9][a-z0-9_-]{1,62}$", RegexOptions.Compiled, PatternTimeout);

    private readonly IAuthRepo _authRepo;
    private readonly IRefreshTokenRepo _refreshTokenRepo;
    private readonly IPasswordService _passwords;
    private readonly IClientContext _actor;
    private readonly AuthPolicy _policy;
    private readonly TimeProvider _clock;
    private readonly ILogger<AuthAdminManager> _logger;

    public AuthAdminManager(
        IAuthRepo authRepo,
        IRefreshTokenRepo refreshTokenRepo,
        IPasswordService passwords,
        IClientContext actor,
        AuthPolicy policy,
        TimeProvider clock,
        ILogger<AuthAdminManager> logger)
    {
        _authRepo = authRepo ?? throw new ArgumentNullException(nameof(authRepo));
        _refreshTokenRepo = refreshTokenRepo ?? throw new ArgumentNullException(nameof(refreshTokenRepo));
        _passwords = passwords ?? throw new ArgumentNullException(nameof(passwords));
        _actor = actor ?? throw new ArgumentNullException(nameof(actor));
        _policy = policy ?? throw new ArgumentNullException(nameof(policy));
        _clock = clock ?? throw new ArgumentNullException(nameof(clock));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    // ------------------------------------------------------------------ users

    /// <inheritdoc />
    public Task<PagedResult<AdminUser>> GetUsersAsync(string? search, int page, int pageSize, CancellationToken cancellationToken = default) =>
        _authRepo.FindUsersAsync(search?.Trim(), Math.Max(1, page), Math.Clamp(pageSize, 1, 100), cancellationToken);

    /// <inheritdoc />
    public async Task<AdminResult<AdminUser>> GetUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        AdminUser? user = await _authRepo.GetUserAsync(userId, cancellationToken);
        return user is null ? AdminResult<AdminUser>.NotFound("That user does not exist.") : AdminResult<AdminUser>.Ok(user);
    }

    /// <inheritdoc />
    public async Task<AdminResult<AdminUser>> CreateUserAsync(NewAdminUser request, CancellationToken cancellationToken = default)
    {
        string email = request.Email?.Trim() ?? string.Empty;
        if (email.Length > 256 || !IsMatch(EmailPattern, email))
        {
            return AdminResult<AdminUser>.Invalid("Enter a valid email address.");
        }
        string? nameError = ValidateDisplayName(request.DisplayName, out string displayName);
        if (nameError is not null)
        {
            return AdminResult<AdminUser>.Invalid(nameError);
        }
        string? passwordError = ValidatePassword(request.Password);
        if (passwordError is not null)
        {
            return AdminResult<AdminUser>.Invalid(passwordError);
        }
        (List<string>? roles, string? roleError) = await ResolveRolesAsync(request.Roles, cancellationToken);
        if (roles is null)
        {
            return AdminResult<AdminUser>.Invalid(roleError!);
        }
        (List<string>? groups, string? groupError) = await ResolveGroupsAsync(request.Groups, cancellationToken);
        if (groups is null)
        {
            return AdminResult<AdminUser>.Invalid(groupError!);
        }

        if (await _authRepo.UserExistsAsync(email, cancellationToken))
        {
            return AdminResult<AdminUser>.Conflict("A user with that email address already exists.");
        }

        string userId = await _authRepo.CreateUserAsync(new NewAuthUser(email, displayName, _passwords.Hash(request.Password)), roles, groups, cancellationToken);
        _logger.LogInformation("Administrator {ActorId} created user {UserId}", _actor.UserId, userId);

        AdminUser? created = await _authRepo.GetUserAsync(userId, cancellationToken);
        return AdminResult<AdminUser>.Ok(created!);
    }

    /// <inheritdoc />
    public async Task<AdminResult<AdminUser>> UpdateUserAsync(string userId, UpdateAdminUser request, CancellationToken cancellationToken = default)
    {
        AdminUser? existing = await _authRepo.GetUserAsync(userId, cancellationToken);
        if (existing is null)
        {
            return AdminResult<AdminUser>.NotFound("That user does not exist.");
        }

        string? nameError = ValidateDisplayName(request.DisplayName, out string displayName);
        if (nameError is not null)
        {
            return AdminResult<AdminUser>.Invalid(nameError);
        }
        (List<string>? roles, string? roleError) = await ResolveRolesAsync(request.Roles, cancellationToken);
        if (roles is null)
        {
            return AdminResult<AdminUser>.Invalid(roleError!);
        }
        (List<string>? groups, string? groupError) = await ResolveGroupsAsync(request.Groups, cancellationToken);
        if (groups is null)
        {
            return AdminResult<AdminUser>.Invalid(groupError!);
        }

        if (HasRole(existing.Roles, ADMIN_ROLE_NAME) && !HasRole(roles, ADMIN_ROLE_NAME))
        {
            if (userId == _actor.UserId)
            {
                return AdminResult<AdminUser>.Conflict("You cannot remove your own Admin role.");
            }
            if (!existing.IsDisabled && await _authRepo.CountEnabledUsersInRoleAsync(ADMIN_ROLE_NAME, cancellationToken) <= 1)
            {
                return AdminResult<AdminUser>.Conflict(LAST_ADMINISTRATOR_MESSAGE);
            }
        }

        await _authRepo.UpdateUserAsync(userId, displayName, roles, groups, cancellationToken);

        // Access that was removed must not outlive the access token the user already holds: end their sessions,
        // so they sign in again (and get the reduced access) once the current token runs out.
        bool accessReduced = existing.Roles.Except(roles, StringComparer.OrdinalIgnoreCase).Any()
                             || existing.Groups.Except(groups, StringComparer.OrdinalIgnoreCase).Any();
        if (accessReduced)
        {
            await RevokeSessionsAsync(userId, cancellationToken);
        }

        _logger.LogInformation("Administrator {ActorId} changed user {UserId}", _actor.UserId, userId);
        AdminUser? updated = await _authRepo.GetUserAsync(userId, cancellationToken);
        return AdminResult<AdminUser>.Ok(updated!);
    }

    /// <inheritdoc />
    public async Task<AdminResult> ResetPasswordAsync(string userId, string newPassword, CancellationToken cancellationToken = default)
    {
        string? passwordError = ValidatePassword(newPassword);
        if (passwordError is not null)
        {
            return AdminResult.Invalid(passwordError);
        }
        if (await _authRepo.GetUserAsync(userId, cancellationToken) is null)
        {
            return AdminResult.NotFound("That user does not exist.");
        }

        await _authRepo.SetPasswordHashAsync(userId, _passwords.Hash(newPassword), cancellationToken);
        await RevokeSessionsAsync(userId, cancellationToken);   // whoever had the old password must not stay signed in
        _logger.LogInformation("Administrator {ActorId} reset the password of user {UserId}", _actor.UserId, userId);
        return AdminResult.Ok();
    }

    /// <inheritdoc />
    public async Task<AdminResult<AdminUser>> SetDisabledAsync(string userId, bool disabled, CancellationToken cancellationToken = default)
    {
        AdminUser? existing = await _authRepo.GetUserAsync(userId, cancellationToken);
        if (existing is null)
        {
            return AdminResult<AdminUser>.NotFound("That user does not exist.");
        }
        if (existing.IsDisabled == disabled && (disabled || existing.LockoutEnd is null))
        {
            return AdminResult<AdminUser>.Ok(existing);   // already as asked
        }

        if (disabled)
        {
            if (userId == _actor.UserId)
            {
                return AdminResult<AdminUser>.Conflict("You cannot disable your own account.");
            }
            if (HasRole(existing.Roles, ADMIN_ROLE_NAME) && await _authRepo.CountEnabledUsersInRoleAsync(ADMIN_ROLE_NAME, cancellationToken) <= 1)
            {
                return AdminResult<AdminUser>.Conflict(LAST_ADMINISTRATOR_MESSAGE);
            }
        }

        await _authRepo.SetDisabledAsync(userId, disabled, cancellationToken);
        if (disabled)
        {
            await RevokeSessionsAsync(userId, cancellationToken);
        }

        _logger.LogInformation("Administrator {ActorId} {Action} user {UserId}", _actor.UserId, disabled ? "disabled" : "enabled", userId);
        AdminUser? updated = await _authRepo.GetUserAsync(userId, cancellationToken);
        return AdminResult<AdminUser>.Ok(updated!);
    }

    /// <inheritdoc />
    public async Task<AdminResult> DeleteUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        AdminUser? existing = await _authRepo.GetUserAsync(userId, cancellationToken);
        if (existing is null)
        {
            return AdminResult.NotFound("That user does not exist.");
        }
        if (userId == _actor.UserId)
        {
            return AdminResult.Conflict("You cannot delete your own account.");
        }
        if (HasRole(existing.Roles, ADMIN_ROLE_NAME) && !existing.IsDisabled
            && await _authRepo.CountEnabledUsersInRoleAsync(ADMIN_ROLE_NAME, cancellationToken) <= 1)
        {
            return AdminResult.Conflict(LAST_ADMINISTRATOR_MESSAGE);
        }

        await _authRepo.DeleteUserAsync(userId, cancellationToken);
        _logger.LogInformation("Administrator {ActorId} deleted user {UserId}", _actor.UserId, userId);
        return AdminResult.Ok();
    }

    // ------------------------------------------------------------------ roles

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<AdminRole>> GetRolesAsync(CancellationToken cancellationToken = default)
    {
        IReadOnlyCollection<AdminRole> roles = await _authRepo.ListRolesAsync(cancellationToken);
        return roles.Select(r => r with { IsBuiltIn = IsBuiltIn(r.Name) }).ToList();
    }

    /// <inheritdoc />
    public async Task<AdminResult<AdminRole>> CreateRoleAsync(string name, CancellationToken cancellationToken = default)
    {
        string trimmed = name?.Trim() ?? string.Empty;
        if (!IsMatch(RoleNamePattern, trimmed))
        {
            return AdminResult<AdminRole>.Invalid("A role name is 2 to 50 characters: letters, digits, spaces, '-' or '_', starting with a letter.");
        }

        IReadOnlyCollection<AdminRole> existing = await _authRepo.ListRolesAsync(cancellationToken);
        if (existing.Any(r => string.Equals(r.Name, trimmed, StringComparison.OrdinalIgnoreCase)))
        {
            return AdminResult<AdminRole>.Conflict("A role with that name already exists.");
        }

        await _authRepo.CreateRoleAsync(trimmed, cancellationToken);
        _logger.LogInformation("Administrator {ActorId} created role {Role}", _actor.UserId, trimmed);
        return AdminResult<AdminRole>.Ok(new AdminRole(trimmed, IsBuiltIn(trimmed), 0));
    }

    /// <inheritdoc />
    public async Task<AdminResult> DeleteRoleAsync(string name, CancellationToken cancellationToken = default)
    {
        IReadOnlyCollection<AdminRole> existing = await _authRepo.ListRolesAsync(cancellationToken);
        AdminRole? role = existing.FirstOrDefault(r => string.Equals(r.Name, name?.Trim(), StringComparison.OrdinalIgnoreCase));
        if (role is null)
        {
            return AdminResult.NotFound("That role does not exist.");
        }
        if (IsBuiltIn(role.Name))
        {
            return AdminResult.Conflict("The Admin and User roles are built in and cannot be deleted.");
        }
        if (role.UserCount > 0)
        {
            return AdminResult.Conflict($"The role is still assigned to {role.UserCount} user(s). Remove it from them first.");
        }

        await _authRepo.DeleteRoleAsync(role.Name, cancellationToken);
        _logger.LogInformation("Administrator {ActorId} deleted role {Role}", _actor.UserId, role.Name);
        return AdminResult.Ok();
    }

    // ------------------------------------------------------------------ groups

    /// <inheritdoc />
    public Task<IReadOnlyCollection<AdminGroup>> GetGroupsAsync(CancellationToken cancellationToken = default) =>
        _authRepo.ListGroupsAsync(cancellationToken);

    /// <inheritdoc />
    public async Task<AdminResult<AdminGroupDetail>> GetGroupAsync(string name, CancellationToken cancellationToken = default)
    {
        AdminGroupDetail? group = await _authRepo.GetGroupAsync(NormalizeGroupName(name), cancellationToken);
        return group is null ? AdminResult<AdminGroupDetail>.NotFound("That group does not exist.") : AdminResult<AdminGroupDetail>.Ok(group);
    }

    /// <inheritdoc />
    public async Task<AdminResult<AdminGroup>> CreateGroupAsync(NewAdminGroup request, CancellationToken cancellationToken = default)
    {
        string name = NormalizeGroupName(request.Name);
        if (!IsMatch(GroupNamePattern, name))
        {
            return AdminResult<AdminGroup>.Invalid("A group name is 2 to 63 characters: lowercase letters, digits, '-' or '_', starting with a letter or digit.");
        }
        string? descriptionError = ValidateDescription(request.Description, out string? description);
        if (descriptionError is not null)
        {
            return AdminResult<AdminGroup>.Invalid(descriptionError);
        }

        IReadOnlyCollection<AdminGroup> existing = await _authRepo.ListGroupsAsync(cancellationToken);
        if (existing.Any(g => g.Name == name))
        {
            return AdminResult<AdminGroup>.Conflict("A group with that name already exists.");
        }

        await _authRepo.CreateGroupAsync(name, description, cancellationToken);
        _logger.LogInformation("Administrator {ActorId} created group {Group}", _actor.UserId, name);
        return AdminResult<AdminGroup>.Ok(new AdminGroup(name, description, 0));
    }

    /// <inheritdoc />
    public async Task<AdminResult<AdminGroup>> UpdateGroupAsync(string name, string? description, CancellationToken cancellationToken = default)
    {
        string normalized = NormalizeGroupName(name);
        string? descriptionError = ValidateDescription(description, out string? cleaned);
        if (descriptionError is not null)
        {
            return AdminResult<AdminGroup>.Invalid(descriptionError);
        }
        AdminGroupDetail? existing = await _authRepo.GetGroupAsync(normalized, cancellationToken);
        if (existing is null)
        {
            return AdminResult<AdminGroup>.NotFound("That group does not exist.");
        }

        await _authRepo.UpdateGroupDescriptionAsync(normalized, cleaned, cancellationToken);
        _logger.LogInformation("Administrator {ActorId} changed group {Group}", _actor.UserId, normalized);
        return AdminResult<AdminGroup>.Ok(new AdminGroup(normalized, cleaned, existing.Members.Count));
    }

    /// <inheritdoc />
    public async Task<AdminResult> DeleteGroupAsync(string name, CancellationToken cancellationToken = default)
    {
        string normalized = NormalizeGroupName(name);
        if (await _authRepo.GetGroupAsync(normalized, cancellationToken) is null)
        {
            return AdminResult.NotFound("That group does not exist.");
        }

        IReadOnlyCollection<string> members = await _authRepo.DeleteGroupAsync(normalized, cancellationToken);
        foreach (string userId in members)
        {
            await RevokeSessionsAsync(userId, cancellationToken);   // their tokens still carry the group
        }

        _logger.LogInformation("Administrator {ActorId} deleted group {Group} ({Members} members)", _actor.UserId, normalized, members.Count);
        return AdminResult.Ok();
    }

    // ------------------------------------------------------------------ helpers

    private Task RevokeSessionsAsync(string userId, CancellationToken cancellationToken) =>
        _refreshTokenRepo.RevokeAllAsync(userId, _clock.GetUtcNow(), cancellationToken);

    private static bool HasRole(IEnumerable<string> roles, string role) => roles.Contains(role, StringComparer.OrdinalIgnoreCase);

    private static bool IsBuiltIn(string role) => BuiltInRoles.Contains(role, StringComparer.OrdinalIgnoreCase);

    private static string NormalizeGroupName(string? name) => name?.Trim().ToLowerInvariant() ?? string.Empty;

    private static bool IsMatch(Regex pattern, string value)
    {
        try
        {
            return pattern.IsMatch(value);
        }
        catch (RegexMatchTimeoutException)
        {
            return false;
        }
    }

    private string? ValidatePassword(string? password)
    {
        if (password is null || password.Length < _policy.MinPasswordLength || password.Length > MAX_PASSWORD_LENGTH)
        {
            return $"The password must be between {_policy.MinPasswordLength} and {MAX_PASSWORD_LENGTH} characters.";
        }
        return null;
    }

    private static string? ValidateDisplayName(string? value, out string trimmed)
    {
        trimmed = value?.Trim() ?? string.Empty;
        return trimmed.Length is >= 1 and <= 100 ? null : "Enter a name of 1 to 100 characters.";
    }

    private static string? ValidateDescription(string? value, out string? cleaned)
    {
        cleaned = string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        return cleaned is { Length: > 200 } ? "The description can be at most 200 characters." : null;
    }

    private async Task<(List<string>? Roles, string? Error)> ResolveRolesAsync(IReadOnlyCollection<string>? requested, CancellationToken cancellationToken)
    {
        List<string> wanted = (requested ?? [])
            .Select(r => r?.Trim() ?? string.Empty)
            .Where(r => r.Length > 0)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
        if (wanted.Count == 0)
        {
            return (new List<string>(), null);
        }

        IReadOnlyCollection<AdminRole> existing = await _authRepo.ListRolesAsync(cancellationToken);
        List<string> resolved = [];
        foreach (string name in wanted)
        {
            AdminRole? match = existing.FirstOrDefault(r => string.Equals(r.Name, name, StringComparison.OrdinalIgnoreCase));
            if (match is null)
            {
                return (null, $"The role '{name}' does not exist.");
            }
            resolved.Add(match.Name);
        }
        return (resolved, null);
    }

    private async Task<(List<string>? Groups, string? Error)> ResolveGroupsAsync(IReadOnlyCollection<string>? requested, CancellationToken cancellationToken)
    {
        List<string> wanted = (requested ?? [])
            .Select(NormalizeGroupName)
            .Where(g => g.Length > 0)
            .Distinct()
            .ToList();
        if (wanted.Count == 0)
        {
            return (new List<string>(), null);
        }

        IReadOnlyCollection<AdminGroup> existing = await _authRepo.ListGroupsAsync(cancellationToken);
        string? missing = wanted.FirstOrDefault(g => existing.All(e => e.Name != g));
        if (missing is not null)
        {
            return (null, $"The group '{missing}' does not exist.");
        }
        return (wanted, null);
    }
}
