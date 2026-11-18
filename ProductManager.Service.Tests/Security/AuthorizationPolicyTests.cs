using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using OI.Integration.Security;
using ProductManager.Service.Utilities;

namespace ProductManager.Service.Tests.Security;

[TestFixture, Description("Tests for ProductAuthorization: any valid token may read, only administrators may write")]
public class AuthorizationPolicyTests
{
    private ServiceProvider _provider = null!;
    private IAuthorizationService _authorization = null!;

    [SetUp]
    public void SetUp()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddOiAuthorization(ProductAuthorization.Configure);
        _provider = services.BuildServiceProvider();
        _authorization = _provider.GetRequiredService<IAuthorizationService>();
    }

    [TearDown]
    public void TearDown() => _provider.Dispose();

    // the same claim names the access token carries (the bearer handler is set up with "role" as the role claim)
    private static ClaimsPrincipal Principal(IEnumerable<Claim> claims, bool authenticated = true) =>
        new(new ClaimsIdentity(claims, authenticated ? "Bearer" : null, "name", "role"));

    private static ClaimsPrincipal Admin() =>
        Principal([new Claim("sub", "u1"), new Claim("token_use", "user"), new Claim("role", "Admin")]);

    private static ClaimsPrincipal NormalUser() =>
        Principal([new Claim("sub", "u2"), new Claim("token_use", "user"), new Claim("role", "User")]);

    private static ClaimsPrincipal ServiceCaller() =>
        Principal([new Claim("sub", "oi-reporting"), new Claim("token_use", "service"), new Claim("scope", "products:read")]);

    private static ClaimsPrincipal Anonymous() => Principal([], authenticated: false);

    private async Task<bool> CanReadAsync(ClaimsPrincipal user)
    {
        IAuthorizationPolicyProvider policies = _provider.GetRequiredService<IAuthorizationPolicyProvider>();
        AuthorizationPolicy? fallback = await policies.GetFallbackPolicyAsync();
        fallback.Should().NotBeNull("an endpoint without its own policy must still need a token");
        return (await _authorization.AuthorizeAsync(user, null, fallback!)).Succeeded;
    }

    private async Task<bool> CanWriteAsync(ClaimsPrincipal user) =>
        (await _authorization.AuthorizeAsync(user, null, AdminPolicy.NAME)).Succeeded;

    [Test, Description("Anyone signed in with a user token may read")]
    public async Task AUser_CanRead() => (await CanReadAsync(NormalUser())).Should().BeTrue();

    [Test, Description("An administrator may read")]
    public async Task AnAdministrator_CanRead() => (await CanReadAsync(Admin())).Should().BeTrue();

    [Test, Description("Another application calling with a service token may read")]
    public async Task AnotherApplication_CanRead() => (await CanReadAsync(ServiceCaller())).Should().BeTrue();

    [Test, Description("Someone who is not signed in may not read")]
    public async Task AnAnonymousCaller_CannotRead() => (await CanReadAsync(Anonymous())).Should().BeFalse();

    [Test, Description("The default policy should be the same any-valid-token rule as the fallback")]
    public async Task TheDefaultPolicy_AllowsAServiceToken()
    {
        IAuthorizationPolicyProvider policies = _provider.GetRequiredService<IAuthorizationPolicyProvider>();

        AuthorizationPolicy defaultPolicy = await policies.GetDefaultPolicyAsync();

        (await _authorization.AuthorizeAsync(ServiceCaller(), null, defaultPolicy)).Succeeded.Should().BeTrue();
        (await _authorization.AuthorizeAsync(Anonymous(), null, defaultPolicy)).Succeeded.Should().BeFalse();
    }

    [Test, Description("An administrator signed in as a user may write")]
    public async Task AnAdministrator_CanWrite() => (await CanWriteAsync(Admin())).Should().BeTrue();

    [Test, Description("A normal user may not write")]
    public async Task AUserWithoutTheAdminRole_CannotWrite() => (await CanWriteAsync(NormalUser())).Should().BeFalse();

    [Test, Description("Another application may never write, whatever its scope")]
    public async Task AnotherApplication_CannotWrite() => (await CanWriteAsync(ServiceCaller())).Should().BeFalse();

    [Test, Description("Someone who is not signed in may not write")]
    public async Task AnAnonymousCaller_CannotWrite() => (await CanWriteAsync(Anonymous())).Should().BeFalse();
}
