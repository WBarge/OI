using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Moq;
using OI.Auth.Oidc;
using OI.Auth.Tests.TestSupport;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Tests.OidcTests;

[TestFixture, Description("Tests for ClientSynchronizer: copying the Clients settings into OpenIddict")]
public class ClientSynchronizerTests
{
    private static readonly ClientRegistration OiUi = new()
    {
        ClientId = "oi-ui",
        DisplayName = "Order Invoice",
        RedirectUris = ["http://localhost:4201/auth/callback"],
        PostLogoutRedirectUris = ["http://localhost:4201/signed-out"],
    };

    private static readonly ClientRegistration Postman = new() { ClientId = "postman-dev", AllowPasswordGrant = true };

    // ---- Describe

    [Test, Description("Describe should make a public client that must use PKCE and may use only the authorization code flow with refresh tokens")]
    public void Describe_MakesAPublicPkceClient()
    {
        OpenIddictApplicationDescriptor descriptor = ClientSynchronizer.Describe(OiUi, passwordGrantAvailable: false);

        descriptor.ClientId.Should().Be("oi-ui");
        descriptor.DisplayName.Should().Be("Order Invoice");
        descriptor.ClientType.Should().Be(ClientTypes.Public);
        descriptor.ClientSecret.Should().BeNull();
        descriptor.RedirectUris.Select(u => u.AbsoluteUri).Should().Equal("http://localhost:4201/auth/callback");
        descriptor.PostLogoutRedirectUris.Select(u => u.AbsoluteUri).Should().Equal("http://localhost:4201/signed-out");
        descriptor.Requirements.Should().Contain(Requirements.Features.ProofKeyForCodeExchange);
        descriptor.Permissions.Should().Contain(new[]
        {
            Permissions.Endpoints.Authorization, Permissions.Endpoints.Token, Permissions.Endpoints.EndSession,
            Permissions.GrantTypes.AuthorizationCode, Permissions.GrantTypes.RefreshToken, Permissions.ResponseTypes.Code,
            Permissions.Scopes.Email, Permissions.Scopes.Profile,
        });
    }

    [Test, Description("Describe should never give a browser client the password grant, even when it is available")]
    public void Describe_DoesNotGiveABrowserClientThePasswordGrant()
    {
        ClientSynchronizer.Describe(OiUi, passwordGrantAvailable: true).Permissions.Should().NotContain(Permissions.GrantTypes.Password);
    }

    [Test, Description("Describe should give the password grant to a marked client only while it is available")]
    public void Describe_GivesThePasswordGrantOnlyWhenAvailable()
    {
        ClientSynchronizer.Describe(Postman, passwordGrantAvailable: true).Permissions.Should().Contain(Permissions.GrantTypes.Password);
        ClientSynchronizer.Describe(Postman, passwordGrantAvailable: false).Permissions.Should().NotContain(Permissions.GrantTypes.Password);
    }

    [Test, Description("Describe should give a client with no redirect addresses no authorize endpoint or code flow")]
    public void Describe_ANonBrowserClientHasNoAuthorizationEndpoint()
    {
        OpenIddictApplicationDescriptor descriptor = ClientSynchronizer.Describe(Postman, passwordGrantAvailable: true);

        descriptor.Permissions.Should().Contain(Permissions.Endpoints.Token);
        descriptor.Permissions.Should().NotContain(Permissions.Endpoints.Authorization);
        descriptor.Permissions.Should().NotContain(Permissions.GrantTypes.AuthorizationCode);
        descriptor.Requirements.Should().BeEmpty();
    }

    [Test, Description("Describe should use the client id as the name when no display name is set")]
    public void Describe_FallsBackToTheClientIdForTheName()
    {
        ClientSynchronizer.Describe(Postman, false).DisplayName.Should().Be("postman-dev");
    }

    [Test, Description("Describe should refuse a client with no id")]
    public void Describe_RefusesAClientWithNoId()
    {
        Action act = () => ClientSynchronizer.Describe(new ClientRegistration(), false);

        act.Should().Throw<InvalidOperationException>();
    }

    [Test, Description("Describe should refuse an address that is not absolute: nothing relative or wildcard can be registered")]
    public void Describe_RefusesARelativeAddress()
    {
        ClientRegistration client = new() { ClientId = "x", RedirectUris = ["/auth/callback"] };

        Action act = () => ClientSynchronizer.Describe(client, false);

        act.Should().Throw<UriFormatException>();
    }

    // ---- SyncAsync

