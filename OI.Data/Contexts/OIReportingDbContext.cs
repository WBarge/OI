using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace OI.Data.Contexts;

/// <summary>
/// Represents a database context,
/// providing access to the underlying database and managing entity configurations.
/// This context is the persistence store for reporting
/// </summary>
/// <param name="options"></param>
internal class OiReportingDbContext (DbContextOptions<OiServiceDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Configures the model for the database context by applying entity configurations from the current assembly.
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

}