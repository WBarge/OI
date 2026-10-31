using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OI.Auth.Security;

namespace OI.Auth.Controllers;

/// <summary>
/// The two standard documents that let any other application validate our tokens
/// with nothing but our address: where to find the keys, and the keys themselves.
/// </summary>
[ApiController]
public class DiscoveryController(SigningKeyProvider keys, IOptions<JwtOptions> options) : ControllerBase
{
    /// <summary>
    /// Provides the OpenID Connect discovery document, which contains metadata about the authorization server.
    /// This document includes information such as the issuer, the JSON Web Key Set (JWKS) URI, and supported signing algorithms.
    /// </summary>
    /// <returns>
    /// An <see cref="IActionResult"/> containing the discovery document in JSON format.
    /// </returns>
    [HttpGet("/.well-known/openid-configuration")]
    public IActionResult Configuration()
    {
        string issuer = options.Value.Issuer.TrimEnd('/');
        return Ok(new
        {
            issuer = options.Value.Issuer,
            jwks_uri = issuer + "/.well-known/jwks.json",
            id_token_signing_alg_values_supported = new[] { "RS256" },
        });
    }

    /// <summary>
    /// Provides the JSON Web Key Set (JWKS) document, which contains the public keys
    /// used to verify the signatures of JSON Web Tokens (JWTs) issued by the authorization server.
    /// </summary>
    /// <returns>
    /// An <see cref="IActionResult"/> containing the JWKS document in JSON format.
    /// </returns>
    [HttpGet("/.well-known/jwks.json")]
    public IActionResult Jwks() => Ok(new
    {
        keys = new[]
        {
            new
            {
                kty = "RSA",
                use = "sig",
                alg = "RS256",
                kid = keys.KeyId,
                n = Base64UrlEncoder.Encode(keys.PublicParameters.Modulus),
                e = Base64UrlEncoder.Encode(keys.PublicParameters.Exponent),
            },
        },
    });
}