    private static ServiceProvider Services(Mock<IOpenIddictApplicationManager> manager, bool development = true, bool passwordGrant = false)
    {
        IConfiguration config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Clients:0:ClientId"] = "oi-ui",
            ["Clients:0:RedirectUris:0"] = "http://localhost:4201/auth/callback",
            ["Clients:1:ClientId"] = "postman-dev",
            ["Clients:1:AllowPasswordGrant"] = "true",
        }).Build();
        ServiceCollection services = new();
        services.AddSingleton(manager.Object);
        services.AddSingleton(new ClientRegistry(config));
        services.AddSingleton<IOptions<OidcOptions>>(Options.Create(new OidcOptions { PasswordGrantEnabled = passwordGrant }));
        services.AddSingleton<IHostEnvironment>(new FakeHostEnvironment(development ? Environments.Development : Environments.Production));
        return services.BuildServiceProvider();
    }

    [Test, Description("SyncAsync should create a client that does not exist yet")]
    public async Task SyncAsync_CreatesNewClients()
    {
        Mock<IOpenIddictApplicationManager> manager = new();
        manager.Setup(m => m.FindByClientIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>((object?)null));
        using ServiceProvider services = Services(manager);

        await ClientSynchronizer.SyncAsync(services);

        manager.Verify(m => m.CreateAsync(It.Is<OpenIddictApplicationDescriptor>(d => d.ClientId == "oi-ui"), It.IsAny<CancellationToken>()), Times.Once);
        manager.Verify(m => m.CreateAsync(It.Is<OpenIddictApplicationDescriptor>(d => d.ClientId == "postman-dev"), It.IsAny<CancellationToken>()), Times.Once);
        manager.Verify(m => m.UpdateAsync(It.IsAny<object>(), It.IsAny<OpenIddictApplicationDescriptor>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("SyncAsync should update a client that already exists, so a changed redirect address takes effect")]
    public async Task SyncAsync_UpdatesExistingClients()
    {
        object existing = new();
        Mock<IOpenIddictApplicationManager> manager = new();
        manager.Setup(m => m.FindByClientIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>(existing));
        using ServiceProvider services = Services(manager);

        await ClientSynchronizer.SyncAsync(services);

        manager.Verify(m => m.UpdateAsync(existing, It.Is<OpenIddictApplicationDescriptor>(d => d.ClientId == "oi-ui"), It.IsAny<CancellationToken>()), Times.Once);
        manager.Verify(m => m.CreateAsync(It.IsAny<OpenIddictApplicationDescriptor>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("SyncAsync should update the client when another instance created it first")]
    public async Task SyncAsync_ToleratesAnotherInstanceCreatingTheClientFirst()
    {
        object existing = new();
        int lookups = 0;
        Mock<IOpenIddictApplicationManager> manager = new();
        manager.Setup(m => m.FindByClientIdAsync("oi-ui", It.IsAny<CancellationToken>()))
            .Returns(() => new ValueTask<object?>(lookups++ == 0 ? null : existing));
        manager.Setup(m => m.FindByClientIdAsync("postman-dev", It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>(existing));
        manager.Setup(m => m.CreateAsync(It.IsAny<OpenIddictApplicationDescriptor>(), It.IsAny<CancellationToken>()))
            .Throws(new InvalidOperationException("duplicate client id"));
        using ServiceProvider services = Services(manager);

        Func<Task> act = () => ClientSynchronizer.SyncAsync(services);

        await act.Should().NotThrowAsync();
        manager.Verify(m => m.UpdateAsync(existing, It.Is<OpenIddictApplicationDescriptor>(d => d.ClientId == "oi-ui"), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("SyncAsync should rethrow when creating fails and the client still does not exist")]
    public async Task SyncAsync_RethrowsARealFailure()
    {
        Mock<IOpenIddictApplicationManager> manager = new();
        manager.Setup(m => m.FindByClientIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>((object?)null));
        manager.Setup(m => m.CreateAsync(It.IsAny<OpenIddictApplicationDescriptor>(), It.IsAny<CancellationToken>()))
            .Throws(new InvalidOperationException("database is down"));
        using ServiceProvider services = Services(manager);

        Func<Task> act = () => ClientSynchronizer.SyncAsync(services);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("database is down");
    }

    [TestCase(true, true, true)]
    [TestCase(true, false, false)]
    [TestCase(false, true, false)]
    [TestCase(false, false, false)]
    [Description("SyncAsync should register the password grant for the marked client only in Development with the setting on")]
    public async Task SyncAsync_RegistersThePasswordGrantOnlyWhenAvailable(bool development, bool enabled, bool expected)
    {
        OpenIddictApplicationDescriptor? postman = null;
        Mock<IOpenIddictApplicationManager> manager = new();
        manager.Setup(m => m.FindByClientIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>((object?)null));
        manager.Setup(m => m.CreateAsync(It.IsAny<OpenIddictApplicationDescriptor>(), It.IsAny<CancellationToken>()))
            .Callback<OpenIddictApplicationDescriptor, CancellationToken>((d, _) => { if (d.ClientId == "postman-dev") postman = d; })
            .Returns(new ValueTask<object>(new object()));
        using ServiceProvider services = Services(manager, development, enabled);

        await ClientSynchronizer.SyncAsync(services);

        postman.Should().NotBeNull();
        postman!.Permissions.Contains(Permissions.GrantTypes.Password).Should().Be(expected);
    }
}
