namespace OI.Integration.Notifications;

/// <summary>This application's own identity when it calls other OI applications. Section "Integration".</summary>
public sealed class IntegrationOptions
{
    public string ClientId { get; set; } = "";
    public string ClientSecret { get; set; } = "";
}
