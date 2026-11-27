namespace OI.Auth.Oidc;

/// <summary>
/// One browser application that may sign people in through OI.Auth (a "Clients" entry). Addresses are matched
/// exactly: no wildcards.
/// </summary>
public sealed class ClientRegistration
{
    /// <summary>The client id the application sends, e.g. "oi-ui".</summary>
    public string ClientId { get; set; } = "";

    /// <summary>A readable name for the application.</summary>
    public string DisplayName { get; set; } = "";

    /// <summary>Where OI.Auth may send the browser back to after sign-in, e.g. http://localhost:4201/auth/callback.</summary>
    public string[] RedirectUris { get; set; } = [];

    /// <summary>Where OI.Auth may send the browser after sign-out, e.g. http://localhost:4201/signed-out.</summary>
    public string[] PostLogoutRedirectUris { get; set; } = [];

    /// <summary>Development tools only (postman-dev): may use the password grant when Oidc:PasswordGrantEnabled is on.</summary>
    public bool AllowPasswordGrant { get; set; }
}
