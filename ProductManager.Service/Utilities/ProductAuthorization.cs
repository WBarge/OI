using Microsoft.AspNetCore.Authorization;
using OI.Integration.Security;

namespace ProductManager.Service.Utilities;

/// <summary>
/// Who may call the ProductManager service. Kept in one place so Program.cs and the tests use the very same rules.
/// </summary>
public static class ProductAuthorization
{
    /// <summary>
    /// Reading product data is open to every caller holding a valid token: signed-in users AND other applications
    /// (service tokens). OI's own default only lets users in, so it is replaced here.
    /// Changing product data is for administrators only: endpoints opt in with [Authorize(Policy = AdminPolicy.NAME)].
    /// </summary>
    /// <param name="options">The authorization options being built.</param>
    public static void Configure(AuthorizationOptions options)
    {
        AuthorizationPolicy anyValidToken = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
        options.DefaultPolicy = anyValidToken;
        options.FallbackPolicy = anyValidToken;

        AdminPolicy.Configure(options);
    }
}
