using Microsoft.Extensions.Options;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Oidc;

/// <summary>
/// Copies the "Clients" settings into OpenIddict's applications table when OI.Auth starts, so the settings stay the one
/// place that says which applications may sign people in and where they may be sent back to. Several instances can
/// start at the same moment: if another instance created a client first, this one reads it and updates it instead.
/// </summary>
public static class ClientSynchronizer
{
    /// <summary>Creates or updates every registered client.</summary>
    public static async Task SyncAsync(IServiceProvider services, CancellationToken cancellationToken = default)
    {
        await using AsyncServiceScope scope = services.CreateAsyncScope();
        IOpenIddictApplicationManager manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();
        ClientRegistry registry = scope.ServiceProvider.GetRequiredService<ClientRegistry>();
        OidcOptions options = scope.ServiceProvider.GetRequiredService<IOptions<OidcOptions>>().Value;
        IHostEnvironment environment = scope.ServiceProvider.GetRequiredService<IHostEnvironment>();
        bool passwordGrantAvailable = environment.IsDevelopment() && options.PasswordGrantEnabled;

        foreach (ClientRegistration client in registry.Clients)
        {
            OpenIddictApplicationDescriptor descriptor = Describe(client, passwordGrantAvailable);
            object? existing = await manager.FindByClientIdAsync(client.ClientId, cancellationToken);
            if (existing is null)
            {
                try
                {
                    await manager.CreateAsync(descriptor, cancellationToken);
                    continue;
                }
                catch (Exception)
                {
                    // another instance may have created it a moment ago: read it and update it instead
                    existing = await manager.FindByClientIdAsync(client.ClientId, cancellationToken);
                    if (existing is null)
                    {
                        throw;
                    }
                }
            }
            await manager.UpdateAsync(existing, descriptor, cancellationToken);
        }
    }

    /// <summary>What OpenIddict stores for a client: a public (secret-less) browser client that must use PKCE.</summary>
    public static OpenIddictApplicationDescriptor Describe(ClientRegistration client, bool passwordGrantAvailable)
    {
        if (string.IsNullOrWhiteSpace(client.ClientId))
        {
            throw new InvalidOperationException("A client in the \"Clients\" settings has no ClientId.");
        }

        OpenIddictApplicationDescriptor descriptor = new()
        {
            ClientId = client.ClientId,
            DisplayName = string.IsNullOrWhiteSpace(client.DisplayName) ? client.ClientId : client.DisplayName,
            ClientType = ClientTypes.Public,
            ConsentType = ConsentTypes.Implicit,
        };

        foreach (string address in client.RedirectUris)
        {
            descriptor.RedirectUris.Add(new Uri(address, UriKind.Absolute));
        }
        foreach (string address in client.PostLogoutRedirectUris)
        {
            descriptor.PostLogoutRedirectUris.Add(new Uri(address, UriKind.Absolute));
        }

        descriptor.Permissions.UnionWith(
        [
            Permissions.Endpoints.Token,
            Permissions.GrantTypes.RefreshToken,
            Permissions.Scopes.Email,
            Permissions.Scopes.Profile,
        ]);

        if (client.RedirectUris.Length > 0)
        {
            descriptor.Permissions.UnionWith(
            [
                Permissions.Endpoints.Authorization,
                Permissions.Endpoints.EndSession,
                Permissions.GrantTypes.AuthorizationCode,
                Permissions.ResponseTypes.Code,
            ]);
            descriptor.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);
        }

        if (client.AllowPasswordGrant && passwordGrantAvailable)
        {
            descriptor.Permissions.Add(Permissions.GrantTypes.Password);
        }

        return descriptor;
    }
}
