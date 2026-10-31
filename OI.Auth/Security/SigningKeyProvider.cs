using System.Security.Cryptography;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace OI.Auth.Security;

/// <summary>Holds the RSA key pair. Only this application ever sees the private half.</summary>
public sealed class SigningKeyProvider : IDisposable
{
    private readonly RSA _rsa;

    /// <summary>
    /// Gets the RSA security key used for signing JSON Web Tokens (JWTs).
    /// </summary>
    /// <remarks>
    /// This key is generated or imported during the initialization of the <see cref="SigningKeyProvider"/>.
    /// It is used in conjunction with the RS256 algorithm to ensure the integrity and authenticity of the tokens.
    /// </remarks>
    public RsaSecurityKey SigningKey { get; }

    /// <summary>
    /// Gets the unique identifier for the signing key, which is derived from the key's thumbprint.
    /// This identifier is used to match the key in the JSON Web Key Set (JWKS) document.
    /// </summary>
    public string KeyId { get; }

    /// <summary>
    /// Gets the public parameters of the RSA key pair used for signing tokens.
    /// These parameters include the modulus and exponent, which are used to verify
    /// the signatures of JSON Web Tokens (JWTs) issued by the application.
    /// </summary>
    public RSAParameters PublicParameters { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="SigningKeyProvider"/> class.
    /// </summary>
    /// <param name="options">The JWT options containing configuration values, including the signing key PEM.</param>
    /// <param name="environment">The host environment in which the application is running.</param>
    /// <param name="logger">The logger used to log warnings or errors during initialization.</param>
    /// <exception cref="InvalidOperationException">
    /// Thrown when the signing key PEM is not configured in a non-development environment,
    /// or when the signing key's size is less than 2048 bits.
    /// </exception>
    public SigningKeyProvider(IOptions<JwtOptions> options, IHostEnvironment environment, ILogger<SigningKeyProvider> logger)
    {
        string? pem = options.Value.SigningKeyPem?.Replace("\\n", "\n");
        _rsa = RSA.Create(2048);

        if (!string.IsNullOrWhiteSpace(pem))
        {
            _rsa.ImportFromPem(pem);
        }
        else if (environment.IsDevelopment())
        {
            logger.LogWarning("Jwt:SigningKeyPem is not set. Using a temporary key: tokens stop working when this application restarts.");
        }
        else
        {
            throw new InvalidOperationException("Jwt:SigningKeyPem must be configured outside Development.");
        }

        if (_rsa.KeySize < 2048)
        {
            throw new InvalidOperationException("The signing key must be at least 2048 bits.");
        }

        PublicParameters = _rsa.ExportParameters(false);
        KeyId = Base64UrlEncoder.Encode(new RsaSecurityKey(PublicParameters).ComputeJwkThumbprint());
        SigningKey = new RsaSecurityKey(_rsa) { KeyId = KeyId };
    }

    /// <summary>
    /// Releases all resources used by the <see cref="SigningKeyProvider"/> instance.
    /// </summary>
    public void Dispose() => _rsa.Dispose();
}
