using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using OI.Glue.Notifications;
using OI.Integration.Notifications;
using OI.Integration.Tests.TestSupport;

namespace OI.Integration.Tests.NotificationTests;

[TestFixture, Description("Tests for HubNotificationPublisher sending an event and a correlation id with a notification")]
public class HubNotificationPublisherEventTests
{
    private static readonly DateTimeOffset Now = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    private StubHttpHandler _auth = null!;
    private StubHttpHandler _hub = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _auth = new StubHttpHandler(_ => StubHttpHandler.Json($$"""{"accessToken":"service-token","accessTokenExpires":"{{Now.AddMinutes(10):O}}"}"""));
        _hub = new StubHttpHandler(_ => new HttpResponseMessage(HttpStatusCode.Accepted));
    }

    [TearDown]
    public void TearDown()
    {
        _auth.Dispose();
        _hub.Dispose();
    }

    private HubNotificationPublisher Create()
    {
        IHttpClientFactory factory = HttpTestSupport.FactoryFor(_auth, _hub);
        ServiceTokenProvider tokens = new(factory,
            Options.Create(new IntegrationOptions { ClientId = "oi-reporting", ClientSecret = "secret-value" }), new MovableClock(Now));
        return new HubNotificationPublisher(factory, tokens, NullLogger<HubNotificationPublisher>.Instance);
    }

    [Test, Description("PublishEventAsync should send the event name and the correlation id along with the message")]
    public async Task PublishEventAsync_SendsTheEventAndCorrelationId()
    {
        bool result = await Create().PublishEventAsync(NotificationTarget.User("user-1"), "success", "Estimate Generated", "Done",
            NotificationEvents.ReportReady, "3f2504e0-4f89-11d3-9a0c-0305e82c3301", Ct);

        result.Should().BeTrue();
        using JsonDocument body = JsonDocument.Parse(_hub.Requests.Single().Body);
        body.RootElement.GetProperty("id").GetString().Should().Be("user-1");
        body.RootElement.GetProperty("type").GetString().Should().Be("success");
        body.RootElement.GetProperty("title").GetString().Should().Be("Estimate Generated");
        body.RootElement.GetProperty("body").GetString().Should().Be("Done");
        body.RootElement.GetProperty("event").GetString().Should().Be("report.ready");
        body.RootElement.GetProperty("correlationId").GetString().Should().Be("3f2504e0-4f89-11d3-9a0c-0305e82c3301");
    }

    [Test, Description("PublishAsync should send no event and no correlation id for a plain message")]
    public async Task PublishAsync_SendsNoEventForAPlainMessage()
    {
        await Create().PublishAsync(NotificationTarget.User("user-1"), "info", "Hello", cancellationToken: Ct);

        using JsonDocument body = JsonDocument.Parse(_hub.Requests.Single().Body);
        (!body.RootElement.TryGetProperty("event", out JsonElement eventName) || eventName.ValueKind == JsonValueKind.Null).Should().BeTrue();
        (!body.RootElement.TryGetProperty("correlationId", out JsonElement correlationId) || correlationId.ValueKind == JsonValueKind.Null).Should().BeTrue();
    }

    [Test, Description("PublishEventAsync should return false, not throw, when the hub rejects the notification")]
    public async Task PublishEventAsync_ReturnsFalseWhenTheHubRejects()
    {
        _hub.Dispose();
        _hub = new StubHttpHandler(_ => new HttpResponseMessage(HttpStatusCode.Forbidden));

        bool result = await Create().PublishEventAsync(NotificationTarget.User("user-1"), "success", "Done", null,
            NotificationEvents.ReportReady, "id-1", Ct);

        result.Should().BeFalse();
    }
}
