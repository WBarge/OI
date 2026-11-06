using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace OI.Auth.Security;

/// <summary>
/// Provides extension methods to configure local JWT Bearer authentication for the application.
/// </summary>
public static class LocalJwtBearerSetup
{
    /// <summary>
    /// Lets OI.Auth check the tokens it issued, for its own administration endpoints. It uses the signing key it
    /// already holds in memory, so it never has to call its own discovery address the way the other applications do.
    /// </summary>
    public static IServiceCollection AddLocalJwtBearer(this IServiceCollection services)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

        services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
            .Configure<SigningKeyProvider, IOptions<JwtOptions>>((options, keys, jwt) =>
            {
                // Keep claim names exactly as they are in the token ("sub", "role", "group").
                options.MapInboundClaims = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwt.Value.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwt.Value.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = keys.SigningKey,
                    ValidateLifetime = true,
                    NameClaimType = "name",
                    RoleClaimType = "role",
                    ClockSkew = TimeSpan.FromSeconds(30),
                };
            });

        return services;
    }
}
