using FluentAssertions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using Microsoft.Extensions.Logging.Abstractions;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for AuthManager.ValidateCredentialsAsync and FindActiveUserAsync: when a password is accepted and how failures lead to lockout")]
public class AuthManagerLoginTests
{
    private const string EMAIL = "pat@example.com";
    private const string PASSWORD = "correct-horse-battery";

    private AuthManagerHarness _h = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp() => _h = new AuthManagerHarness();

    // ---- constructor

    [TestCase("authRepo")]
    [TestCase("passwords")]
    [TestCase("policy")]
    [TestCase("clock")]
    [TestCase("logger")]
    [Description("Constructor should throw when any dependency is null")]
    public void Constructor_ThrowsWhenADependencyIsNull(string nullParameter)
    {
        Action act = () => _ = new AuthManager(
            nullParameter == "authRepo" ? null! : _h.AuthRepo.Object,
            nullParameter == "passwords" ? null! : _h.Passwords.Object,
            nullParameter == "policy" ? null! : new AuthPolicy(),
            nullParameter == "clock" ? null! : TimeProvider.System,
            nullParameter == "logger" ? null! : NullLogger<AuthManager>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName(nullParameter);
    }

    // ---- unknown user

    [Test, Description("ValidateCredentialsAsync should reject an unknown email")]
    public async Task ValidateCredentialsAsync_RejectsAnUnknownEmail()
    {
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync((IAuthCredential?)null);

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull();
    }

    [Test, Description("ValidateCredentialsAsync should still check a password hash for an unknown email, so it takes as long as a wrong password")]
    public async Task ValidateCredentialsAsync_ChecksADummyHashForAnUnknownEmail()
    {
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync((IAuthCredential?)null);

        await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        _h.Passwords.Verify(p => p.Verify("dummy-hash", PASSWORD), Times.Once);
    }

    [Test, Description("ValidateCredentialsAsync should not touch failure counts for an unknown email")]
    public async Task ValidateCredentialsAsync_ChangesNothingForAnUnknownEmail()
    {
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync((IAuthCredential?)null);

        await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        _h.AuthRepo.Verify(r => r.IncrementAccessFailedAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
        _h.AuthRepo.Verify(r => r.SetLockoutAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("ValidateCredentialsAsync should check a dummy hash for a user who has no password hash stored")]
    public async Task ValidateCredentialsAsync_UsesTheDummyHashWhenTheUserHasNoPassword()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(passwordHash: null);
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.Passwords.Setup(p => p.Verify("dummy-hash", PASSWORD)).Returns(false);

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull();
        _h.Passwords.Verify(p => p.Verify("dummy-hash", PASSWORD), Times.Once);
    }

    // ---- lockout

    [Test, Description("ValidateCredentialsAsync should reject a locked-out user even when the password is correct")]
    public async Task ValidateCredentialsAsync_RejectsALockedOutUserWithTheRightPassword()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start.AddMinutes(5));
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull("a lockout must hold no matter what is typed");
    }

