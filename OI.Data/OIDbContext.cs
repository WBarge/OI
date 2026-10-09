using System.Reflection;
using Microsoft.EntityFrameworkCore;
using OI.Data.Model;

namespace OI.Data;

/// <summary>
/// Represents the database context for the OI application, providing access to the underlying database and managing entity configurations.
/// </summary>
/// <param name="options"></param>
internal class OiDbContext(DbContextOptions<OiDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Configures the model for the database context by applying entity configurations from the current assembly.
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public DbSet<Order> Orders { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<State> States { get; set; }

    public DbSet<OrderCounter> OrderCounters { get; set; }

}