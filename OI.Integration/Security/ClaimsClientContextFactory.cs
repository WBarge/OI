using System.Security.Claims;
using OI.Glue.Security;

namespace OI.Integration.Security;

/// <summary>
/// Builds the context from the claims in the validated access token. Nothing is looked up: OI.Auth already put the
/// user's id, name, roles and groups in the token, and this application has already checked the token's signature.
/// If a later feature needs something that is not in the token, add a factory that fetches it (and caches it)
/// and register that instead; the middleware and the controllers stay as they are.
/// </summary>
public sealed class ClaimsClientContextFactory : IClientContextFactory
{
    public Task<IClientContext> CreateAsync(ClaimsPrincipal user, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(user);

        // Only a person's token makes a client context. Another application's service token is valid too
        // (it is how Reporting talks to the hub), but it must never be mistaken for a user.
        bool isUserToken = user.Identity?.IsAuthenticated == true
                           && user.HasClaim(OiAuthSetup.TokenUseClaim, OiAuthSetup.UserToken);
        string? userId = user.FindFirst("sub")?.Value;
        if (!isUserToken || string.IsNullOrWhiteSpace(userId))
        {
            return Task.FromResult<IClientContext>(ClientContext.Anonymous);
        }

        ClientContext context = new(
            userId,
            user.FindFirst("name")?.Value ?? userId,
            user.FindFirst("email")?.Value,
            Values(user, "role"),
            Values(user, "group"));
        return Task.FromResult<IClientContext>(context);
    }

    private static IEnumerable<string> Values(ClaimsPrincipal user, string claimType) =>
        user.FindAll(claimType).Select(c => c.Value).Where(v => !string.IsNullOrWhiteSpace(v)).Distinct();
}
