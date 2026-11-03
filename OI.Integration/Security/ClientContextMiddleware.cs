using Microsoft.AspNetCore.Http;

namespace OI.Integration.Security;

/// <summary>
/// Puts the caller's client context in place for the rest of the request. Add it after UseAuthentication
/// (and UseAuthorization), because it reads the user that authentication produced.
/// </summary>
public sealed class ClientContextMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next ?? throw new ArgumentNullException(nameof(next));

    // the scoped accessor and the factory are handed in per request
    public async Task InvokeAsync(HttpContext httpContext, ClientContextAccessor accessor, IClientContextFactory factory)
    {
        if (httpContext.User.Identity?.IsAuthenticated == true)
        {
            accessor.Current = await factory.CreateAsync(httpContext.User, httpContext.RequestAborted);
        }

        // when nobody is signed in the accessor still holds the anonymous context
        await _next(httpContext);
    }
}
