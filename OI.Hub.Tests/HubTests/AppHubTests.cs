using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.SignalR;
using Moq;
using OI.Hub.Hubs;

namespace OI.Hub.Tests.HubTests;

[TestFixture, Description("Tests for AppHub: group membership comes from the token, never from the browser")]
public class AppHubTests
{
    private const string CONNECTION_ID = "conn-1";

    private Mock<IGroupManager> _groups = null!;
    private Mock<IHubCallerClients<IAppClient>> _clients = null!;
    private Mock<IAppClient> _groupClient = null!;

    [SetUp]
    public void SetUp()
    {
        _groups = new Mock<IGroupManager>();
        _clients = new Mock<IHubCallerClients<IAppClient>>();
        _groupClient = new Mock<IAppClient>();
        _clients.Setup(c => c.Group(It.IsAny<string>())).Returns(_groupClient.Object);
    }

    private AppHub HubFor(string userId, params string[] groupIds)
    {
        List<Claim> claims = [new("sub", userId), .. groupIds.Select(g => new Claim("group", g))];
        Mock<HubCallerContext> context = new();
        context.SetupGet(c => c.User).Returns(new ClaimsPrincipal(new ClaimsIdentity(claims, "Bearer")));
        context.SetupGet(c => c.ConnectionId).Returns(CONNECTION_ID);
        return new AppHub { Context = context.Object, Groups = _groups.Object, Clients = _clients.Object };
    }

    // ---- connecting

    [Test, Description("OnConnectedAsync should add the connection to a hub group for each group in the token")]
    public async Task OnConnectedAsync_AddsTheConnectionToItsGroups()
    {
        AppHub hub = HubFor("u1", "sales-west", "default");

        await hub.OnConnectedAsync();

        _groups.Verify(g => g.AddToGroupAsync(CONNECTION_ID, "group:sales-west", It.IsAny<CancellationToken>()), Times.Once);
        _groups.Verify(g => g.AddToGroupAsync(CONNECTION_ID, "group:default", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("OnConnectedAsync should add the connection to nothing for a user who is in no group")]
    public async Task OnConnectedAsync_AddsNothingForAUserWithNoGroups()
    {
        AppHub hub = HubFor("u1");

        await hub.OnConnectedAsync();

        _groups.Verify(g => g.AddToGroupAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("OnConnectedAsync should add a group only once when the token lists it twice")]
    public async Task OnConnectedAsync_IgnoresDuplicateGroupClaims()
    {
        AppHub hub = HubFor("u1", "default", "default");

        await hub.OnConnectedAsync();

        _groups.Verify(g => g.AddToGroupAsync(CONNECTION_ID, "group:default", It.IsAny<CancellationToken>()), Times.Once);
    }

    // ---- SendToMyGroup

    [Test, Description("SendToMyGroup should message everyone in the group, from the caller's id")]
    public async Task SendToMyGroup_MessagesTheGroup()
    {
        AppHub hub = HubFor("u1", "sales-west");

        await hub.SendToMyGroup("sales-west", "hello team");

        _clients.Verify(c => c.Group("group:sales-west"), Times.Once);
        _groupClient.Verify(c => c.ReceiveMessage("u1", "hello team"), Times.Once);
    }

    [Test, Description("SendToMyGroup should refuse a group the caller is not in")]
    public void SendToMyGroup_RefusesAForeignGroup()
    {
        AppHub hub = HubFor("u1", "sales-west");

        Action act = () => _ = hub.SendToMyGroup("finance", "hello");

        act.Should().Throw<HubException>().WithMessage("You are not a member of that group.");
        _groupClient.Verify(c => c.ReceiveMessage(It.IsAny<string>(), It.IsAny<string>()), Times.Never);
    }

    [Test, Description("SendToMyGroup should refuse every group for a user who has none")]
    public void SendToMyGroup_RefusesWhenTheUserHasNoGroups()
    {
        AppHub hub = HubFor("u1");

        Action act = () => _ = hub.SendToMyGroup("default", "hello");

        act.Should().Throw<HubException>();
    }

    [Test, Description("SendToMyGroup should compare group ids exactly, including case")]
    public void SendToMyGroup_ComparesGroupIdsExactly()
    {
        AppHub hub = HubFor("u1", "sales-west");

        Action act = () => _ = hub.SendToMyGroup("Sales-West", "hello");

        act.Should().Throw<HubException>();
    }

    // ---- Subscribe / Unsubscribe

    [Test, Description("Subscribe should add the connection to the topic group inside one of the caller's groups")]
    public async Task Subscribe_AddsTheConnectionToTheTopic()
    {
        AppHub hub = HubFor("u1", "sales-west");

        await hub.Subscribe("sales-west", "orders");

        _groups.Verify(g => g.AddToGroupAsync(CONNECTION_ID, "group:sales-west:topic:orders", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("Subscribe should refuse a topic in a group the caller is not in")]
    public void Subscribe_RefusesAForeignGroup()
    {
        AppHub hub = HubFor("u1", "sales-west");

        Action act = () => _ = hub.Subscribe("finance", "payroll");

        act.Should().Throw<HubException>().WithMessage("You are not a member of that group.");
        _groups.Verify(g => g.AddToGroupAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("Unsubscribe should remove the connection from the topic group")]
    public async Task Unsubscribe_RemovesTheConnectionFromTheTopic()
    {
        AppHub hub = HubFor("u1", "sales-west");

        await hub.Unsubscribe("sales-west", "orders");

        _groups.Verify(g => g.RemoveFromGroupAsync(CONNECTION_ID, "group:sales-west:topic:orders", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("Unsubscribe should only ever touch the caller's own connection")]
    public async Task Unsubscribe_OnlyTouchesTheCallersConnection()
    {
        AppHub hub = HubFor("u1");

        await hub.Unsubscribe("finance", "payroll");

        _groups.Verify(g => g.RemoveFromGroupAsync(CONNECTION_ID, "group:finance:topic:payroll", It.IsAny<CancellationToken>()), Times.Once);
        _groups.Verify(g => g.RemoveFromGroupAsync(It.Is<string>(id => id != CONNECTION_ID), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }
}
