using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos.Auth;

/// <summary>
/// Reads and writes users, roles and groups for the administration screens. Persistence only: the rules
/// (who may do what, never losing the last administrator) are in OI.Business. It changes tracked entities and
/// saves, instead of using set-based updates, so each call is one save and it behaves the same on every provider.
/// </summary>
internal class AuthAdminRepo(OiAuthDbContext authDbContext) : IAuthAdminRepo
{
    private readonly OiAuthDbContext _db = authDbContext ?? throw new ArgumentNullException(nameof(authDbContext));

    // a lockout that ends in year 9999 is how a user is disabled (see AdminUser)
    private static readonly DateTimeOffset DisabledThreshold = new(9999, 1, 1, 0, 0, 0, TimeSpan.Zero);

    private static string Normalize(string value) => value.ToUpperInvariant();

    // ------------------------------------------------------------------ users

    public async Task<PagedResult<AdminUser>> FindUsersAsync(string? search, int page, int pageSize, CancellationToken cancellationToken = default)
    {
        IQueryable<ApplicationUser> query = _db.Users.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(search))
        {
            string term = Normalize(search.Trim());
            query = query.Where(u => (u.NormalizedEmail != null && u.NormalizedEmail.Contains(term))
                                     || (u.DisplayName != null && u.DisplayName.ToUpper().Contains(term)));
        }

