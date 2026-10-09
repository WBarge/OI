using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Repos;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for the state repository")]
public class StateRepoTests
{
    private IServiceProvider _serviceProvider;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _serviceProvider = TestSetupHelper.GetServiceProvider();

        // Ensure the in-memory database is created and seeded
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = scope.ServiceProvider.GetRequiredService<OiDbContext>();
        context.Database.EnsureCreated();
    }

    [Test, Description("StateRepo constructor should throw when dbContext is null")]
    public void Constructor_ThrowsWhenDbContextIsNull()
    {
        Action act = () => _ = new StateRepo(null!);
        act.Should().Throw<ArgumentNullException>("dbContext is required by StateRepo");
    }

    [Test, Description("ListStatesAsync should return all 50 states")]
    public async Task ListStatesAsync_ReturnsAll50States()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        StateRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        IEnumerable<IState> results = await sut.ListStatesAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        results.Should().HaveCount(50, "there are 50 US states seeded in the database");
    }

    [Test, Description("ListStatesAsync should return states with non-empty names")]
    public async Task ListStatesAsync_AllStatesHaveNames()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        StateRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        IEnumerable<IState> results = await sut.ListStatesAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        results.Should().AllSatisfy(s => s.Name.Should().NotBeNullOrWhiteSpace("every state must have a name"));
    }

    [Test, Description("ListStatesAsync should return states with 2-character codes")]
    public async Task ListStatesAsync_AllStatesHaveTwoCharacterCodes()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        StateRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        IEnumerable<IState> results = await sut.ListStatesAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        results.Should().AllSatisfy(s => s.Code.Should().HaveLength(2, "state codes must be exactly 2 characters"));
    }

    [Test, Description("ListStatesAsync should include Texas")]
    public async Task ListStatesAsync_ContainsTexas()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        StateRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        IEnumerable<IState> results = await sut.ListStatesAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        results.Should().Contain(s => s.Name == "Texas" && s.Code == "TX", "Texas should be in the seeded state list");
    }

    [Test, Description("ListStatesAsync should return states with unique codes")]
    public async Task ListStatesAsync_AllCodesAreUnique()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        StateRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        IEnumerable<IState> results = await sut.ListStatesAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        IEnumerable<string> codes = results.Select(s => s.Code);
        codes.Should().OnlyHaveUniqueItems("each state code must be unique");
    }
}
