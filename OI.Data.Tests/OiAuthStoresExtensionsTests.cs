using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using OI.Data.Contexts;
using OpenIddict.EntityFrameworkCore;

namespace OI.Data.Tests;

[TestFixture, Description("Tests for OiAuthStoresExtensions: OpenIddict storing its data in the auth database")]
public class OiAuthStoresExtensionsTests
{
    //[Test, Description("AddOiAuthStores should point OpenIddict at the auth database context")]
    //public void AddOiAuthStores_UsesTheAuthContext()
    //{
    //    ServiceCollection services = new();
    //    services.AddOpenIddict().AddOiAuthStores();
    //    using ServiceProvider provider = services.BuildServiceProvider();

    //    provider.GetRequiredService<IOptionsMonitor<OpenIddictEntityFrameworkCoreOptions>>().CurrentValue.DbContextType
    //        .Should().Be(typeof(OiAuthDbContext));
    //}

    [Test, Description("AddOiAuthStores should return the builder so the server can be chained after it")]
    public void AddOiAuthStores_ReturnsTheBuilder()
    {
        ServiceCollection services = new();
        OpenIddictBuilder builder = services.AddOpenIddict();

        builder.AddOiAuthStores().Should().BeSameAs(builder);
    }

    [Test, Description("AddOiAuthStores should refuse a missing builder")]
    public void AddOiAuthStores_RefusesANullBuilder()
    {
        Action act = () => OiAuthStoresExtensions.AddOiAuthStores(null!);

        act.Should().Throw<ArgumentNullException>();
    }
}
