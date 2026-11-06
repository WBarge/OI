using Microsoft.AspNetCore.Authorization;
using OI.Integration.Security;

namespace OI.Auth.Security;

public static class AdminPolicy
{
    /// <summary>
    /// Policy name for the administration endpoints: a signed-in user (not another application) who holds the Admin role.
    /// Put it on a controller with [Authorize(Policy = AdminPolicy.Name)].
    /// </summary>
    public const string Name = "AdminOnly";

    public const string AdminRole = "Admin";

    /// <summary>Registers the policy. Passed to AddOiAuthorization in Program.cs.</summary>
    public static void Configure(AuthorizationOptions options) =>
        options.AddPolicy(Name, policy => policy
            .RequireAuthenticatedUser()
            .RequireClaim(OiAuthSetup.TokenUseClaim, OiAuthSetup.UserToken)
            .RequireRole(AdminRole));
}
