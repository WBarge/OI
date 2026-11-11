using FluentAssertions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using Microsoft.Extensions.Logging.Abstractions;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for AuthManager.LoginAsync: when a password is accepted, how failures lead to lockout, and what is stored")]
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
    [TestCase("refreshTokenRepo")]
    [TestCase("accessTokenFactory")]
    [TestCase("passwords")]
    [TestCase("policy")]
    [TestCase("clock")]
    [TestCase("logger")]
    [Description("Constructor should throw when any dependency is null")]
    public void Constructor_ThrowsWhenADependencyIsNull(string nullParameter)
    {
        Action act = () => _ = new AuthManager(
            nullParameter == "authRepo" ? null! : _h.AuthRepo.Object,
            nullParameter == "refreshTokenRepo" ? null! : _h.RefreshTokenRepo.Object,
            nullParameter == "accessTokenFactory" ? null! : _h.TokenFactory.Object,
            nullParameter == "passwords" ? null! : _h.Passwords.Object,
            nullParameter == "policy" ? null! : new AuthPolicy(),
            nullParameter == "clock" ? null! : TimeProvider.System,
            nullParameter == "logger" ? null! : NullLogger<AuthManager>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName(nullParameter);
    }

    // ---- unknown user

    [Test, Description("LoginAsync should reject an unknown email")]
    public async Task LoginAsync_RejectsAnUnknownEmail()
    {
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync((IAuthCredential?)null);

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull();
    }

    [Test, Description("LoginAsync should still check a password hash for an unknown email, so it takes as long as a wrong password")]
    public async Task LoginAsync_ChecksADummyHashForAnUnknownEmail()
    {
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync((IAuthCredential?)null);

        await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        _h.Passwords.Verify(p => p.Verify("dummy-hash", PASSWORD), Times.Once);
    }

    [Test, Description("LoginAsync should not touch failure counts or issue a token for an unknown email")]
    public async Task LoginAsync_ChangesNothingForAnUnknownEmail()
    {
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync((IAuthCredential?)null);

        await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        _h.AuthRepo.Verify(r => r.IncrementAccessFailedAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
        _h.AuthRepo.Verify(r => r.SetLockoutAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never);
        _h.RefreshTokenRepo.Verify(r => r.IssueAsync(It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("LoginAsync should check a dummy hash for a user who has no password hash stored")]
    public async Task LoginAsync_UsesTheDummyHashWhenTheUserHasNoPassword()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(passwordHash: null);
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.Passwords.Setup(p => p.Verify("dummy-hash", PASSWORD)).Returns(false);

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull();
        _h.Passwords.Verify(p => p.Verify("dummy-hash", PASSWORD), Times.Once);
    }

    // ---- lockout

    [Test, Description("LoginAsync should reject a locked-out user even when the password is correct")]
    public async Task LoginAsync_RejectsALockedOutUserWithTheRightPassword()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start.AddMinutes(5));
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull("a lockout must hold no matter what is typed");
        _h.RefreshTokenRepo.Verify(r => r.IssueAsync(It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("LoginAsync should not count a failed attempt against a user who is already locked out")]
    public async Task LoginAsync_DoesNotCountFailuresWhileLockedOut()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start.AddMinutes(5));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        await _h.Sut.LoginAsync(EMAIL, "wrong", Ct);

        _h.AuthRepo.Verify(r => r.IncrementAccessFailedAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("LoginAsync should accept a user whose lockout has already ended")]
    public async Task LoginAsync_AcceptsAUserWhoseLockoutHasEnded()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start.AddMinutes(-1));
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().NotBeNull();
    }

    [Test, Description("LoginAsync should treat a lockout that ends exactly now as ended")]
    public async Task LoginAsync_AcceptsAUserWhoseLockoutEndsExactlyNow()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(lockoutEnd: AuthManagerHarness.Start);
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().NotBeNull("the lockout only holds while it is later than now");
    }

    // ---- wrong password

    [Test, Description("LoginAsync should reject a wrong password and count the failure")]
    public async Task LoginAsync_CountsAWrongPassword()
    {
        IAuthCredential credential = AuthManagerHarness.Credential();
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, "wrong", Ct);

        result.Should().BeNull();
        _h.AuthRepo.Verify(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>()), Times.Once);
        _h.RefreshTokenRepo.Verify(r => r.IssueAsync(It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("LoginAsync should not lock the user out while failures are below the policy limit")]
    public async Task LoginAsync_DoesNotLockOutBelowTheLimit()
    {
        _h = new AuthManagerHarness(new AuthPolicy(MaxFailedAttempts: 3));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(AuthManagerHarness.Credential());
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(2);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        await _h.Sut.LoginAsync(EMAIL, "wrong", Ct);

        _h.AuthRepo.Verify(r => r.SetLockoutAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [TestCase(3)]
    [TestCase(4)]
    [Description("LoginAsync should lock the user out for the policy duration once failures reach the limit")]
    public async Task LoginAsync_LocksOutAtTheLimit(int failures)
    {
        _h = new AuthManagerHarness(new AuthPolicy(MaxFailedAttempts: 3, LockoutDuration: TimeSpan.FromMinutes(20)));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(AuthManagerHarness.Credential());
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(failures);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, "wrong", Ct);

        result.Should().BeNull();
        _h.AuthRepo.Verify(r => r.SetLockoutAsync("user-1", AuthManagerHarness.Start.AddMinutes(20), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("LoginAsync should use the default 15 minute lockout when the policy gives no duration")]
    public async Task LoginAsync_UsesTheDefaultLockoutDuration()
    {
        _h = new AuthManagerHarness(new AuthPolicy(MaxFailedAttempts: 1));
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(AuthManagerHarness.Credential());
        _h.AuthRepo.Setup(r => r.IncrementAccessFailedAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _h.Passwords.Setup(p => p.Verify("stored-hash", "wrong")).Returns(false);

        await _h.Sut.LoginAsync(EMAIL, "wrong", Ct);

        _h.AuthRepo.Verify(r => r.SetLockoutAsync("user-1", AuthManagerHarness.Start.AddMinutes(15), It.IsAny<CancellationToken>()), Times.Once);
    }

    // ---- success

    [Test, Description("LoginAsync should reset the failure count after a good sign-in when there were failures")]
    public async Task LoginAsync_ResetsFailuresAfterASuccess()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(accessFailedCount: 2);
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        _h.AuthRepo.Verify(r => r.ResetAccessFailedAsync("user-1", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("LoginAsync should not write a reset when there were no failures to clear")]
    public async Task LoginAsync_DoesNotResetWhenThereWereNoFailures()
    {
        IAuthCredential credential = AuthManagerHarness.Credential(accessFailedCount: 0);
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, AuthManagerHarness.User());

        await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        _h.AuthRepo.Verify(r => r.ResetAccessFailedAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("LoginAsync should reject the sign-in when the user can no longer be found")]
    public async Task LoginAsync_RejectsWhenTheUserHasVanished()
    {
        IAuthCredential credential = AuthManagerHarness.Credential();
        _h.AuthRepo.Setup(r => r.FindCredentialAsync(EMAIL, It.IsAny<CancellationToken>())).ReturnsAsync(credential);
        _h.AuthRepo.Setup(r => r.FindUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync((IAuthUser?)null);
        _h.Passwords.Setup(p => p.Verify("stored-hash", PASSWORD)).Returns(true);

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().BeNull();
        _h.RefreshTokenRepo.Verify(r => r.IssueAsync(It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("LoginAsync should return the access token from the factory with its expiry")]
    public async Task LoginAsync_ReturnsTheAccessToken()
    {
        _h.GivenValidSignIn(EMAIL, PASSWORD, AuthManagerHarness.Credential(), AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result.Should().NotBeNull();
        result!.AccessToken.Should().Be("access-token");
        result.AccessTokenExpires.Should().Be(AuthManagerHarness.Start.AddMinutes(15));
    }

    [Test, Description("LoginAsync should return a URL-safe refresh token with no padding")]
    public async Task LoginAsync_ReturnsAUrlSafeRefreshToken()
    {
        _h.GivenValidSignIn(EMAIL, PASSWORD, AuthManagerHarness.Credential(), AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        result!.RefreshToken.Should().NotBeNullOrEmpty();
        result.RefreshToken.Should().MatchRegex("^[A-Za-z0-9_-]+$", "the token travels in JSON bodies and must survive any encoding");
        result.RefreshToken.Length.Should().Be(86, "64 random bytes in base64 without padding");
    }

    [Test, Description("LoginAsync should never hand out the same refresh token twice")]
    public async Task LoginAsync_ReturnsADifferentRefreshTokenEachTime()
    {
        _h.GivenValidSignIn(EMAIL, PASSWORD, AuthManagerHarness.Credential(), AuthManagerHarness.User());

        AuthTokens? first = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);
        AuthTokens? second = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        first!.RefreshToken.Should().NotBe(second!.RefreshToken);
    }

    [Test, Description("LoginAsync should store only the hash of the refresh token, with the lifetime the token factory states")]
    public async Task LoginAsync_StoresOnlyTheHashOfTheRefreshToken()
    {
        _h.GivenValidSignIn(EMAIL, PASSWORD, AuthManagerHarness.Credential(), AuthManagerHarness.User());
        RefreshTokenRecord? stored = null;
        _h.RefreshTokenRepo.Setup(r => r.IssueAsync(It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()))
            .Callback<RefreshTokenRecord, CancellationToken>((record, _) => stored = record)
            .Returns(Task.CompletedTask);

        AuthTokens? result = await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        stored.Should().NotBeNull();
        stored!.UserId.Should().Be("user-1");
        stored.TokenHash.Should().Be(AuthManagerHarness.HashOf(result!.RefreshToken));
        stored.TokenHash.Should().NotBe(result.RefreshToken, "the raw token must never be stored");
        stored.CreatedAt.Should().Be(AuthManagerHarness.Start);
        stored.ExpiresAt.Should().Be(AuthManagerHarness.Start + AuthManagerHarness.RefreshLifetime);
        stored.RevokedAt.Should().BeNull();
        stored.ReplacedByHash.Should().BeNull();
    }

    [Test, Description("LoginAsync should ask the token factory for a token for the user it found")]
    public async Task LoginAsync_CreatesTheAccessTokenForTheFoundUser()
    {
        IAuthUser user = AuthManagerHarness.User("user-9");
        IAuthCredential credential = AuthManagerHarness.Credential("user-9");
        _h.GivenValidSignIn(EMAIL, PASSWORD, credential, user);

        await _h.Sut.LoginAsync(EMAIL, PASSWORD, Ct);

        _h.TokenFactory.Verify(f => f.CreateUserToken(user), Times.Once);
    }
}
