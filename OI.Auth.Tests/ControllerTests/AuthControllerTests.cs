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

namespace OI.Auth.Tests.ControllerTests;

[TestFixture, Description("Tests for AuthController: service tokens (people sign in through ConnectController)")]
public class AuthControllerTests
{
    private ServiceClientRegistry _registry = null!;
    private AccessTokenFactory _factory = null!;
    private AuthController _sut = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _registry = new ServiceClientRegistry(new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ServiceClients:0:ClientId"] = "oi-reporting",
            ["ServiceClients:0:Secret"] = "reporting-secret-value",
            ["ServiceClients:0:Scopes:0"] = "hub:publish",
        }).Build());
        _factory = AuthTestSupport.Factory();
        _sut = new AuthController(_registry, _factory, NullLogger<AuthController>.Instance);
    }

    // ---- constructor

    [Test, Description("Constructor should throw when serviceClients is null")]
    public void Constructor_ThrowsWhenServiceClientsIsNull()
    {
        Action act = () => _ = new AuthController(null!, _factory, NullLogger<AuthController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("serviceClients");
    }

    [Test, Description("Constructor should throw when tokenFactory is null")]
    public void Constructor_ThrowsWhenTokenFactoryIsNull()
    {
        Action act = () => _ = new AuthController(_registry, null!, NullLogger<AuthController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("tokenFactory");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new AuthController(_registry, _factory, null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
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
        AuthController sut = new(_registry, _factory, logger.Object);

        sut.ServiceToken(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = "super-secret-guess" });

        logger.Verify(l => l.Log(LogLevel.Warning, It.IsAny<EventId>(),
            It.Is<It.IsAnyType>((state, _) => !state!.ToString()!.Contains("super-secret-guess")),
            It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }

    // ---- protection

    [Test, Description("The controller should allow anonymous callers, because nobody is signed in yet when they sign in")]
    public void Controller_AllowsAnonymousCallers()
    {
        typeof(AuthController).GetCustomAttribute<AllowAnonymousAttribute>().Should().NotBeNull();
    }

    [Test, Description("The service-token endpoint, which takes a secret, should be rate limited with the login policy")]
    public void ServiceToken_IsRateLimited()
    {
        EnableRateLimitingAttribute? attribute = typeof(AuthController).GetMethod(nameof(AuthController.ServiceToken))!.GetCustomAttribute<EnableRateLimitingAttribute>();

        attribute.Should().NotBeNull("the endpoint can be hammered to guess secrets");
        attribute!.PolicyName.Should().Be("login");
    }

    [Test, Description("The service-token endpoint should be a POST on its own route")]
    public void ServiceToken_IsAPostOnItsRoute()
    {
        HttpPostAttribute? attribute = typeof(AuthController).GetMethod(nameof(AuthController.ServiceToken))!.GetCustomAttribute<HttpPostAttribute>();

        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be("service-token");
    }

    [Test, Description("The controller should no longer take passwords or refresh tokens: sign-in moved to the OpenID Connect endpoints")]
    public void Controller_HasNoSignInEndpointsLeft()
    {
        typeof(AuthController).GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
            .Select(m => m.Name)
            .Should().Equal(nameof(AuthController.ServiceToken));
    }

    [Test, Description("The controller should be routed under api/auth")]
    public void Controller_IsRoutedUnderApiAuth()
    {
        typeof(AuthController).GetCustomAttribute<RouteAttribute>()!.Template.Should().Be("api/[controller]");
        typeof(AuthController).Name.Should().Be("AuthController");
    }
}
