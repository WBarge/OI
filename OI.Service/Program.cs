
using System.Diagnostics;
using OI.Data.DBSchemaHelper;
using OI.Service.Middleware;
using OI.Service.Utilities;
using Scalar.AspNetCore;

namespace OI.Service;

/// <summary>
/// Class Program holds the entry point for the application and is responsible for configuring and running the web host.
/// </summary>
public static class Program
{
    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    /// <param name="args"></param>
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        builder.Services.ConfigureDi(builder.Configuration);
        builder.Services.HandleDbSchema();


        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
            });
            app.Lifetime.ApplicationStarted.Register(() =>
            {
                //The project is configured to launch the Swagger UI in a browser when the application starts
                //This code will cause another browser window to open using the Scalar.AspNetCore package to launch when the application starts.
                //The code checks for the presence of Google Chrome Canary and uses it if available; otherwise, it falls back to the default browser.
                //Google Chrome Canary is the preferred browser to use while building Web API applications
                string canary = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    @"Google\Chrome SxS\Application\chrome.exe");

                const string URL = @"https://localhost:7128/scalar";

                Process.Start(new ProcessStartInfo
                {
                    FileName = File.Exists(canary) ? canary : URL, // fall back to default browser
                    Arguments = File.Exists(canary) ? $"{URL}" : "",
                    UseShellExecute = true
                });
            });
        }

        app.UseUiExceptionHandler();

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}