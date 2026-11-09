using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;
using OI.Data.DBSchemaHelper;

namespace OI.Data.Tests;

/// <summary>
/// Tests for DbSchemaExtension.HandleDbSchema. The in-memory provider cannot run migrations, so a registered context
/// shows up as the "relational-specific" error that Migrate raises on it. That is enough to prove which contexts
/// the helper touches and which it leaves alone.
/// </summary>
[TestFixture, Description("Tests for DbSchemaExtension")]
public class DbSchemaExtensionTests
{
    [Test, Description("HandleDbSchema should do nothing when the application registered no context")]
    public void HandleDbSchema_DoesNothingWhenNoContextIsRegistered()
    {
        ServiceCollection services = new();

        Action act = () => services.HandleDbSchema();

        act.Should().NotThrow("a context that was not registered must be skipped, not required");
    }

    [Test, Description("HandleDbSchema should try to migrate the order context when it is registered")]
    public void HandleDbSchema_MigratesTheServiceContextWhenRegistered()
    {
        ServiceCollection services = new();
        services.AddDbContext<OiServiceDbContext>(o => o.UseInMemoryDatabase($"schema-service-{Guid.NewGuid():N}"));

        Action act = () => services.HandleDbSchema();

        act.Should().Throw<InvalidOperationException>("Migrate can only run on a relational provider, so reaching it proves the context was migrated");
    }

    [Test, Description("HandleDbSchema should try to migrate the reporting context when it is registered")]
    public void HandleDbSchema_MigratesTheReportingContextWhenRegistered()
    {
        ServiceCollection services = new();
        services.AddDbContext<OiReportingDbContext>(o => o.UseInMemoryDatabase($"schema-reporting-{Guid.NewGuid():N}"));

        Action act = () => services.HandleDbSchema();

        act.Should().Throw<InvalidOperationException>();
    }

    [Test, Description("HandleDbSchema should try to migrate the auth context when it is registered")]
    public void HandleDbSchema_MigratesTheAuthContextWhenRegistered()
    {
        ServiceCollection services = new();
        services.AddDbContext<OiAuthDbContext>(o => o.UseInMemoryDatabase($"schema-auth-{Guid.NewGuid():N}"));

        Action act = () => services.HandleDbSchema();

        act.Should().Throw<InvalidOperationException>();
    }
}
