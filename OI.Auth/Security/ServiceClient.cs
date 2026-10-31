namespace OI.Auth.Security;

/// <summary>
/// One OI application that may ask for a service token.
/// </summary>
public sealed class ServiceClient
{
    /// <summary>
    /// Gets or sets the unique identifier for the service client.
    /// </summary>
    /// <remarks>
    /// This identifier is used to distinguish the service client and is typically included in tokens or requests
    /// to identify the client making the request.
    /// </remarks>
    public string ClientId { get; set; } = "";

    /// <summary>
    /// Gets or sets the secret associated with the service client.
    /// This secret is used for authentication and should be stored securely.
    /// </summary>
    public string Secret { get; set; } = "";
    /// <summary>
    /// What the application may do, e.g. "hub:publish".
    /// </summary>
    public List<string> Scopes { get; set; } = [];
}