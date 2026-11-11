using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Repos.Auth;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for how AuthRepo handles groups: what goes into a token, and putting a user in a group")]
public class AuthRepoGroupTests
{
    private IsolatedAuthDatabase _database = null!;

    [SetUp]
    public void SetUp() => _database = new IsolatedAuthDatabase();

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private async Task<T> Get<T>(Func<AuthRepo, Task<T>> action)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        return await action(new AuthRepo(context));
    }

    private async Task Do(Func<AuthRepo, Task> action)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        await action(new AuthRepo(context));
    }

    private Task<string> AddUserAsync(string email) => Get(r => r.CreateUserAsync(new NewAuthUser(email, "Pat", "hash"), Ct));

    [Test, Description("AddToGroupAsync should create the group, in lower case, when it does not exist, and put the user in it")]
    public async Task AddToGroupAsync_CreatesTheGroupAndTheMembership()
    {
        string id = await AddUserAsync("pat@example.com");

        await Do(r => r.AddToGroupAsync(id, "  Default ", Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        (await context.AuthGroups.SingleAsync(Ct)).Name.Should().Be("default");
        (await context.AuthUserGroups.CountAsync(Ct)).Should().Be(1);
    }

    [Test, Description("AddToGroupAsync should do nothing when the user is already in the group")]
    public async Task AddToGroupAsync_IsIdempotent()
    {
        string id = await AddUserAsync("pat@example.com");

        await Do(r => r.AddToGroupAsync(id, "default", Ct));
        await Do(r => r.AddToGroupAsync(id, "default", Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        (await context.AuthGroups.CountAsync(Ct)).Should().Be(1);
        (await context.AuthUserGroups.CountAsync(Ct)).Should().Be(1);
    }

    [Test, Description("AddToGroupAsync should put a second user in the group that already exists, without making another")]
    public async Task AddToGroupAsync_ReusesAnExistingGroup()
    {
        string pat = await AddUserAsync("pat@example.com");
        string sam = await AddUserAsync("sam@example.com");

        await Do(r => r.AddToGroupAsync(pat, "default", Ct));
        await Do(r => r.AddToGroupAsync(sam, "DEFAULT", Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        (await context.AuthGroups.CountAsync(Ct)).Should().Be(1);
        (await context.AuthUserGroups.CountAsync(Ct)).Should().Be(2);
    }

    [Test, Description("FindUserAsync should list the user's groups as group claims")]
    public async Task FindUserAsync_ListsGroupsAsClaims()
    {
        string id = await AddUserAsync("pat@example.com");
        await Do(r => r.AddToGroupAsync(id, "sales", Ct));
        await Do(r => r.AddToGroupAsync(id, "ops", Ct));

        IAuthUser? user = await Get(r => r.FindUserAsync(id, Ct));

        user!.Claims.Where(c => c.Key == "group").Select(c => c.Value).Should().BeEquivalentTo(new[] { "sales", "ops" });
    }

    [Test, Description("FindUserAsync should ignore an old group claim row, so a group is never listed twice or kept after it was removed")]
    public async Task FindUserAsync_IgnoresALegacyGroupClaimRow()
    {
        string id = await AddUserAsync("pat@example.com");
        await Do(r => r.AddClaimAsync(id, "group", "legacy", Ct));
        await Do(r => r.AddToGroupAsync(id, "sales", Ct));

        IAuthUser? user = await Get(r => r.FindUserAsync(id, Ct));

        user!.Claims.Where(c => c.Key == "group").Select(c => c.Value).Should().Equal("sales");
    }

    [Test, Description("FindUserAsync should still return other claims")]
    public async Task FindUserAsync_KeepsOtherClaims()
    {
        string id = await AddUserAsync("pat@example.com");
        await Do(r => r.AddClaimAsync(id, "department", "finance", Ct));

        IAuthUser? user = await Get(r => r.FindUserAsync(id, Ct));

        user!.Claims.Should().Contain(new KeyValuePair<string, string>("department", "finance"));
    }

    [Test, Description("FindUserAsync should not list groups the user is not in")]
    public async Task FindUserAsync_OnlyListsTheUsersOwnGroups()
    {
        string pat = await AddUserAsync("pat@example.com");
        string sam = await AddUserAsync("sam@example.com");
        await Do(r => r.AddToGroupAsync(sam, "ops", Ct));

        IAuthUser? user = await Get(r => r.FindUserAsync(pat, Ct));

        user!.Claims.Where(c => c.Key == "group").Should().BeEmpty();
    }
}
