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
    public OiServiceDbContext CreateContext()
    {
        DbContextOptions<OiServiceDbContext> options = new DbContextOptionsBuilder<OiServiceDbContext>()
            .UseInMemoryDatabase(_name, _root)
            .Options;
        OiServiceDbContext context = new(options);
        context.Database.EnsureCreated();
        return context;
    }
}

/// <summary>
/// Helpers for asserting on exceptions that come out of the data layer.
/// </summary>
internal static class ExceptionExtensions
{
    /// <summary>
    /// Returns the first non-aggregate exception inside <paramref name="exception"/>.
    /// The filtering engine builds its query on a worker task and waits for it, so an error it hits
    /// (for example an unknown property name) reaches the caller wrapped in an <see cref="AggregateException"/>.
    /// Asserting on the unwrapped exception keeps the tests about the real cause rather than the wrapper.
    /// </summary>
    public static Exception Unwrap(this Exception exception)
    {
        return exception is AggregateException aggregate
            ? aggregate.Flatten().InnerExceptions.First().Unwrap()
            : exception;
    }
}
