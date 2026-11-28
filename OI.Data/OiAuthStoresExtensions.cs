using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;

// The type being extended lives in this namespace, so the extension is found wherever OpenIddict is configured.
namespace OI.Data;

/// <summary>
/// The storage half of the OpenIddict setup. <see cref="OiAuthDbContext"/> is internal to OI.Data on purpose (no other
/// project may touch a database context), so the one place that has to name it lives here. OI.Auth chains this into its
/// own configuration: <c>AddOpenIddict().AddOiAuthStores().AddServer(...)</c>.
/// </summary>
public static class OiAuthStoresExtensions
{
    /// <summary>Stores OpenIddict's applications, authorizations, scopes and tokens in the auth database.</summary>
    public static OpenIddictBuilder AddOiAuthStores(this OpenIddictBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        return builder.AddCore(options =>
            options.UseEntityFrameworkCore().UseDbContext<OiAuthDbContext>());
    }
}
