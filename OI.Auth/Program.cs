using System.Threading.RateLimiting;
using OI.Auth.Utilities;
using OI.Common.Middleware;
using OI.Data.DBSchemaHelper;
using OI.Glue.Managers;

namespace OI.Auth;

/// <summary>
/// Class Program holds the entry point for the application and is responsible for configuring and running the web host.
/// OI.Auth issues tokens and publishes the public key other applications use to check them.
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
        builder.Services.AddOpenApi();

        builder.Services.ConfigureDi(builder.Configuration);
        builder.Services.HandleDbSchema();

        // Throttle sign-in, refresh and service-token attempts per IP.
        builder.Services.AddRateLimiter(o =>
        {
            o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            o.AddPolicy("login", ctx => RateLimitPartition.GetFixedWindowLimiter(
                ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions { PermitLimit = 10, Window = TimeSpan.FromMinutes(1) }));
        });

        string[] origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>()
                           ?? ["http://localhost:4201"];   // `ng serve --port 4201`

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

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
            });
        }

        app.UseUiExceptionHandler();

        app.UseCors(policyBuilder =>
        {
            policyBuilder.WithOrigins(origins);
            policyBuilder.AllowAnyMethod();
            policyBuilder.AllowAnyHeader();
        });

        app.UseHttpsRedirection();
        app.UseRateLimiter();

        app.MapControllers();

        await app.RunAsync();
    }
}
