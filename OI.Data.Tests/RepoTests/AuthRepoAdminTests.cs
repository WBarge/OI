using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Data.Repos.Auth;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for how AuthRepo serves the administration screens: users, roles and groups")]
public class AuthRepoAdminTests
{
    private IsolatedAuthDatabase _database = null!;

    [SetUp]
    public void SetUp() => _database = new IsolatedAuthDatabase();

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private async Task Do(Func<AuthRepo, Task> action)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        await action(new AuthRepo(context));
    }

    private async Task<T> Get<T>(Func<AuthRepo, Task<T>> action)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        return await action(new AuthRepo(context));
    }

    private async Task SeedRolesAndGroupsAsync()
    {
        await Do(async r =>
        {
            await r.CreateRoleAsync("Admin", Ct);
            await r.CreateRoleAsync("User", Ct);
            await r.CreateRoleAsync("Manager", Ct);
            await r.CreateGroupAsync("sales", "The sales team", Ct);
            await r.CreateGroupAsync("ops", null, Ct);
        });
    }

    private Task<string> AddUserAsync(string email, string name = "Some Person", string[]? roles = null, string[]? groups = null) =>
        Get(r => r.CreateUserAsync(new NewAuthUser(email, name, "hash-" + email), roles ?? [], groups ?? [], Ct));

    // ------------------------------------------------------------------ creating and reading users

    [Test, Description("CreateUserAsync should store the user with the roles and groups given")]
    public async Task CreateUserAsync_StoresTheUserWithRolesAndGroups()
    {
        await SeedRolesAndGroupsAsync();

        string id = await AddUserAsync("pat@example.com", "Pat Example", ["Admin", "User"], ["sales"]);

        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user.Should().NotBeNull();
        user!.Email.Should().Be("pat@example.com");
        user.DisplayName.Should().Be("Pat Example");
        user.LockoutEnd.Should().BeNull();
        user.Roles.Should().BeEquivalentTo(new[] { "Admin", "User" });
        user.Groups.Should().BeEquivalentTo(new[] { "sales" });
    }

    [Test, Description("CreateUserAsync should ignore roles and groups that do not exist")]
    public async Task CreateUserAsync_IgnoresUnknownRolesAndGroups()
    {
        await SeedRolesAndGroupsAsync();

        string id = await AddUserAsync("pat@example.com", roles: ["Admin", "Wizard"], groups: ["sales", "nowhere"]);

        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user!.Roles.Should().BeEquivalentTo(new[] { "Admin" });
        user.Groups.Should().BeEquivalentTo(new[] { "sales" });
    }

    [Test, Description("CreateUserAsync should match role names whatever case they are given in")]
    public async Task CreateUserAsync_MatchesRolesIgnoringCase()
    {
        await SeedRolesAndGroupsAsync();

        string id = await AddUserAsync("pat@example.com", roles: ["admin", "USER"]);

        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user!.Roles.Should().BeEquivalentTo(new[] { "Admin", "User" });
    }

    [Test, Description("CreateUserAsync should store the user so that sign-in can find them by email in any case")]
    public async Task CreateUserAsync_StoresNormalisedValuesForSignIn()
    {
        await AddUserAsync("Pat@Example.com");

        await using OiAuthDbContext context = _database.CreateContext();
        var credential = await new AuthRepo(context).FindCredentialAsync("pat@EXAMPLE.com", Ct);

        credential.Should().NotBeNull();
        credential!.PasswordHash.Should().Be("hash-Pat@Example.com");
    }

    [Test, Description("GetUserAsync should return null for an unknown user")]
    public async Task GetUserAsync_ReturnsNullForAnUnknownUser()
    {
        (await Get(r => r.GetUserAsync("nope", Ct))).Should().BeNull();
    }

    // ------------------------------------------------------------------ finding users

    private async Task SeedFiveUsersAsync()
    {
        await SeedRolesAndGroupsAsync();
        await AddUserAsync("e@example.com", "Eve Last", ["User"], []);
        await AddUserAsync("a@example.com", "Alan First", ["Admin"], ["sales"]);
        await AddUserAsync("c@example.com", "Carol Third", ["User"], ["sales", "ops"]);
        await AddUserAsync("b@example.com", "Bob Second", ["User"], []);
        await AddUserAsync("d@example.com", "Dana Fourth", [], []);
    }

    [Test, Description("FindUsersAsync should return the first page ordered by email, with the total")]
    public async Task FindUsersAsync_ReturnsTheFirstPageOrderedByEmail()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync(null, 1, 2, Ct));

        page.TotalRecordSize.Should().Be(5);
        page.Data.Select(u => u.Email).Should().Equal("a@example.com", "b@example.com");
    }

    [Test, Description("FindUsersAsync should return later pages, including a short last page")]
    public async Task FindUsersAsync_ReturnsLaterPages()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> second = await Get(r => r.FindUsersAsync(null, 2, 2, Ct));
        PagedResult<AdminUser> third = await Get(r => r.FindUsersAsync(null, 3, 2, Ct));

        second.Data.Select(u => u.Email).Should().Equal("c@example.com", "d@example.com");
        third.Data.Select(u => u.Email).Should().Equal("e@example.com");
    }

    [Test, Description("FindUsersAsync should return an empty page past the end, still reporting the total")]
    public async Task FindUsersAsync_ReturnsNothingPastTheEnd()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync(null, 9, 2, Ct));

        page.Data.Should().BeEmpty();
        page.TotalRecordSize.Should().Be(5);
    }

    [TestCase("CAROL"), TestCase("carol"), TestCase("third")]
    [Description("FindUsersAsync should search the name, ignoring case")]
    public async Task FindUsersAsync_SearchesTheName(string term)
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync(term, 1, 10, Ct));

        page.Data.Select(u => u.Email).Should().Equal("c@example.com");
    }

    [Test, Description("FindUsersAsync should search the email, ignoring case")]
    public async Task FindUsersAsync_SearchesTheEmail()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync("B@EXAMPLE", 1, 10, Ct));

        page.Data.Select(u => u.Email).Should().Equal("b@example.com");
        page.TotalRecordSize.Should().Be(1);
    }

    [Test, Description("FindUsersAsync should return nothing when the search matches no one")]
    public async Task FindUsersAsync_ReturnsNothingForASearchWithNoMatch()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync("zzz", 1, 10, Ct));

        page.Data.Should().BeEmpty();
        page.TotalRecordSize.Should().Be(0);
    }

    [Test, Description("FindUsersAsync should treat a blank search as no search")]
    public async Task FindUsersAsync_TreatsABlankSearchAsNoSearch()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync("   ", 1, 10, Ct));

        page.TotalRecordSize.Should().Be(5);
    }

    [Test, Description("FindUsersAsync should give each user their own roles and groups, in name order")]
    public async Task FindUsersAsync_AttachesRolesAndGroupsToTheRightUsers()
    {
        await SeedFiveUsersAsync();

        PagedResult<AdminUser> page = await Get(r => r.FindUsersAsync(null, 1, 10, Ct));

        AdminUser alan = page.Data.Single(u => u.Email == "a@example.com");
        AdminUser carol = page.Data.Single(u => u.Email == "c@example.com");
        AdminUser dana = page.Data.Single(u => u.Email == "d@example.com");
        alan.Roles.Should().Equal("Admin");
        alan.Groups.Should().Equal("sales");
        carol.Groups.Should().Equal("ops", "sales");
        dana.Roles.Should().BeEmpty();
        dana.Groups.Should().BeEmpty();
    }

    // ------------------------------------------------------------------ changing users

    [Test, Description("UpdateUserAsync should change the name and make the roles and groups exactly the ones given")]
    public async Task UpdateUserAsync_ReplacesRolesAndGroups()
    {
        await SeedRolesAndGroupsAsync();
        string id = await AddUserAsync("pat@example.com", "Pat Example", ["Admin", "User"], ["sales"]);

        await Do(r => r.UpdateUserAsync(id, "Pat Renamed", ["User", "Manager"], ["ops"], Ct));

        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user!.DisplayName.Should().Be("Pat Renamed");
        user.Roles.Should().BeEquivalentTo(new[] { "User", "Manager" });
        user.Groups.Should().BeEquivalentTo(new[] { "ops" });
    }

    [Test, Description("UpdateUserAsync should be able to take every role and group away")]
    public async Task UpdateUserAsync_CanRemoveEverything()
    {
        await SeedRolesAndGroupsAsync();
        string id = await AddUserAsync("pat@example.com", roles: ["Admin"], groups: ["sales"]);

        await Do(r => r.UpdateUserAsync(id, "Pat", [], [], Ct));

        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user!.Roles.Should().BeEmpty();
        user.Groups.Should().BeEmpty();
    }

    [Test, Description("UpdateUserAsync should not touch other users")]
    public async Task UpdateUserAsync_LeavesOtherUsersAlone()
    {
        await SeedRolesAndGroupsAsync();
        string pat = await AddUserAsync("pat@example.com", roles: ["Admin"], groups: ["sales"]);
        string sam = await AddUserAsync("sam@example.com", roles: ["User"], groups: ["ops"]);

        await Do(r => r.UpdateUserAsync(pat, "Pat", [], [], Ct));

        AdminUser? other = await Get(r => r.GetUserAsync(sam, Ct));
        other!.Roles.Should().Equal("User");
        other.Groups.Should().Equal("ops");
    }

    [Test, Description("UpdateUserAsync should keep roles that stay, without duplicating them")]
    public async Task UpdateUserAsync_DoesNotDuplicateRolesThatStay()
    {
        await SeedRolesAndGroupsAsync();
        string id = await AddUserAsync("pat@example.com", roles: ["User"], groups: ["sales"]);

        await Do(r => r.UpdateUserAsync(id, "Pat", ["User", "Manager"], ["sales"], Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        (await context.UserRoles.CountAsync(x => x.UserId == id, Ct)).Should().Be(2);
        (await context.AuthUserGroups.CountAsync(x => x.UserId == id, Ct)).Should().Be(1);
    }

    [Test, Description("SetPasswordHashAsync should store the new hash, clear failed attempts and change the security stamp")]
    public async Task SetPasswordHashAsync_StoresTheHashAndResetsTheUser()
    {
        string id = await AddUserAsync("pat@example.com");
        string? oldStamp;
        await using (OiAuthDbContext arrange = _database.CreateContext())
        {
            ApplicationUser user = await arrange.Users.SingleAsync(u => u.Id == id, Ct);
            user.AccessFailedCount = 4;
            oldStamp = user.SecurityStamp;
            await arrange.SaveChangesAsync(Ct);
        }

        await Do(r => r.SetPasswordHashAsync(id, "new-hash", Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        ApplicationUser stored = await context.Users.AsNoTracking().SingleAsync(u => u.Id == id, Ct);
        stored.PasswordHash.Should().Be("new-hash");
        stored.AccessFailedCount.Should().Be(0);
        stored.SecurityStamp.Should().NotBe(oldStamp);
    }

    [Test, Description("SetDisabledAsync should disable and then enable a user")]
    public async Task SetDisabledAsync_DisablesAndEnables()
    {
        string id = await AddUserAsync("pat@example.com");

        await Do(r => r.SetDisabledAsync(id, true, Ct));
        AdminUser? disabled = await Get(r => r.GetUserAsync(id, Ct));
        await Do(r => r.SetDisabledAsync(id, false, Ct));
        AdminUser? enabled = await Get(r => r.GetUserAsync(id, Ct));

        disabled!.IsDisabled.Should().BeTrue();
        enabled!.IsDisabled.Should().BeFalse();
        enabled.LockoutEnd.Should().BeNull();
    }

    [Test, Description("SetDisabledAsync should clear failed attempts, so enabling a locked-out user unlocks them")]
    public async Task SetDisabledAsync_ClearsFailedAttemptsAndTemporaryLockouts()
    {
        string id = await AddUserAsync("pat@example.com");
        await using (OiAuthDbContext arrange = _database.CreateContext())
        {
            ApplicationUser user = await arrange.Users.SingleAsync(u => u.Id == id, Ct);
            user.AccessFailedCount = 3;
            user.LockoutEnd = DateTimeOffset.UtcNow.AddMinutes(10);
            await arrange.SaveChangesAsync(Ct);
        }

        await Do(r => r.SetDisabledAsync(id, false, Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        ApplicationUser stored = await context.Users.AsNoTracking().SingleAsync(u => u.Id == id, Ct);
        stored.LockoutEnd.Should().BeNull();
        stored.AccessFailedCount.Should().Be(0);
    }

    // ------------------------------------------------------------------ deleting users

    [Test, Description("DeleteUserAsync should remove the user and everything that belongs to them, and nobody else's")]
    public async Task DeleteUserAsync_RemovesTheUserAndTheirData()
    {
        await SeedRolesAndGroupsAsync();
        string pat = await AddUserAsync("pat@example.com", roles: ["Admin"], groups: ["sales"]);
        string sam = await AddUserAsync("sam@example.com", roles: ["User"], groups: ["sales"]);
        await using (OiAuthDbContext arrange = _database.CreateContext())
        {
            arrange.UserClaims.Add(new IdentityUserClaim<string> { UserId = pat, ClaimType = "x", ClaimValue = "1" });
            arrange.UserClaims.Add(new IdentityUserClaim<string> { UserId = sam, ClaimType = "x", ClaimValue = "2" });
            arrange.RefreshTokens.Add(new RefreshToken { UserId = pat, TokenHash = "h1", CreatedAt = DateTimeOffset.UtcNow, ExpiresAt = DateTimeOffset.UtcNow.AddDays(1) });
            arrange.RefreshTokens.Add(new RefreshToken { UserId = sam, TokenHash = "h2", CreatedAt = DateTimeOffset.UtcNow, ExpiresAt = DateTimeOffset.UtcNow.AddDays(1) });
            await arrange.SaveChangesAsync(Ct);
        }

        await Do(r => r.DeleteUserAsync(pat, Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        (await context.Users.AnyAsync(u => u.Id == pat, Ct)).Should().BeFalse();
        (await context.UserRoles.AnyAsync(x => x.UserId == pat, Ct)).Should().BeFalse();
        (await context.UserClaims.AnyAsync(x => x.UserId == pat, Ct)).Should().BeFalse();
        (await context.RefreshTokens.AnyAsync(x => x.UserId == pat, Ct)).Should().BeFalse();
        (await context.AuthUserGroups.AnyAsync(x => x.UserId == pat, Ct)).Should().BeFalse();

        (await context.Users.AnyAsync(u => u.Id == sam, Ct)).Should().BeTrue();
        (await context.UserRoles.CountAsync(x => x.UserId == sam, Ct)).Should().Be(1);
        (await context.UserClaims.CountAsync(x => x.UserId == sam, Ct)).Should().Be(1);
        (await context.RefreshTokens.CountAsync(x => x.UserId == sam, Ct)).Should().Be(1);
        (await context.AuthUserGroups.CountAsync(x => x.UserId == sam, Ct)).Should().Be(1);
    }

    [Test, Description("DeleteUserAsync should do nothing for an unknown user")]
    public async Task DeleteUserAsync_DoesNothingForAnUnknownUser()
    {
        await AddUserAsync("pat@example.com");

        await Do(r => r.DeleteUserAsync("nope", Ct));

        await using OiAuthDbContext context = _database.CreateContext();
        (await context.Users.CountAsync(Ct)).Should().Be(1);
    }

    // ------------------------------------------------------------------ counting administrators

    [Test, Description("CountEnabledUsersInRoleAsync should count users with the role, leaving out disabled users and other roles")]
    public async Task CountEnabledUsersInRoleAsync_CountsOnlyEnabledUsersInTheRole()
    {
        await SeedRolesAndGroupsAsync();
        string enabled = await AddUserAsync("a@example.com", roles: ["Admin"]);
        string disabled = await AddUserAsync("b@example.com", roles: ["Admin"]);
        string tempLocked = await AddUserAsync("c@example.com", roles: ["Admin"]);
        await AddUserAsync("d@example.com", roles: ["User"]);
        await Do(r => r.SetDisabledAsync(disabled, true, Ct));
        await using (OiAuthDbContext arrange = _database.CreateContext())
        {
            // a temporary lockout (too many wrong passwords) still counts: the user is expected back
            (await arrange.Users.SingleAsync(u => u.Id == tempLocked, Ct)).LockoutEnd = DateTimeOffset.UtcNow.AddMinutes(10);
            await arrange.SaveChangesAsync(Ct);
        }

        int count = await Get(r => r.CountEnabledUsersInRoleAsync("Admin", Ct));

        count.Should().Be(2);
        enabled.Should().NotBeNull();
    }

    [Test, Description("CountEnabledUsersInRoleAsync should find the role whatever case it is asked for in")]
    public async Task CountEnabledUsersInRoleAsync_IgnoresCase()
    {
        await SeedRolesAndGroupsAsync();
        await AddUserAsync("a@example.com", roles: ["Admin"]);

        (await Get(r => r.CountEnabledUsersInRoleAsync("admin", Ct))).Should().Be(1);
    }

    [Test, Description("CountEnabledUsersInRoleAsync should return 0 for an unknown role")]
    public async Task CountEnabledUsersInRoleAsync_ReturnsZeroForAnUnknownRole()
    {
        (await Get(r => r.CountEnabledUsersInRoleAsync("Wizard", Ct))).Should().Be(0);
    }

    // ------------------------------------------------------------------ roles

    [Test, Description("ListRolesAsync should list roles by name with how many users have each")]
    public async Task ListRolesAsync_ListsRolesWithUserCounts()
    {
        await SeedRolesAndGroupsAsync();
        await AddUserAsync("a@example.com", roles: ["Admin", "User"]);
        await AddUserAsync("b@example.com", roles: ["User"]);

        IReadOnlyCollection<AdminRole> roles = await Get(r => r.ListRolesAsync(Ct));

        roles.Select(r => r.Name).Should().Equal("Admin", "Manager", "User");
        roles.Single(r => r.Name == "Admin").UserCount.Should().Be(1);
        roles.Single(r => r.Name == "User").UserCount.Should().Be(2);
        roles.Single(r => r.Name == "Manager").UserCount.Should().Be(0);
    }

    [Test, Description("CreateRoleAsync should add a role that can then be given to users")]
    public async Task CreateRoleAsync_AddsARoleThatCanBeAssigned()
    {
        await Do(r => r.CreateRoleAsync("Auditor", Ct));

        string id = await AddUserAsync("a@example.com", roles: ["auditor"]);
        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user!.Roles.Should().Equal("Auditor");
    }

    [Test, Description("DeleteRoleAsync should remove the role")]
    public async Task DeleteRoleAsync_RemovesTheRole()
    {
        await SeedRolesAndGroupsAsync();

        await Do(r => r.DeleteRoleAsync("manager", Ct));

        (await Get(r => r.ListRolesAsync(Ct))).Select(r => r.Name).Should().Equal("Admin", "User");
    }

    [Test, Description("DeleteRoleAsync should do nothing for an unknown role")]
    public async Task DeleteRoleAsync_DoesNothingForAnUnknownRole()
    {
        await SeedRolesAndGroupsAsync();

        await Do(r => r.DeleteRoleAsync("Wizard", Ct));

        (await Get(r => r.ListRolesAsync(Ct))).Should().HaveCount(3);
    }

    // ------------------------------------------------------------------ groups

    [Test, Description("ListGroupsAsync should list groups by name with their member counts and descriptions")]
    public async Task ListGroupsAsync_ListsGroupsWithMemberCounts()
    {
        await SeedRolesAndGroupsAsync();
        await AddUserAsync("a@example.com", groups: ["sales", "ops"]);
        await AddUserAsync("b@example.com", groups: ["sales"]);

        IReadOnlyCollection<AdminGroup> groups = await Get(r => r.ListGroupsAsync(Ct));

        groups.Select(g => g.Name).Should().Equal("ops", "sales");
        groups.Single(g => g.Name == "sales").Should().Be(new AdminGroup("sales", "The sales team", 2));
        groups.Single(g => g.Name == "ops").Should().Be(new AdminGroup("ops", null, 1));
    }

    [Test, Description("GetGroupAsync should return the group with its members ordered by email")]
    public async Task GetGroupAsync_ReturnsTheGroupWithItsMembers()
    {
        await SeedRolesAndGroupsAsync();
        string zed = await AddUserAsync("z@example.com", "Zed Last", groups: ["sales"]);
        string amy = await AddUserAsync("a@example.com", "Amy First", groups: ["sales"]);
        await AddUserAsync("m@example.com", groups: ["ops"]);

        AdminGroupDetail? group = await Get(r => r.GetGroupAsync("sales", Ct));

        group.Should().NotBeNull();
        group!.Description.Should().Be("The sales team");
        group.Members.Select(m => m.UserId).Should().Equal(amy, zed);
        group.Members.Select(m => m.DisplayName).Should().Equal("Amy First", "Zed Last");
        group.Members.Select(m => m.Email).Should().Equal("a@example.com", "z@example.com");
    }

    [Test, Description("GetGroupAsync should return null for an unknown group")]
    public async Task GetGroupAsync_ReturnsNullForAnUnknownGroup()
    {
        (await Get(r => r.GetGroupAsync("nowhere", Ct))).Should().BeNull();
    }

    [Test, Description("CreateGroupAsync should add a group that can then be given to users")]
    public async Task CreateGroupAsync_AddsAGroupThatCanBeAssigned()
    {
        await Do(r => r.CreateGroupAsync("finance", "Finance team", Ct));

        string id = await AddUserAsync("a@example.com", groups: ["finance"]);
        AdminUser? user = await Get(r => r.GetUserAsync(id, Ct));
        user!.Groups.Should().Equal("finance");
    }

    [Test, Description("UpdateGroupDescriptionAsync should change the description and nothing else")]
    public async Task UpdateGroupDescriptionAsync_ChangesTheDescription()
    {
        await SeedRolesAndGroupsAsync();
        await AddUserAsync("a@example.com", groups: ["sales"]);

        await Do(r => r.UpdateGroupDescriptionAsync("sales", "New text", Ct));

        AdminGroupDetail? group = await Get(r => r.GetGroupAsync("sales", Ct));
        group!.Description.Should().Be("New text");
        group.Members.Should().HaveCount(1);
    }

    [Test, Description("UpdateGroupDescriptionAsync should be able to clear the description")]
    public async Task UpdateGroupDescriptionAsync_CanClearTheDescription()
    {
        await SeedRolesAndGroupsAsync();

        await Do(r => r.UpdateGroupDescriptionAsync("sales", null, Ct));

        (await Get(r => r.GetGroupAsync("sales", Ct)))!.Description.Should().BeNull();
    }

    [Test, Description("DeleteGroupAsync should remove the group and its memberships, and return who was in it")]
    public async Task DeleteGroupAsync_RemovesTheGroupAndReturnsItsMembers()
    {
        await SeedRolesAndGroupsAsync();
        string a = await AddUserAsync("a@example.com", groups: ["sales", "ops"]);
        string b = await AddUserAsync("b@example.com", groups: ["sales"]);

        IReadOnlyCollection<string> members = await Get(r => r.DeleteGroupAsync("sales", Ct));

        members.Should().BeEquivalentTo(new[] { a, b });
        (await Get(r => r.GetGroupAsync("sales", Ct))).Should().BeNull();
        AdminUser? stillThere = await Get(r => r.GetUserAsync(a, Ct));
        stillThere!.Groups.Should().Equal("ops");
        (await Get(r => r.GetUserAsync(b, Ct)))!.Groups.Should().BeEmpty();
    }

    [Test, Description("DeleteGroupAsync should return nobody for an unknown group")]
    public async Task DeleteGroupAsync_ReturnsNobodyForAnUnknownGroup()
    {
        (await Get(r => r.DeleteGroupAsync("nowhere", Ct))).Should().BeEmpty();
    }
}
