using Microsoft.AspNetCore.Authorization;
using OI.Integration.Security;

namespace OI.Auth.Security;

/// <summary>
/// Provides constants and methods for defining and configuring the administration policy.
/// This policy ensures that only authenticated users with the "Admin" role can access specific endpoints.
/// </summary>
public static class AdminPolicy
{
    /// <summary>
    /// Policy name for the administration endpoints: a signed-in user (not another application) who holds the Admin role.
    /// Put it on a controller with [Authorize(Policy = AdminPolicy.Name)].
    /// </summary>
    public const string NAME = "AdminOnly";

    /// <summary>
    /// 
    /// </summary>
    public const string ADMIN_ROLE = "Admin";

    /// <summary>Registers the policy. Passed to AddOiAuthorization in Program.cs.</summary>
    public static void Configure(AuthorizationOptions options) =>
        options.AddPolicy(NAME, policy => policy
            .RequireAuthenticatedUser()
            .RequireClaim(OiAuthSetup.TokenUseClaim, OiAuthSetup.UserToken)
            .RequireRole(ADMIN_ROLE));
}
