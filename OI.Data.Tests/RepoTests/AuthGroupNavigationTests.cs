using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Data.Repos.Auth;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for the ApplicationUser <-> AuthGroupMember <-> AuthGroup navigation properties")]
public class AuthGroupNavigationTests
{
    private IsolatedAuthDatabase _database = null!;

    [SetUp]
    public void SetUp() => _database = new IsolatedAuthDatabase();

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private async Task<string> AddUserInGroupsAsync(string email, params string[] groups)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        AuthRepo repo = new(context);
        string id = await repo.CreateUserAsync(new NewAuthUser(email, email, "hash"), Ct);
        foreach (string group in groups)
        {
            await repo.AddToGroupAsync(id, group, Ct);
        }
        return id;
    }

    [Test, Description("The membership should have exactly one relationship to the user and one to the group, with no shadow foreign keys")]
    public void Model_HasNoDuplicateMembershipRelationships()
    {
        using OiAuthDbContext context = _database.CreateContext();
        IEntityType member = context.Model.FindEntityType(typeof(AuthGroupMember))!;

        member.GetForeignKeys().Should().HaveCount(2);
        member.GetProperties().Select(p => p.Name).Should().BeEquivalentTo("UserId", "GroupId");
        member.FindNavigation(nameof(AuthGroupMember.User))!.Inverse!.Name.Should().Be(nameof(ApplicationUser.GroupMemberships));
        member.FindNavigation(nameof(AuthGroupMember.Group))!.Inverse!.Name.Should().Be(nameof(AuthGroup.Members));
    }

    [Test, Description("A user should be reachable from a group, and a group from a user, through the membership")]
    public async Task Navigations_CanBeQueriedFromEitherSide()
    {
        string pat = await AddUserInGroupsAsync("pat@example.com", "admins", "staff");
        string sam = await AddUserInGroupsAsync("sam@example.com", "staff");

        await using OiAuthDbContext context = _database.CreateContext();

        List<string> patsGroups = await context.Users
            .Where(u => u.Id == pat)
            .SelectMany(u => u.GroupMemberships.Select(m => m.Group.Name))
            .ToListAsync(Ct);
        patsGroups.Should().BeEquivalentTo("admins", "staff");

        List<string> adminIds = await context.Users
            .Where(u => u.GroupMemberships.Any(m => m.Group.Name == "admins"))
            .Select(u => u.Id)
            .ToListAsync(Ct);
        adminIds.Should().BeEquivalentTo(pat);

        List<string> staffIds = await context.AuthGroups
            .Where(g => g.Name == "staff")
            .SelectMany(g => g.Members.Select(m => m.User.Id))
            .ToListAsync(Ct);
        staffIds.Should().BeEquivalentTo(pat, sam);
    }

    [Test, Description("Include/ThenInclude should load the groups through the membership")]
    public async Task Include_LoadsGroupsThroughTheMembership()
    {
        string id = await AddUserInGroupsAsync("pat@example.com", "admins");

        await using OiAuthDbContext context = _database.CreateContext();
        ApplicationUser user = await context.Users
            .Include(u => u.GroupMemberships).ThenInclude(m => m.Group)
            .SingleAsync(u => u.Id == id, Ct);

        user.GroupMemberships.Select(m => m.Group.Name).Should().BeEquivalentTo("admins");
    }
}
