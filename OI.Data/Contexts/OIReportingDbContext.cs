using System.Reflection;
using Microsoft.EntityFrameworkCore;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Jobs;

namespace OI.Data.Contexts;

/// <summary>
/// Represents a database context,
/// providing access to the underlying database and managing entity configurations.
/// This context is the persistence store for reporting
/// </summary>
/// <param name="options"></param>
internal class OiReportingDbContext (DbContextOptions<OiReportingDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Configures the model for the database context by applying entity configurations from the current assembly.
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //this assembly has multiple contexts in it
        //this is a tagging approach so migrations can be created
        //and there is no cross over between contexts
        //NOTE:if the context boundaries are crossed
        //THEN THE SYSTEM WILL BREAK!!!!!!!
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(OiReportingDbContext).Assembly,
            t => typeof(IReportingConfiguration).IsAssignableFrom(t));
    }

    public DbSet<JobResult> ReportResults { get; set; }
}