    [Test, Description("ValidateCredentialsAsync should not count a failed attempt against a user who is already locked out")]
    public async Task ValidateCredentialsAsync_DoesNotCountFailuresWhileLockedOut()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start.AddMinutes(5));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        await _h.Sut.ValidateCredentialsAsync(EMAIL, "wrong", Ct);

        _h.AuthRepo.Verify(r => r.IncrementAccessFailedAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("ValidateCredentialsAsync should accept a user whose lockout has already ended")]
    public async Task ValidateCredentialsAsync_AcceptsAUserWhoseLockoutHasEnded()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start.AddMinutes(-1));
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().NotBeNull();
    }

    [Test, Description("ValidateCredentialsAsync should treat a lockout that ends exactly now as ended")]
    public async Task ValidateCredentialsAsync_AcceptsAUserWhoseLockoutEndsExactlyNow()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start);
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().NotBeNull("the lockout only holds while it is later than now");
    }

    // ---- wrong password

    [Test, Description("ValidateCredentialsAsync should reject a wrong password and count the failure")]
    public async Task ValidateCredentialsAsync_CountsAWrongPassword()
    {
        IAuthCredential credential = AuthManagerHarness.Credential();
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, "wrong", Ct);

        result.Should().BeNull();
        _h.AuthRepo.Verify(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("ValidateCredentialsAsync should not lock the user out while failures are below the policy limit")]
    public async Task ValidateCredentialsAsync_DoesNotLockOutBelowTheLimit()
    {
        _h = new AuthManagerHarness(new AuthPolicy(MaxFailedAttempts: 3));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(AuthManagerHarness.Credential());
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(2);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        await _h.Sut.ValidateCredentialsAsync(EMAIL, "wrong", Ct);

        _h.AuthRepo.Verify(r => r.SetLockoutAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [TestCase(3)]
    [TestCase(4)]
    [Description("ValidateCredentialsAsync should lock the user out for the policy duration once failures reach the limit")]
    public async Task ValidateCredentialsAsync_LocksOutAtTheLimit(int failures)
    {
        _h = new AuthManagerHarness(new AuthPolicy(MaxFailedAttempts: 3, LockoutDuration: TimeSpan.FromMinutes(20)));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(AuthManagerHarness.Credential());
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(failures);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, "wrong", Ct);

        result.Should().BeNull();
        _h.AuthRepo.Verify(r => r.SetLockoutAsync("user-1", AuthManagerHarness.Start.AddMinutes(20), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("ValidateCredentialsAsync should use the default 15 minute lockout when the policy gives no duration")]
    public async Task ValidateCredentialsAsync_UsesTheDefaultLockoutDuration()
    {
        _h = new AuthManagerHarness(new AuthPolicy(MaxFailedAttempts: 1));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(AuthManagerHarness.Credential());
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        await _h.Sut.ValidateCredentialsAsync(EMAIL, "wrong", Ct);

        _h.AuthRepo.Verify(r => r.SetLockoutAsync("user-1", AuthManagerHarness.Start.AddMinutes(15), It.IsAny<CancellationToken>()), Times.Once);
    }

    // ---- success

    [Test, Description("ValidateCredentialsAsync should reset the failure count after a good sign-in when there were failures")]
    public async Task ValidateCredentialsAsync_ResetsFailuresAfterASuccess()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(accessFailedCount: 2);
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        _h.AuthRepo.Verify(r => r.ResetAccessFailedAsync("user-1", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("ValidateCredentialsAsync should not write a reset when there were no failures to clear")]
    public async Task ValidateCredentialsAsync_DoesNotResetWhenThereWereNoFailures()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(accessFailedCount: 0);
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        _h.AuthRepo.Verify(r => r.ResetAccessFailedAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("ValidateCredentialsAsync should reject the sign-in when the user can no longer be found")]
    public async Task ValidateCredentialsAsync_RejectsWhenTheUserHasVanished()
    {
        IAuthCredential credential = AuthManagerHarness.Credential();
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.AuthRepo.Setup(r => r.FindUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync((IAuthUser?)null);
        _h.Passwords.Setup(p => p.Verify("stored-hash", PASSWORD)).Returns(true);

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull();
    }

    [Test, Description("ValidateCredentialsAsync should return the user it found, so the login page can start their session")]
    public async Task ValidateCredentialsAsync_ReturnsTheFoundUser()
    {
        IAuthUser user = AuthManagerHarness.User("user-9");
        IAuthCredential credential = AuthManagerHarness.Credential("user-9");
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, user);

        IAuthUser? result = await _h.Sut.ValidateCredentialsAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeSameAs(user);
    }

    // ---- FindActiveUserAsync

    [Test, Description("FindActiveUserAsync should return a user who exists and is not locked out")]
    public async Task FindActiveUserAsync_ReturnsAnActiveUser()
    {
        IAuthUser user = AuthManagerHarness.User("user-1");
        _h.AuthRepo.Setup(r => r.FindUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(user);

        IAuthUser? result = await _h.Sut.FindActiveUserAsync("user-1", Ct);

        result.Should().BeSameAs(user);
    }

    [Test, Description("FindActiveUserAsync should return null for a user who no longer exists")]
    public async Task FindActiveUserAsync_ReturnsNullForAMissingUser()
    {
        _h.AuthRepo.Setup(r => r.FindUserAsync("gone", It.IsAny<CancellationToken>())).ReturnsAsync((IAuthUser?)null);

        IAuthUser? result = await _h.Sut.FindActiveUserAsync("gone", Ct);

        result.Should().BeNull();
    }

    [Test, Description("FindActiveUserAsync should return null while the user is locked out or disabled")]
    public async Task FindActiveUserAsync_ReturnsNullForALockedOutUser()
    {
        IAuthUser user = AuthManagerHarness.User("user-1", lockoutEnd: AuthManagerHarness.Start.AddMinutes(5));
        _h.AuthRepo.Setup(r => r.FindUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(user);

        IAuthUser? result = await _h.Sut.FindActiveUserAsync("user-1", Ct);

        result.Should().BeNull();
    }

    [Test, Description("FindActiveUserAsync should return a user whose lockout has ended")]
    public async Task FindActiveUserAsync_ReturnsAUserWhoseLockoutHasEnded()
    {
        IAuthUser user = AuthManagerHarness.User("user-1", lockoutEnd: AuthManagerHarness.Start.AddMinutes(-1));
        _h.AuthRepo.Setup(r => r.FindUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(user);

        IAuthUser? result = await _h.Sut.FindActiveUserAsync("user-1", Ct);

        result.Should().BeSameAs(user);
    }
}
