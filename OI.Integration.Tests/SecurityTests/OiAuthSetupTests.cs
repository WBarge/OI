using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using OI.Integration.Security;

namespace OI.Integration.Tests.SecurityTests;

[TestFixture, Description("Tests for OiAuthSetup: how every OI application trusts tokens issued by OI.Auth")]
public class OiAuthSetupTests
{
    private static IConfiguration Config(params (string Key, string? Value)[] settings) =>
        new ConfigurationBuilder().AddInMemoryCollection(settings.Select(s => new KeyValuePair<string, string?>(s.Key, s.Value))).Build();

    private static JwtBearerOptions BearerOptions(IConfiguration configuration)
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiJwtBearer(configuration);
        ServiceProvider provider = services.BuildServiceProvider();
        return provider.GetRequiredService<IOptionsMonitor<JwtBearerOptions>>().Get(JwtBearerDefaults.AuthenticationScheme);
    }

    private static ClaimsPrincipal Principal(string? tokenUse, bool authenticated = true)
    {
        List<Claim> claims = [new("sub", "id-1")];
        if (tokenUse is not null) claims.Add(new Claim(OiAuthSetup.TokenUseClaim, tokenUse));
        return new ClaimsPrincipal(authenticated ? new ClaimsIdentity(claims, "Bearer") : new ClaimsIdentity(claims));
    }

    private static async Task<bool> PassesAsync(ServiceProvider provider, AuthorizationPolicy policy, ClaimsPrincipal user)
    {
        IAuthorizationService service = provider.GetRequiredService<IAuthorizationService>();
        return (await service.AuthorizeAsync(user, null, policy)).Succeeded;
    }

    // ---- constants

    [Test, Description("The claim and its two values should be stable, because the tokens and the policies must agree")]
    public void Constants_AreStable()
    {
        OiAuthSetup.TokenUseClaim.Should().Be("token_use");
        OiAuthSetup.UserToken.Should().Be("user");
        OiAuthSetup.ServiceToken.Should().Be("service");
    }

    // ---- AddOiJwtBearer

    [Test, Description("AddOiJwtBearer should throw when Auth:Authority is not configured")]
    public void AddOiJwtBearer_ThrowsWithoutTheAuthority()
    {
        ServiceCollection services = new();

        Action act = () => services.AddOiJwtBearer(Config());

        act.Should().Throw<InvalidOperationException>().WithMessage("*Auth:Authority*");
    }

    [Test, Description("AddOiJwtBearer should trust the configured authority")]
    public void AddOiJwtBearer_UsesTheAuthority()
    {
        JwtBearerOptions options = BearerOptions(Config(("Auth:Authority", "https://auth.test")));

        options.Authority.Should().Be("https://auth.test");
    }

    [Test, Description("AddOiJwtBearer should default the audience to oi")]
    public void AddOiJwtBearer_DefaultsTheAudience()
    {
        JwtBearerOptions options = BearerOptions(Config(("Auth:Authority", "https://auth.test")));

        options.Audience.Should().Be("oi");
    }

    [Test, Description("AddOiJwtBearer should use the configured audience")]
    public void AddOiJwtBearer_UsesTheConfiguredAudience()
    {
        JwtBearerOptions options = BearerOptions(Config(("Auth:Authority", "https://auth.test"), ("Auth:Audience", "orders")));

        options.Audience.Should().Be("orders");
    }

    [Test, Description("AddOiJwtBearer should keep claim names exactly as they are in the token")]
    public void AddOiJwtBearer_KeepsClaimNames()
    {
        JwtBearerOptions options = BearerOptions(Config(("Auth:Authority", "https://auth.test")));

        options.MapInboundClaims.Should().BeFalse("the code reads \"sub\", \"role\" and \"group\" by those names");
        options.TokenValidationParameters.NameClaimType.Should().Be("name");
        options.TokenValidationParameters.RoleClaimType.Should().Be("role");
    }

    [Test, Description("AddOiJwtBearer should allow only 30 seconds of clock difference")]
    public void AddOiJwtBearer_AllowsThirtySecondsOfClockSkew()
    {
        JwtBearerOptions options = BearerOptions(Config(("Auth:Authority", "https://auth.test")));

        options.TokenValidationParameters.ClockSkew.Should().Be(TimeSpan.FromSeconds(30));
    }

    [Test, Description("AddOiJwtBearer should make Bearer the default authentication scheme")]
    public void AddOiJwtBearer_SetsTheDefaultScheme()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiJwtBearer(Config(("Auth:Authority", "https://auth.test")));
        using ServiceProvider provider = services.BuildServiceProvider();

        AuthenticationOptions options = provider.GetRequiredService<IOptions<AuthenticationOptions>>().Value;

        options.DefaultScheme.Should().Be(JwtBearerDefaults.AuthenticationScheme);
    }

    // ---- the SignalR access_token query string

    private static async Task<string?> TokenReadFromAsync(string path, string query)
    {
        JwtBearerOptions options = BearerOptions(Config(("Auth:Authority", "https://auth.test")));
        DefaultHttpContext http = new();
        http.Request.Path = path;
        http.Request.QueryString = new QueryString(query);
        MessageReceivedContext context = new(http, new AuthenticationScheme("Bearer", null, typeof(JwtBearerHandler)), options);

        await options.Events.OnMessageReceived(context);

        return context.Token;
    }

    [Test, Description("A hub route should accept the token from the access_token query string, because browsers cannot set a header on a WebSocket")]
    public async Task OnMessageReceived_AcceptsTheQueryTokenOnTheHubRoute()
    {
        (await TokenReadFromAsync("/hubs/app", "?access_token=abc123")).Should().Be("abc123");
    }

    [Test, Description("A hub route should accept the query token for any hub below /hubs")]
    public async Task OnMessageReceived_AcceptsTheQueryTokenOnAnyHubBelowHubs()
    {
        (await TokenReadFromAsync("/hubs/other/negotiate", "?access_token=abc123")).Should().Be("abc123");
    }

    [TestCase("/api/orders")]
    [TestCase("/api/publish")]
    [TestCase("/")]
    [TestCase("/hubsx/app")]
    [Description("A route that is not a hub should ignore the query token, so it can not end up in logs and URLs of the API")]
    public async Task OnMessageReceived_IgnoresTheQueryTokenOffTheHubRoute(string path)
    {
        (await TokenReadFromAsync(path, "?access_token=abc123")).Should().BeNull();
    }

    [TestCase("")]
    [TestCase("?access_token=")]
    [TestCase("?other=1")]
    [Description("A hub route without a query token should leave the token to the Authorization header")]
    public async Task OnMessageReceived_LeavesTheTokenAloneWhenThereIsNoQueryToken(string query)
    {
        (await TokenReadFromAsync("/hubs/app", query)).Should().BeNull();
    }

    // ---- AddOiAuthorization

    [Test, Description("AddOiAuthorization should let a signed-in user token through by default")]
    public async Task AddOiAuthorization_LetsAUserTokenThrough()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiAuthorization();
        using ServiceProvider provider = services.BuildServiceProvider();
        AuthorizationOptions options = provider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;

        (await PassesAsync(provider, options.DefaultPolicy, Principal(OiAuthSetup.UserToken))).Should().BeTrue();
    }

    [Test, Description("AddOiAuthorization should turn a service token away by default")]
    public async Task AddOiAuthorization_TurnsAServiceTokenAway()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiAuthorization();
        using ServiceProvider provider = services.BuildServiceProvider();
        AuthorizationOptions options = provider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;

        (await PassesAsync(provider, options.DefaultPolicy, Principal(OiAuthSetup.ServiceToken))).Should().BeFalse(
            "service tokens are for other applications and must not reach endpoints meant for people");
    }

    [Test, Description("AddOiAuthorization should turn away a signed-in caller whose token has no token_use claim")]
    public async Task AddOiAuthorization_TurnsAwayATokenWithoutTheClaim()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiAuthorization();
        using ServiceProvider provider = services.BuildServiceProvider();
        AuthorizationOptions options = provider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;

        (await PassesAsync(provider, options.DefaultPolicy, Principal(null))).Should().BeFalse();
    }

    [Test, Description("AddOiAuthorization should turn away an anonymous caller")]
    public async Task AddOiAuthorization_TurnsAnonymousCallersAway()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiAuthorization();
        using ServiceProvider provider = services.BuildServiceProvider();
        AuthorizationOptions options = provider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;

        (await PassesAsync(provider, options.DefaultPolicy, Principal(OiAuthSetup.UserToken, authenticated: false))).Should().BeFalse();
    }

    [Test, Description("AddOiAuthorization should apply the same rule to endpoints that name no policy at all")]
    public void AddOiAuthorization_UsesTheSamePolicyAsTheFallback()
    {
        ServiceCollection services = new();
        services.AddOiAuthorization();
        using ServiceProvider provider = services.BuildServiceProvider();

        AuthorizationOptions options = provider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;

        options.FallbackPolicy.Should().NotBeNull("an endpoint with no attribute must not be open to everyone");
        options.FallbackPolicy.Should().BeSameAs(options.DefaultPolicy);
    }

    [Test, Description("AddOiAuthorization should let the application add its own policies")]
    public void AddOiAuthorization_RunsTheConfigureCallback()
    {
        ServiceCollection services = new();
        services.AddOiAuthorization(o => o.AddPolicy("Publish", p => p.RequireClaim("scope", "hub:publish")));
        using ServiceProvider provider = services.BuildServiceProvider();

        AuthorizationOptions options = provider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;

        options.GetPolicy("Publish").Should().NotBeNull();
        options.DefaultPolicy.Should().NotBeNull("adding a policy must not remove the default");
    }

    [Test, Description("AddOiAuthorization should work without a configure callback")]
    public void AddOiAuthorization_WorksWithoutACallback()
    {
        ServiceCollection services = new();

        Action act = () => services.AddOiAuthorization();

        act.Should().NotThrow();
    }
}