        long total = await query.LongCountAsync(cancellationToken);
        List<ApplicationUser> users = await query
            .OrderBy(u => u.Email)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<AdminUser>(await ToAdminUsersAsync(users, cancellationToken), total);
    }

    public async Task<AdminUser?> GetUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        ApplicationUser? user = await _db.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null)
        {
            return null;
        }
        List<AdminUser> result = await ToAdminUsersAsync([user], cancellationToken);
        return result[0];
    }

    public async Task<string> CreateUserAsync(NewAuthUser newUser, IReadOnlyCollection<string> roles, IReadOnlyCollection<string> groups, CancellationToken cancellationToken = default)
    {
        ApplicationUser user = new()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = newUser.Email,
            NormalizedUserName = Normalize(newUser.Email),
            Email = newUser.Email,
            NormalizedEmail = Normalize(newUser.Email),
            EmailConfirmed = true,
            DisplayName = newUser.DisplayName,
            PasswordHash = newUser.PasswordHash,
            SecurityStamp = Guid.NewGuid().ToString(),
            ConcurrencyStamp = Guid.NewGuid().ToString(),
            LockoutEnabled = true,
        };
        _db.Users.Add(user);

        foreach (string roleId in await FindRoleIdsAsync(roles, cancellationToken))
        {
            _db.UserRoles.Add(new IdentityUserRole<string> { UserId = user.Id, RoleId = roleId });
        }
        foreach (string groupId in await FindGroupIdsAsync(groups, cancellationToken))
        {
            user.GroupMemberships.Add(new AuthGroupMember { UserId = user.Id, GroupId = groupId });
        }

        await _db.SaveChangesAsync(cancellationToken);
        return user.Id;
    }

    public async Task UpdateUserAsync(string userId, string displayName, IReadOnlyCollection<string> roles, IReadOnlyCollection<string> groups, CancellationToken cancellationToken = default)
    {
        ApplicationUser user = await _db.Users
            .Include(u => u.GroupMemberships)
            .SingleAsync(u => u.Id == userId, cancellationToken);
        user.DisplayName = displayName;

        List<string> wantedRoleIds = await FindRoleIdsAsync(roles, cancellationToken);
        List<IdentityUserRole<string>> currentRoles = await _db.UserRoles.Where(ur => ur.UserId == userId).ToListAsync(cancellationToken);
        _db.UserRoles.RemoveRange(currentRoles.Where(ur => !wantedRoleIds.Contains(ur.RoleId)));
        foreach (string roleId in wantedRoleIds.Where(id => currentRoles.All(ur => ur.RoleId != id)))
        {
            _db.UserRoles.Add(new IdentityUserRole<string> { UserId = userId, RoleId = roleId });
        }

        List<string> wantedGroupIds = await FindGroupIdsAsync(groups, cancellationToken);
        List<AuthGroupMember> currentGroups = user.GroupMemberships.ToList();
        _db.AuthUserGroups.RemoveRange(currentGroups.Where(m => !wantedGroupIds.Contains(m.GroupId)));
        foreach (string groupId in wantedGroupIds.Where(id => currentGroups.All(m => m.GroupId != id)))
        {
            user.GroupMemberships.Add(new AuthGroupMember { UserId = userId, GroupId = groupId });
        }

        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task SetPasswordHashAsync(string userId, string passwordHash, CancellationToken cancellationToken = default)
    {
        ApplicationUser user = await _db.Users.SingleAsync(u => u.Id == userId, cancellationToken);
        user.PasswordHash = passwordHash;
        user.SecurityStamp = Guid.NewGuid().ToString();
        user.AccessFailedCount = 0;
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task SetDisabledAsync(string userId, bool disabled, CancellationToken cancellationToken = default)
    {
        ApplicationUser user = await _db.Users.SingleAsync(u => u.Id == userId, cancellationToken);
        user.LockoutEnd = disabled ? AdminUser.DisabledUntil : null;
        user.AccessFailedCount = 0;
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        ApplicationUser? user = await _db.Users.SingleOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null)
        {
            return;
        }

        _db.UserRoles.RemoveRange(await _db.UserRoles.Where(x => x.UserId == userId).ToListAsync(cancellationToken));
        _db.UserClaims.RemoveRange(await _db.UserClaims.Where(x => x.UserId == userId).ToListAsync(cancellationToken));
        _db.UserLogins.RemoveRange(await _db.UserLogins.Where(x => x.UserId == userId).ToListAsync(cancellationToken));
        _db.UserTokens.RemoveRange(await _db.UserTokens.Where(x => x.UserId == userId).ToListAsync(cancellationToken));
        _db.RefreshTokens.RemoveRange(await _db.RefreshTokens.Where(x => x.UserId == userId).ToListAsync(cancellationToken));
        _db.AuthUserGroups.RemoveRange(await _db.AuthUserGroups.Where(x => x.UserId == userId).ToListAsync(cancellationToken));
        _db.Users.Remove(user);

        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> CountEnabledUsersInRoleAsync(string role, CancellationToken cancellationToken = default)
    {
        string normalized = Normalize(role);
        return await (
                from ur in _db.UserRoles
                join r in _db.Roles on ur.RoleId equals r.Id
                where r.NormalizedName == normalized
                join u in _db.Users on ur.UserId equals u.Id
                where u.LockoutEnd == null || u.LockoutEnd < DisabledThreshold
                select u.Id)
            .CountAsync(cancellationToken);
    }

    // ------------------------------------------------------------------ roles

    public async Task<IReadOnlyCollection<AdminRole>> ListRolesAsync(CancellationToken cancellationToken = default)
    {
        var rows = await _db.Roles.AsNoTracking()
            .OrderBy(r => r.Name)
            .Select(r => new { r.Name, UserCount = _db.UserRoles.Count(ur => ur.RoleId == r.Id) })
            .ToListAsync(cancellationToken);
        return rows.Select(r => new AdminRole(r.Name ?? string.Empty, false, r.UserCount)).ToList();
    }

    public async Task CreateRoleAsync(string name, CancellationToken cancellationToken = default)
    {
        _db.Roles.Add(new IdentityRole
        {
            Id = Guid.NewGuid().ToString(),
            Name = name,
            NormalizedName = Normalize(name),
            ConcurrencyStamp = Guid.NewGuid().ToString(),
        });
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteRoleAsync(string name, CancellationToken cancellationToken = default)
    {
        string normalized = Normalize(name);
        IdentityRole? role = await _db.Roles.SingleOrDefaultAsync(r => r.NormalizedName == normalized, cancellationToken);
        if (role is null)
        {
            return;
        }

        _db.UserRoles.RemoveRange(await _db.UserRoles.Where(ur => ur.RoleId == role.Id).ToListAsync(cancellationToken));
        _db.RoleClaims.RemoveRange(await _db.RoleClaims.Where(rc => rc.RoleId == role.Id).ToListAsync(cancellationToken));
        _db.Roles.Remove(role);
        await _db.SaveChangesAsync(cancellationToken);
    }

    // ------------------------------------------------------------------ groups

    public async Task<IReadOnlyCollection<AdminGroup>> ListGroupsAsync(CancellationToken cancellationToken = default)
    {
        var rows = await _db.AuthGroups.AsNoTracking()
            .OrderBy(g => g.Name)
            .Select(g => new { g.Name, g.Description, MemberCount = g.Members.Count })
            .ToListAsync(cancellationToken);
        return rows.Select(g => new AdminGroup(g.Name, g.Description, g.MemberCount)).ToList();
    }

    public async Task<AdminGroupDetail?> GetGroupAsync(string name, CancellationToken cancellationToken = default)
    {
        AuthGroup? group = await _db.AuthGroups.AsNoTracking().SingleOrDefaultAsync(g => g.Name == name, cancellationToken);
        if (group is null)
        {
            return null;
        }
        List<AdminGroupMember> members = await _db.AuthUserGroups.AsNoTracking()
            .Where(m => m.GroupId == group.Id)
            .Select(m => m.User)
            .OrderBy(u => u.Email)
            .Select(u => new AdminGroupMember(u.Id, u.Email ?? string.Empty, u.DisplayName ?? u.UserName ?? u.Email ?? u.Id))
            .ToListAsync(cancellationToken);

        return new AdminGroupDetail(
            group.Name,
            group.Description,
            members
            );
    }

    public async Task CreateGroupAsync(string name, string? description, CancellationToken cancellationToken = default)
    {
        _db.AuthGroups.Add(new AuthGroup { Id = Guid.NewGuid().ToString(), Name = name, Description = description });
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateGroupDescriptionAsync(string name, string? description, CancellationToken cancellationToken = default)
    {
        AuthGroup group = await _db.AuthGroups.SingleAsync(g => g.Name == name, cancellationToken);
        group.Description = description;
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<string>> DeleteGroupAsync(string name, CancellationToken cancellationToken = default)
    {
        AuthGroup? group = await _db.AuthGroups
            .Include(g => g.Members)
            .SingleOrDefaultAsync(g => g.Name == name, cancellationToken);
        if (group is null)
        {
            return [];
        }

        List<string> userIds = group.Members.Select(m => m.UserId).ToList();
        _db.AuthUserGroups.RemoveRange(group.Members.ToList());
        _db.AuthGroups.Remove(group);
        await _db.SaveChangesAsync(cancellationToken);
        return userIds;
    }

    // ------------------------------------------------------------------ helpers

    private async Task<List<AdminUser>> ToAdminUsersAsync(IReadOnlyCollection<ApplicationUser> users, CancellationToken cancellationToken)
    {
        string[] ids = users.Select(u => u.Id).ToArray();

        var roleRows = await (
                from ur in _db.UserRoles.AsNoTracking()
                where ids.Contains(ur.UserId)
                join r in _db.Roles.AsNoTracking() on ur.RoleId equals r.Id
                select new { ur.UserId, Name = r.Name! })
            .ToListAsync(cancellationToken);

        var groupRows = await _db.AuthUserGroups.AsNoTracking()
            .Where(m => ids.Contains(m.UserId))
            .Select(m => new { m.UserId, m.Group.Name })
            .ToListAsync(cancellationToken);

        return users.Select(u => new AdminUser(
                u.Id,
                u.Email ?? u.UserName ?? u.Id,
                u.DisplayName ?? u.UserName ?? u.Email ?? u.Id,
                u.LockoutEnd,
                roleRows.Where(r => r.UserId == u.Id).Select(r => r.Name).OrderBy(n => n, StringComparer.OrdinalIgnoreCase).ToList(),
                groupRows.Where(g => g.UserId == u.Id).Select(g => g.Name).OrderBy(n => n, StringComparer.OrdinalIgnoreCase).ToList()))
            .ToList();
    }

    private async Task<List<string>> FindRoleIdsAsync(IReadOnlyCollection<string> roles, CancellationToken cancellationToken)
    {
        string[] names = roles.Select(Normalize).ToArray();
        if (names.Length == 0)
        {
            return [];
        }
        return await _db.Roles
            .Where(r => r.NormalizedName != null && names.Contains(r.NormalizedName))
            .Select(r => r.Id)
            .ToListAsync(cancellationToken);
    }

    private async Task<List<string>> FindGroupIdsAsync(IReadOnlyCollection<string> groups, CancellationToken cancellationToken)
    {
        string[] names = groups.ToArray();
        if (names.Length == 0)
        {
            return [];
        }
        return await _db.AuthGroups
            .Where(g => names.Contains(g.Name))
            .Select(g => g.Id)
            .ToListAsync(cancellationToken);
    }
}
