using Microsoft.Extensions.Options;

namespace OI.Auth.Oidc;

/// <summary>
/// The locks on the password grant (the Development-only way to get a token without a browser, for Postman). All three
/// must be open: the application runs in Development, <c>Oidc:PasswordGrantEnabled</c> is on, and the calling client is
/// one marked <c>AllowPasswordGrant</c>. Outside Development it is closed whatever the settings say.
/// </summary>
public sealed class PasswordGrantGate(IHostEnvironment environment, IOptions<OidcOptions> options, ClientRegistry clients)
{
    /// <summary>True when the password grant may be used by this client right now.</summary>
    public bool IsOpenFor(string? clientId) =>
        environment.IsDevelopment()
        && options.Value.PasswordGrantEnabled
        && clients.AllowsPasswordGrant(clientId);
}
