namespace OI.Auth.Security;

/// <summary>
/// Represents the configuration options for JSON Web Tokens (JWT) used in the application.
/// </summary>
public sealed class JwtOptions
{
    /// <summary>
    /// 
    /// </summary>
    public const string SECTION = "Jwt";

    /// <summary>
    /// The address of this application,
    /// e.g. https://localhost:7300.
    /// Must equal "Auth:Authority" in every other application.
    /// </summary>
    public string Issuer { get; set; } = "";

    /// <summary>
    /// Gets or sets the intended audience for the JSON Web Token (JWT).
    /// This value is used to validate the "aud" (audience) claim in the token,
    /// ensuring that the token is meant for the specified recipient.
    /// </summary>
    public string Audience { get; set; } = "oi";

    /// <summary>
    /// Gets or sets the duration, in minutes, for which an access token remains valid.
    /// </summary>
    /// <value>
    /// The number of minutes an access token is valid before it expires. The default value is 15 minutes.
    /// </value>
    public int AccessTokenMinutes { get; set; } = 15;

    /// <summary>
    /// Gets or sets the duration, in minutes, for which a service token remains valid.
    /// </summary>
    /// <remarks>
    /// This property determines the lifetime of a service token issued for service clients.
    /// It is used when generating tokens to specify their expiration time.
    /// </remarks>
    public int ServiceTokenMinutes { get; set; } = 10;

    /// <summary>
    /// Gets or sets the number of days a refresh token remains valid.
    /// </summary>
    /// <value>
    /// An integer representing the lifetime of a refresh token in days. 
    /// The default value is 7 days.
    /// </value>
    public int RefreshTokenDays { get; set; } = 7;

    /// <summary>
    /// RSA private key in PEM form (2048 bits or more). Keep it in user-secrets or an environment variable.
    /// A "\n" in the value is treated as a line break so it fits on one line.
    /// In Development only, a temporary key is generated if this is empty.
    /// </summary>
    public string? SigningKeyPem { get; set; }
}
