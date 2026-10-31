using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Auth;

namespace OI.Data.Contexts;

/// <summary>
/// Represents a database context,
/// providing access to the underlying database and managing entity configurations.
/// This context is the persistence store for users, roles, claims and refresh tokens
/// </summary>
/// <param name="options"></param>
internal class OiAuthDbContext(DbContextOptions<OiAuthDbContext> options) : IdentityDbContext<ApplicationUser>(options)
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
    }

    public DbSet<RefreshToken> RefreshTokens { get; set; }
}
