using System.Collections.Immutable;
using System.Security.Claims;
using FluentAssertions;
using OI.Auth.Oidc;
using OI.Auth.Tests.TestSupport;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Tests.OidcTests;

[TestFixture, Description("Tests for UserIdentityBuilder: the claims in a person's tokens and which token each one goes in")]
public class UserIdentityBuilderTests
{
    private static string[] DestinationsOf(ClaimsIdentity identity, string type) =>
        identity.FindFirst(type)!.GetDestinations().ToArray();

    [Test, Description("Create should carry the id, name, email, roles and the user token marker")]
    public void Create_CarriesTheIdentityClaims()
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(roles: ["Admin", "User"]), ["openid"], "oi");

        identity.GetClaim(Claims.Subject).Should().Be("user-1");
        identity.GetClaim(Claims.Name).Should().Be("Pat Example");
        identity.GetClaim(Claims.Email).Should().Be("pat@example.com");
        identity.GetClaims(Claims.Role).ToArray().Should().BeEquivalentTo("Admin", "User");
        identity.GetClaim(UserIdentityBuilder.TokenUseClaim).Should().Be("user");
    }

    [Test, Description("Create should name the audience the APIs require, whatever scopes were asked for")]
    public void Create_SetsTheAudience()
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(), ["openid", "profile", "email", "offline_access"], "oi");

        identity.GetResources().ToArray().Should().Equal("oi");
        identity.GetScopes().ToArray().Should().BeEquivalentTo("openid", "profile", "email", "offline_access");
    }

    [TestCase(null)]
    [TestCase("")]
    [Description("Create should leave the email out when the user has none")]
    public void Create_OmitsAMissingEmail(string? email)
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(email: email), ["openid"], "oi");

        identity.GetClaim(Claims.Email).Should().BeNull();
    }

    [Test, Description("Create should add no role claim for a user with no roles")]
    public void Create_HasNoRolesForAUserWithNone()
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(roles: []), ["openid"], "oi");

        identity.GetClaims(Claims.Role).ToArray().Should().BeEmpty();
    }

    [Test, Description("Create should carry the user's stored claims, such as their groups")]
    public void Create_CarriesStoredClaims()
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(claims: [("group", "sales"), ("group", "ops")]), ["openid"], "oi");

        identity.FindAll("group").Select(c => c.Value).Should().BeEquivalentTo("sales", "ops");
    }

    [TestCase("sub", "attacker")]
    [TestCase("SUB", "attacker")]
    [TestCase("jti", "attacker")]
    [TestCase("iss", "https://evil.example")]
    [TestCase("aud", "evil")]
    [TestCase("name", "Someone Else")]
    [TestCase("email", "attacker@example.com")]
    [TestCase("role", "Admin")]
    [TestCase("Role", "Admin")]
    [TestCase("scope", "hub:publish")]
    [TestCase("token_use", "service")]
    [TestCase("client_id", "oi-reporting")]
    [TestCase("sid", "x")]
    [Description("Create should ignore stored claims that would overwrite the ones it sets itself")]
    public void Create_IgnoresStoredClaimsThatAreReserved(string type, string value)
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(roles: ["User"], claims: [(type, value)]), ["openid"], "oi");

        identity.FindAll(type).Select(c => c.Value).Should().NotContain(value);
        identity.GetClaim(Claims.Subject).Should().Be("user-1");
        identity.GetClaims(Claims.Role).ToArray().Should().Equal("User");
        identity.GetClaim(UserIdentityBuilder.TokenUseClaim).Should().Be("user");
    }

    // ---- destinations

    [Test, Description("The role, group and token marker claims should go into the access token only")]
    public void Destinations_RoleGroupAndMarkerGoToTheAccessTokenOnly()
    {
        ClaimsIdentity identity = UserIdentityBuilder.Create(TestUsers.Make(roles: ["Admin"], claims: [("group", "sales")]), ["openid", "profile", "email"], "oi");

        DestinationsOf(identity, Claims.Role).Should().Equal(Destinations_.AccessToken);
        DestinationsOf(identity, "group").Should().Equal(Destinations_.AccessToken);
        DestinationsOf(identity, UserIdentityBuilder.TokenUseClaim).Should().Equal(Destinations_.AccessToken);
    }

    [Test, Description("The name should go into the ID token only when the profile scope was granted")]
    public void Destinations_NameFollowsTheProfileScope()
    {
        DestinationsOf(UserIdentityBuilder.Create(TestUsers.Make(), ["openid", "profile"], "oi"), Claims.Name)
            .Should().BeEquivalentTo(Destinations_.AccessToken, Destinations_.IdentityToken);
        DestinationsOf(UserIdentityBuilder.Create(TestUsers.Make(), ["openid"], "oi"), Claims.Name)
            .Should().Equal(Destinations_.AccessToken);
    }

    [Test, Description("The email should go into the ID token only when the email scope was granted")]
    public void Destinations_EmailFollowsTheEmailScope()
    {
        DestinationsOf(UserIdentityBuilder.Create(TestUsers.Make(), ["openid", "email"], "oi"), Claims.Email)
            .Should().BeEquivalentTo(Destinations_.AccessToken, Destinations_.IdentityToken);
        DestinationsOf(UserIdentityBuilder.Create(TestUsers.Make(), ["openid"], "oi"), Claims.Email)
            .Should().Equal(Destinations_.AccessToken);
    }

    // ---- renewal

    [Test, Description("Refresh should keep OpenIddict's own claims (they tie the new tokens to the same authorization) and rebuild everything about the person")]
    public void Refresh_KeepsTheAuthorizationAndRebuildsThePerson()
    {
        ClaimsIdentity old = new("test", Claims.Name, Claims.Role);
        old.AddClaim(new Claim(Claims.Private.AuthorizationId, "auth-1"));
        old.SetClaim(Claims.Subject, "user-1");
        old.SetClaim(Claims.Name, "Old Name");
        old.SetClaims(Claims.Role, ImmutableArray.Create("Admin"));
        old.AddClaim(new Claim("group", "old-group"));
        old.SetScopes("openid", "profile");

        ClaimsIdentity renewed = UserIdentityBuilder.Refresh(new ClaimsPrincipal(old), TestUsers.Make(roles: ["User"], claims: [("group", "new-group")]), "oi");

        renewed.GetClaim(Claims.Private.AuthorizationId).Should().Be("auth-1");
        renewed.GetClaim(Claims.Name).Should().Be("Pat Example");
        renewed.GetClaims(Claims.Role).ToArray().Should().Contain("User", "a lost role must be gone at the next renewal");
        renewed.FindAll("group").Select(c => c.Value).Should().Equal("new-group");
        renewed.GetScopes().ToArray().Should().BeEquivalentTo("openid", "profile");
        renewed.GetResources().ToArray().Should().Equal("oi");
    }
}

// OpenIddict's constants class is "Destinations"; this alias keeps the test file's own helper method named Destinations.
internal static class Destinations_
{
    public const string AccessToken = OpenIddictConstants.Destinations.AccessToken;
    public const string IdentityToken = OpenIddictConstants.Destinations.IdentityToken;
}
