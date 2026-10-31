using Microsoft.AspNetCore.SignalR;
using OI.Common.Middleware;
using OI.Hub.Hubs;
using OI.Integration.Security;

namespace OI.Hub;

/// <summary>
/// Class Program holds the entry point for the application and is responsible for configuring and running the web host.
/// OI.Hub is the single place browsers connect to for live updates. It has no database.
/// </summary>
public static class Program
{
    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    /// <param name="args"></param>
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        // Trust tokens issued by OI.Auth (public key fetched from Auth:Authority).
        builder.Services.AddOiJwtBearer(builder.Configuration);
        builder.Services.AddOiAuthorization(o => o.AddPolicy(HubPolicies.PUBLISH, p => p
            .RequireAuthenticatedUser()
            .RequireClaim(OiAuthSetup.TokenUseClaim, OiAuthSetup.ServiceToken)
            .RequireClaim("scope", "hub:publish")));

        // To run more than one instance of OI.Hub, add a Redis backplane here
        // (AddStackExchangeRedis). Without it, a message only reaches browsers connected to the instance that received it.
        builder.Services.AddSignalR();
        builder.Services.AddSingleton<IUserIdProvider, SubClaimUserIdProvider>();

        // SignalR's negotiate request carries credentials, and browsers refuse AllowAnyOrigin
        // together with credentials, so the Angular origins are listed explicitly.
        string[] origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>()
                           ?? ["http://localhost:4201"];

        WebApplication app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi().AllowAnonymous();
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
            policyBuilder.AllowCredentials();
        });

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        app.MapHub<AppHub>("/hubs/app").RequireAuthorization();

        app.Run();
    }
}
