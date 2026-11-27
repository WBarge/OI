using System.Collections.Immutable;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using OI.Glue.Models;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Oidc;

/// <summary>
/// Builds the claims of a signed-in person, the same ones the old user tokens carried (sub, name, email, role, group,
/// token_use) plus the audience the APIs require. OpenIddict only writes a claim into a token if the claim has a
/// destination, so this class also decides which token each claim goes into: everything the APIs and the UI read goes
/// into the access token, and the name and email also go into the ID token when those scopes were granted.
/// </summary>
public static class UserIdentityBuilder
{
    /// <summary>The claim that tells the APIs this token is for a person (the APIs reject service tokens on user endpoints and the reverse).</summary>
    public const string TokenUseClaim = "token_use";

    /// <summary>The value of <see cref="TokenUseClaim"/> for a person.</summary>
    public const string UserTokenUse = "user";

    // Stored claims may not overwrite the ones this class sets itself.
    private static readonly HashSet<string> Reserved = new(StringComparer.OrdinalIgnoreCase)
    {
        "sub", "jti", "iss", "aud", "exp", "nbf", "iat", "name", "email", "role", "scope", "token_use", "client_id", "sid",
    };

    /// <summary>A new identity for a user who has just signed in.</summary>
    public static ClaimsIdentity Create(IAuthUser user, IEnumerable<string> scopes, string audience)
    {
        ClaimsIdentity identity = new(TokenValidationParameters.DefaultAuthenticationType, Claims.Name, Claims.Role);
        ApplyUser(identity, user, scopes, audience);
        return identity;
    }

    /// <summary>
    /// The identity for a renewal (an authorization code or refresh token being traded in). It keeps OpenIddict's own
    /// bookkeeping claims (which tie the new tokens to the same authorization) and rebuilds everything about the person
    /// from their current record, so a role or group change takes effect at the next renewal.
    /// </summary>
    public static ClaimsIdentity Refresh(ClaimsPrincipal previous, IAuthUser user, string audience)
    {
        ClaimsIdentity identity = new(TokenValidationParameters.DefaultAuthenticationType, Claims.Name, Claims.Role);
        foreach (Claim claim in previous.Claims.Where(c => c.Type.StartsWith("oi_", StringComparison.Ordinal)))
        {
            identity.AddClaim(claim);
        }
        ApplyUser(identity, user, previous.GetScopes(), audience);
        return identity;
    }

    private static void ApplyUser(ClaimsIdentity identity, IAuthUser user, IEnumerable<string> scopes, string audience)
    {
        identity.SetClaim(Claims.Subject, user.Id);
        identity.SetClaim(Claims.Name, user.DisplayName);
        identity.SetClaim(Claims.Email, string.IsNullOrEmpty(user.Email) ? null : user.Email);
        identity.SetClaims(Claims.Role, user.Roles.ToImmutableArray());
        // e.g. "group" claims: this is what places a user's SignalR connection in their groups.
        foreach (KeyValuePair<string, string> extra in user.Claims.Where(c => !Reserved.Contains(c.Key)))
        {
            identity.AddClaim(new Claim(extra.Key, extra.Value));
        }
        identity.SetClaim(TokenUseClaim, UserTokenUse);

        identity.SetScopes(scopes);
        identity.SetResources(audience);
        identity.SetDestinations(GetDestinations);
    }

    /// <summary>Which token(s) a claim is written into.</summary>
    public static IEnumerable<string> GetDestinations(Claim claim)
    {
        switch (claim.Type)
        {
            case Claims.Name:
                yield return Destinations.AccessToken;
                if (claim.Subject!.HasScope(Scopes.Profile))
                {
                    yield return Destinations.IdentityToken;
                }
                yield break;

            case Claims.Email:
                yield return Destinations.AccessToken;
                if (claim.Subject!.HasScope(Scopes.Email))
                {
                    yield return Destinations.IdentityToken;
                }
                yield break;

            default:
                // role, group, token_use and anything else the APIs read
                yield return Destinations.AccessToken;
                yield break;
        }
    }
}
