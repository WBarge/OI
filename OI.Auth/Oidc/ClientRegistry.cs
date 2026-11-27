namespace OI.Auth.Oidc;

/// <summary>
/// The applications allowed to sign people in, read from the "Clients" section (the same way ServiceClientRegistry
/// reads "ServiceClients"). At start-up they are copied into OpenIddict's applications table (see ClientSynchronizer).
/// </summary>
public sealed class ClientRegistry(IConfiguration configuration)
{
    /// <summary>The configuration section the clients are read from.</summary>
    public const string SECTION = "Clients";

    /// <summary>Every registered client.</summary>
    public IReadOnlyList<ClientRegistration> Clients { get; } =
        configuration.GetSection(SECTION).Get<List<ClientRegistration>>() ?? [];

    /// <summary>True when the client exists and is marked for the (Development only) password grant.</summary>
    public bool AllowsPasswordGrant(string? clientId) =>
        !string.IsNullOrEmpty(clientId)
        && Clients.Any(c => c.AllowPasswordGrant && string.Equals(c.ClientId, clientId, StringComparison.Ordinal));

    /// <summary>
    /// The browser origins (scheme, host and port) of every registered address. OI.Auth's CORS policy allows exactly these,
    /// because the browser applications call the token, discovery and administration endpoints directly.
    /// </summary>
    public string[] AllowedOrigins() =>
        Clients
            .SelectMany(c => c.RedirectUris.Concat(c.PostLogoutRedirectUris))
            .Select(TryGetOrigin)
            .OfType<string>()
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

    private static string? TryGetOrigin(string address) =>
        Uri.TryCreate(address, UriKind.Absolute, out Uri? uri) ? uri.GetLeftPart(UriPartial.Authority) : null;
}
