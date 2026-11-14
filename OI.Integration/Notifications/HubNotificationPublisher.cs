using System.Net.Http.Headers;
using Microsoft.Extensions.Logging;
using OI.Glue.Notifications;

namespace OI.Integration.Notifications;

/// <summary>
/// Sends a notification to the central OI.Hub over HTTP using this application's service token.
/// </summary>
public sealed class HubNotificationPublisher(
    IHttpClientFactory httpClientFactory,
    ServiceTokenProvider tokens,
    ILogger<HubNotificationPublisher> logger) : INotificationPublisher
{
    public Task<bool> PublishAsync(NotificationTarget target, string type, string title, string? body = null,
        CancellationToken cancellationToken = default)
        => SendAsync(target, type, title, body, null, null, cancellationToken);

    public Task<bool> PublishEventAsync(NotificationTarget target, string type, string title, string? body,
        string eventName, string correlationId, CancellationToken cancellationToken = default)
        => SendAsync(target, type, title, body, eventName, correlationId, cancellationToken);

    private async Task<bool> SendAsync(NotificationTarget target, string type, string title, string? body,
        string? eventName, string? correlationId, CancellationToken cancellationToken)
    {
        try
        {
            string token = await tokens.GetTokenAsync(cancellationToken);
            HttpClient client = httpClientFactory.CreateClient(IntegrationDi.HubClient);

            using HttpRequestMessage request = new(HttpMethod.Post, "api/publish")
            {
                Content = JsonContent.Create(new PublishRequest(target.Kind, target.Id, target.Topic, type, title, body, eventName, correlationId)),
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            using HttpResponseMessage response = await client.SendAsync(request, cancellationToken);
            if (response.IsSuccessStatusCode) return true;

            logger.LogWarning("The hub rejected a notification: {Status}", (int)response.StatusCode);
            return false;
        }
        catch (HttpRequestException ex)
        {
            logger.LogWarning(ex, "Could not reach the hub; notification dropped");
            return false;
        }
    }
}
