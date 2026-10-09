using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace OI.Data.Tests;

public class TestSetupHelper
{
    public static IServiceProvider GetServiceProvider()
    {
        ServiceCollection services = new ServiceCollection();

        services.AddEntityFrameworkInMemoryDatabase()
            .AddDbContext<OiDbContext>(optionsBuilder =>
            {
                optionsBuilder.UseInMemoryDatabase("TestDb");
            });

        ServiceProvider serviceProvider = services.BuildServiceProvider();
        return serviceProvider;
    }
}