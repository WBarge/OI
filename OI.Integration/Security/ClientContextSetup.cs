using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using OI.Glue.Security;

namespace OI.Integration.Security;

public static class ClientContextSetup
{
    /// <summary>Registers IClientContext so controllers and managers can ask who is calling.</summary>
    public static IServiceCollection AddClientContext(this IServiceCollection services)
    {
        services.TryAddSingleton<IClientContextFactory, ClaimsClientContextFactory>();
        services.TryAddScoped<ClientContextAccessor>();
        services.TryAddScoped<IClientContext, CurrentClientContext>();
        return services;
    }

    /// <summary>Builds the client context for each request. Call it after UseAuthentication and UseAuthorization.</summary>
    public static IApplicationBuilder UseClientContext(this IApplicationBuilder app) =>
        app.UseMiddleware<ClientContextMiddleware>();
}
