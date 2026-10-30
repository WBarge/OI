using System.Reflection;
using Microsoft.EntityFrameworkCore;
using OI.Data.Configuration.ConfigurationTags;
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
        //this assembly has multiple contexts in it
        //this is a tagging approach so migrations can be created
        //and there is no cross over between contexts
        //NOTE:if the context boundaries are crossed
        //THEN THE SYSTEM WILL BREAK!!!!!!!
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(OiServiceDbContext).Assembly,
            t => typeof(IServiceConfiguration).IsAssignableFrom(t));
    }

    public DbSet<Order> Orders { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<State> States { get; set; }

    public DbSet<OrderCounter> OrderCounters { get; set; }

}