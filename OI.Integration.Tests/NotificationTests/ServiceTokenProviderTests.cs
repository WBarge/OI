using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using OI.Integration.Notifications;
using OI.Integration.Tests.TestSupport;

namespace OI.Integration.Tests.NotificationTests;

[TestFixture, Description("Tests for ServiceTokenProvider: getting and caching this application's service token from OI.Auth")]
public class ServiceTokenProviderTests
{
    private static readonly DateTimeOffset Start = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    private MovableClock _clock = null!;
    private int _tokenCounter;
    private DateTimeOffset _issuedExpiry;

    [SetUp]
    public void SetUp()
    {
        _clock = new MovableClock(Start);
        _tokenCounter = 0;
        _issuedExpiry = Start.AddMinutes(10);
    }

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private StubHttpHandler AuthServer() => new(_ =>
    {
        int number = Interlocked.Increment(ref _tokenCounter);
        return StubHttpHandler.Json($$"""{"accessToken":"token-{{number}}","accessTokenExpires":"{{_issuedExpiry:O}}"}""");
    });

    private ServiceTokenProvider Create(StubHttpHandler handler, string clientId = "oi-reporting", string clientSecret = "secret-value")
    {
        Mock<IHttpClientFactory> factory = HttpTestSupport.FactoryFor(IntegrationDi.AuthClient, handler, "https://auth.test/");
        IOptions<IntegrationOptions> options = Options.Create(new IntegrationOptions { ClientId = clientId, ClientSecret = clientSecret });
        return new ServiceTokenProvider(factory.Object, options, _clock);
    }

    // ---- configuration

    [TestCase("", "secret")]
    [TestCase("  ", "secret")]
    [TestCase("oi-reporting", "")]
    [TestCase("oi-reporting", "   ")]
    [TestCase("", "")]
    [Description("GetTokenAsync should refuse to call OI.Auth when the client id or secret is not configured")]
    public async Task GetTokenAsync_ThrowsWhenNotConfigured(string clientId, string clientSecret)
    {
        StubHttpHandler handler = AuthServer();
        ServiceTokenProvider sut = Create(handler, clientId, clientSecret);

        Func<Task> act = () => sut.GetTokenAsync(Ct);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("*Integration:ClientId*");
        handler.Requests.Should().BeEmpty("an unconfigured application has nothing to send");
    }

    // ---- fetching

    [Test, Description("GetTokenAsync should post the client id and secret to the auth service token endpoint")]
    public async Task GetTokenAsync_PostsTheClientCredentials()
    {
        StubHttpHandler handler = AuthServer();

        await Create(handler).GetTokenAsync(Ct);

        CapturedRequest request = handler.Requests.Should().ContainSingle().Subject;
        request.Method.Should().Be(HttpMethod.Post);
        request.Uri.Should().Be(new Uri("https://auth.test/api/auth/service-token"));
        using JsonDocument body = JsonDocument.Parse(request.Body);
        body.RootElement.GetProperty("clientId").GetString().Should().Be("oi-reporting");
        body.RootElement.GetProperty("clientSecret").GetString().Should().Be("secret-value");
    }

    [Test, Description("GetTokenAsync should return the access token the auth service gives")]
    public async Task GetTokenAsync_ReturnsTheAccessToken()
    {
        string token = await Create(AuthServer()).GetTokenAsync(Ct);

        token.Should().Be("token-1");
    }

    [Test, Description("GetTokenAsync should throw when the auth service answers with an error")]
    public async Task GetTokenAsync_ThrowsWhenTheAuthServiceRejects()
    {
        StubHttpHandler handler = new(_ => new HttpResponseMessage(HttpStatusCode.Unauthorized));

        Func<Task> act = () => Create(handler).GetTokenAsync(Ct);

        await act.Should().ThrowAsync<HttpRequestException>();
    }

    [Test, Description("GetTokenAsync should throw when the auth service answers with an empty body")]
    public async Task GetTokenAsync_ThrowsWhenTheBodyIsEmpty()
    {
        StubHttpHandler handler = new(_ => StubHttpHandler.Json("null"));

        Func<Task> act = () => Create(handler).GetTokenAsync(Ct);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("*Empty response*");
    }

