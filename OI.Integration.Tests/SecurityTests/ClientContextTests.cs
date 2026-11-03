using FluentAssertions;
using OI.Integration.Security;

namespace OI.Integration.Tests.SecurityTests;

[TestFixture, Description("Tests for ClientContext")]
public class ClientContextTests
{
    [Test, Description("Anonymous should not be authenticated and should hold only empty values")]
    public void Anonymous_IsNotAuthenticatedAndEmpty()
    {
        ClientContext sut = ClientContext.Anonymous;

        sut.IsAuthenticated.Should().BeFalse();
        sut.UserId.Should().BeEmpty();
        sut.DisplayName.Should().BeEmpty();
        sut.Email.Should().BeNull();
        sut.Roles.Should().BeEmpty();
        sut.Groups.Should().BeEmpty();
    }

    [Test, Description("Anonymous should be one shared instance")]
    public void Anonymous_IsASingleInstance()
    {
        ClientContext.Anonymous.Should().BeSameAs(ClientContext.Anonymous);
    }

    [Test, Description("A user context should be authenticated and hold what it was given")]
    public void Constructor_HoldsTheValuesGiven()
    {
        ClientContext sut = new("user-1", "Pat Example", "pat@example.com", ["Admin"], ["default", "sales"]);

        sut.IsAuthenticated.Should().BeTrue();
        sut.UserId.Should().Be("user-1");
        sut.DisplayName.Should().Be("Pat Example");
        sut.Email.Should().Be("pat@example.com");
        sut.Roles.Should().BeEquivalentTo(new[] { "Admin" });
        sut.Groups.Should().BeEquivalentTo(new[] { "default", "sales" });
    }

    [TestCase(null), TestCase(""), TestCase("   ")]
    [Description("A signed-in user needs an id")]
    public void Constructor_ThrowsWhenUserIdIsMissing(string? userId)
    {
        Action act = () => _ = new ClientContext(userId!, "Pat", null, [], []);

        act.Should().Throw<ArgumentException>().WithParameterName("userId");
    }

    [TestCase(null), TestCase("")]
    [Description("The id is shown when the user has no name")]
    public void Constructor_FallsBackToTheUserIdForTheDisplayName(string? displayName)
    {
        ClientContext sut = new("user-1", displayName!, null, [], []);

        sut.DisplayName.Should().Be("user-1");
    }

    [Test, Description("Constructor should throw when roles is null")]
    public void Constructor_ThrowsWhenRolesIsNull()
    {
        Action act = () => _ = new ClientContext("user-1", "Pat", null, null!, []);

        act.Should().Throw<ArgumentNullException>().WithParameterName("roles");
    }

    [Test, Description("Constructor should throw when groups is null")]
    public void Constructor_ThrowsWhenGroupsIsNull()
    {
        Action act = () => _ = new ClientContext("user-1", "Pat", null, [], null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("groups");
    }

    [Test, Description("Changing the list passed in afterwards should not change the context")]
    public void Constructor_CopiesTheListsGiven()
    {
        List<string> groups = ["default"];
        ClientContext sut = new("user-1", "Pat", null, [], groups);

        groups.Add("added-later");

        sut.Groups.Should().BeEquivalentTo(new[] { "default" });
    }
}
