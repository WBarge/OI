using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace OI.Auth.Security;

/// <summary>
/// Builds and signs (RS256) the JWTs for other applications (service tokens). Tokens for people are issued by OpenIddict
/// (see the Oidc folder) with the same key, issuer and audience.
/// </summary>
public sealed class AccessTokenFactory(SigningKeyProvider keys, IOptions<JwtOptions> options, TimeProvider clock)
{
    private readonly JwtOptions _options = options.Value;

    /// <summary>
    /// Creates a signed JWT (JSON Web Token) for a service client with specified claims.
    /// </summary>
    /// <param name="client">The <see cref="ServiceClient"/> instance representing the service client for which the token is being created.</param>
    /// <returns>
    /// A tuple containing:
    /// <list type="bullet">
    /// <item>
    /// <description>The generated token as a <see cref="string"/>.</description>
    /// </item>
    /// <item>
    /// <description>The expiration time of the token as a <see cref="DateTimeOffset"/>.</description>
    /// </item>
    /// </list>
    /// </returns>
    /// <remarks>
    /// The token includes claims such as the client ID, token usage, and any associated scopes.
    /// </remarks>
    public (string Token, DateTimeOffset Expires) CreateServiceToken(ServiceClient client)
    {
        List<Claim> claims =
        [
            new("sub", client.ClientId),
            new("client_id", client.ClientId),
            new("token_use", "service"),
        ];
        claims.AddRange(client.Scopes.Select(s => new Claim("scope", s)));

        return Sign(claims, TimeSpan.FromMinutes(_options.ServiceTokenMinutes));
    }

    /// <summary>
    /// Signs a list of claims to create a JWT (JSON Web Token) with a specified lifetime.
    /// </summary>
    /// <param name="claims">
    /// The list of claims to include in the token. Claims represent user or service-specific information, 
    /// such as identifiers, roles, or custom attributes.
    /// </param>
    /// <param name="lifetime">
    /// The duration for which the token will remain valid. This determines the token's expiration time.
    /// </param>
    /// <returns>
    /// A tuple containing the signed JWT as a string and its expiration time as a <see cref="DateTimeOffset"/>.
    /// </returns>
    private (string Token, DateTimeOffset Expires) Sign(List<Claim> claims, TimeSpan lifetime)
    {
        DateTimeOffset now = clock.GetUtcNow();
        DateTimeOffset expires = now.Add(lifetime);
        claims.Add(new Claim("jti", Guid.NewGuid().ToString("N")));

        SecurityTokenDescriptor descriptor = new()
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = _options.NormalizedIssuer,
            Audience = _options.Audience,
            IssuedAt = now.UtcDateTime,
            NotBefore = now.UtcDateTime,
            Expires = expires.UtcDateTime,
            SigningCredentials = new SigningCredentials(keys.SigningKey, SecurityAlgorithms.RsaSha256),
        };

        return (new JsonWebTokenHandler().CreateToken(descriptor), expires);
    }
}
