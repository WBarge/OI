using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;

namespace OI.Data.Tests;

public static class TestSetupHelper
{
    public static IServiceProvider GetServiceProvider()
    {
        ServiceCollection services = new ServiceCollection();

        services.AddEntityFrameworkInMemoryDatabase()
            .AddDbContext<OiServiceDbContext>(optionsBuilder =>
            {
                optionsBuilder.UseInMemoryDatabase("TestDb");
            });

        ServiceProvider serviceProvider = services.BuildServiceProvider();
        return serviceProvider;
    }
}