using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using OI.Glue.Notifications;
using OI.Integration.Notifications;
using OI.Integration.Tests.TestSupport;

namespace OI.Integration.Tests;

[TestFixture, Description("Tests for IntegrationDi.AddNotificationPublisher")]
public class IntegrationDiTests
{
    private static IConfiguration Config(params (string Key, string? Value)[] settings) =>
        new ConfigurationBuilder().AddInMemoryCollection(settings.Select(s => new KeyValuePair<string, string?>(s.Key, s.Value))).Build();

    private static IConfiguration FullConfig() => Config(
        ("Auth:Authority", "https://auth.test"),
        ("Hub:BaseUrl", "https://hub.test"),
        ("Integration:ClientId", "oi-reporting"),
        ("Integration:ClientSecret", "secret-value"));

    [Test, Description("The client names should be stable, because configuration and tests refer to them")]
    public void ClientNames_AreStable()
    {
        IntegrationDi.AuthClient.Should().Be("oi-auth");
        IntegrationDi.HubClient.Should().Be("oi-hub");
    }

    [Test, Description("AddNotificationPublisher should throw when Auth:Authority is not configured")]
    public void AddNotificationPublisher_ThrowsWithoutTheAuthority()
    {
        ServiceCollection services = new();

        Action act = () => services.AddNotificationPublisher(Config(("Hub:BaseUrl", "https://hub.test")));

        act.Should().Throw<InvalidOperationException>().WithMessage("*Auth:Authority*");
    }

    [Test, Description("AddNotificationPublisher should throw when Hub:BaseUrl is not configured")]
    public void AddNotificationPublisher_ThrowsWithoutTheHubAddress()
    {
        ServiceCollection services = new();

        Action act = () => services.AddNotificationPublisher(Config(("Auth:Authority", "https://auth.test")));

        act.Should().Throw<InvalidOperationException>().WithMessage("*Hub:BaseUrl*");
    }

    [Test, Description("AddNotificationPublisher should return the same service collection so calls can be chained")]
    public void AddNotificationPublisher_ReturnsTheServices()
    {
        ServiceCollection services = new();

        IServiceCollection result = services.AddNotificationPublisher(FullConfig());

        result.Should().BeSameAs(services);
    }

    [Test, Description("AddNotificationPublisher should register the publisher as a singleton")]
    public void AddNotificationPublisher_RegistersThePublisher()
    {
        ServiceCollection services = new();

        services.AddNotificationPublisher(FullConfig());

        services.Should().ContainSingle(d => d.ServiceType == typeof(INotificationPublisher))
            .Which.Should().Match<ServiceDescriptor>(d =>
                d.ImplementationType == typeof(HubNotificationPublisher) && d.Lifetime == ServiceLifetime.Singleton);
    }

    [Test, Description("AddNotificationPublisher should register the token provider as a singleton, so the token is cached for the whole application")]
    public void AddNotificationPublisher_RegistersTheTokenProviderAsASingleton()
    {
        ServiceCollection services = new();

        services.AddNotificationPublisher(FullConfig());

        services.Should().ContainSingle(d => d.ServiceType == typeof(ServiceTokenProvider))
            .Which.Lifetime.Should().Be(ServiceLifetime.Singleton);
    }

    [Test, Description("AddNotificationPublisher should bind the Integration section to IntegrationOptions")]
    public void AddNotificationPublisher_BindsTheOptions()
    {
        ServiceCollection services = new();
        services.AddNotificationPublisher(FullConfig());
        using ServiceProvider provider = services.BuildServiceProvider();

        IntegrationOptions options = provider.GetRequiredService<IOptions<IntegrationOptions>>().Value;

        options.ClientId.Should().Be("oi-reporting");
        options.ClientSecret.Should().Be("secret-value");
    }

    [Test, Description("AddNotificationPublisher should point the auth client at the authority")]
    public void AddNotificationPublisher_ConfiguresTheAuthClient()
    {
        ServiceCollection services = new();
        services.AddNotificationPublisher(FullConfig());
        using ServiceProvider provider = services.BuildServiceProvider();

        HttpClient client = provider.GetRequiredService<IHttpClientFactory>().CreateClient(IntegrationDi.AuthClient);

        client.BaseAddress.Should().Be(new Uri("https://auth.test/"));
    }

    [Test, Description("AddNotificationPublisher should point the hub client at the hub address")]
    public void AddNotificationPublisher_ConfiguresTheHubClient()
    {
        ServiceCollection services = new();
        services.AddNotificationPublisher(FullConfig());
        using ServiceProvider provider = services.BuildServiceProvider();

        HttpClient client = provider.GetRequiredService<IHttpClientFactory>().CreateClient(IntegrationDi.HubClient);

        client.BaseAddress.Should().Be(new Uri("https://hub.test/"));
    }

    [Test, Description("AddNotificationPublisher should give the clients exactly one trailing slash however the address was written")]
    public void AddNotificationPublisher_NormalisesTrailingSlashes()
    {
        ServiceCollection services = new();
        services.AddNotificationPublisher(Config(
            ("Auth:Authority", "https://auth.test///"),
            ("Hub:BaseUrl", "https://hub.test/")));
        using ServiceProvider provider = services.BuildServiceProvider();
        IHttpClientFactory factory = provider.GetRequiredService<IHttpClientFactory>();

        factory.CreateClient(IntegrationDi.AuthClient).BaseAddress.Should().Be(new Uri("https://auth.test/"));
        factory.CreateClient(IntegrationDi.HubClient).BaseAddress.Should().Be(new Uri("https://hub.test/"));
    }

    [Test, Description("AddNotificationPublisher should keep a clock the application registered first")]
    public void AddNotificationPublisher_KeepsAnExistingClock()
    {
        ServiceCollection services = new();
        MovableClock clock = new(DateTimeOffset.UnixEpoch);
        services.AddSingleton<TimeProvider>(clock);

        services.AddNotificationPublisher(FullConfig());

        services.Count(d => d.ServiceType == typeof(TimeProvider)).Should().Be(1);
        using ServiceProvider provider = services.BuildServiceProvider();
        provider.GetRequiredService<TimeProvider>().Should().BeSameAs(clock);
    }

    [Test, Description("AddNotificationPublisher should add the system clock when the application has none")]
    public void AddNotificationPublisher_AddsTheSystemClockWhenNoneExists()
    {
        ServiceCollection services = new();

        services.AddNotificationPublisher(FullConfig());

        using ServiceProvider provider = services.BuildServiceProvider();
        provider.GetRequiredService<TimeProvider>().Should().BeSameAs(TimeProvider.System);
    }

    [Test, Description("The publisher should be resolvable once logging is available")]
    public void AddNotificationPublisher_PublisherCanBeResolved()
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddNotificationPublisher(FullConfig());
        using ServiceProvider provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateOnBuild = true, ValidateScopes = true });

        INotificationPublisher publisher = provider.GetRequiredService<INotificationPublisher>();

        publisher.Should().BeOfType<HubNotificationPublisher>();
    }
}
