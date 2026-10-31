using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using OI.Glue.Models;
using OI.Glue.Services;

namespace OI.Auth.Security;

/// <summary>Builds and signs (RS256) the JWTs for users and for other applications.</summary>
public sealed class AccessTokenFactory(SigningKeyProvider keys, IOptions<JwtOptions> options, TimeProvider clock) : IAccessTokenFactory
{
    private readonly JwtOptions _options = options.Value;

    // Stored claims may not overwrite the ones this class sets itself.
    private static readonly HashSet<string> Reserved = new(StringComparer.OrdinalIgnoreCase)
    {
        "sub", "jti", "iss", "aud", "exp", "nbf", "iat", "name", "email", "role", "scope", "token_use", "client_id",
    };

    /// <summary>
    /// Gets the duration for which a refresh token remains valid.
    /// </summary>
    /// <value>
    /// A <see cref="TimeSpan"/> representing the lifetime of a refresh token.
    /// The default value is derived from the <see cref="JwtOptions.RefreshTokenDays"/> property.
    /// </value>
    public TimeSpan RefreshTokenLifetime => TimeSpan.FromDays(_options.RefreshTokenDays);

    /// <summary>
    /// Creates a JWT (JSON Web Token) for the specified user, including claims such as user ID, display name, email, roles, 
    /// and additional custom claims. The token is signed and has a limited lifetime.
    /// </summary>
    /// <param name="user">The user for whom the token is being created. This includes user details such as ID, email, display name, roles, and custom claims.</param>
    /// <returns>
    /// A tuple containing the generated token as a string and its expiration time as a <see cref="DateTimeOffset"/>.
    /// </returns>
    public (string Token, DateTimeOffset Expires) CreateUserToken(IAuthUser user)
    {
        List<Claim> claims =
        [
            new("sub", user.Id),
            new("name", user.DisplayName),
            new("token_use", "user"),
        ];
        if (!string.IsNullOrEmpty(user.Email)) claims.Add(new Claim("email", user.Email));
        claims.AddRange(user.Roles.Select(r => new Claim("role", r)));
        // e.g. "group" claims: this is what places a user's SignalR connection in their groups.
        claims.AddRange(user.Claims.Where(c => !Reserved.Contains(c.Key)).Select(c => new Claim(c.Key, c.Value)));

        return Sign(claims, TimeSpan.FromMinutes(_options.AccessTokenMinutes));
    }

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
            Issuer = _options.Issuer,
            Audience = _options.Audience,
            IssuedAt = now.UtcDateTime,
            NotBefore = now.UtcDateTime,
            Expires = expires.UtcDateTime,
            SigningCredentials = new SigningCredentials(keys.SigningKey, SecurityAlgorithms.RsaSha256),
        };

        return (new JsonWebTokenHandler().CreateToken(descriptor), expires);
    }
}
