using FluentAssertions;
using OI.Integration.Security;

namespace OI.Integration.Tests.SecurityTests;

[TestFixture, Description("Tests for ClientContextAccessor, the per-request holder of the caller")]
public class ClientContextAccessorTests
{
    [Test, Description("Current should be the anonymous caller until the middleware has filled it in")]
    public void Current_IsAnonymousByDefault()
    {
        ClientContextAccessor sut = new();

        sut.Current.Should().BeSameAs(ClientContext.Anonymous);
        sut.Current.IsAuthenticated.Should().BeFalse();
    }

    [Test, Description("Current should hold the caller once it is set")]
    public void Current_HoldsTheCallerOnceSet()
    {
        ClientContextAccessor sut = new();
        ClientContext caller = new("user-1", "Pat Example", "pat@example.com", ["User"], ["default"]);

        sut.Current = caller;

        sut.Current.Should().BeSameAs(caller);
        sut.Current.UserId.Should().Be("user-1");
    }

    [Test, Description("Two accessors should not share a caller")]
    public void Current_IsNotSharedBetweenAccessors()
    {
        ClientContextAccessor first = new() { Current = new ClientContext("user-1", "Pat", null, [], []) };
        ClientContextAccessor second = new();

        second.Current.IsAuthenticated.Should().BeFalse();
        first.Current.IsAuthenticated.Should().BeTrue();
    }
}
