using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Glue.Services;

namespace OI.Business.Tests.ManagerTests;

/// <summary>A clock the test moves by hand, so lockouts, expiry and the reuse window can be tested exactly.</summary>
internal sealed class FakeClock(DateTimeOffset now) : TimeProvider
{
    public DateTimeOffset Now { get; set; } = now;

    public override DateTimeOffset GetUtcNow() => Now;
}

/// <summary>Builds an <see cref="AuthManager"/> with every dependency mocked, shared by the sign-in test fixtures.</summary>
internal sealed class AuthManagerHarness
{
    public static readonly DateTimeOffset Start = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    public Mock<IAuthRepo> AuthRepo { get; } = new();
    public Mock<IPasswordService> Passwords { get; } = new();
    public FakeClock Clock { get; } = new(Start);
    public AuthPolicy Policy { get; }
    public AuthManager Sut { get; }

    public AuthManagerHarness(AuthPolicy? policy = null)
    {
        Policy = policy ?? new AuthPolicy();

        Passwords.Setup(p => p.Hash(It.IsAny<string>())).Returns("dummy-hash");

        Sut = new AuthManager(AuthRepo.Object, Passwords.Object, Policy, Clock, NullLogger<AuthManager>.Instance);
    }

    public static IAuthCredential Credential(string userId = "user-1", string? passwordHash = "stored-hash",
        DateTimeOffset? lockoutEnd = null, int accessFailedCount = 0)
    {
        Mock<IAuthCredential> credential = new();
        credential.SetupGet(c => c.UserId).Returns(userId);
        credential.SetupGet(c => c.PasswordHash).Returns(passwordHash);
        credential.SetupGet(c => c.LockoutEnd).Returns(lockoutEnd);
        credential.SetupGet(c => c.AccessFailedCount).Returns(accessFailedCount);
        return credential.Object;
    }

    public static IAuthUser User(string userId = "user-1", DateTimeOffset? lockoutEnd = null)
    {
        Mock<IAuthUser> user = new();
        user.SetupGet(u => u.Id).Returns(userId);
        user.SetupGet(u => u.Email).Returns("pat@example.com");
        user.SetupGet(u => u.DisplayName).Returns("Pat Example");
        user.SetupGet(u => u.LockoutEnd).Returns(lockoutEnd);
        user.SetupGet(u => u.Roles).Returns(["User"]);
        user.SetupGet(u => u.Claims).Returns([]);
        return user.Object;
    }

    /// <summary>Makes the repos behave as if this credential and user exist and the password is correct.</summary>
    public void GivenValidSignIn(string email, string password, IAuthCredential credential, IAuthUser user)
    {
        AuthRepo.Setup(r => r.FindCredentialAsync(email, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        AuthRepo.Setup(r => r.FindUserAsync(credential.UserId, It.IsAny<CancellationToken>())).ReturnsAsync(user);
        Passwords.Setup(p => p.Verify(credential.PasswordHash!, password)).Returns(true);
    }
}
