using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Notifications;
using OI.Glue.Security;
using OI.Reporting.Controllers;

namespace OI.Reporting.Tests.ControllerTests;

[TestFixture, Description("Tests for NotificationTestController")]
public class NotificationTestControllerTests
{
    private Mock<IClientContext> _clientContext = null!;
    private Mock<INotificationPublisher> _publisher = null!;
    private NotificationTestController _sut = null!;

    [SetUp]
    public void SetUp()
    {
        _clientContext = new Mock<IClientContext>();
        _clientContext.SetupGet(c => c.IsAuthenticated).Returns(true);
        _clientContext.SetupGet(c => c.UserId).Returns("user-1");
        _publisher = new Mock<INotificationPublisher>();
        _publisher
            .Setup(p => p.PublishAsync(It.IsAny<NotificationTarget>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);
        _sut = new NotificationTestController(_clientContext.Object, _publisher.Object, NullLogger<NotificationTestController>.Instance);
    }

    [Test, Description("Constructor should throw when clientContext is null")]
    public void Constructor_ThrowsWhenClientContextIsNull()
    {
        Action act = () => _ = new NotificationTestController(null!, _publisher.Object, NullLogger<NotificationTestController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("clientContext");
    }

    [Test, Description("Constructor should throw when notificationPublisher is null")]
    public void Constructor_ThrowsWhenPublisherIsNull()
    {
        Action act = () => _ = new NotificationTestController(_clientContext.Object, null!, NullLogger<NotificationTestController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("notificationPublisher");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new NotificationTestController(_clientContext.Object, _publisher.Object, null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("Send should return 200 OK when the hub accepts the message")]
    public async Task Send_Returns200WhenTheHubAcceptsTheMessage()
    {
        IActionResult result = await _sut.Send(TestContext.CurrentContext.CancellationToken);

        OkObjectResult ok = result.Should().BeOfType<OkObjectResult>().Subject;
        ok.StatusCode.Should().Be(StatusCodes.Status200OK);
        ok.Value.Should().BeEquivalentTo(new { sent = true });
    }

    [Test, Description("Send should address the message to the user who called, so nobody else receives it")]
    public async Task Send_AddressesTheMessageToTheCaller()
    {
        await _sut.Send(TestContext.CurrentContext.CancellationToken);

        _publisher.Verify(p => p.PublishAsync(
            NotificationTarget.User("user-1"),
            It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("Send should send the fixed test message")]
    public async Task Send_SendsTheFixedMessage()
    {
        await _sut.Send(TestContext.CurrentContext.CancellationToken);

        _publisher.Verify(p => p.PublishAsync(
            It.IsAny<NotificationTarget>(),
            NotificationTestController.MessageType,
            NotificationTestController.MessageTitle,
            NotificationTestController.MessageBody,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("Send should send exactly one message per call")]
    public async Task Send_SendsOneMessage()
    {
        await _sut.Send(TestContext.CurrentContext.CancellationToken);

        _publisher.Verify(p => p.PublishAsync(
            It.IsAny<NotificationTarget>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("Send should pass the request's cancellation token on to the hub call")]
    public async Task Send_PassesTheCancellationTokenOn()
    {
        using CancellationTokenSource source = new();

        await _sut.Send(source.Token);

        _publisher.Verify(p => p.PublishAsync(
            It.IsAny<NotificationTarget>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), source.Token), Times.Once);
    }

    [Test, Description("Send should return 503 when the hub could not be reached")]
    public async Task Send_Returns503WhenTheHubIsUnavailable()
    {
        _publisher
            .Setup(p => p.PublishAsync(It.IsAny<NotificationTarget>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        IActionResult result = await _sut.Send(TestContext.CurrentContext.CancellationToken);

        ObjectResult objectResult = result.Should().BeOfType<ObjectResult>().Subject;
        objectResult.StatusCode.Should().Be(StatusCodes.Status503ServiceUnavailable);
    }

    [Test, Description("Send should return 401 and send nothing when there is no signed-in user")]
    public async Task Send_Returns401WhenNobodyIsSignedIn()
    {
        _clientContext.SetupGet(c => c.IsAuthenticated).Returns(false);
        _clientContext.SetupGet(c => c.UserId).Returns(string.Empty);

        IActionResult result = await _sut.Send(TestContext.CurrentContext.CancellationToken);

        result.Should().BeOfType<UnauthorizedResult>();
        _publisher.Verify(p => p.PublishAsync(
            It.IsAny<NotificationTarget>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("The fixed message should have a type the UI turns into a toast, a title and some text")]
    public void TheFixedMessage_IsComplete()
    {
        NotificationTestController.MessageType.Should().Be("success");
        NotificationTestController.MessageTitle.Should().NotBeNullOrWhiteSpace();
        NotificationTestController.MessageBody.Should().NotBeNullOrWhiteSpace();
    }
}
