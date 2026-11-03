using System.Security.Claims;
using OI.Glue.Security;

namespace OI.Integration.Security;

/// <summary>
/// Builds the client context for a request. The middleware calls this, so anything that has to be looked up
/// to describe the caller belongs behind this interface and not in the middleware or in controllers.
/// </summary>
public interface IClientContextFactory
{
    Task<IClientContext> CreateAsync(ClaimsPrincipal user, CancellationToken cancellationToken = default);
}
