using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Notifications;
using OI.Hub.Controllers;
using OI.Hub.Hubs;

namespace OI.Hub.Tests.ControllerTests;

[TestFixture, Description("Tests for the event and correlation id a published notification can carry")]
public class PublishControllerEventTests
{
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
        Mock<IHubClients<IAppClient>> clients = new();
        clients.Setup(c => c.User(It.IsAny<string>())).Returns(_client.Object);
        Mock<IHubContext<AppHub, IAppClient>> hub = new();
        hub.SetupGet(h => h.Clients).Returns(clients.Object);
        _sut = new PublishController(hub.Object, NullLogger<PublishController>.Instance);
    }

    [Test, Description("Publish should pass the event and the correlation id on to the browser")]
    public async Task Publish_PassesTheEventAndCorrelationIdOn()
    {
        PublishRequest request = new(NotificationTargetKind.User, "user-1", null, "success", "Estimate Generated", "Done",
            NotificationEvents.ReportReady, "3f2504e0-4f89-11d3-9a0c-0305e82c3301");

        IActionResult result = await _sut.Publish(request, Ct);

        result.Should().BeOfType<AcceptedResult>();
        _sent!.Event.Should().Be("report.ready");
        _sent.CorrelationId.Should().Be("3f2504e0-4f89-11d3-9a0c-0305e82c3301");
    }

    [Test, Description("Publish should leave the event and the correlation id empty for a plain message")]
    public async Task Publish_LeavesThemEmptyForAPlainMessage()
    {
        PublishRequest request = new(NotificationTargetKind.User, "user-1", null, "success", "Hello", "Body");

        await _sut.Publish(request, Ct);

        _sent!.Event.Should().BeNull();
        _sent.CorrelationId.Should().BeNull();
    }
}
