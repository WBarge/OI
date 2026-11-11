using FluentAssertions;
using Moq;
using OI.Glue.Models;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for AuthManager.RefreshAsync and LogoutAsync: rotation, expiry, reuse detection and sign-out")]
public class AuthManagerRefreshTests
{
    private const string PRESENTED = "presented-refresh-token";

    private AuthManagerHarness _h = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;
    private static string PresentedHash => AuthManagerHarness.HashOf(PRESENTED);

    [SetUp]
    public void SetUp() => _h = new AuthManagerHarness();

    private static RefreshTokenRecord Stored(DateTimeOffset? revokedAt = null, DateTimeOffset? expiresAt = null) =>
        new("user-1", PresentedHash, AuthManagerHarness.Start.AddDays(-1),
            expiresAt ?? AuthManagerHarness.Start.AddDays(6), revokedAt);

    private void GivenStored(RefreshTokenRecord? record) =>
        _h.RefreshTokenRepo.Setup(r => r.FindAsync(PresentedHash, It.IsAny<CancellationToken>())).ReturnsAsync(record);

    private void GivenUser(IAuthUser? user) =>
        _h.AuthRepo.Setup(r => r.FindUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync(user);

    // ---- RefreshAsync: rejected tokens

    [Test, Description("RefreshAsync should look the token up by its hash, never by the raw value")]
    public async Task RefreshAsync_LooksUpTheHash()
    {
        GivenStored(null);

        await _h.Sut.RefreshAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.FindAsync(PresentedHash, It.IsAny<CancellationToken>()), Times.Once);
        _h.RefreshTokenRepo.Verify(r => r.FindAsync(PRESENTED, It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RefreshAsync should reject a token it has never issued")]
    public async Task RefreshAsync_RejectsAnUnknownToken()
    {
        GivenStored(null);

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull();
        _h.RefreshTokenRepo.Verify(r => r.RotateAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
        _h.RefreshTokenRepo.Verify(r => r.RevokeAllAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RefreshAsync should reject an expired token")]
    public async Task RefreshAsync_RejectsAnExpiredToken()
    {
        GivenStored(Stored(expiresAt: AuthManagerHarness.Start.AddSeconds(-1)));
        GivenUser(AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull();
        _h.RefreshTokenRepo.Verify(r => r.RotateAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RefreshAsync should reject a token that expires exactly now")]
    public async Task RefreshAsync_RejectsATokenExpiringExactlyNow()
    {
        GivenStored(Stored(expiresAt: AuthManagerHarness.Start));
        GivenUser(AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull("a token is only good while its expiry is later than now");
    }

    [Test, Description("RefreshAsync should reject a token whose user no longer exists")]
    public async Task RefreshAsync_RejectsAMissingUser()
    {
        GivenStored(Stored());
        GivenUser(null);

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull();
        _h.RefreshTokenRepo.Verify(r => r.RotateAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RefreshAsync should reject a token whose user is locked out or disabled")]
    public async Task RefreshAsync_RejectsALockedOutUser()
    {
        GivenStored(Stored());
        GivenUser(AuthManagerHarness.User(lockoutEnd: AuthManagerHarness.Start.AddMinutes(5)));

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull("a disabled user must not be able to keep a session alive");
        _h.RefreshTokenRepo.Verify(r => r.RotateAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RefreshAsync should accept a user whose lockout has ended")]
    public async Task RefreshAsync_AcceptsAUserWhoseLockoutHasEnded()
    {
        GivenStored(Stored());
        GivenUser(AuthManagerHarness.User(lockoutEnd: AuthManagerHarness.Start.AddMinutes(-5)));

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().NotBeNull();
    }

    // ---- RefreshAsync: reuse detection

    [Test, Description("RefreshAsync should end every session for the user when a long-revoked token is presented again")]
    public async Task RefreshAsync_RevokesEverySessionOnReuse()
    {
        GivenStored(Stored(revokedAt: AuthManagerHarness.Start.AddSeconds(-11)));

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull();
        _h.RefreshTokenRepo.Verify(r => r.RevokeAllAsync("user-1", AuthManagerHarness.Start, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("RefreshAsync should only reject, not end every session, when a token is reused within the grace window")]
    public async Task RefreshAsync_ToleratesARaceWithinTheGraceWindow()
    {
        GivenStored(Stored(revokedAt: AuthManagerHarness.Start.AddSeconds(-5)));

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().BeNull();
        _h.RefreshTokenRepo.Verify(r => r.RevokeAllAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never,
            "two browser tabs refreshing at once look exactly like this and are not theft");
    }

    [Test, Description("RefreshAsync should treat a reuse exactly at the edge of the grace window as still within it")]
    public async Task RefreshAsync_TreatsExactlyTenSecondsAsWithinTheGraceWindow()
    {
        GivenStored(Stored(revokedAt: AuthManagerHarness.Start.AddSeconds(-10)));

        await _h.Sut.RefreshAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.RevokeAllAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RefreshAsync should never issue new tokens for a token that was already revoked")]
    public async Task RefreshAsync_NeverRotatesARevokedToken()
    {
        GivenStored(Stored(revokedAt: AuthManagerHarness.Start.AddMinutes(-5)));
        GivenUser(AuthManagerHarness.User());

        await _h.Sut.RefreshAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.RotateAsync(It.IsAny<string>(), It.IsAny<DateTimeOffset>(), It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    // ---- RefreshAsync: success

    [Test, Description("RefreshAsync should return a new access token and a new refresh token")]
    public async Task RefreshAsync_ReturnsNewTokens()
    {
        GivenStored(Stored());
        GivenUser(AuthManagerHarness.User());

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        result.Should().NotBeNull();
        result!.AccessToken.Should().Be("access-token");
        result.RefreshToken.Should().NotBe(PRESENTED, "a refresh token is single use");
        result.RefreshToken.Should().MatchRegex("^[A-Za-z0-9_-]{86}$");
    }

    [Test, Description("RefreshAsync should revoke the old token and store the replacement in one rotation")]
    public async Task RefreshAsync_RotatesTheToken()
    {
        GivenStored(Stored());
        GivenUser(AuthManagerHarness.User());
        RefreshTokenRecord? replacement = null;
        _h.RefreshTokenRepo
            .Setup(r => r.RotateAsync(PresentedHash, AuthManagerHarness.Start, It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()))
            .Callback<string, DateTimeOffset, RefreshTokenRecord, CancellationToken>((_, _, next, _) => replacement = next)
            .Returns(Task.CompletedTask);

        AuthTokens? result = await _h.Sut.RefreshAsync(PRESENTED, Ct);

        replacement.Should().NotBeNull("the old token is revoked and its replacement saved together");
        replacement!.UserId.Should().Be("user-1");
        replacement.TokenHash.Should().Be(AuthManagerHarness.HashOf(result!.RefreshToken));
        replacement.TokenHash.Should().NotBe(PresentedHash);
        replacement.CreatedAt.Should().Be(AuthManagerHarness.Start);
        replacement.ExpiresAt.Should().Be(AuthManagerHarness.Start + AuthManagerHarness.RefreshLifetime);
    }

    [Test, Description("RefreshAsync should not use the single-token issue call, which would leave the old token usable")]
    public async Task RefreshAsync_DoesNotIssueSeparately()
    {
        GivenStored(Stored());
        GivenUser(AuthManagerHarness.User());

        await _h.Sut.RefreshAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.IssueAsync(It.IsAny<RefreshTokenRecord>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    // ---- LogoutAsync

    [Test, Description("LogoutAsync should revoke the token by its hash, as of now")]
    public async Task LogoutAsync_RevokesTheTokenByHash()
    {
        await _h.Sut.LogoutAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.RevokeAsync(PresentedHash, AuthManagerHarness.Start, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("LogoutAsync should use the current time from the clock")]
    public async Task LogoutAsync_UsesTheClock()
    {
        _h.Clock.Now = AuthManagerHarness.Start.AddHours(3);

        await _h.Sut.LogoutAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.RevokeAsync(PresentedHash, AuthManagerHarness.Start.AddHours(3), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("LogoutAsync should not need to know whether the token exists")]
    public async Task LogoutAsync_DoesNotLookTheTokenUp()
    {
        await _h.Sut.LogoutAsync(PRESENTED, Ct);

        _h.RefreshTokenRepo.Verify(r => r.FindAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }
}
