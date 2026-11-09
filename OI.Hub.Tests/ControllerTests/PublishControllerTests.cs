using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Notifications;
using OI.Hub.Controllers;
using OI.Hub.Hubs;

namespace OI.Hub.Tests.ControllerTests;

[TestFixture, Description("Tests for PublishController: the one door other OI applications use to reach connected browsers")]
public class PublishControllerTests
{
    private Mock<IHubContext<AppHub, IAppClient>> _hub = null!;
    private Mock<IHubClients<IAppClient>> _clients = null!;
    private Mock<IAppClient> _client = null!;
    private PublishController _sut = null!;
    private Notification? _sent;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _sent = null;
        _client = new Mock<IAppClient>();
        _client.Setup(c => c.ReceiveNotification(It.IsAny<Notification>()))
            .Callback<Notification>(n => _sent = n)
            .Returns(Task.CompletedTask);
        _clients = new Mock<IHubClients<IAppClient>>();
        _clients.Setup(c => c.User(It.IsAny<string>())).Returns(_client.Object);
        _clients.Setup(c => c.Group(It.IsAny<string>())).Returns(_client.Object);
        _hub = new Mock<IHubContext<AppHub, IAppClient>>();
        _hub.SetupGet(h => h.Clients).Returns(_clients.Object);
        _sut = new PublishController(_hub.Object, NullLogger<PublishController>.Instance);
    }

    private static PublishRequest Request(NotificationTargetKind kind = NotificationTargetKind.User, string id = "user-1",
        string? topic = null, string type = "report-ready", string title = "Your report is ready", string? body = "Open it") =>
        new(kind, id, topic, type, title, body);

    [Test, Description("Constructor should throw when hub is null")]
    public void Constructor_ThrowsWhenHubIsNull()
    {
        Action act = () => _ = new PublishController(null!, NullLogger<PublishController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("hub");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new PublishController(_hub.Object, null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    // ---- validation

    [TestCase("", "report-ready", "Title")]
    [TestCase("  ", "report-ready", "Title")]
    [TestCase("user-1", "", "Title")]
    [TestCase("user-1", " ", "Title")]
    [TestCase("user-1", "report-ready", "")]
    [TestCase("user-1", "report-ready", "   ")]
    [Description("Publish should return 400 and send nothing when the id, type or title is blank")]
    public async Task Publish_RejectsABlankRequiredField(string id, string type, string title)
    {
        IActionResult result = await _sut.Publish(Request(id: id, type: type, title: title), Ct);

        result.Should().BeOfType<BadRequestObjectResult>();
        _client.Verify(c => c.ReceiveNotification(It.IsAny<Notification>()), Times.Never);
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("  ")]
    [Description("Publish should return 400 for a topic target that has no topic")]
    public async Task Publish_RejectsATopicTargetWithoutATopic(string? topic)
    {
        IActionResult result = await _sut.Publish(Request(NotificationTargetKind.Topic, "sales-west", topic), Ct);

        result.Should().BeOfType<BadRequestObjectResult>().Which.Value.Should().Be("A topic target needs a Topic.");
        _client.Verify(c => c.ReceiveNotification(It.IsAny<Notification>()), Times.Never);
    }

    [Test, Description("Publish should return 400 for a target kind it does not know")]
    public async Task Publish_RejectsAnUnknownTargetKind()
    {
        IActionResult result = await _sut.Publish(Request((NotificationTargetKind)99), Ct);

        result.Should().BeOfType<BadRequestObjectResult>();
        _client.Verify(c => c.ReceiveNotification(It.IsAny<Notification>()), Times.Never);
    }

    // ---- delivery

    [Test, Description("Publish should deliver to one user by id and return 202")]
    public async Task Publish_DeliversToAUser()
    {
        IActionResult result = await _sut.Publish(Request(NotificationTargetKind.User, "user-1"), Ct);

        result.Should().BeOfType<AcceptedResult>();
        _clients.Verify(c => c.User("user-1"), Times.Once);
        _clients.Verify(c => c.Group(It.IsAny<string>()), Times.Never);
    }

    [Test, Description("Publish should deliver to a group under its hub group name")]
    public async Task Publish_DeliversToAGroup()
    {
        IActionResult result = await _sut.Publish(Request(NotificationTargetKind.Group, "sales-west"), Ct);

        result.Should().BeOfType<AcceptedResult>();
        _clients.Verify(c => c.Group("group:sales-west"), Times.Once);
    }

    [Test, Description("Publish should deliver a topic to the subscribers of that topic inside the group")]
    public async Task Publish_DeliversToATopic()
    {
        IActionResult result = await _sut.Publish(Request(NotificationTargetKind.Topic, "sales-west", "orders"), Ct);

        result.Should().BeOfType<AcceptedResult>();
        _clients.Verify(c => c.Group("group:sales-west:topic:orders"), Times.Once);
    }

    [Test, Description("Publish should send the type, title and body it was given, stamped with the current time")]
    public async Task Publish_SendsTheNotification()
    {
        DateTimeOffset before = DateTimeOffset.UtcNow;

        await _sut.Publish(Request(type: "success", title: "Done", body: "All good"), Ct);

        _sent.Should().NotBeNull();
        _sent!.Type.Should().Be("success");
        _sent.Title.Should().Be("Done");
        _sent.Body.Should().Be("All good");
        _sent.At.Should().BeOnOrAfter(before).And.BeOnOrBefore(DateTimeOffset.UtcNow);
    }

    [Test, Description("Publish should accept a notification with no body")]
    public async Task Publish_AcceptsNoBody()
    {
        IActionResult result = await _sut.Publish(Request(body: null), Ct);

        result.Should().BeOfType<AcceptedResult>();
        _sent!.Body.Should().BeNull();
    }

    // ---- protection

    [Test, Description("The controller should demand the publish policy, so a user token cannot call it")]
    public void Controller_RequiresThePublishPolicy()
    {
        AuthorizeAttribute? attribute = typeof(PublishController).GetCustomAttribute<AuthorizeAttribute>();

        attribute.Should().NotBeNull();
        attribute!.Policy.Should().Be(HubPolicies.PUBLISH);
    }

    [Test, Description("The controller should be routed under api/publish and accept POST")]
    public void Controller_IsAPostUnderApiPublish()
    {
        typeof(PublishController).GetCustomAttribute<RouteAttribute>()!.Template.Should().Be("api/[controller]");
        typeof(PublishController).GetMethod(nameof(PublishController.Publish))!.GetCustomAttribute<HttpPostAttribute>().Should().NotBeNull();
    }
}
