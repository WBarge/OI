using OI.Integration.Security;
using ProductManager.Data.EF.DBSchemaHelp;
using ProductManager.Service.Middleware;
using ProductManager.Service.Utilities;

namespace ProductManager.Service;

/// <summary>
/// Class Program holds the entry point for the application and is responsible for configuring and running the web host.
/// </summary>
public static class Program
{
    /// <summary>
    /// Defines the entry point of the application.
    /// </summary>
    /// <param name="args">The arguments.</param>
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddOpenApi(options =>
        {
            options.OpenApiVersion =
                Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
        });

        builder.Services.ConfigureDi(builder.Configuration);
        builder.Services.HandleDbSchema();
        builder.Services.AddOiJwtBearer(builder.Configuration); // trust tokens from OI.Auth
        builder.Services.AddOiAuthorization(ProductAuthorization.Configure); // any valid token reads, only admins write

        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        //configure centralized error handling
        app.UseUiExceptionHandler();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi().AllowAnonymous();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "ProductManager.Service v1");
            });
        }

        app.UseCors(policyBuilder =>
        {
            policyBuilder.AllowAnyOrigin();
            policyBuilder.AllowAnyMethod();
            policyBuilder.AllowAnyHeader();
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
