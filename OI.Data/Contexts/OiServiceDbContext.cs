using System.Reflection;
using Microsoft.EntityFrameworkCore;
using OI.Data.Model.Orders;

namespace OI.Data.Contexts;

/// <summary>
/// Represents a database context,
/// providing access to the underlying database and managing entity configurations.
/// This context is the persistence store for orders and their dependant data
/// </summary>
/// <param name="options"></param>
internal class OiServiceDbContext(DbContextOptions<OiServiceDbContext> options) : DbContext(options)
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