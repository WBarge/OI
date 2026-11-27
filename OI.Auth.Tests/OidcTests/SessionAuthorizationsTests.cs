using System.Collections.Immutable;
using System.Text.Json;
using FluentAssertions;
using Moq;
using OI.Auth.Oidc;
using OI.Auth.Tests.TestSupport;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Tests.OidcTests;

[TestFixture, Description("Tests for SessionAuthorizations: tying each UI's authorization to the browser sign-in it was made in")]
public class SessionAuthorizationsTests
{
    private static readonly DateTimeOffset Now = new(2026, 11, 20, 9, 0, 0, TimeSpan.Zero);
    private static readonly CancellationToken Ct = CancellationToken.None;

    private OidcManagers _m = null!;
    private SessionAuthorizations _sut = null!;

    [SetUp]
    public void SetUp()
    {
        _m = new OidcManagers();
        _sut = new SessionAuthorizations(_m.Applications.Object, _m.Authorizations.Object, _m.Tokens.Object, new FixedClock(Now));
        _m.GivenApplication("oi-ui", "app-1");
    }

    // ---- EnsureAsync

    [Test, Description("EnsureAsync should reuse the authorization this sign-in session already made for the client")]
    public async Task EnsureAsync_ReusesTheSessionsAuthorization()
    {
        object mine = _m.GivenAuthorization("auth-1", "sid-1");
        object other = _m.GivenAuthorization("auth-2", "sid-2");
        _m.GivenFindReturns("user-1", "app-1", other, mine);

        string id = await _sut.EnsureAsync("user-1", "oi-ui", "sid-1", ["openid"], Ct);

        id.Should().Be("auth-1");
        _m.Authorizations.Verify(m => m.CreateAsync(It.IsAny<OpenIddictAuthorizationDescriptor>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("EnsureAsync should create a new authorization, tagged with the session, when this session has none (another browser's is not reused)")]
    public async Task EnsureAsync_CreatesOneForANewSession()
    {
        object others = _m.GivenAuthorization("auth-2", "sid-2");
        _m.GivenFindReturns("user-1", "app-1", others);
        _m.GivenCreatedAuthorizationHasId("auth-9");
        OpenIddictAuthorizationDescriptor? created = null;
        _m.Authorizations.Setup(m => m.CreateAsync(It.IsAny<OpenIddictAuthorizationDescriptor>(), It.IsAny<CancellationToken>()))
            .Callback<OpenIddictAuthorizationDescriptor, CancellationToken>((d, _) => created = d)
            .Returns(new ValueTask<object>(new object()));
        _m.Authorizations.Setup(m => m.GetIdAsync(It.Is<object>(o => !ReferenceEquals(o, others)), It.IsAny<CancellationToken>()))
            .Returns(new ValueTask<string?>("auth-9"));

        string id = await _sut.EnsureAsync("user-1", "oi-ui", "sid-1", ["openid", "profile"], Ct);

        id.Should().Be("auth-9");
        created.Should().NotBeNull();
        created!.Subject.Should().Be("user-1");
        created.ApplicationId.Should().Be("app-1");
        created.Type.Should().Be(AuthorizationTypes.Permanent);
        created.Status.Should().Be(Statuses.Valid);
        created.CreationDate.Should().Be(Now);
        created.Scopes.Should().BeEquivalentTo("openid", "profile");
        created.Properties[SessionAuthorizations.SessionProperty].GetString().Should().Be("sid-1");
    }

    [Test, Description("EnsureAsync should create an authorization when the user has none at all")]
    public async Task EnsureAsync_CreatesOneWhenThereAreNone()
    {
        _m.GivenFindReturns("user-1", "app-1");
        _m.GivenCreatedAuthorizationHasId("auth-1");

        string id = await _sut.EnsureAsync("user-1", "oi-ui", "sid-1", ["openid"], Ct);

        id.Should().Be("auth-1");
        _m.Authorizations.Verify(m => m.CreateAsync(It.IsAny<OpenIddictAuthorizationDescriptor>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("EnsureAsync should fail for a client OpenIddict does not know")]
    public async Task EnsureAsync_FailsForAnUnknownClient()
    {
        _m.Applications.Setup(a => a.FindByClientIdAsync("nobody", It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>((object?)null));

        Func<Task> act = () => _sut.EnsureAsync("user-1", "nobody", "sid-1", ["openid"], Ct);

        await act.Should().ThrowAsync<InvalidOperationException>();
    }

    // ---- RevokeSessionAsync

    [Test, Description("RevokeSessionAsync should revoke only the authorizations (and their tokens) made in that session")]
    public async Task RevokeSessionAsync_RevokesOnlyThatSession()
    {
        object mine = _m.GivenAuthorization("auth-1", "sid-1");
        object other = _m.GivenAuthorization("auth-2", "sid-2");
        _m.GivenBySubject("user-1", mine, other);

        int revoked = await _sut.RevokeSessionAsync("user-1", "sid-1", Ct);

        revoked.Should().Be(1);
        _m.Tokens.Verify(m => m.RevokeByAuthorizationIdAsync("auth-1", It.IsAny<CancellationToken>()), Times.Once);
        _m.Authorizations.Verify(m => m.TryRevokeAsync(mine, It.IsAny<CancellationToken>()), Times.Once);
        _m.Tokens.Verify(m => m.RevokeByAuthorizationIdAsync("auth-2", It.IsAny<CancellationToken>()), Times.Never);
        _m.Authorizations.Verify(m => m.TryRevokeAsync(other, It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RevokeSessionAsync should revoke each authorization the session made, one per UI")]
    public async Task RevokeSessionAsync_RevokesEveryUiOfTheSession()
    {
        object oiUi = _m.GivenAuthorization("auth-1", "sid-1");
        object productAdmin = _m.GivenAuthorization("auth-3", "sid-1");
        _m.GivenBySubject("user-1", oiUi, productAdmin);

        int revoked = await _sut.RevokeSessionAsync("user-1", "sid-1", Ct);

        revoked.Should().Be(2);
    }

    [Test, Description("RevokeSessionAsync should do nothing when the session made no authorizations")]
    public async Task RevokeSessionAsync_DoesNothingForAnUnknownSession()
    {
        object other = _m.GivenAuthorization("auth-2", "sid-2");
        _m.GivenBySubject("user-1", other);

        int revoked = await _sut.RevokeSessionAsync("user-1", "sid-unknown", Ct);

        revoked.Should().Be(0);
        _m.Authorizations.Verify(m => m.TryRevokeAsync(It.IsAny<object>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("RevokeSessionAsync should skip an authorization that carries no session tag")]
    public async Task RevokeSessionAsync_SkipsUntaggedAuthorizations()
    {
        object untagged = new();
        _m.Authorizations.Setup(m => m.GetPropertiesAsync(untagged, It.IsAny<CancellationToken>()))
            .Returns(new ValueTask<ImmutableDictionary<string, JsonElement>>(ImmutableDictionary<string, JsonElement>.Empty));
        _m.GivenBySubject("user-1", untagged);

        int revoked = await _sut.RevokeSessionAsync("user-1", "sid-1", Ct);

        revoked.Should().Be(0);
    }

    // ---- RevokeAllAsync

    [Test, Description("RevokeAllAsync should revoke every token and authorization of the user")]
    public async Task RevokeAllAsync_RevokesEverythingOfTheUser()
    {
        await _sut.RevokeAllAsync("user-1", Ct);

        _m.Tokens.Verify(m => m.RevokeBySubjectAsync("user-1", It.IsAny<CancellationToken>()), Times.Once);
        _m.Authorizations.Verify(m => m.RevokeBySubjectAsync("user-1", It.IsAny<CancellationToken>()), Times.Once);
    }
}