    [Test, Description("GetTokenAsync should try again on the next call after a failure, instead of remembering the failure")]
    public async Task GetTokenAsync_RetriesAfterAFailure()
    {
        int calls = 0;
        StubHttpHandler handler = new(_ => ++calls == 1
            ? new HttpResponseMessage(HttpStatusCode.ServiceUnavailable)
            : StubHttpHandler.Json($$"""{"accessToken":"recovered","accessTokenExpires":"{{Start.AddMinutes(10):O}}"}"""));
        ServiceTokenProvider sut = Create(handler);

        Func<Task> first = () => sut.GetTokenAsync(Ct);
        await first.Should().ThrowAsync<HttpRequestException>();
        string token = await sut.GetTokenAsync(Ct);

        token.Should().Be("recovered");
        handler.Requests.Should().HaveCount(2);
    }

    [Test, Description("GetTokenAsync should stop waiting when it is cancelled")]
    public async Task GetTokenAsync_HonoursCancellation()
    {
        using CancellationTokenSource cancelled = new();
        await cancelled.CancelAsync();
        ServiceTokenProvider sut = Create(AuthServer());

        Func<Task> act = () => sut.GetTokenAsync(cancelled.Token);

        await act.Should().ThrowAsync<OperationCanceledException>();
    }

    // ---- caching

    [Test, Description("GetTokenAsync should reuse the token while it is fresh")]
    public async Task GetTokenAsync_CachesAFreshToken()
    {
        StubHttpHandler handler = AuthServer();
        ServiceTokenProvider sut = Create(handler);

        string first = await sut.GetTokenAsync(Ct);
        _clock.Now = Start.AddMinutes(5);
        string second = await sut.GetTokenAsync(Ct);

        second.Should().Be(first);
        handler.Requests.Should().ContainSingle("a fresh token needs no second round trip");
    }

    [Test, Description("GetTokenAsync should still reuse the token just before the one-minute renewal margin")]
    public async Task GetTokenAsync_StillCachesJustBeforeTheMargin()
    {
        StubHttpHandler handler = AuthServer();
        ServiceTokenProvider sut = Create(handler);
        await sut.GetTokenAsync(Ct);

        _clock.Now = _issuedExpiry.AddSeconds(-61);
        await sut.GetTokenAsync(Ct);

        handler.Requests.Should().ContainSingle();
    }

    [Test, Description("GetTokenAsync should fetch a new token once it is within a minute of expiring, so none expires in flight")]
    public async Task GetTokenAsync_RenewsAMinuteEarly()
    {
        StubHttpHandler handler = AuthServer();
        ServiceTokenProvider sut = Create(handler);
        string first = await sut.GetTokenAsync(Ct);

        _clock.Now = _issuedExpiry.AddSeconds(-60);
        string second = await sut.GetTokenAsync(Ct);

        second.Should().NotBe(first);
        handler.Requests.Should().HaveCount(2);
    }

    [Test, Description("GetTokenAsync should fetch a new token after the old one has expired")]
    public async Task GetTokenAsync_RenewsAnExpiredToken()
    {
        StubHttpHandler handler = AuthServer();
        ServiceTokenProvider sut = Create(handler);
        await sut.GetTokenAsync(Ct);

        _clock.Now = _issuedExpiry.AddMinutes(1);
        string renewed = await sut.GetTokenAsync(Ct);

        renewed.Should().Be("token-2");
    }

    [Test, Description("GetTokenAsync should make one request when many callers ask at the same time")]
    public async Task GetTokenAsync_MakesOneRequestForConcurrentCallers()
    {
        StubHttpHandler handler = new(async _ =>
        {
            await Task.Delay(100);
            int number = Interlocked.Increment(ref _tokenCounter);
            return StubHttpHandler.Json($$"""{"accessToken":"token-{{number}}","accessTokenExpires":"{{_issuedExpiry:O}}"}""");
        });
        ServiceTokenProvider sut = Create(handler);

        string[] tokens = await Task.WhenAll(Enumerable.Range(0, 8).Select(_ => sut.GetTokenAsync(Ct)));

        handler.Requests.Should().ContainSingle("the callers should wait for the first request rather than all asking Auth");
        tokens.Should().OnlyContain(t => t == "token-1");
    }
}
