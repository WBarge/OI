using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using OI.Data.Contexts;

namespace OI.Data.Tests;

/// <summary>
/// A private in-memory database for one test.
/// <see cref="TestSetupHelper"/> hands every fixture the same database ("TestDb"), so tests that need exact
/// counts or a known row order cannot use it without working around other tests' rows. Each instance of this class
/// has its own empty (but seeded: states and the order counter) database, so counts and paging can be asserted exactly.
/// </summary>
internal sealed class IsolatedDatabase
{
    // An explicit root is what makes the database private to this instance rather than shared by name.
    private readonly InMemoryDatabaseRoot _root = new();
    private readonly string _name = $"OiIsolated_{Guid.NewGuid():N}";

    /// <summary>
    /// Creates a new context on this database. Several contexts can be open on it at once, which lets a test
    /// seed with one context and run the code under test with another, so nothing is served from the change tracker.
    /// </summary>
    public OiServiceDbContext CreateContext(string dbName = "")
    {
        if (dbName == "")
        {
            dbName = _name;
        }
    
        DbContextOptions<OiServiceDbContext> options = new DbContextOptionsBuilder<OiServiceDbContext>()
            .UseInMemoryDatabase(dbName, _root)
            .Options;
        OiServiceDbContext context = new(options);
        context.Database.EnsureCreated();
        return context;
    }
}