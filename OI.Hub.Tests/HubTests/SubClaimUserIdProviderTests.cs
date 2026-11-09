using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Hub.Hubs;

namespace OI.Hub.Tests.HubTests;

[TestFixture, Description("Tests for SubClaimUserIdProvider: Clients.User(id) addresses a user by the token's sub claim")]
public class SubClaimUserIdProviderTests
{
    // HubConnectionContext is a class, so it is mocked with its constructor arguments and a virtual User.
    private static HubConnectionContext ConnectionFor(ClaimsPrincipal user)
    {
        Mock<ConnectionContext> connection = new() { DefaultValue = DefaultValue.Mock };
        Mock<HubConnectionContext> context = new(connection.Object, new HubConnectionContextOptions(), NullLoggerFactory.Instance);
        context.SetupGet(c => c.User).Returns(user);
        return context.Object;
    }

    [Test, Description("GetUserId should return the sub claim")]
    public void GetUserId_ReturnsTheSubClaim()
    {
        ClaimsPrincipal user = new(new ClaimsIdentity([new Claim("sub", "user-1"), new Claim("name", "Pat")], "Bearer"));

        new SubClaimUserIdProvider().GetUserId(ConnectionFor(user)).Should().Be("user-1");
    }

    [Test, Description("GetUserId should return null when the token has no sub claim")]
    public void GetUserId_ReturnsNullWithoutASubClaim()
    {
        ClaimsPrincipal user = new(new ClaimsIdentity([new Claim("name", "Pat")], "Bearer"));

        new SubClaimUserIdProvider().GetUserId(ConnectionFor(user)).Should().BeNull();
    }

    [Test, Description("GetUserId should return null for an anonymous connection")]
    public void GetUserId_ReturnsNullForAnAnonymousConnection()
    {
        new SubClaimUserIdProvider().GetUserId(ConnectionFor(new ClaimsPrincipal())).Should().BeNull();
    }

    [Test, Description("GetUserId should not use the name identifier, which is what the default provider would use")]
    public void GetUserId_IgnoresTheNameIdentifierClaim()
    {
        ClaimsPrincipal user = new(new ClaimsIdentity([new Claim(ClaimTypes.NameIdentifier, "other")], "Bearer"));

        new SubClaimUserIdProvider().GetUserId(ConnectionFor(user)).Should().BeNull();
    }
}
