using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using OI.Data.Contexts;

namespace OI.Data.Tests;

/// <summary>An in-memory auth database that is private to one test. Each call to CreateContext shares its data, like separate requests would.</summary>
internal sealed class IsolatedAuthDatabase
{
    private readonly InMemoryDatabaseRoot _root = new();
    private readonly string _name = $"OiAuthIsolated_{Guid.NewGuid():N}";

    public OiAuthDbContext CreateContext()
    {
        DbContextOptions<OiAuthDbContext> options = new DbContextOptionsBuilder<OiAuthDbContext>()
            .UseInMemoryDatabase(_name, _root)
            .Options;
        OiAuthDbContext context = new(options);
        context.Database.EnsureCreated();
        return context;
    }
}
