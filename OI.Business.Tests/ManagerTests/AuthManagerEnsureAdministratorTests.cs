using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Glue.Services;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for AuthManager.EnsureAdministratorAsync, the first administrator")]
public class AuthManagerEnsureAdministratorTests
{
    private Mock<IAuthRepo> _authRepo = null!;
    private Mock<IPasswordService> _passwords = null!;
    private AuthManager _sut = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _authRepo = new Mock<IAuthRepo>();
        _passwords = new Mock<IPasswordService>();
        _passwords.Setup(p => p.Hash(It.IsAny<string>())).Returns("hashed");
        _authRepo.Setup(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<CancellationToken>())).ReturnsAsync("admin-id");

        _sut = new AuthManager(_authRepo.Object, new Mock<IRefreshTokenRepo>().Object, new Mock<IAccessTokenFactory>().Object,
            _passwords.Object, new AuthPolicy(), TimeProvider.System, NullLogger<AuthManager>.Instance);
    }

    [Test, Description("EnsureAdministratorAsync should refuse a password shorter than the policy minimum")]
    public async Task EnsureAdministratorAsync_ThrowsForAShortPassword()
    {
        Func<Task> act = () => _sut.EnsureAdministratorAsync("admin@example.com", "short", Ct);

        await act.Should().ThrowAsync<ArgumentException>();
    }

    [Test, Description("EnsureAdministratorAsync should make sure the Admin and User roles exist")]
    public async Task EnsureAdministratorAsync_CreatesTheBuiltInRoles()
    {
        await _sut.EnsureAdministratorAsync("admin@example.com", "a-long-password-1", Ct);

        _authRepo.Verify(r => r.EnsureRoleAsync("Admin", It.IsAny<CancellationToken>()), Times.Once);
        _authRepo.Verify(r => r.EnsureRoleAsync("User", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("EnsureAdministratorAsync should create nothing more when the user already exists")]
    public async Task EnsureAdministratorAsync_DoesNotCreateAnExistingUserAgain()
    {
        _authRepo.Setup(r => r.UserExistsAsync("admin@example.com", It.IsAny<CancellationToken>())).ReturnsAsync(true);

        await _sut.EnsureAdministratorAsync("admin@example.com", "a-long-password-1", Ct);

        _authRepo.Verify(r => r.CreateUserAsync(It.IsAny<NewAuthUser>(), It.IsAny<CancellationToken>()), Times.Never);
        _authRepo.Verify(r => r.AddToGroupAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("EnsureAdministratorAsync should create the user with a hashed password, the Admin role and the default group")]
    public async Task EnsureAdministratorAsync_CreatesTheAdministrator()
    {
        await _sut.EnsureAdministratorAsync("admin@example.com", "a-long-password-1", Ct);

        _authRepo.Verify(r => r.CreateUserAsync(
            It.Is<NewAuthUser>(u => u.Email == "admin@example.com" && u.PasswordHash == "hashed"), It.IsAny<CancellationToken>()), Times.Once);
        _authRepo.Verify(r => r.AddToRoleAsync("admin-id", "Admin", It.IsAny<CancellationToken>()), Times.Once);
        _authRepo.Verify(r => r.AddToGroupAsync("admin-id", "default", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("EnsureAdministratorAsync should no longer store the group as a claim, because groups are memberships now")]
    public async Task EnsureAdministratorAsync_DoesNotAddAGroupClaim()
    {
        await _sut.EnsureAdministratorAsync("admin@example.com", "a-long-password-1", Ct);

        _authRepo.Verify(r => r.AddClaimAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }
}
