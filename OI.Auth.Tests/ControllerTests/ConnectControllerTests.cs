using System.Reflection;
using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using OI.Auth.Controllers;
using OI.Auth.Oidc;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;
using OI.Glue.Managers;
using OI.Glue.Models;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Tests.ControllerTests;

[TestFixture, Description("Tests for ConnectController: who gets a code, who gets tokens, and what signing out does")]
public class ConnectControllerTests
{
    private static readonly DateTimeOffset Now = new(2026, 11, 20, 9, 0, 0, TimeSpan.Zero);
    private static readonly CancellationToken Ct = CancellationToken.None;
    private const string OpenIddictScheme = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme;

    private Mock<IAuthManager> _manager = null!;
    private OidcManagers _oidc = null!;
    private Mock<IAuthenticationService> _auth = null!;
    private DefaultHttpContext _http = null!;

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IAuthManager>();
        _oidc = new OidcManagers();
        _auth = new Mock<IAuthenticationService>();
        ServiceCollection services = new();
        services.AddSingleton(_auth.Object);
        _http = new DefaultHttpContext { RequestServices = services.BuildServiceProvider() };
        _oidc.GivenApplication("oi-ui", "app-1");
    }

    private ConnectController Sut(string environment = "Development", bool passwordGrantEnabled = false)
    {
        IConfiguration config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Clients:0:ClientId"] = "oi-ui",
            ["Clients:1:ClientId"] = "postman-dev",
            ["Clients:1:AllowPasswordGrant"] = "true",
        }).Build();
        ClientRegistry registry = new(config);
        FakeHostEnvironment env = new(environment);
        PasswordGrantGate gate = new(env, Options.Create(new OidcOptions { PasswordGrantEnabled = passwordGrantEnabled }), registry);
        SessionAuthorizations sessions = new(_oidc.Applications.Object, _oidc.Authorizations.Object, _oidc.Tokens.Object, new FixedClock(Now));
        return new ConnectController(_manager.Object, sessions, gate, Options.Create(new JwtOptions { Issuer = "https://auth.test", Audience = "oi" }), NullLogger<ConnectController>.Instance)
        {
            ControllerContext = new ControllerContext { HttpContext = _http },
        };
    }

    private void GivenRequest(OpenIddictRequest request) =>
        _http.Features.Set(new OpenIddictServerAspNetCoreFeature { Transaction = new OpenIddictServerTransaction { Request = request } });

    private void GivenCookieSession(string? userId, string sessionId = "sid-1")
    {
        AuthenticateResult result = userId is null
            ? AuthenticateResult.NoResult()
            : AuthenticateResult.Success(new AuthenticationTicket(SessionCookie.CreatePrincipal(userId, sessionId), SessionCookie.Scheme));
        _auth.Setup(a => a.AuthenticateAsync(_http, SessionCookie.Scheme)).ReturnsAsync(result);
    }

    private void GivenStoredPrincipal(ClaimsPrincipal? principal)
    {
        AuthenticateResult result = principal is null
            ? AuthenticateResult.NoResult()
            : AuthenticateResult.Success(new AuthenticationTicket(principal, OpenIddictScheme));
        _auth.Setup(a => a.AuthenticateAsync(_http, OpenIddictScheme)).ReturnsAsync(result);
    }

    private void GivenActiveUser(IAuthUser user) =>
        _manager.Setup(m => m.FindActiveUserAsync(user.Id, It.IsAny<CancellationToken>())).ReturnsAsync(user);

    private static string? Error(IActionResult result) => result switch
    {
        ForbidResult f => f.Properties!.Items[OpenIddictServerAspNetCoreConstants.Properties.Error],
        _ => null,
    };

    // ================= /connect/authorize

    [Test, Description("Authorize should send a signed-out browser to the login page and bring it back to the same request")]
    public async Task Authorize_SendsASignedOutBrowserToTheLoginPage()
    {
        GivenRequest(new OpenIddictRequest { ClientId = "oi-ui", Scope = "openid" });
        GivenCookieSession(null);
        ConnectController sut = Sut();
        _http.Request.Path = "/connect/authorize";
        _http.Request.QueryString = new QueryString("?client_id=oi-ui&state=abc");

        IActionResult result = await sut.Authorize(Ct);

        ChallengeResult challenge = result.Should().BeOfType<ChallengeResult>().Subject;
        challenge.AuthenticationSchemes.Should().Equal(SessionCookie.Scheme);
        challenge.Properties!.RedirectUri.Should().StartWith("/connect/authorize?").And.Contain("client_id=oi-ui").And.Contain("state=abc");
    }

    [Test, Description("Authorize should answer prompt=none from a signed-out browser with login_required, not a login page")]
    public async Task Authorize_PromptNoneNeverShowsTheLoginPage()
    {
        GivenRequest(new OpenIddictRequest { ClientId = "oi-ui", Scope = "openid", Prompt = "none" });
        GivenCookieSession(null);

        IActionResult result = await Sut().Authorize(Ct);

        Error(result).Should().Be(Errors.LoginRequired);
        result.Should().BeOfType<ForbidResult>().Which.AuthenticationSchemes.Should().Equal(OpenIddictScheme);
    }

    [Test, Description("Authorize should return a code at once, with no password, when the OI.Auth session is valid (single sign-on)")]
    public async Task Authorize_SignsInStraightAwayWithAValidSession()
    {
        GivenRequest(new OpenIddictRequest { ClientId = "oi-ui", Scope = "openid profile email offline_access" });
        GivenCookieSession("user-1", "sid-1");
        GivenActiveUser(TestUsers.Make("user-1", roles: ["Admin"], claims: [("group", "sales")]));
        _oidc.GivenFindReturns("user-1", "app-1");
        _oidc.GivenCreatedAuthorizationHasId("auth-1");

        IActionResult result = await Sut().Authorize(Ct);

        SignInResult signIn = result.Should().BeOfType<SignInResult>().Subject;
        signIn.AuthenticationScheme.Should().Be(OpenIddictScheme);
        ClaimsPrincipal principal = signIn.Principal;
        principal.GetClaim(Claims.Subject).Should().Be("user-1");
        principal.GetClaims(Claims.Role).ToArray().Should().Equal("Admin");
        principal.GetClaim(UserIdentityBuilder.TokenUseClaim).Should().Be("user");
        principal.GetResources().ToArray().Should().Equal("oi");
        principal.GetScopes().ToArray().Should().BeEquivalentTo("openid", "profile", "email", "offline_access");
        principal.GetAuthorizationId().Should().Be("auth-1");
    }

    [Test, Description("Authorize should tie the authorization to the browser's sign-in session")]
    public async Task Authorize_TiesTheAuthorizationToTheSession()
    {
        GivenRequest(new OpenIddictRequest { ClientId = "oi-ui", Scope = "openid" });
        GivenCookieSession("user-1", "sid-77");
        GivenActiveUser(TestUsers.Make("user-1"));
        _oidc.GivenFindReturns("user-1", "app-1");
        OpenIddictAuthorizationDescriptor? created = null;
        _oidc.Authorizations.Setup(m => m.CreateAsync(It.IsAny<OpenIddictAuthorizationDescriptor>(), It.IsAny<CancellationToken>()))
            .Callback<OpenIddictAuthorizationDescriptor, CancellationToken>((d, _) => created = d)
            .Returns(new ValueTask<object>(new object()));
        _oidc.Authorizations.Setup(m => m.GetIdAsync(It.IsAny<object>(), It.IsAny<CancellationToken>())).Returns(new ValueTask<string?>("auth-1"));

        await Sut().Authorize(Ct);

        created!.Properties[SessionAuthorizations.SessionProperty].GetString().Should().Be("sid-77");
    }

    [Test, Description("Authorize should refuse an old cookie whose user is gone or locked out: it clears the cookie and asks for a password")]
    public async Task Authorize_RechecksTheUserEveryTime()
    {
        GivenRequest(new OpenIddictRequest { ClientId = "oi-ui", Scope = "openid" });
        GivenCookieSession("user-1");
        _manager.Setup(m => m.FindActiveUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync((IAuthUser?)null);
        _http.Request.Path = "/connect/authorize";

        IActionResult result = await Sut().Authorize(Ct);

        result.Should().BeOfType<ChallengeResult>();
        _auth.Verify(a => a.SignOutAsync(_http, SessionCookie.Scheme, It.IsAny<AuthenticationProperties?>()), Times.Once);
        _oidc.Authorizations.Verify(m => m.CreateAsync(It.IsAny<OpenIddictAuthorizationDescriptor>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("Authorize should fail clearly when OpenIddict did not supply the request")]
    public async Task Authorize_FailsWithoutAnOpenIddictRequest()
    {
        GivenCookieSession(null);

        Func<Task> act = () => Sut().Authorize(Ct);

        await act.Should().ThrowAsync<InvalidOperationException>();
    }

    // ================= /connect/token : code and refresh

    private static ClaimsPrincipal StoredPrincipal(string userId = "user-1", string authorizationId = "auth-1")
    {
        ClaimsIdentity identity = new("test", Claims.Name, Claims.Role);
        identity.SetClaim(Claims.Subject, userId);
        identity.SetClaim(Claims.Private.AuthorizationId, authorizationId);
        identity.SetScopes("openid", "offline_access");
        return new ClaimsPrincipal(identity);
    }

    [TestCase(GrantTypes.AuthorizationCode)]
    [TestCase(GrantTypes.RefreshToken)]
    [Description("Token should issue tokens for a code or refresh token, rebuilt from the user's current record and kept on the same authorization")]
    public async Task Token_RenewsFromTheCurrentUserRecord(string grantType)
    {
        GivenRequest(new OpenIddictRequest { GrantType = grantType, ClientId = "oi-ui" });
        GivenStoredPrincipal(StoredPrincipal());
        GivenActiveUser(TestUsers.Make("user-1", roles: ["User"], claims: [("group", "ops")]));

        IActionResult result = await Sut().Token(Ct);

        SignInResult signIn = result.Should().BeOfType<SignInResult>().Subject;
        signIn.AuthenticationScheme.Should().Be(OpenIddictScheme);
        signIn.Principal.GetClaims(Claims.Role).ToArray().Should().Equal("User");
        signIn.Principal.GetClaim("group").Should().Be("ops");
        signIn.Principal.GetAuthorizationId().Should().Be("auth-1");
        signIn.Principal.GetResources().ToArray().Should().Equal("oi");
    }

    [TestCase(GrantTypes.AuthorizationCode)]
    [TestCase(GrantTypes.RefreshToken)]
    [Description("Token should refuse a renewal when the user is no longer allowed to sign in")]
    public async Task Token_RefusesAUserWhoIsNoLongerActive(string grantType)
    {
        GivenRequest(new OpenIddictRequest { GrantType = grantType, ClientId = "oi-ui" });
        GivenStoredPrincipal(StoredPrincipal());
        _manager.Setup(m => m.FindActiveUserAsync("user-1", It.IsAny<CancellationToken>())).ReturnsAsync((IAuthUser?)null);

        IActionResult result = await Sut().Token(Ct);

        Error(result).Should().Be(Errors.InvalidGrant);
    }

    [Test, Description("Token should refuse when there is no stored principal to renew")]
    public async Task Token_RefusesWhenThereIsNothingToRenew()
    {
        GivenRequest(new OpenIddictRequest { GrantType = GrantTypes.RefreshToken, ClientId = "oi-ui" });
        GivenStoredPrincipal(null);

        IActionResult result = await Sut().Token(Ct);

        Error(result).Should().Be(Errors.InvalidGrant);
    }

    [TestCase(GrantTypes.ClientCredentials)]
    [TestCase(GrantTypes.DeviceCode)]
    [TestCase("urn:something:else")]
    [Description("Token should refuse any other grant type")]
    public async Task Token_RefusesOtherGrantTypes(string grantType)
    {
        GivenRequest(new OpenIddictRequest { GrantType = grantType, ClientId = "oi-ui" });

        IActionResult result = await Sut().Token(Ct);

        Error(result).Should().Be(Errors.UnsupportedGrantType);
    }

    // ================= /connect/token : the Development-only password grant

    private OpenIddictRequest PasswordRequest(string clientId = "postman-dev") => new()
    {
        GrantType = GrantTypes.Password,
        ClientId = clientId,
        Username = "pat@example.com",
        Password = "correct horse",
        Scope = "openid offline_access",
    };

    [Test, Description("The password grant should give tokens in Development, with the setting on, to the marked client")]
    public async Task PasswordGrant_WorksWhenAllThreeLocksAreOpen()
    {
        GivenRequest(PasswordRequest());
        _manager.Setup(m => m.ValidateCredentialsAsync("pat@example.com", "correct horse", It.IsAny<CancellationToken>()))
            .ReturnsAsync(TestUsers.Make("user-1", roles: ["Admin"]));
        _oidc.GivenApplication("postman-dev", "app-2");
        _oidc.GivenFindReturns("user-1", "app-2");
        _oidc.GivenCreatedAuthorizationHasId("auth-5");

        IActionResult result = await Sut("Development", passwordGrantEnabled: true).Token(Ct);

        SignInResult signIn = result.Should().BeOfType<SignInResult>().Subject;
        signIn.Principal.GetClaims(Claims.Role).ToArray().Should().Equal("Admin");
        signIn.Principal.GetClaim(UserIdentityBuilder.TokenUseClaim).Should().Be("user");
        signIn.Principal.GetResources().ToArray().Should().Equal("oi");
        signIn.Principal.GetAuthorizationId().Should().Be("auth-5");
    }

    [TestCase("Production", true, "postman-dev")]
    [TestCase("Staging", true, "postman-dev")]
    [TestCase("Development", false, "postman-dev")]
    [TestCase("Development", true, "oi-ui")]
    [Description("The password grant should be refused, and no password even checked, unless all three locks are open")]
    public async Task PasswordGrant_IsRefusedWhenAnyLockIsClosed(string environment, bool enabled, string clientId)
    {
        GivenRequest(PasswordRequest(clientId));

        IActionResult result = await Sut(environment, enabled).Token(Ct);

        Error(result).Should().Be(Errors.UnsupportedGrantType);
        _manager.Verify(m => m.ValidateCredentialsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("The password grant should refuse bad credentials with invalid_grant")]
    public async Task PasswordGrant_RefusesBadCredentials()
    {
        GivenRequest(PasswordRequest());
        _manager.Setup(m => m.ValidateCredentialsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((IAuthUser?)null);

        IActionResult result = await Sut("Development", true).Token(Ct);

        Error(result).Should().Be(Errors.InvalidGrant);
    }

    // ================= /connect/logout

    [Test, Description("Logout should revoke this browser's tokens, clear the cookie and send the browser on through OpenIddict")]
    public async Task Logout_EndsTheSession()
    {
        GivenCookieSession("user-1", "sid-1");
        object mine = _oidc.GivenAuthorization("auth-1", "sid-1");
        _oidc.GivenBySubject("user-1", mine);

        IActionResult result = await Sut().Logout(Ct);

        _oidc.Tokens.Verify(m => m.RevokeByAuthorizationIdAsync("auth-1", It.IsAny<CancellationToken>()), Times.Once);
        _auth.Verify(a => a.SignOutAsync(_http, SessionCookie.Scheme, It.IsAny<AuthenticationProperties?>()), Times.Once);
        SignOutResult signOut = result.Should().BeOfType<SignOutResult>().Subject;
        signOut.AuthenticationSchemes.Should().Equal(OpenIddictScheme);
        signOut.Properties!.RedirectUri.Should().Be("/account/signed-out");
    }

    [Test, Description("Logout should leave the same person's other browsers signed in")]
    public async Task Logout_LeavesOtherSessionsAlone()
    {
        GivenCookieSession("user-1", "sid-1");
        object mine = _oidc.GivenAuthorization("auth-1", "sid-1");
        object phone = _oidc.GivenAuthorization("auth-2", "sid-phone");
        _oidc.GivenBySubject("user-1", mine, phone);

        await Sut().Logout(Ct);

        _oidc.Tokens.Verify(m => m.RevokeByAuthorizationIdAsync("auth-2", It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("Logout should still send the browser on when there is no OI.Auth session to end")]
    public async Task Logout_WorksWithoutASession()
    {
        GivenCookieSession(null);

        IActionResult result = await Sut().Logout(Ct);

        result.Should().BeOfType<SignOutResult>();
        _oidc.Tokens.Verify(m => m.RevokeByAuthorizationIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
        _auth.Verify(a => a.SignOutAsync(It.IsAny<HttpContext>(), It.IsAny<string?>(), It.IsAny<AuthenticationProperties?>()), Times.Never);
    }

    // ================= attributes

    [Test, Description("The controller should be reachable without signing in")]
    public void Controller_IsAnonymous()
    {
        typeof(ConnectController).GetCustomAttribute<AllowAnonymousAttribute>().Should().NotBeNull();
    }

    [TestCase(nameof(ConnectController.Authorize), "~/connect/authorize", "login-page", "GET", "POST")]
    [TestCase(nameof(ConnectController.Token), "~/connect/token", "token", "POST")]
    [TestCase(nameof(ConnectController.Logout), "~/connect/logout", "login-page", "GET", "POST")]
    [Description("Each endpoint should be on its own address, rate limited, and take only the HTTP methods OpenID Connect uses")]
    public void Endpoint_HasItsRouteMethodsAndRateLimit(string action, string template, string policy, params string[] methods)
    {
        MethodInfo method = typeof(ConnectController).GetMethod(action)!;

        method.GetCustomAttributes<HttpMethodAttribute>().SelectMany(a => a.HttpMethods).Should().BeEquivalentTo(methods);
        method.GetCustomAttributes<HttpMethodAttribute>().Select(a => a.Template).Distinct().Should().Equal(template);
        method.GetCustomAttribute<EnableRateLimitingAttribute>()!.PolicyName.Should().Be(policy);
    }
}
