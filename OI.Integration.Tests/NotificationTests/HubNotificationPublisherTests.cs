using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using OI.Glue.Notifications;
using OI.Integration.Notifications;
using OI.Integration.Tests.TestSupport;

namespace OI.Integration.Tests.NotificationTests;

[TestFixture, Description("Tests for HubNotificationPublisher: sending a notification to the central hub")]
public class HubNotificationPublisherTests
{
    private static readonly DateTimeOffset Now = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    private StubHttpHandler _auth = null!;
    private StubHttpHandler _hub = null!;
    private Func<CapturedRequest, HttpResponseMessage> _hubAnswer = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _auth = new StubHttpHandler(_ => StubHttpHandler.Json($$"""{"accessToken":"service-token","accessTokenExpires":"{{Now.AddMinutes(10):O}}"}"""));
        _hubAnswer = _ => new HttpResponseMessage(HttpStatusCode.Accepted);
        _hub = new StubHttpHandler(request => _hubAnswer(request));
    }

    [TearDown]
    public void TearDown()
    {
        _auth.Dispose();
        _hub.Dispose();
    }

    private HubNotificationPublisher Create(ILogger<HubNotificationPublisher>? logger = null)
    {
        IHttpClientFactory factory = HttpTestSupport.FactoryFor(_auth, _hub);
        ServiceTokenProvider tokens = new(factory,
            Options.Create(new IntegrationOptions { ClientId = "oi-reporting", ClientSecret = "secret-value" }), new MovableClock(Now));
        return new HubNotificationPublisher(factory, tokens, logger ?? NullLogger<HubNotificationPublisher>.Instance);
    }

    // ---- the request

    [Test, Description("PublishAsync should post to the hub's publish endpoint")]
    public async Task PublishAsync_PostsToThePublishEndpoint()
    {
        await Create().PublishAsync(NotificationTarget.User("user-1"), "report-ready", "Your report is ready", cancellationToken: Ct);

        CapturedRequest request = _hub.Requests.Should().ContainSingle().Subject;
        request.Method.Should().Be(HttpMethod.Post);
        request.Uri.Should().Be(new Uri("https://hub.test/api/publish"));
    }

    [Test, Description("PublishAsync should send this application's service token as a bearer token")]
    public async Task PublishAsync_SendsTheServiceTokenAsABearerToken()
    {
        await Create().PublishAsync(NotificationTarget.User("user-1"), "report-ready", "Done", cancellationToken: Ct);

        CapturedRequest request = _hub.Requests.Single();
        request.AuthorizationScheme.Should().Be("Bearer");
        request.AuthorizationParameter.Should().Be("service-token");
    }

    [Test, Description("PublishAsync should send the user target, type, title and body, with the target kind as text")]
    public async Task PublishAsync_SendsTheUserTargetAndMessage()
    {
        await Create().PublishAsync(NotificationTarget.User("user-1"), "report-ready", "Your report is ready", "Open it from the list", Ct);

        using JsonDocument body = JsonDocument.Parse(_hub.Requests.Single().Body);
        body.RootElement.GetProperty("kind").GetString().Should().Be("User");
        body.RootElement.GetProperty("id").GetString().Should().Be("user-1");
        body.RootElement.GetProperty("type").GetString().Should().Be("report-ready");
        body.RootElement.GetProperty("title").GetString().Should().Be("Your report is ready");
        body.RootElement.GetProperty("body").GetString().Should().Be("Open it from the list");
    }

    [Test, Description("PublishAsync should send a group target with no topic")]
    public async Task PublishAsync_SendsAGroupTarget()
    {
        await Create().PublishAsync(NotificationTarget.Group("sales-west"), "info", "Hello", cancellationToken: Ct);

        using JsonDocument body = JsonDocument.Parse(_hub.Requests.Single().Body);
        body.RootElement.GetProperty("kind").GetString().Should().Be("Group");
        body.RootElement.GetProperty("id").GetString().Should().Be("sales-west");
        body.RootElement.GetProperty("topic").ValueKind.Should().Be(JsonValueKind.Null);
        body.RootElement.GetProperty("body").ValueKind.Should().Be(JsonValueKind.Null);
    }

    [Test, Description("PublishAsync should send a topic target with the group and the topic")]
    public async Task PublishAsync_SendsATopicTarget()
    {
        await Create().PublishAsync(NotificationTarget.GroupTopic("sales-west", "orders"), "info", "Hello", cancellationToken: Ct);

        using JsonDocument body = JsonDocument.Parse(_hub.Requests.Single().Body);
        body.RootElement.GetProperty("kind").GetString().Should().Be("Topic");
        body.RootElement.GetProperty("id").GetString().Should().Be("sales-west");
        body.RootElement.GetProperty("topic").GetString().Should().Be("orders");
    }

    [Test, Description("PublishAsync should reuse the cached service token for later notifications")]
    public async Task PublishAsync_ReusesTheServiceToken()
    {
        HubNotificationPublisher sut = Create();

        await sut.PublishAsync(NotificationTarget.User("user-1"), "a", "First", cancellationToken: Ct);
        await sut.PublishAsync(NotificationTarget.User("user-1"), "b", "Second", cancellationToken: Ct);

        _auth.Requests.Should().ContainSingle("one token serves both notifications");
        _hub.Requests.Should().HaveCount(2);
    }

    // ---- the outcome

    [Test, Description("PublishAsync should return true when the hub accepts the notification")]
    public async Task PublishAsync_ReturnsTrueWhenAccepted()
    {
        bool result = await Create().PublishAsync(NotificationTarget.User("user-1"), "a", "Hello", cancellationToken: Ct);

        result.Should().BeTrue();
    }

    [TestCase(HttpStatusCode.BadRequest)]
    [TestCase(HttpStatusCode.Unauthorized)]
    [TestCase(HttpStatusCode.Forbidden)]
    [TestCase(HttpStatusCode.InternalServerError)]
    [Description("PublishAsync should return false, not throw, when the hub rejects the notification")]
    public async Task PublishAsync_ReturnsFalseWhenTheHubRejects(HttpStatusCode status)
    {
        _hubAnswer = _ => new HttpResponseMessage(status);

        bool result = await Create().PublishAsync(NotificationTarget.User("user-1"), "a", "Hello", cancellationToken: Ct);

        result.Should().BeFalse("a hub problem must never fail the business operation that asked for the notification");
    }

    [Test, Description("PublishAsync should log a warning when the hub rejects the notification")]
    public async Task PublishAsync_LogsAWarningWhenTheHubRejects()
    {
        _hubAnswer = _ => new HttpResponseMessage(HttpStatusCode.Forbidden);
        Mock<ILogger<HubNotificationPublisher>> logger = new();

        await Create(logger.Object).PublishAsync(NotificationTarget.User("user-1"), "a", "Hello", cancellationToken: Ct);

        logger.Verify(l => l.Log(LogLevel.Warning, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(),
            It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }

    [Test, Description("PublishAsync should return false, not throw, when the hub cannot be reached")]
    public async Task PublishAsync_ReturnsFalseWhenTheHubIsUnreachable()
    {
        _hub = new StubHttpHandler((Func<CapturedRequest, HttpResponseMessage>)(_ => throw new HttpRequestException("connection refused")));
        Mock<ILogger<HubNotificationPublisher>> logger = new();

        bool result = await Create(logger.Object).PublishAsync(NotificationTarget.User("user-1"), "a", "Hello", cancellationToken: Ct);

        result.Should().BeFalse();
        logger.Verify(l => l.Log(LogLevel.Warning, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(),
            It.IsAny<HttpRequestException>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }

    [Test, Description("PublishAsync should return false, not throw, when OI.Auth cannot be reached for a token")]
    public async Task PublishAsync_ReturnsFalseWhenAuthIsUnreachable()
    {
        _auth = new StubHttpHandler((Func<CapturedRequest, HttpResponseMessage>)(_ => throw new HttpRequestException("auth is down")));

        bool result = await Create().PublishAsync(NotificationTarget.User("user-1"), "a", "Hello", cancellationToken: Ct);

        result.Should().BeFalse();
        _hub.Requests.Should().BeEmpty("without a token there is nothing to send");
    }

    [Test, Description("PublishAsync should return false when OI.Auth refuses to give a token")]
    public async Task PublishAsync_ReturnsFalseWhenAuthRefuses()
    {
        _auth = new StubHttpHandler(_ => new HttpResponseMessage(HttpStatusCode.Unauthorized));

        bool result = await Create().PublishAsync(NotificationTarget.User("user-1"), "a", "Hello", cancellationToken: Ct);

        result.Should().BeFalse();
    }
}
