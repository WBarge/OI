
using Hangfire;
using OI.Integration.Middleware;
using OI.Data.DBSchemaHelper;
using OI.Reporting.Utilities;
using OI.Integration.Security;

namespace OI.Reporting
{
    /// <summary>
    /// Class Program holds the entry point for the application and is responsible for configuring and running the web host.
    /// </summary>
    public static class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.ConfigureDi(builder.Configuration);
            builder.Services.HandleDbSchema();
            builder.Services.AddOiJwtBearer(builder.Configuration);
            builder.Services.AddOiAuthorization();

            builder.Services.AddHangfire(config =>
            {
                string hangFireConnectionString = builder.Configuration["HangFireConnectionstring"] ?? throw new InvalidOperationException("Connection to hangfire not found.");

                config.SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
                    .UseSimpleAssemblyNameTypeSerializer()
                    .UseRecommendedSerializerSettings()
                    .UseSqlServerStorage(hangFireConnectionString);
            });
            
            builder.Services.AddHangfireServer();


            WebApplication app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi().AllowAnonymous(); 
                //app.MapScalarApiReference();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/openapi/v1.json", "v1");
                });
                //app.Lifetime.ApplicationStarted.Register(() =>
                //{
                //    //The project is configured to launch the Swagger UI in a browser when the application starts
                //    //This code will cause another browser window to open using the Scalar.AspNetCore package to launch when the application starts.
                //    //The code checks for the presence of Google Chrome Canary and uses it if available; otherwise, it falls back to the default browser.
                //    //Google Chrome Canary is the preferred browser to use while building Web API applications
                //    string canary = Path.Combine(
                //        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                //        @"Google\Chrome SxS\Application\chrome.exe");

                //    const string URL = @"https://localhost:7128/scalar";

                //    Process.Start(new ProcessStartInfo
                //    {
                //        FileName = File.Exists(canary) ? canary : URL, // fall back to default browser
                //        Arguments = File.Exists(canary) ? $"{URL}" : "",
                //        UseShellExecute = true
                //    });
                //});
            }

            app.UseUiExceptionHandler();

            app.UseCors(policyBuilder =>
            {
                policyBuilder.AllowAnyOrigin();
                policyBuilder.AllowAnyMethod();
                policyBuilder.AllowAnyHeader();
            });


            app.UseHttpsRedirection();

            app.UseHangfireDashboard();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseClientContext();   // who is calling: needs the user from the two lines above


            app.MapControllers();

            app.Run();
        }
    }
}
