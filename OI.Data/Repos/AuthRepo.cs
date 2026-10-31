using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Data.Translators.Internal_Models;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

/// <summary>
/// Reads and writes the Identity tables directly. No password checks, no lockout decisions:
/// those are rules and live in OI.Business. Identity stores names and emails in upper case
/// in the Normalized* columns, so every lookup and insert here does the same.
/// </summary>
internal class AuthRepo(OiAuthDbContext authDbContext) : IAuthRepo
{
    private static string Normalize(string value) => value.ToUpperInvariant();

    public async Task<IAuthCredential?> FindCredentialAsync(string email, CancellationToken cancellationToken = default)
    {
        string normalized = Normalize(email);
        AuthCredential? credential = await authDbContext.Users.AsNoTracking()
            .Where(u => u.NormalizedEmail == normalized)
            .Select(u => new AuthCredential
            {
                UserId = u.Id,
                PasswordHash = u.PasswordHash,
                LockoutEnd = u.LockoutEnd,
                AccessFailedCount = u.AccessFailedCount,
            })
            .SingleOrDefaultAsync(cancellationToken);
        return credential;
    }

    public async Task<IAuthUser?> FindUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        ApplicationUser? user = await authDbContext.Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null)
        {
            return null;
        }

        List<string> roles = await (
                from ur in authDbContext.UserRoles
                where ur.UserId == userId
                join r in authDbContext.Roles on ur.RoleId equals r.Id
                select r.Name!)
            .ToListAsync(cancellationToken);

        var claimRows = await authDbContext.UserClaims.AsNoTracking()
            .Where(c => c.UserId == userId)
            .Select(c => new { c.ClaimType, c.ClaimValue })
            .ToListAsync(cancellationToken);

        return new AuthUser
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName ?? user.UserName ?? user.Email ?? user.Id,
            LockoutEnd = user.LockoutEnd,
            Roles = roles,
            Claims = claimRows
                .Where(c => c.ClaimType is not null && c.ClaimValue is not null)
                .Select(c => new KeyValuePair<string, string>(c.ClaimType!, c.ClaimValue!))
                .ToList(),
        };
    }

    public async Task<int> IncrementAccessFailedAsync(string userId, CancellationToken cancellationToken = default)
    {
        await authDbContext.Users.Where(u => u.Id == userId)
            .ExecuteUpdateAsync(s => s.SetProperty(u => u.AccessFailedCount, u => u.AccessFailedCount + 1), cancellationToken);
        return await authDbContext.Users.Where(u => u.Id == userId)
            .Select(u => u.AccessFailedCount)
            .SingleAsync(cancellationToken);
    }

    public Task ResetAccessFailedAsync(string userId, CancellationToken cancellationToken = default) =>
        authDbContext.Users.Where(u => u.Id == userId)
            .ExecuteUpdateAsync(s => s.SetProperty(u => u.AccessFailedCount, 0), cancellationToken);

    public Task SetLockoutAsync(string userId, DateTimeOffset lockoutEnd, CancellationToken cancellationToken = default) =>
        authDbContext.Users.Where(u => u.Id == userId)
            .ExecuteUpdateAsync(s => s
                .SetProperty(u => u.LockoutEnd, lockoutEnd)
                .SetProperty(u => u.AccessFailedCount, 0), cancellationToken);

    public Task<bool> UserExistsAsync(string email, CancellationToken cancellationToken = default)
    {
        string normalized = Normalize(email);
        return authDbContext.Users.AnyAsync(u => u.NormalizedEmail == normalized, cancellationToken);
    }

    public async Task<string> CreateUserAsync(NewAuthUser newUser, CancellationToken cancellationToken = default)
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
        authDbContext.Users.Add(user);
        await authDbContext.SaveChangesAsync(cancellationToken);
        return user.Id;
    }

    public async Task EnsureRoleAsync(string role, CancellationToken cancellationToken = default)
    {
        string normalized = Normalize(role);
        if (await authDbContext.Roles.AnyAsync(r => r.NormalizedName == normalized, cancellationToken))
        {
            return;
        }
        authDbContext.Roles.Add(new IdentityRole
        {
            Id = Guid.NewGuid().ToString(),
            Name = role,
            NormalizedName = normalized,
            ConcurrencyStamp = Guid.NewGuid().ToString(),
        });
        await authDbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddToRoleAsync(string userId, string role, CancellationToken cancellationToken = default)
    {
        string normalized = Normalize(role);
        string roleId = await authDbContext.Roles
            .Where(r => r.NormalizedName == normalized)
            .Select(r => r.Id)
            .SingleAsync(cancellationToken);

        if (await authDbContext.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == roleId, cancellationToken))
        {
            return;
        }
        authDbContext.UserRoles.Add(new IdentityUserRole<string> { UserId = userId, RoleId = roleId });
        await authDbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddClaimAsync(string userId, string type, string value, CancellationToken cancellationToken = default)
    {
        authDbContext.UserClaims.Add(new IdentityUserClaim<string> { UserId = userId, ClaimType = type, ClaimValue = value });
        await authDbContext.SaveChangesAsync(cancellationToken);
    }
}
