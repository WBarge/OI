using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Glue.Security;
using OI.Glue.Services;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for AuthAdminManager")]
public class AuthAdminManagerTests
{
    private const string ACTOR_ID = "actor-1";
    private const string USER_ID = "user-1";

    private Mock<IAuthAdminRepo> _adminRepo = null!;
    private Mock<IAuthRepo> _authRepo = null!;
    private Mock<IRefreshTokenRepo> _tokens = null!;
    private Mock<IPasswordService> _passwords = null!;
    private Mock<IClientContext> _actor = null!;
    private AuthAdminManager _sut = null!;

    [SetUp]
    public void SetUp()
    {
        _adminRepo = new Mock<IAuthAdminRepo>();
        _authRepo = new Mock<IAuthRepo>();
        _tokens = new Mock<IRefreshTokenRepo>();
        _passwords = new Mock<IPasswordService>();
        _actor = new Mock<IClientContext>();

        _actor.SetupGet(a => a.UserId).Returns(ACTOR_ID);
        _passwords.Setup(p => p.Hash(It.IsAny<string>())).Returns("hashed");
        SetupRoles(new AdminRole("Admin", false, 2), new AdminRole("User", false, 0), new AdminRole("Manager", false, 0));
        SetupGroups(new AdminGroup("sales", null, 1), new AdminGroup("ops", null, 0));
        SetupCountOfEnabledAdmins(2);

        _sut = Create();
    }

    private AuthAdminManager Create() => new(
        _adminRepo.Object, _authRepo.Object, _tokens.Object, _passwords.Object, _actor.Object,
        new AuthPolicy(), TimeProvider.System, NullLogger<AuthAdminManager>.Instance);

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private void SetupRoles(params AdminRole[] roles)
    {
        IReadOnlyCollection<AdminRole> list = roles;
        _adminRepo.Setup(r => r.ListRolesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(list);
    }

    private void SetupGroups(params AdminGroup[] groups)
    {
        IReadOnlyCollection<AdminGroup> list = groups;
        _adminRepo.Setup(r => r.ListGroupsAsync(It.IsAny<CancellationToken>())).ReturnsAsync(list);
    }

    private void SetupCountOfEnabledAdmins(int count) =>
        _adminRepo.Setup(r => r.CountEnabledUsersInRoleAsync("Admin", It.IsAny<CancellationToken>())).ReturnsAsync(count);

    private void SetupUser(AdminUser? user, string id = USER_ID) =>
        _adminRepo.Setup(r => r.GetUserAsync(id, It.IsAny<CancellationToken>())).ReturnsAsync(user);

    private static AdminUser User(string id = USER_ID, string[]? roles = null, string[]? groups = null, DateTimeOffset? lockoutEnd = null) =>
        new(id, $"{id}@example.com", "Pat Example", lockoutEnd, roles ?? ["User"], groups ?? []);

    private static NewAdminUser NewUser(string email = "new@example.com", string name = "New Person", string password = "a-long-password-1",
        string[]? roles = null, string[]? groups = null) =>
        new(email, name, password, roles ?? ["User"], groups ?? []);

    private void VerifySessionsRevoked(string userId, Times times) =>
        _tokens.Verify(t => t.RevokeAllAsync(userId, It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), times);

    // ------------------------------------------------------------------ constructor

    [Test, Description("Constructor should throw when adminRepo is null")]
    public void Constructor_ThrowsWhenAdminRepoIsNull()
    {
        Action act = () => _ = new AuthAdminManager(null!, _authRepo.Object, _tokens.Object, _passwords.Object, _actor.Object, new AuthPolicy(), TimeProvider.System, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("adminRepo");
    }

    [Test, Description("Constructor should throw when authRepo is null")]
    public void Constructor_ThrowsWhenAuthRepoIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, null!, _tokens.Object, _passwords.Object, _actor.Object, new AuthPolicy(), TimeProvider.System, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("authRepo");
    }

    [Test, Description("Constructor should throw when refreshTokenRepo is null")]
    public void Constructor_ThrowsWhenRefreshTokenRepoIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, _authRepo.Object, null!, _passwords.Object, _actor.Object, new AuthPolicy(), TimeProvider.System, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("refreshTokenRepo");
    }

