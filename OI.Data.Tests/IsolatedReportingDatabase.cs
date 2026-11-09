using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using OI.Data.Contexts;

namespace OI.Data.Tests;

/// <summary>
/// An in-memory reporting database that is private to one test.
/// Each call to CreateContext shares its data, like separate requests would, so a test can seed with one context
/// and run the code under test with another and nothing is served from the change tracker.
/// </summary>
internal sealed class IsolatedReportingDatabase
{
    private readonly InMemoryDatabaseRoot _root = new();
    private readonly string _name = $"OiReportingIsolated_{Guid.NewGuid():N}";

    public OiReportingDbContext CreateContext()
    {
        DbContextOptions<OiReportingDbContext> options = new DbContextOptionsBuilder<OiReportingDbContext>()
            .UseInMemoryDatabase(_name, _root)
            .Options;
        OiReportingDbContext context = new(options);
        context.Database.EnsureCreated();
        return context;
    }
}
