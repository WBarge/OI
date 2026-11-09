using System.Reflection;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Auth.Controllers;
using OI.Auth.Models.Requests;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Tests.ControllerTests;

[TestFixture, Description("Tests for AuthController: sign-in, refresh, sign-out and service tokens")]
public class AuthControllerTests
{
    private Mock<IAuthManager> _manager = null!;
    private ServiceClientRegistry _registry = null!;
    private AccessTokenFactory _factory = null!;
    private AuthController _sut = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private static readonly AuthTokens Tokens = new("access", new DateTimeOffset(2026, 11, 7, 12, 15, 0, TimeSpan.Zero), "refresh");

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IAuthManager>();
        _registry = new ServiceClientRegistry(new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ServiceClients:0:ClientId"] = "oi-reporting",
            ["ServiceClients:0:Secret"] = "reporting-secret-value",
            ["ServiceClients:0:Scopes:0"] = "hub:publish",
        }).Build());
        _factory = AuthTestSupport.Factory();
        _sut = new AuthController(_manager.Object, _registry, _factory, NullLogger<AuthController>.Instance);
    }

    // ---- constructor

    [Test, Description("Constructor should throw when authManager is null")]
    public void Constructor_ThrowsWhenManagerIsNull()
    {
        Action act = () => _ = new AuthController(null!, _registry, _factory, NullLogger<AuthController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("authManager");
    }

    [Test, Description("Constructor should throw when serviceClients is null")]
    public void Constructor_ThrowsWhenServiceClientsIsNull()
    {
        Action act = () => _ = new AuthController(_manager.Object, null!, _factory, NullLogger<AuthController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("serviceClients");
    }

    [Test, Description("Constructor should throw when tokenFactory is null")]
    public void Constructor_ThrowsWhenTokenFactoryIsNull()
    {
        Action act = () => _ = new AuthController(_manager.Object, _registry, null!, NullLogger<AuthController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("tokenFactory");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new AuthController(_manager.Object, _registry, _factory, null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    // ---- login

    [Test, Description("Login should return the tokens the manager gives")]
    public async Task Login_ReturnsTheTokens()
    {
        _manager.Setup(m => m.LoginAsync("pat@example.com", "pw", It.IsAny<CancellationToken>())).ReturnsAsync(Tokens);

        IActionResult result = await _sut.Login(new LoginRequest { Email = "pat@example.com", Password = "pw" }, Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(Tokens);
    }

    [Test, Description("Login should return 401 with no explanation when the manager rejects the sign-in")]
    public async Task Login_ReturnsUnauthorizedWhenRejected()
    {
        _manager.Setup(m => m.LoginAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>())).ReturnsAsync((AuthTokens?)null);

        IActionResult result = await _sut.Login(new LoginRequest { Email = "pat@example.com", Password = "wrong" }, Ct);

        result.Should().BeOfType<UnauthorizedResult>("the response must never say why a sign-in failed");
    }

    // ---- refresh

    [Test, Description("Refresh should return the new tokens the manager gives")]
    public async Task Refresh_ReturnsTheTokens()
    {
        _manager.Setup(m => m.RefreshAsync("old-refresh", It.IsAny<CancellationToken>())).ReturnsAsync(Tokens);

        IActionResult result = await _sut.Refresh(new RefreshRequest { RefreshToken = "old-refresh" }, Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(Tokens);
    }

    [Test, Description("Refresh should return 401 when the manager does not accept the token")]
    public async Task Refresh_ReturnsUnauthorizedWhenRejected()
    {
        _manager.Setup(m => m.RefreshAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())).ReturnsAsync((AuthTokens?)null);

        IActionResult result = await _sut.Refresh(new RefreshRequest { RefreshToken = "bad" }, Ct);

        result.Should().BeOfType<UnauthorizedResult>();
    }

    // ---- logout

    [Test, Description("Logout should revoke the refresh token and return 204")]
    public async Task Logout_RevokesTheTokenAndReturnsNoContent()
    {
        IActionResult result = await _sut.Logout(new RefreshRequest { RefreshToken = "old-refresh" }, Ct);

        result.Should().BeOfType<NoContentResult>();
        _manager.Verify(m => m.LogoutAsync("old-refresh", It.IsAny<CancellationToken>()), Times.Once);
    }

    // ---- service tokens

    [Test, Description("ServiceToken should return a signed token and its expiry for a valid client")]
    public void ServiceToken_ReturnsATokenForAValidClient()
    {
        IActionResult result = _sut.ServiceToken(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = "reporting-secret-value" });

        object? value = result.Should().BeOfType<OkObjectResult>().Subject.Value;
        using JsonDocument json = JsonDocument.Parse(JsonSerializer.Serialize(value));
        string token = json.RootElement.GetProperty("accessToken").GetString()!;
        token.Split('.').Should().HaveCount(3, "it is a JWT");
        json.RootElement.GetProperty("accessTokenExpires").GetDateTimeOffset().Should().Be(AuthTestSupport.Now.AddMinutes(10));
    }

    [Test, Description("ServiceToken should issue a token that names the client and its scopes")]
    public void ServiceToken_IssuesATokenForTheClient()
    {
        IActionResult result = _sut.ServiceToken(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = "reporting-secret-value" });

        using JsonDocument json = JsonDocument.Parse(JsonSerializer.Serialize(result.Should().BeOfType<OkObjectResult>().Subject.Value));
        Microsoft.IdentityModel.JsonWebTokens.JsonWebToken jwt = new Microsoft.IdentityModel.JsonWebTokens.JsonWebTokenHandler()
            .ReadJsonWebToken(json.RootElement.GetProperty("accessToken").GetString()!);
        jwt.Claims.Single(c => c.Type == "client_id").Value.Should().Be("oi-reporting");
        jwt.Claims.Single(c => c.Type == "token_use").Value.Should().Be("service");
        jwt.Claims.Where(c => c.Type == "scope").Select(c => c.Value).Should().Equal("hub:publish");
    }

    [Test, Description("ServiceToken should return 401 for a wrong secret")]
    public void ServiceToken_RejectsAWrongSecret()
    {
        IActionResult result = _sut.ServiceToken(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = "nope" });

        result.Should().BeOfType<UnauthorizedResult>();
    }

    [Test, Description("ServiceToken should return 401 for an unknown client")]
    public void ServiceToken_RejectsAnUnknownClient()
    {
        IActionResult result = _sut.ServiceToken(new ServiceTokenRequest { ClientId = "someone-else", ClientSecret = "reporting-secret-value" });

        result.Should().BeOfType<UnauthorizedResult>();
    }

    [Test, Description("ServiceToken should log a warning, without the secret, when it rejects a client")]
    public void ServiceToken_LogsARejection()
    {
        Mock<ILogger<AuthController>> logger = new();
        AuthController sut = new(_manager.Object, _registry, _factory, logger.Object);

        sut.ServiceToken(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = "super-secret-guess" });

        logger.Verify(l => l.Log(LogLevel.Warning, It.IsAny<EventId>(),
            It.Is<It.IsAnyType>((state, _) => !state.ToString()!.Contains("super-secret-guess")),
            It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }

    // ---- protection

    [Test, Description("The controller should allow anonymous callers, because nobody is signed in yet when they sign in")]
    public void Controller_AllowsAnonymousCallers()
    {
        typeof(AuthController).GetCustomAttribute<AllowAnonymousAttribute>().Should().NotBeNull();
    }

    [TestCase(nameof(AuthController.Login))]
    [TestCase(nameof(AuthController.Refresh))]
    [TestCase(nameof(AuthController.ServiceToken))]
    [Description("Each endpoint that takes a password, token or secret should be rate limited with the login policy")]
    public void Endpoint_IsRateLimited(string methodName)
    {
        EnableRateLimitingAttribute? attribute = typeof(AuthController).GetMethod(methodName)!.GetCustomAttribute<EnableRateLimitingAttribute>();

        attribute.Should().NotBeNull($"{methodName} can be hammered to guess credentials");
        attribute!.PolicyName.Should().Be("login");
    }

    [TestCase(nameof(AuthController.Login), "login")]
    [TestCase(nameof(AuthController.Refresh), "refresh")]
    [TestCase(nameof(AuthController.Logout), "logout")]
    [TestCase(nameof(AuthController.ServiceToken), "service-token")]
    [Description("Each endpoint should be a POST on its own route")]
    public void Endpoint_IsAPostOnItsRoute(string methodName, string template)
    {
        HttpPostAttribute? attribute = typeof(AuthController).GetMethod(methodName)!.GetCustomAttribute<HttpPostAttribute>();

        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be(template);
    }

    [Test, Description("The controller should be routed under api/auth")]
    public void Controller_IsRoutedUnderApiAuth()
    {
        typeof(AuthController).GetCustomAttribute<RouteAttribute>()!.Template.Should().Be("api/[controller]");
        typeof(AuthController).Name.Should().Be("AuthController");
    }
}
