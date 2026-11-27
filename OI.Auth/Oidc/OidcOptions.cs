namespace OI.Auth.Oidc;

/// <summary>
/// The "Oidc" settings section: how people sign in through OI.Auth. The token lifetimes, issuer and signing key are
/// the existing "Jwt" settings; the browser applications that may sign in are the "Clients" section.
/// </summary>
public sealed class OidcOptions
{
    /// <summary>The configuration section these settings are read from.</summary>
    public const string SECTION = "Oidc";

    /// <summary>
    /// How long the OI.Auth sign-in cookie lasts, in hours (sliding: it is extended while the person keeps coming back).
    /// While it is valid, opening another tab or the other application signs in without asking for a password.
    /// A tab that is already signed in keeps working through its refresh token whether or not this cookie is still valid.
    /// </summary>
    public int SessionHours { get; set; } = 8;

    /// <summary>
    /// 256-bit key (32 random bytes, Base64) that protects authorization codes and refresh tokens. Every OI.Auth
    /// instance must have the same value. Keep it in user-secrets or an environment variable.
    /// In Development only, a temporary key is generated if this is empty (tokens stop working when OI.Auth restarts).
    /// </summary>
    public string? EncryptionKey { get; set; }

    /// <summary>
    /// Development only: lets a client that is marked AllowPasswordGrant (e.g. postman-dev) trade an email and
    /// password for tokens at /connect/token, so the APIs can be tested without a browser. Default off. It is
    /// ignored outside Development, whatever this says.
    /// </summary>
    public bool PasswordGrantEnabled { get; set; }
}

/// <summary>The "Branding" settings section: what the login page shows.</summary>
public sealed class BrandingOptions
{
    /// <summary>The configuration section these settings are read from.</summary>
    public const string SECTION = "Branding";

    /// <summary>
    /// The address of the company logo, e.g. https://localhost:7267/api/CompanyProfile/logo (the anonymous logo endpoint
    /// in OI.Reporting). Empty means the login page shows no logo. The browser loads it directly.
    /// </summary>
    public string? LogoUrl { get; set; }
}

/// <summary>The "ForwardedHeaders" settings section: which load balancer or gateway OI.Auth may believe about the address the browser used.</summary>
public sealed class ForwardedHeadersSettings
{
    /// <summary>The configuration section these settings are read from.</summary>
    public const string SECTION = "ForwardedHeaders";

    /// <summary>IP addresses of the load balancers or gateways in front of OI.Auth, e.g. "10.0.0.5".</summary>
    public string[] KnownProxies { get; set; } = [];

    /// <summary>Address ranges (CIDR) the load balancers or gateways are in, e.g. "10.0.0.0/24".</summary>
    public string[] KnownNetworks { get; set; } = [];

    /// <summary>True when at least one proxy or network is listed. Otherwise the X-Forwarded-* headers are ignored.</summary>
    public bool Enabled => KnownProxies.Length > 0 || KnownNetworks.Length > 0;
}
