using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using OI.Auth.Security;
using OI.Integration.Security;

namespace OI.Auth.Tests.SecurityTests;

[TestFixture, Description("Tests for AdminPolicy: who may use the administration endpoints")]
public class AdminPolicyTests
{
    private ServiceProvider _provider = null!;
    private IAuthorizationService _authorization = null!;

    [SetUp]
    public void SetUp()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiAuthorization(AdminPolicy.Configure);
        _provider = services.BuildServiceProvider();
        _authorization = _provider.GetRequiredService<IAuthorizationService>();
    }

    [TearDown]
    public void TearDown() => _provider.Dispose();

    // the same claim names the access token carries (the bearer handler is set up with "role" as the role claim)
    private static ClaimsPrincipal Principal(IEnumerable<Claim> claims, bool authenticated = true) =>
        new(new ClaimsIdentity(claims, authenticated ? "Bearer" : null, "name", "role"));

    private async Task<bool> IsAllowedAsync(ClaimsPrincipal user) =>
        (await _authorization.AuthorizeAsync(user, null, AdminPolicy.NAME)).Succeeded;

    [Test, Description("The policy should be called AdminOnly, and require the Admin role")]
    public void Constants_AreWhatTheControllersExpect()
    {
        AdminPolicy.NAME.Should().Be("AdminOnly");
        AdminPolicy.ADMIN_ROLE.Should().Be("Admin");
    }

    [Test, Description("An administrator signed in with a user token should be allowed")]
    public async Task AnAdministratorWithAUserToken_IsAllowed()
    {
        ClaimsPrincipal admin = Principal([new Claim("sub", "u1"), new Claim("token_use", "user"), new Claim("role", "Admin"), new Claim("role", "User")]);

        (await IsAllowedAsync(admin)).Should().BeTrue();
    }

    [Test, Description("A user without the Admin role should be refused")]
    public async Task AUserWithoutTheAdminRole_IsRefused()
    {
        ClaimsPrincipal user = Principal([new Claim("sub", "u1"), new Claim("token_use", "user"), new Claim("role", "User")]);

        (await IsAllowedAsync(user)).Should().BeFalse();
    }

    [Test, Description("A user with no roles should be refused")]
    public async Task AUserWithNoRoles_IsRefused()
    {
        ClaimsPrincipal user = Principal([new Claim("sub", "u1"), new Claim("token_use", "user")]);

        (await IsAllowedAsync(user)).Should().BeFalse();
    }

    [Test, Description("A role that merely sounds like Admin should be refused")]
    public async Task ALookAlikeRole_IsRefused()
    {
        ClaimsPrincipal user = Principal([new Claim("sub", "u1"), new Claim("token_use", "user"), new Claim("role", "Administrator")]);

        (await IsAllowedAsync(user)).Should().BeFalse();
    }

    [Test, Description("Another application's service token should be refused, even if it somehow carried the Admin role")]
    public async Task AServiceToken_IsRefused()
    {
        ClaimsPrincipal service = Principal([new Claim("sub", "oi-reporting"), new Claim("token_use", "service"), new Claim("scope", "hub:publish"), new Claim("role", "Admin")]);

        (await IsAllowedAsync(service)).Should().BeFalse();
    }

    [Test, Description("A token that does not say what it is for should be refused")]
    public async Task ATokenWithNoTokenUse_IsRefused()
    {
        ClaimsPrincipal user = Principal([new Claim("sub", "u1"), new Claim("role", "Admin")]);

        (await IsAllowedAsync(user)).Should().BeFalse();
    }

    [Test, Description("Someone who is not signed in should be refused, whatever claims they present")]
    public async Task AnAnonymousCaller_IsRefused()
    {
        ClaimsPrincipal anonymous = Principal([new Claim("token_use", "user"), new Claim("role", "Admin")], authenticated: false);

        (await IsAllowedAsync(anonymous)).Should().BeFalse();
    }

    [Test, Description("Everything without a policy of its own should require a signed-in user, so a new endpoint is protected by default")]
    public async Task TheFallbackPolicy_RequiresASignedInUser()
    {
        IAuthorizationPolicyProvider provider = _provider.GetRequiredService<IAuthorizationPolicyProvider>();

        AuthorizationPolicy? fallback = await provider.GetFallbackPolicyAsync();

        fallback.Should().NotBeNull();
        ClaimsPrincipal user = Principal([new Claim("sub", "u1"), new Claim("token_use", "user")]);
        ClaimsPrincipal anonymous = Principal([], authenticated: false);
        (await _authorization.AuthorizeAsync(user, null, fallback!)).Succeeded.Should().BeTrue();
        (await _authorization.AuthorizeAsync(anonymous, null, fallback!)).Succeeded.Should().BeFalse();
    }
}
