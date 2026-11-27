using System.Net;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using OI.Auth.Oidc;
using OI.Auth.Utilities;
using OI.Integration.Middleware;
using OI.Data.DBSchemaHelper;
using OI.Glue.Managers;
using OI.Auth.Security;
using OI.Integration.Security;

namespace OI.Auth;

/// <summary>
/// Class Program holds the entry point for the application and is responsible for configuring and running the web host.
/// OI.Auth is the identity provider: it signs people in (an OpenID Connect authorization code flow with PKCE, served by
/// OpenIddict), issues and renews their tokens, and publishes the public key other applications use to check them.
/// It has no access to the order or reporting contexts.
/// </summary>
public static class Program
{
    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    /// <param name="args"></param>
    public static async Task Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddRazorPages();   // the login page
        builder.Services.AddOpenApi();

        builder.Services.ConfigureDi(builder.Configuration);
        builder.Services.HandleDbSchema();

        // OI.Auth checks its own tokens (with the key it holds) so that the administration endpoints can require the Admin role.
        // Every endpoint needs a signed-in user unless it says [AllowAnonymous]: the sign-in endpoints and pages do.
        builder.Services.AddLocalJwtBearer();
        builder.Services.AddOiAuthorization(AdminPolicy.Configure);

        // Behind a load balancer or gateway that ends HTTPS, this application sees plain http and the balancer's address.
        // Listing the balancer in "ForwardedHeaders" makes it believe the X-Forwarded-* headers from that balancer only.
        // Left empty (the default) the headers are ignored.
        ForwardedHeadersSettings forwarded = builder.Configuration.GetSection(ForwardedHeadersSettings.SECTION).Get<ForwardedHeadersSettings>()
                                             ?? new ForwardedHeadersSettings();
        if (forwarded.Enabled)
        {
            builder.Services.Configure<ForwardedHeadersOptions>(o =>
            {
                o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedHost;
                o.KnownProxies.Clear();
                o.KnownIPNetworks.Clear();
                foreach (string proxy in forwarded.KnownProxies)
                {
                    o.KnownProxies.Add(IPAddress.Parse(proxy));
                }
                foreach (string network in forwarded.KnownNetworks)
                {
                    o.KnownIPNetworks.Add(System.Net.IPNetwork.Parse(network));   // fully named: Microsoft.AspNetCore.HttpOverrides has an older type with the same name
                }
            });
        }

        // Throttle attempts per IP (the address the balancer reported, when forwarded headers are on).
        builder.Services.AddRateLimiter(o =>
        {
            o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            o.OnRejected = async (context, cancellationToken) =>
            {
                context.HttpContext.Response.ContentType = "text/plain; charset=utf-8";
                await context.HttpContext.Response.WriteAsync("Too many attempts. Wait a minute and try again.", cancellationToken);
            };
            // service-token
            o.AddPolicy("login", ctx => RateLimitPartition.GetFixedWindowLimiter(
                ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions { PermitLimit = 10, Window = TimeSpan.FromMinutes(1) }));
            // /connect/token: code exchanges and renewals, which are more frequent than sign-ins
            o.AddPolicy("token", ctx => RateLimitPartition.GetFixedWindowLimiter(
                ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions { PermitLimit = 60, Window = TimeSpan.FromMinutes(1) }));
            // the login page, /connect/authorize and /connect/logout (page loads and form posts)
            o.AddPolicy("login-page", ctx => RateLimitPartition.GetFixedWindowLimiter(
                ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions { PermitLimit = 30, Window = TimeSpan.FromMinutes(1) }));
        });

        WebApplication app = builder.Build();

        // No public registration endpoint, so the first administrator comes from configuration.
        string? adminEmail = app.Configuration["Seed:AdminEmail"];
        string? adminPassword = app.Configuration["Seed:AdminPassword"];
        if (!string.IsNullOrWhiteSpace(adminEmail) && !string.IsNullOrWhiteSpace(adminPassword))
        {
            await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
            await scope.ServiceProvider.GetRequiredService<IAuthManager>()
                .EnsureAdministratorAsync(adminEmail, adminPassword);
        }

        // Copy the "Clients" settings (which applications may sign people in, and where they may be sent back to) into OpenIddict.
        await ClientSynchronizer.SyncAsync(app.Services);

        if (forwarded.Enabled)
        {
            app.UseForwardedHeaders();   // first: everything after this sees the address the browser used
        }

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi().AllowAnonymous();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
            });
        }

        app.UseUiExceptionHandler();

        // The browser applications call the token, discovery and administration endpoints directly, so their origins
        // (taken from the registered redirect addresses in "Clients") are the only ones allowed.
        string[] allowedOrigins = app.Services.GetRequiredService<ClientRegistry>().AllowedOrigins();
        app.UseCors(policyBuilder =>
        {
            policyBuilder.WithOrigins(allowedOrigins);
            policyBuilder.AllowAnyMethod();
            policyBuilder.AllowAnyHeader();
        });

        app.UseHttpsRedirection();
        app.UseRateLimiter();

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseClientContext();   // the signed-in administrator, for the administration rules

        app.MapControllers();
        app.MapRazorPages().RequireRateLimiting("login-page");

        await app.RunAsync();
    }
}
