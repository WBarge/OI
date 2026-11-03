using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using OI.Glue.Security;
using OI.Integration.Security;

namespace OI.Integration.Tests.SecurityTests;

[TestFixture, Description("Tests for ClientContextSetup, the registration and the middleware working together")]
public class ClientContextSetupTests
{
    private static ServiceProvider BuildProvider()
    {
        ServiceCollection services = new();
        services.AddClientContext();
        return services.BuildServiceProvider();
    }

    private static ClaimsPrincipal SignedInUser() =>
        new(new ClaimsIdentity(
            [new Claim("sub", "user-1"), new Claim("name", "Pat Example"), new Claim("token_use", "user"), new Claim("group", "default")],
            "Bearer"));

    [Test, Description("AddClientContext should make IClientContext available")]
    public void AddClientContext_RegistersIClientContext()
    {
        using ServiceProvider provider = BuildProvider();
        using IServiceScope scope = provider.CreateScope();

        scope.ServiceProvider.GetService<IClientContext>().Should().NotBeNull();
    }

    [Test, Description("The context should be anonymous until the middleware has run")]
    public void IClientContext_IsAnonymousByDefault()
    {
        using ServiceProvider provider = BuildProvider();
        using IServiceScope scope = provider.CreateScope();

        IClientContext context = scope.ServiceProvider.GetRequiredService<IClientContext>();

        context.IsAuthenticated.Should().BeFalse();
        context.UserId.Should().BeEmpty();
    }

    [Test, Description("A context resolved early should still show the caller once the accessor has been filled in")]
    public void IClientContext_ReflectsTheAccessorEvenWhenResolvedEarly()
    {
        using ServiceProvider provider = BuildProvider();
        using IServiceScope scope = provider.CreateScope();
        IClientContext context = scope.ServiceProvider.GetRequiredService<IClientContext>();

        scope.ServiceProvider.GetRequiredService<ClientContextAccessor>().Current =
            new ClientContext("user-9", "Sam", "sam@example.com", ["Admin"], ["ops"]);

        context.IsAuthenticated.Should().BeTrue();
        context.UserId.Should().Be("user-9");
        context.DisplayName.Should().Be("Sam");
        context.Email.Should().Be("sam@example.com");
        context.Roles.Should().BeEquivalentTo(new[] { "Admin" });
        context.Groups.Should().BeEquivalentTo(new[] { "ops" });
    }

    [Test, Description("Each request should have its own context, so one caller can never see another's")]
    public void IClientContext_IsSeparatePerScope()
    {
        using ServiceProvider provider = BuildProvider();
        using IServiceScope first = provider.CreateScope();
        using IServiceScope second = provider.CreateScope();

        first.ServiceProvider.GetRequiredService<ClientContextAccessor>().Current = new ClientContext("user-1", "Pat", null, [], []);

        second.ServiceProvider.GetRequiredService<IClientContext>().IsAuthenticated.Should().BeFalse();
        first.ServiceProvider.GetRequiredService<IClientContext>().UserId.Should().Be("user-1");
    }

    [Test, Description("Calling AddClientContext twice should not register anything twice")]
    public void AddClientContext_CanBeCalledTwice()
    {
        ServiceCollection services = new();

        services.AddClientContext();
        services.AddClientContext();

        services.Count(d => d.ServiceType == typeof(IClientContext)).Should().Be(1);
        services.Count(d => d.ServiceType == typeof(IClientContextFactory)).Should().Be(1);
        services.Count(d => d.ServiceType == typeof(ClientContextAccessor)).Should().Be(1);
    }

    [Test, Description("The factory is the claims based one by default")]
    public void AddClientContext_UsesTheClaimsFactoryByDefault()
    {
        using ServiceProvider provider = BuildProvider();

        provider.GetRequiredService<IClientContextFactory>().Should().BeOfType<ClaimsClientContextFactory>();
    }

    [Test, Description("An application that registered its own factory first should keep it")]
    public void AddClientContext_KeepsAFactoryRegisteredEarlier()
    {
        ServiceCollection services = new();
        services.AddSingleton<IClientContextFactory, StubFactory>();

        services.AddClientContext();

        using ServiceProvider provider = services.BuildServiceProvider();
        provider.GetRequiredService<IClientContextFactory>().Should().BeOfType<StubFactory>();
    }

    [Test, Description("UseClientContext should fill in the context from the signed-in user before the rest of the pipeline runs")]
    public async Task UseClientContext_MakesTheCallerAvailableToLaterSteps()
    {
        using ServiceProvider provider = BuildProvider();
        IApplicationBuilder app = new ApplicationBuilder(provider);
        IClientContext? seen = null;
        app.UseClientContext();
        app.Run(httpContext =>
        {
            seen = httpContext.RequestServices.GetRequiredService<IClientContext>();
            return Task.CompletedTask;
        });
        RequestDelegate pipeline = app.Build();
        using IServiceScope scope = provider.CreateScope();
        DefaultHttpContext request = new() { RequestServices = scope.ServiceProvider, User = SignedInUser() };

        await pipeline(request);

        seen.Should().NotBeNull();
        seen!.IsAuthenticated.Should().BeTrue();
        seen.UserId.Should().Be("user-1");
        seen.DisplayName.Should().Be("Pat Example");
        seen.Groups.Should().BeEquivalentTo(new[] { "default" });
    }

    [Test, Description("An anonymous request should get the anonymous context")]
    public async Task UseClientContext_GivesAnAnonymousRequestTheAnonymousContext()
    {
        using ServiceProvider provider = BuildProvider();
        IApplicationBuilder app = new ApplicationBuilder(provider);
        IClientContext? seen = null;
        app.UseClientContext();
        app.Run(httpContext =>
        {
            seen = httpContext.RequestServices.GetRequiredService<IClientContext>();
            return Task.CompletedTask;
        });
        RequestDelegate pipeline = app.Build();
        using IServiceScope scope = provider.CreateScope();

        await pipeline(new DefaultHttpContext { RequestServices = scope.ServiceProvider });

        seen!.IsAuthenticated.Should().BeFalse();
    }

    private sealed class StubFactory : IClientContextFactory
    {
        public Task<IClientContext> CreateAsync(ClaimsPrincipal user, CancellationToken cancellationToken = default) =>
            Task.FromResult<IClientContext>(ClientContext.Anonymous);
    }
}
