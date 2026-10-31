using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OI.Integration.Security;

/// <summary>
/// Lets any OI application trust tokens issued by OI.Auth. The application only needs the Auth
/// application's address: it downloads the public key from there, so it never holds a secret
/// that could be used to mint tokens.
/// </summary>
public static class OiAuthSetup
{
    public const string TokenUseClaim = "token_use";
    public const string UserToken = "user";
    public const string ServiceToken = "service";

    /// <summary>Reads Auth:Authority (e.g. https://localhost:7300) and Auth:Audience (default "oi").</summary>
    public static AuthenticationBuilder AddOiJwtBearer(this IServiceCollection services, IConfiguration configuration)
    {
        string authority = configuration["Auth:Authority"]
            ?? throw new InvalidOperationException("Auth:Authority is not configured.");
        string audience = configuration["Auth:Audience"] ?? "oi";

        return services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.Authority = authority;     // fetches {authority}/.well-known/openid-configuration, then the JWKS
                o.Audience = audience;

                // Keep claim names exactly as they are in the token ("sub", "role", "group").
                o.MapInboundClaims = false;
                o.TokenValidationParameters.NameClaimType = "name";
                o.TokenValidationParameters.RoleClaimType = "role";
                o.TokenValidationParameters.ClockSkew = TimeSpan.FromSeconds(30);

                // Browsers cannot set an Authorization header on a WebSocket, so SignalR sends
                // ?access_token=... Accept it on hub routes only.
                o.Events = new JwtBearerEvents
                {
                    OnMessageReceived = ctx =>
                    {
                        string? token = ctx.Request.Query["access_token"];
                        if (!string.IsNullOrEmpty(token) && ctx.HttpContext.Request.Path.StartsWithSegments("/hubs"))
                        {
                            ctx.Token = token;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
    }

    /// <summary>
    /// Endpoints without their own policy require a signed-in *user* token. Service tokens
    /// (issued to other applications) are rejected unless an endpoint explicitly asks for them.
    /// </summary>
    public static IServiceCollection AddOiAuthorization(this IServiceCollection services, Action<AuthorizationOptions>? configure = null)
    {
        return services.AddAuthorization(o =>
        {
            AuthorizationPolicy userOnly = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireClaim(TokenUseClaim, UserToken)
                .Build();
            o.DefaultPolicy = userOnly;
            o.FallbackPolicy = userOnly;
            configure?.Invoke(o);
        });
    }
}
