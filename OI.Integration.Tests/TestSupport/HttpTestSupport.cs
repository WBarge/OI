using System.Net;
using System.Text;
using Moq;

namespace OI.Integration.Tests.TestSupport;

/// <summary>A clock the test can move by hand.</summary>
internal sealed class MovableClock(DateTimeOffset now) : TimeProvider
{
    public DateTimeOffset Now { get; set; } = now;

    public override DateTimeOffset GetUtcNow() => Now;
}

/// <summary>One request the stub handler saw, with its body already read (the request is disposed by the caller).</summary>
internal sealed record CapturedRequest(HttpMethod Method, Uri? Uri, string? AuthorizationScheme, string? AuthorizationParameter, string Body);

/// <summary>Answers every request with whatever the test supplies, and remembers what it was asked.</summary>
internal sealed class StubHttpHandler(Func<CapturedRequest, Task<HttpResponseMessage>> respond) : HttpMessageHandler
{
    private readonly List<CapturedRequest> _requests = [];
    private readonly object _lock = new();

    public IReadOnlyList<CapturedRequest> Requests
    {
        get { lock (_lock) return _requests.ToList(); }
    }

    public StubHttpHandler(Func<CapturedRequest, HttpResponseMessage> respond)
        : this(request => Task.FromResult(respond(request)))
    {
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        string body = request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken);
        CapturedRequest captured = new(request.Method, request.RequestUri,
            request.Headers.Authorization?.Scheme, request.Headers.Authorization?.Parameter, body);
        lock (_lock) _requests.Add(captured);
        return await respond(captured);
    }

    public static HttpResponseMessage Json(string json, HttpStatusCode status = HttpStatusCode.OK) =>
        new(status) { Content = new StringContent(json, Encoding.UTF8, "application/json") };
}

internal static class HttpTestSupport
{
    /// <summary>An IHttpClientFactory whose named client talks to the given handler.</summary>
    public static Mock<IHttpClientFactory> FactoryFor(string clientName, HttpMessageHandler handler, string baseAddress)
    {
        Mock<IHttpClientFactory> factory = new();
        factory.Setup(f => f.CreateClient(clientName)).Returns(() => new HttpClient(handler, disposeHandler: false)
        {
            BaseAddress = new Uri(baseAddress),
        });
        return factory;
    }

    /// <summary>An IHttpClientFactory that serves both OI clients, each from its own handler.</summary>
    public static IHttpClientFactory FactoryFor(HttpMessageHandler authHandler, HttpMessageHandler hubHandler)
    {
        Mock<IHttpClientFactory> factory = new();
        factory.Setup(f => f.CreateClient(IntegrationDi.AuthClient)).Returns(() => new HttpClient(authHandler, disposeHandler: false)
        {
            BaseAddress = new Uri("https://auth.test/"),
        });
        factory.Setup(f => f.CreateClient(IntegrationDi.HubClient)).Returns(() => new HttpClient(hubHandler, disposeHandler: false)
        {
            BaseAddress = new Uri("https://hub.test/"),
        });
        return factory.Object;
    }
}
