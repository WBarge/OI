using System.Net.Http.Json;
using Microsoft.Extensions.Options;

namespace OI.Integration.Notifications;

/// <summary>Gets and caches this application's service token from OI.Auth (client credentials).</summary>
public sealed class ServiceTokenProvider(IHttpClientFactory httpClientFactory, IOptions<IntegrationOptions> options, TimeProvider clock)
{
    private sealed record TokenResponse(string AccessToken, DateTimeOffset AccessTokenExpires);

    private readonly SemaphoreSlim _gate = new(1, 1);
    private string? _token;
    private DateTimeOffset _expires;

    public async Task<string> GetTokenAsync(CancellationToken cancellationToken = default)
    {
        if (IsFresh()) return _token!;

        await _gate.WaitAsync(cancellationToken);
        try
        {
            if (IsFresh()) return _token!;

            IntegrationOptions o = options.Value;
            if (string.IsNullOrWhiteSpace(o.ClientId) || string.IsNullOrWhiteSpace(o.ClientSecret))
            {
                throw new InvalidOperationException("Integration:ClientId and Integration:ClientSecret are not configured.");
            }

            HttpClient client = httpClientFactory.CreateClient(IntegrationDi.AuthClient);
            using HttpResponseMessage response = await client.PostAsJsonAsync(
                "api/auth/service-token", new { clientId = o.ClientId, clientSecret = o.ClientSecret }, cancellationToken);
            response.EnsureSuccessStatusCode();

            TokenResponse body = await response.Content.ReadFromJsonAsync<TokenResponse>(cancellationToken)
                ?? throw new InvalidOperationException("Empty response from the auth service.");
            _token = body.AccessToken;
            _expires = body.AccessTokenExpires;
            return _token;
        }
        finally
        {
            _gate.Release();
        }
    }

    // Renew a minute early so a token never expires in flight.
    private bool IsFresh() => _token is not null && clock.GetUtcNow() < _expires.AddSeconds(-60);
}