    [Test, Description("Constructor should throw when passwords is null")]
    public void Constructor_ThrowsWhenPasswordsIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, _authRepo.Object, _tokens.Object, null!, _actor.Object, new AuthPolicy(), TimeProvider.System, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("passwords");
    }

    [Test, Description("Constructor should throw when actor is null")]
    public void Constructor_ThrowsWhenActorIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, _authRepo.Object, _tokens.Object, _passwords.Object, null!, new AuthPolicy(), TimeProvider.System, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("actor");
    }

    [Test, Description("Constructor should throw when policy is null")]
    public void Constructor_ThrowsWhenPolicyIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, _authRepo.Object, _tokens.Object, _passwords.Object, _actor.Object, null!, TimeProvider.System, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("policy");
    }

    [Test, Description("Constructor should throw when clock is null")]
    public void Constructor_ThrowsWhenClockIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, _authRepo.Object, _tokens.Object, _passwords.Object, _actor.Object, new AuthPolicy(), null!, NullLogger<AuthAdminManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("clock");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new AuthAdminManager(_adminRepo.Object, _authRepo.Object, _tokens.Object, _passwords.Object, _actor.Object, new AuthPolicy(), TimeProvider.System, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    // ------------------------------------------------------------------ listing and reading users

    [TestCase(0, 1), TestCase(-5, 1), TestCase(3, 3)]
    [Description("GetUsersAsync should never ask the repo for a page below 1")]
    public async Task GetUsersAsync_ClampsThePage(int requested, int expected)
    {
        _adminRepo.Setup(r => r.FindUsersAsync(It.IsAny<string?>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new PagedResult<AdminUser>([], 0));

        await _sut.GetUsersAsync(null, requested, 25, Ct);

        _adminRepo.Verify(r => r.FindUsersAsync(null, expected, 25, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(0, 1), TestCase(-1, 1), TestCase(50, 50), TestCase(100, 100), TestCase(5000, 100)]
    [Description("GetUsersAsync should keep the page size between 1 and 100")]
    public async Task GetUsersAsync_ClampsThePageSize(int requested, int expected)
    {
        _adminRepo.Setup(r => r.FindUsersAsync(It.IsAny<string?>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new PagedResult<AdminUser>([], 0));

        await _sut.GetUsersAsync(null, 1, requested, Ct);

        _adminRepo.Verify(r => r.FindUsersAsync(null, 1, expected, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetUsersAsync should trim the search and return what the repo found")]
    public async Task GetUsersAsync_TrimsTheSearchAndReturnsTheRepoResult()
    {
        PagedResult<AdminUser> expected = new([User()], 1);
        _adminRepo.Setup(r => r.FindUsersAsync("pat", 1, 25, It.IsAny<CancellationToken>())).ReturnsAsync(expected);

        PagedResult<AdminUser> result = await _sut.GetUsersAsync("  pat  ", 1, 25, Ct);

        result.Should().BeSameAs(expected);
    }

    [Test, Description("GetUserAsync should return the user when they exist")]
    public async Task GetUserAsync_ReturnsTheUser()
    {
        AdminUser user = User();
        SetupUser(user);

        AdminResult<AdminUser> result = await _sut.GetUserAsync(USER_ID, Ct);

        result.Succeeded.Should().BeTrue();
        result.Value.Should().BeSameAs(user);
    }

    [Test, Description("GetUserAsync should say NotFound when the user does not exist")]
    public async Task GetUserAsync_ReturnsNotFoundForAnUnknownUser()
    {
        SetupUser(null);

        AdminResult<AdminUser> result = await _sut.GetUserAsync(USER_ID, Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    // ------------------------------------------------------------------ creating users

    [TestCase(""), TestCase("   "), TestCase("no-at-sign"), TestCase("a@b"), TestCase("two@@example.com"), TestCase("has space@example.com")]
    [Description("CreateUserAsync should refuse an email that is not an email address")]
    public async Task CreateUserAsync_RejectsABadEmail(string email)
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(email: email), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
        result.Message.Should().Contain("email");
        _adminRepo.Verify(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("CreateUserAsync should refuse an email longer than 256 characters")]
    public async Task CreateUserAsync_RejectsAnEmailThatIsTooLong()
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(email: new string('a', 250) + "@example.com"), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [TestCase(""), TestCase("   ")]
    [Description("CreateUserAsync should refuse a missing name")]
    public async Task CreateUserAsync_RejectsAMissingName(string name)
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(name: name), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
        result.Message.Should().Contain("name");
    }

    [Test, Description("CreateUserAsync should refuse a name longer than 100 characters")]
    public async Task CreateUserAsync_RejectsANameThatIsTooLong()
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(name: new string('n', 101)), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [TestCase("short"), TestCase("elevenchars")]
    [Description("CreateUserAsync should refuse a password shorter than the policy minimum")]
    public async Task CreateUserAsync_RejectsAShortPassword(string password)
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(password: password), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
        result.Message.Should().Contain("12");
    }

    [Test, Description("CreateUserAsync should refuse a password longer than 128 characters")]
    public async Task CreateUserAsync_RejectsAPasswordThatIsTooLong()
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(password: new string('p', 129)), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [Test, Description("CreateUserAsync should refuse a role that does not exist")]
    public async Task CreateUserAsync_RejectsAnUnknownRole()
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(roles: ["Wizard"]), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
        result.Message.Should().Be("The role 'Wizard' does not exist.");
    }

    [Test, Description("CreateUserAsync should refuse a group that does not exist")]
    public async Task CreateUserAsync_RejectsAnUnknownGroup()
    {
        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(groups: ["nowhere"]), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
        result.Message.Should().Be("The group 'nowhere' does not exist.");
    }

    [Test, Description("CreateUserAsync should say Conflict when the email is already used, and create nothing")]
    public async Task CreateUserAsync_ReturnsConflictForADuplicateEmail()
    {
        _authRepo.Setup(r => r.UserExistsAsync("new@example.com", It.IsAny<CancellationToken>())).ReturnsAsync(true);

        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(), Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        _adminRepo.Verify(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("CreateUserAsync should store a hash of the password, never the password, and the trimmed email and name")]
    public async Task CreateUserAsync_StoresTheHashAndTheTrimmedValues()
    {
        NewAuthUser? stored = null;
        _adminRepo.Setup(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()))
            .Callback<NewAuthUser, IReadOnlyCollection<string>, IReadOnlyCollection<string>, CancellationToken>((u, _, _, _) => stored = u)
            .ReturnsAsync("new-id");
        SetupUser(User("new-id"), "new-id");

        await _sut.CreateUserAsync(NewUser(email: "  new@example.com ", name: "  New Person ", password: "a-long-password-1"), Ct);

        stored.Should().NotBeNull();
        stored!.Email.Should().Be("new@example.com");
        stored.DisplayName.Should().Be("New Person");
        stored.PasswordHash.Should().Be("hashed");
        _passwords.Verify(p => p.Hash("a-long-password-1"), Times.Once);
    }

    [Test, Description("CreateUserAsync should use the role names as stored, whatever case they were sent in, once each")]
    public async Task CreateUserAsync_ResolvesRolesToTheirStoredNames()
    {
        IReadOnlyCollection<string>? roles = null;
        _adminRepo.Setup(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()))
            .Callback<NewAuthUser, IReadOnlyCollection<string>, IReadOnlyCollection<string>, CancellationToken>((_, r, _, _) => roles = r)
            .ReturnsAsync("new-id");
        SetupUser(User("new-id"), "new-id");

        await _sut.CreateUserAsync(NewUser(roles: ["admin", "ADMIN", " manager ", ""]), Ct);

        roles.Should().BeEquivalentTo(new[] { "Admin", "Manager" });
    }

    [Test, Description("CreateUserAsync should store group names in lower case, once each")]
    public async Task CreateUserAsync_NormalisesGroupNames()
    {
        IReadOnlyCollection<string>? groups = null;
        _adminRepo.Setup(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()))
            .Callback<NewAuthUser, IReadOnlyCollection<string>, IReadOnlyCollection<string>, CancellationToken>((_, _, g, _) => groups = g)
            .ReturnsAsync("new-id");
        SetupUser(User("new-id"), "new-id");

        await _sut.CreateUserAsync(NewUser(groups: ["Sales", "sales", " OPS "]), Ct);

        groups.Should().BeEquivalentTo(new[] { "sales", "ops" });
    }

    [Test, Description("CreateUserAsync should return the user as it was stored")]
    public async Task CreateUserAsync_ReturnsTheCreatedUser()
    {
        AdminUser created = User("new-id");
        _adminRepo.Setup(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync("new-id");
        SetupUser(created, "new-id");

        AdminResult<AdminUser> result = await _sut.CreateUserAsync(NewUser(), Ct);

        result.Succeeded.Should().BeTrue();
        result.Value.Should().BeSameAs(created);
    }

    // ------------------------------------------------------------------ updating users

    private static UpdateAdminUser Update(string name = "Pat Example", string[]? roles = null, string[]? groups = null) =>
        new(name, roles ?? ["User"], groups ?? []);

    [Test, Description("UpdateUserAsync should say NotFound when the user does not exist")]
    public async Task UpdateUserAsync_ReturnsNotFoundForAnUnknownUser()
    {
        SetupUser(null);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(), Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [Test, Description("UpdateUserAsync should refuse a blank name")]
    public async Task UpdateUserAsync_RejectsABlankName()
    {
        SetupUser(User());

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(name: " "), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [Test, Description("UpdateUserAsync should refuse an unknown role")]
    public async Task UpdateUserAsync_RejectsAnUnknownRole()
    {
        SetupUser(User());

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(roles: ["Wizard"]), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [Test, Description("UpdateUserAsync should not let administrators remove their own Admin role")]
    public async Task UpdateUserAsync_RefusesToRemoveTheActorsOwnAdminRole()
    {
        SetupUser(User(ACTOR_ID, roles: ["Admin", "User"]), ACTOR_ID);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(ACTOR_ID, Update(roles: ["User"]), Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Be("You cannot remove your own Admin role.");
        _adminRepo.Verify(r => r.UpdateUserAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<IReadOnlyCollection<string>>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("UpdateUserAsync should let administrators change their own name and groups while keeping Admin")]
    public async Task UpdateUserAsync_AllowsTheActorToEditThemselvesWhileKeepingAdmin()
    {
        SetupUser(User(ACTOR_ID, roles: ["Admin"]), ACTOR_ID);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(ACTOR_ID, Update(name: "New Name", roles: ["Admin"], groups: ["sales"]), Ct);

        result.Succeeded.Should().BeTrue();
    }

    [Test, Description("UpdateUserAsync should not remove Admin from the last active administrator")]
    public async Task UpdateUserAsync_ProtectsTheLastAdministrator()
    {
        SetupUser(User(roles: ["Admin"]));
        SetupCountOfEnabledAdmins(1);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(roles: ["User"]), Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Be(AuthAdminManager.LastAdministratorMessage);
    }

    [Test, Description("UpdateUserAsync should remove Admin from someone when another active administrator remains")]
    public async Task UpdateUserAsync_AllowsRemovingAdminWhenAnotherRemains()
    {
        SetupUser(User(roles: ["Admin"]));
        SetupCountOfEnabledAdmins(2);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(roles: ["User"]), Ct);

        result.Succeeded.Should().BeTrue();
    }

    [Test, Description("UpdateUserAsync should allow removing Admin from a disabled administrator, who does not count as active")]
    public async Task UpdateUserAsync_AllowsRemovingAdminFromADisabledAdministrator()
    {
        SetupUser(User(roles: ["Admin"], lockoutEnd: DateTimeOffset.MaxValue));
        SetupCountOfEnabledAdmins(1);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(roles: ["User"]), Ct);

        result.Succeeded.Should().BeTrue();
    }

    [Test, Description("UpdateUserAsync should save the trimmed name with exactly the roles and groups asked for")]
    public async Task UpdateUserAsync_SavesWhatWasAsked()
    {
        SetupUser(User());

        await _sut.UpdateUserAsync(USER_ID, Update(name: "  New Name ", roles: ["manager"], groups: ["Sales"]), Ct);

        _adminRepo.Verify(r => r.UpdateUserAsync(USER_ID, "New Name",
            It.Is<IReadOnlyCollection<string>>(x => x.SequenceEqual(new[] { "Manager" })),
            It.Is<IReadOnlyCollection<string>>(x => x.SequenceEqual(new[] { "sales" })),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("UpdateUserAsync should end the user's sessions when a role is taken away")]
    public async Task UpdateUserAsync_RevokesSessionsWhenARoleIsRemoved()
    {
        SetupUser(User(roles: ["User", "Manager"]));

        await _sut.UpdateUserAsync(USER_ID, Update(roles: ["User"]), Ct);

        VerifySessionsRevoked(USER_ID, Times.Once());
    }

    [Test, Description("UpdateUserAsync should end the user's sessions when a group is taken away")]
    public async Task UpdateUserAsync_RevokesSessionsWhenAGroupIsRemoved()
    {
        SetupUser(User(groups: ["sales", "ops"]));

        await _sut.UpdateUserAsync(USER_ID, Update(groups: ["sales"]), Ct);

        VerifySessionsRevoked(USER_ID, Times.Once());
    }

    [Test, Description("UpdateUserAsync should leave the user signed in when access is only added or unchanged")]
    public async Task UpdateUserAsync_KeepsSessionsWhenAccessIsNotReduced()
    {
        SetupUser(User(roles: ["User"], groups: ["sales"]));

        await _sut.UpdateUserAsync(USER_ID, Update(roles: ["User", "Manager"], groups: ["sales", "ops"]), Ct);
        await _sut.UpdateUserAsync(USER_ID, Update(roles: ["user"], groups: ["SALES"]), Ct);

        VerifySessionsRevoked(USER_ID, Times.Never());
    }

    [Test, Description("UpdateUserAsync should return the user as it is after the change")]
    public async Task UpdateUserAsync_ReturnsTheUpdatedUser()
    {
        AdminUser before = User();
        SetupUser(before);

        AdminResult<AdminUser> result = await _sut.UpdateUserAsync(USER_ID, Update(), Ct);

        result.Value.Should().BeSameAs(before);   // the stub returns the same instance for both reads
    }

    // ------------------------------------------------------------------ resetting passwords

    [Test, Description("ResetPasswordAsync should refuse a password that is too short")]
    public async Task ResetPasswordAsync_RejectsAShortPassword()
    {
        SetupUser(User());

        AdminResult result = await _sut.ResetPasswordAsync(USER_ID, "short", Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
        _adminRepo.Verify(r => r.SetPasswordHashAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("ResetPasswordAsync should say NotFound for an unknown user")]
    public async Task ResetPasswordAsync_ReturnsNotFoundForAnUnknownUser()
    {
        SetupUser(null);

        AdminResult result = await _sut.ResetPasswordAsync(USER_ID, "a-long-password-1", Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [Test, Description("ResetPasswordAsync should store a hash and end every session of the user")]
    public async Task ResetPasswordAsync_StoresTheHashAndRevokesSessions()
    {
        SetupUser(User());

        AdminResult result = await _sut.ResetPasswordAsync(USER_ID, "a-long-password-1", Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.SetPasswordHashAsync(USER_ID, "hashed", It.IsAny<CancellationToken>()), Times.Once);
        VerifySessionsRevoked(USER_ID, Times.Once());
    }

    // ------------------------------------------------------------------ disabling and enabling

    [Test, Description("SetDisabledAsync should say NotFound for an unknown user")]
    public async Task SetDisabledAsync_ReturnsNotFoundForAnUnknownUser()
    {
        SetupUser(null);

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(USER_ID, true, Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [Test, Description("SetDisabledAsync should not let administrators disable themselves")]
    public async Task SetDisabledAsync_RefusesToDisableTheActor()
    {
        SetupUser(User(ACTOR_ID, roles: ["Admin"]), ACTOR_ID);

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(ACTOR_ID, true, Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Be("You cannot disable your own account.");
    }

    [Test, Description("SetDisabledAsync should not disable the last active administrator")]
    public async Task SetDisabledAsync_ProtectsTheLastAdministrator()
    {
        SetupUser(User(roles: ["Admin"]));
        SetupCountOfEnabledAdmins(1);

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(USER_ID, true, Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Be(AuthAdminManager.LastAdministratorMessage);
    }

    [Test, Description("SetDisabledAsync should disable an administrator when another active one remains, and end their sessions")]
    public async Task SetDisabledAsync_DisablesAnAdministratorWhenAnotherRemains()
    {
        SetupUser(User(roles: ["Admin"]));
        SetupCountOfEnabledAdmins(2);

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(USER_ID, true, Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.SetDisabledAsync(USER_ID, true, It.IsAny<CancellationToken>()), Times.Once);
        VerifySessionsRevoked(USER_ID, Times.Once());
    }

    [Test, Description("SetDisabledAsync should disable an ordinary user and end their sessions")]
    public async Task SetDisabledAsync_DisablesAnOrdinaryUser()
    {
        SetupUser(User(roles: ["User"]));

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(USER_ID, true, Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.SetDisabledAsync(USER_ID, true, It.IsAny<CancellationToken>()), Times.Once);
        VerifySessionsRevoked(USER_ID, Times.Once());
    }

    [Test, Description("SetDisabledAsync should enable a disabled user without ending any session")]
    public async Task SetDisabledAsync_EnablesADisabledUser()
    {
        SetupUser(User(lockoutEnd: DateTimeOffset.MaxValue));

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(USER_ID, false, Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.SetDisabledAsync(USER_ID, false, It.IsAny<CancellationToken>()), Times.Once);
        VerifySessionsRevoked(USER_ID, Times.Never());
    }

    [Test, Description("SetDisabledAsync should do nothing when the user is already disabled")]
    public async Task SetDisabledAsync_DoesNothingWhenAlreadyDisabled()
    {
        SetupUser(User(lockoutEnd: DateTimeOffset.MaxValue));

        AdminResult<AdminUser> result = await _sut.SetDisabledAsync(USER_ID, true, Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.SetDisabledAsync(It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("SetDisabledAsync should do nothing when enabling a user who is not locked at all")]
    public async Task SetDisabledAsync_DoesNothingWhenAlreadyEnabled()
    {
        SetupUser(User());

        await _sut.SetDisabledAsync(USER_ID, false, Ct);

        _adminRepo.Verify(r => r.SetDisabledAsync(It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("SetDisabledAsync should clear a temporary lockout when asked to enable, which acts as an unlock")]
    public async Task SetDisabledAsync_EnablingClearsATemporaryLockout()
    {
        SetupUser(User(lockoutEnd: DateTimeOffset.UtcNow.AddMinutes(10)));

        await _sut.SetDisabledAsync(USER_ID, false, Ct);

        _adminRepo.Verify(r => r.SetDisabledAsync(USER_ID, false, It.IsAny<CancellationToken>()), Times.Once);
    }

    // ------------------------------------------------------------------ deleting users

    [Test, Description("DeleteUserAsync should say NotFound for an unknown user")]
    public async Task DeleteUserAsync_ReturnsNotFoundForAnUnknownUser()
    {
        SetupUser(null);

        AdminResult result = await _sut.DeleteUserAsync(USER_ID, Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [Test, Description("DeleteUserAsync should not let administrators delete themselves")]
    public async Task DeleteUserAsync_RefusesToDeleteTheActor()
    {
        SetupUser(User(ACTOR_ID, roles: ["Admin"]), ACTOR_ID);

        AdminResult result = await _sut.DeleteUserAsync(ACTOR_ID, Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Be("You cannot delete your own account.");
        _adminRepo.Verify(r => r.DeleteUserAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("DeleteUserAsync should not delete the last active administrator")]
    public async Task DeleteUserAsync_ProtectsTheLastAdministrator()
    {
        SetupUser(User(roles: ["Admin"]));
        SetupCountOfEnabledAdmins(1);

        AdminResult result = await _sut.DeleteUserAsync(USER_ID, Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Be(AuthAdminManager.LastAdministratorMessage);
    }

    [Test, Description("DeleteUserAsync should delete a disabled administrator, who does not count as active")]
    public async Task DeleteUserAsync_AllowsDeletingADisabledAdministrator()
    {
        SetupUser(User(roles: ["Admin"], lockoutEnd: DateTimeOffset.MaxValue));
        SetupCountOfEnabledAdmins(1);

        AdminResult result = await _sut.DeleteUserAsync(USER_ID, Ct);

        result.Succeeded.Should().BeTrue();
    }

    [Test, Description("DeleteUserAsync should delete an ordinary user")]
    public async Task DeleteUserAsync_DeletesTheUser()
    {
        SetupUser(User());

        AdminResult result = await _sut.DeleteUserAsync(USER_ID, Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.DeleteUserAsync(USER_ID, It.IsAny<CancellationToken>()), Times.Once);
    }

    // ------------------------------------------------------------------ roles

    [Test, Description("GetRolesAsync should mark Admin and User as built in")]
    public async Task GetRolesAsync_MarksTheBuiltInRoles()
    {
        IReadOnlyCollection<AdminRole> roles = await _sut.GetRolesAsync(Ct);

        roles.Single(r => r.Name == "Admin").IsBuiltIn.Should().BeTrue();
        roles.Single(r => r.Name == "User").IsBuiltIn.Should().BeTrue();
        roles.Single(r => r.Name == "Manager").IsBuiltIn.Should().BeFalse();
    }

    [TestCase(""), TestCase("   "), TestCase("1role"), TestCase("a"), TestCase("bad!name"), TestCase("-leading")]
    [Description("CreateRoleAsync should refuse a name that is not a valid role name")]
    public async Task CreateRoleAsync_RejectsABadName(string name)
    {
        AdminResult<AdminRole> result = await _sut.CreateRoleAsync(name, Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [TestCase("Manager"), TestCase("manager"), TestCase("ADMIN")]
    [Description("CreateRoleAsync should say Conflict for a name that exists, ignoring case")]
    public async Task CreateRoleAsync_ReturnsConflictForADuplicate(string name)
    {
        AdminResult<AdminRole> result = await _sut.CreateRoleAsync(name, Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
    }

    [Test, Description("CreateRoleAsync should create the role with the trimmed name")]
    public async Task CreateRoleAsync_CreatesTheRole()
    {
        AdminResult<AdminRole> result = await _sut.CreateRoleAsync("  Auditor ", Ct);

        result.Succeeded.Should().BeTrue();
        result.Value.Should().Be(new AdminRole("Auditor", false, 0));
        _adminRepo.Verify(r => r.CreateRoleAsync("Auditor", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("DeleteRoleAsync should say NotFound for an unknown role")]
    public async Task DeleteRoleAsync_ReturnsNotFoundForAnUnknownRole()
    {
        AdminResult result = await _sut.DeleteRoleAsync("Wizard", Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [TestCase("Admin"), TestCase("User"), TestCase("admin"), TestCase("USER")]
    [Description("DeleteRoleAsync should refuse to delete a built-in role")]
    public async Task DeleteRoleAsync_RefusesToDeleteABuiltInRole(string name)
    {
        AdminResult result = await _sut.DeleteRoleAsync(name, Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        _adminRepo.Verify(r => r.DeleteRoleAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("DeleteRoleAsync should refuse to delete a role that is still assigned, and say how many users have it")]
    public async Task DeleteRoleAsync_RefusesWhileUsersHaveTheRole()
    {
        SetupRoles(new AdminRole("Admin", false, 1), new AdminRole("User", false, 0), new AdminRole("Manager", false, 3));

        AdminResult result = await _sut.DeleteRoleAsync("Manager", Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
        result.Message.Should().Contain("3 user(s)");
    }

    [Test, Description("DeleteRoleAsync should delete a role nobody has")]
    public async Task DeleteRoleAsync_DeletesAnUnusedRole()
    {
        AdminResult result = await _sut.DeleteRoleAsync("manager", Ct);

        result.Succeeded.Should().BeTrue();
        _adminRepo.Verify(r => r.DeleteRoleAsync("Manager", It.IsAny<CancellationToken>()), Times.Once);
    }

    // ------------------------------------------------------------------ groups

    [TestCase(""), TestCase("a"), TestCase("-bad"), TestCase("has space"), TestCase("bad!")]
    [Description("CreateGroupAsync should refuse a name that is not a valid group name")]
    public async Task CreateGroupAsync_RejectsABadName(string name)
    {
        AdminResult<AdminGroup> result = await _sut.CreateGroupAsync(new NewAdminGroup(name, null), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [Test, Description("CreateGroupAsync should refuse a group name longer than 63 characters")]
    public async Task CreateGroupAsync_RejectsANameThatIsTooLong()
    {
        AdminResult<AdminGroup> result = await _sut.CreateGroupAsync(new NewAdminGroup(new string('g', 64), null), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [Test, Description("CreateGroupAsync should refuse a description longer than 200 characters")]
    public async Task CreateGroupAsync_RejectsADescriptionThatIsTooLong()
    {
        AdminResult<AdminGroup> result = await _sut.CreateGroupAsync(new NewAdminGroup("fresh", new string('d', 201)), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [TestCase("sales"), TestCase("SALES"), TestCase(" Sales ")]
    [Description("CreateGroupAsync should say Conflict for a name that exists, ignoring case and spaces")]
    public async Task CreateGroupAsync_ReturnsConflictForADuplicate(string name)
    {
        AdminResult<AdminGroup> result = await _sut.CreateGroupAsync(new NewAdminGroup(name, null), Ct);

        result.Status.Should().Be(AdminStatus.Conflict);
    }

    [Test, Description("CreateGroupAsync should store the name in lower case and the trimmed description")]
    public async Task CreateGroupAsync_CreatesTheGroupInLowerCase()
    {
        AdminResult<AdminGroup> result = await _sut.CreateGroupAsync(new NewAdminGroup("  Sales-West ", "  The west team "), Ct);

        result.Succeeded.Should().BeTrue();
        result.Value.Should().Be(new AdminGroup("sales-west", "The west team", 0));
        _adminRepo.Verify(r => r.CreateGroupAsync("sales-west", "The west team", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("CreateGroupAsync should store a blank description as nothing")]
    public async Task CreateGroupAsync_StoresABlankDescriptionAsNull()
    {
        await _sut.CreateGroupAsync(new NewAdminGroup("fresh", "   "), Ct);

        _adminRepo.Verify(r => r.CreateGroupAsync("fresh", null, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetGroupAsync should find a group whatever case the name is asked for in")]
    public async Task GetGroupAsync_IgnoresTheCaseOfTheName()
    {
        AdminGroupDetail detail = new("sales", null, []);
        _adminRepo.Setup(r => r.GetGroupAsync("sales", It.IsAny<CancellationToken>())).ReturnsAsync(detail);

        AdminResult<AdminGroupDetail> result = await _sut.GetGroupAsync(" SALES ", Ct);

        result.Value.Should().BeSameAs(detail);
    }

    [Test, Description("GetGroupAsync should say NotFound for an unknown group")]
    public async Task GetGroupAsync_ReturnsNotFoundForAnUnknownGroup()
    {
        AdminResult<AdminGroupDetail> result = await _sut.GetGroupAsync("nowhere", Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [Test, Description("UpdateGroupAsync should say NotFound for an unknown group")]
    public async Task UpdateGroupAsync_ReturnsNotFoundForAnUnknownGroup()
    {
        AdminResult<AdminGroup> result = await _sut.UpdateGroupAsync("nowhere", "text", Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
    }

    [Test, Description("UpdateGroupAsync should refuse a description longer than 200 characters")]
    public async Task UpdateGroupAsync_RejectsADescriptionThatIsTooLong()
    {
        AdminResult<AdminGroup> result = await _sut.UpdateGroupAsync("sales", new string('d', 201), Ct);

        result.Status.Should().Be(AdminStatus.Invalid);
    }

    [Test, Description("UpdateGroupAsync should save the trimmed description and report the member count")]
    public async Task UpdateGroupAsync_SavesTheDescription()
    {
        _adminRepo.Setup(r => r.GetGroupAsync("sales", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminGroupDetail("sales", null, [new AdminGroupMember("u1", "a@example.com", "A"), new AdminGroupMember("u2", "b@example.com", "B")]));

        AdminResult<AdminGroup> result = await _sut.UpdateGroupAsync("Sales", "  The sales team ", Ct);

        result.Value.Should().Be(new AdminGroup("sales", "The sales team", 2));
        _adminRepo.Verify(r => r.UpdateGroupDescriptionAsync("sales", "The sales team", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("DeleteGroupAsync should say NotFound for an unknown group")]
    public async Task DeleteGroupAsync_ReturnsNotFoundForAnUnknownGroup()
    {
        AdminResult result = await _sut.DeleteGroupAsync("nowhere", Ct);

        result.Status.Should().Be(AdminStatus.NotFound);
        _adminRepo.Verify(r => r.DeleteGroupAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("DeleteGroupAsync should delete the group and end the sessions of everyone who was in it")]
    public async Task DeleteGroupAsync_DeletesTheGroupAndRevokesMemberSessions()
    {
        _adminRepo.Setup(r => r.GetGroupAsync("sales", It.IsAny<CancellationToken>())).ReturnsAsync(new AdminGroupDetail("sales", null, []));
        IReadOnlyCollection<string> members = ["u1", "u2"];
        _adminRepo.Setup(r => r.DeleteGroupAsync("sales", It.IsAny<CancellationToken>())).ReturnsAsync(members);

        AdminResult result = await _sut.DeleteGroupAsync("SALES", Ct);

        result.Succeeded.Should().BeTrue();
        VerifySessionsRevoked("u1", Times.Once());
        VerifySessionsRevoked("u2", Times.Once());
    }

    [Test, Description("GetGroupsAsync should return the groups from the repo")]
    public async Task GetGroupsAsync_ReturnsTheGroups()
    {
        IReadOnlyCollection<AdminGroup> groups = await _sut.GetGroupsAsync(Ct);

        groups.Select(g => g.Name).Should().BeEquivalentTo(new[] { "sales", "ops" });
    }
}
