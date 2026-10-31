using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;
using OI.Data.Repos;
using OI.Glue.Repos;

namespace OI.Data;

/// <summary>
/// Class DataDi is responsible for configuring dependency injection for the OI.Data project.
/// </summary>
public static class DataDi
{
    /// <summary>
    /// Configures dependency injection for the OI.Data project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Service API application
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureServiceDi(IServiceCollection services, IConfiguration configuration)
    {
        //dependencies needed to access order information
        AddCommonDependencies(services,configuration);
    }

    /// <summary>
    /// Configures dependency injection for the OI.Data project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Reporting API application
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureReportingDi(IServiceCollection services, IConfiguration configuration)
    {
        //dependencies needed to access reporting information
        AddCommonDependencies(services, configuration);
        services.AddDbContextPool<OiReportingDbContext>(builder =>
        {
            builder.UseSqlServer(configuration["ConnectionString"], b =>
                b.MigrationsHistoryTable("__EFMigrationsHistory_Reporting"));
        });
    }

    /// <summary>
    /// Configures dependency injection for the OI.Data project
    /// by registering services and dependencies with the provided IServiceCollection.
    /// This specific configuration is for the OI.Auth API application.
    /// It registers ONLY the auth context, so the order and reporting contexts never exist in that application.
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    public static void ConfigureAuthDi(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextPool<OiAuthDbContext>(builder =>
        {
            builder.UseSqlServer(configuration["ConnectionString"], b =>
                b.MigrationsHistoryTable("__EFMigrationsHistory_Auth"));
        });

        // Persistence only: the Identity tables are part of the context, but UserManager/SignInManager are not used.
        // Passwords, lockout and the other sign-in rules live in OI.Business (AuthManager).
        services.AddScoped<IAuthRepo, AuthRepo>();
        services.AddScoped<IRefreshTokenRepo, RefreshTokenRepo>();
    }

    /// <summary>
    /// Configure dependencies that are common to all services
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    private static void AddCommonDependencies(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextPool<OiServiceDbContext>(builder =>
        {
            builder.UseSqlServer(configuration["ConnectionString"], b =>
                b.MigrationsHistoryTable("__EFMigrationsHistory_Service"));
        });
        services.AddScoped<IStateRepo, StateRepo>();
        services.AddScoped<IOrderRepo, OrderRepo>();
        services.AddScoped<ICustomerRepo, CustomerRepo>();
    }

}
