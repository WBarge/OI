using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Auth;

namespace OI.Data.Contexts;

/// <summary>
/// Represents a database context,
/// providing access to the underlying database and managing entity configurations.
/// This context is the persistence store for users, roles, claims and groups, for OpenIddict's applications,
/// authorizations and tokens, and for the shared Data Protection key ring (so every OI.Auth instance can read
/// the sign-in cookie another instance wrote).
/// </summary>
/// <param name="options"></param>
internal class OiAuthDbContext(DbContextOptions<OiAuthDbContext> options) : IdentityDbContext<ApplicationUser>(options), IDataProtectionKeyContext
{
    /// <summary>
    /// Configures the model for the database context by applying entity configurations from the current assembly.
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Identity's own tables (AspNetUsers, AspNetRoles, ...). Must run first.
        base.OnModelCreating(modelBuilder);

        //this assembly has multiple contexts in it
        //this is a tagging approach so migrations can be created
        //and there is no cross over between contexts
        //NOTE:if the context boundaries are crossed
        //THEN THE SYSTEM WILL BREAK!!!!!!!
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(OiAuthDbContext).Assembly,
            t => typeof(IAuthConfiguration).IsAssignableFrom(t));

        // OpenIddict's own tables: registered applications, authorizations, scopes and tokens (authorization codes and refresh tokens).
        modelBuilder.UseOpenIddict();
    }

    /// <summary>The shared Data Protection key ring (see DataDi.ConfigureAuthDi).</summary>
    public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }

    public DbSet<AuthGroup> AuthGroups { get; set; }

    public DbSet<AuthGroupMember> AuthUserGroups { get; set; }
}
