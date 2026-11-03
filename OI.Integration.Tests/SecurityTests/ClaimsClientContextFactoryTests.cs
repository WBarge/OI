using System.Security.Claims;
using FluentAssertions;
using OI.Glue.Security;
using OI.Integration.Security;

namespace OI.Integration.Tests.SecurityTests;

[TestFixture, Description("Tests for ClaimsClientContextFactory")]
public class ClaimsClientContextFactoryTests
{
    private readonly ClaimsClientContextFactory _sut = new();

    private static ClaimsPrincipal Signed(IEnumerable<Claim> claims, string? authenticationType = "Bearer") =>
        new(new ClaimsIdentity(claims, authenticationType));

    private static ClaimsPrincipal UserToken(params Claim[] extra) =>
        Signed([new Claim("sub", "user-1"), new Claim("token_use", "user"), .. extra]);

    [Test, Description("CreateAsync should throw when the user is null")]
    public async Task CreateAsync_ThrowsWhenUserIsNull()
    {
        Func<Task> act = () => _sut.CreateAsync(null!, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<ArgumentNullException>();
    }

    [Test, Description("A user token should become an authenticated context with the user's details")]
    public async Task CreateAsync_BuildsTheContextFromTheClaims()
    {
        ClaimsPrincipal user = UserToken(
            new Claim("name", "Pat Example"), new Claim("email", "pat@example.com"),
            new Claim("role", "Admin"), new Claim("role", "User"),
            new Claim("group", "default"), new Claim("group", "sales-west"));

        IClientContext result = await _sut.CreateAsync(user, TestContext.CurrentContext.CancellationToken);

        result.IsAuthenticated.Should().BeTrue();
        result.UserId.Should().Be("user-1");
        result.DisplayName.Should().Be("Pat Example");
        result.Email.Should().Be("pat@example.com");
        result.Roles.Should().BeEquivalentTo(new[] { "Admin", "User" });
        result.Groups.Should().BeEquivalentTo(new[] { "default", "sales-west" });
    }

    [Test, Description("A user with no roles or groups should get empty lists")]
    public async Task CreateAsync_GivesEmptyListsWhenThereAreNoRolesOrGroups()
    {
        IClientContext result = await _sut.CreateAsync(UserToken(), TestContext.CurrentContext.CancellationToken);

        result.Roles.Should().BeEmpty();
        result.Groups.Should().BeEmpty();
    }

    [Test, Description("The id should stand in for the name when the token has none")]
    public async Task CreateAsync_UsesTheIdWhenThereIsNoName()
    {
        IClientContext result = await _sut.CreateAsync(UserToken(), TestContext.CurrentContext.CancellationToken);

        result.DisplayName.Should().Be("user-1");
    }

    [Test, Description("A repeated or blank claim value should only appear once, or not at all")]
    public async Task CreateAsync_IgnoresDuplicateAndBlankValues()
    {
        ClaimsPrincipal user = UserToken(new Claim("group", "default"), new Claim("group", "default"), new Claim("group", " "));

        IClientContext result = await _sut.CreateAsync(user, TestContext.CurrentContext.CancellationToken);

        result.Groups.Should().BeEquivalentTo(new[] { "default" });
    }

    [Test, Description("Another application's service token must not be mistaken for a user")]
    public async Task CreateAsync_ReturnsAnonymousForAServiceToken()
    {
        ClaimsPrincipal service = Signed([new Claim("sub", "oi-reporting"), new Claim("token_use", "service"), new Claim("scope", "hub:publish")]);

        IClientContext result = await _sut.CreateAsync(service, TestContext.CurrentContext.CancellationToken);

        result.Should().BeSameAs(ClientContext.Anonymous);
    }

    [Test, Description("A token that does not say what it is for must not be treated as a user")]
    public async Task CreateAsync_ReturnsAnonymousWhenTokenUseIsMissing()
    {
        ClaimsPrincipal user = Signed([new Claim("sub", "user-1")]);

        IClientContext result = await _sut.CreateAsync(user, TestContext.CurrentContext.CancellationToken);

        result.Should().BeSameAs(ClientContext.Anonymous);
    }

    [Test, Description("A user token with no id cannot identify anyone")]
    public async Task CreateAsync_ReturnsAnonymousWhenThereIsNoUserId()
    {
        ClaimsPrincipal user = Signed([new Claim("token_use", "user")]);

        IClientContext result = await _sut.CreateAsync(user, TestContext.CurrentContext.CancellationToken);

        result.Should().BeSameAs(ClientContext.Anonymous);
    }

    [Test, Description("Claims on a principal that is not authenticated must not be trusted")]
    public async Task CreateAsync_ReturnsAnonymousWhenNotAuthenticated()
    {
        ClaimsPrincipal user = Signed([new Claim("sub", "user-1"), new Claim("token_use", "user")], authenticationType: null);

        IClientContext result = await _sut.CreateAsync(user, TestContext.CurrentContext.CancellationToken);

        result.Should().BeSameAs(ClientContext.Anonymous);
    }
}
