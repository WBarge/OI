using System.Text;
using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Moq;
using Newtonsoft.Json;
using OI.Common.Middleware;
using OI.Common.Models.Results;

namespace OI.Common.Tests.MiddlewareTests;

[TestFixture, Description("Tests for UiExceptionHandlerExtensions")]
public class UiExceptionHandlerExtensionsTests
{
    [Test, Description("UseUiExceptionHandler should return the same builder so calls can be chained")]
    public void UseUiExceptionHandler_ReturnsTheSameBuilder()
    {
        IApplicationBuilder builder = CreateApplicationBuilder(Environments.Production);

        IApplicationBuilder result = builder.UseUiExceptionHandler();

        result.Should().BeSameAs(builder);
    }

    [Test, Description("UseUiExceptionHandler should leave a request that does not throw untouched")]
    public async Task UseUiExceptionHandler_PassesRequestsThroughWhenNothingThrows()
    {
        IApplicationBuilder builder = CreateApplicationBuilder(Environments.Production);
        builder.UseUiExceptionHandler();
        builder.Run(httpContext =>
        {
            httpContext.Response.StatusCode = StatusCodes.Status204NoContent;
            return Task.CompletedTask;
        });
        RequestDelegate pipeline = builder.Build();
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await pipeline(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status204NoContent);
        body.Length.Should().Be(0);
    }

    [Test, Description("UseUiExceptionHandler should register a handler that turns a RequestException into a 400 with the message")]
    public async Task UseUiExceptionHandler_ConvertsRequestExceptionTo400()
    {
        IApplicationBuilder builder = CreateApplicationBuilder(Environments.Production);
        builder.UseUiExceptionHandler();
        builder.Run(_ => throw new RequestException("ProductId is required"));
        RequestDelegate pipeline = builder.Build();
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await pipeline(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        ErrorMessageForClient? error = ReadError(body);
        error.Should().NotBeNull();
        error!.Message.Should().Be("ProductId is required");
    }

    [Test, Description("UseUiExceptionHandler should register a handler that turns an unexpected exception into a 500 that hides the details")]
    public async Task UseUiExceptionHandler_ConvertsUnexpectedExceptionTo500WithoutDetails()
    {
        IApplicationBuilder builder = CreateApplicationBuilder(Environments.Production);
        builder.UseUiExceptionHandler();
        builder.Run(_ => throw new InvalidOperationException("secret internal detail"));
        RequestDelegate pipeline = builder.Build();
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await pipeline(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
        ErrorMessageForClient? error = ReadError(body);
        error.Should().NotBeNull();
        error!.Message.Should().NotContain("secret internal detail");
        error.ExceptionType.Should().NotBe(nameof(InvalidOperationException));
    }

    [Test, Description("UseUiExceptionHandler should catch exceptions thrown by middleware registered after it")]
    public async Task UseUiExceptionHandler_CatchesExceptionsFromLaterMiddleware()
    {
        IApplicationBuilder builder = CreateApplicationBuilder(Environments.Production);
        builder.UseUiExceptionHandler();
        builder.Use(async (HttpContext _, Func<Task> next) =>
        {
            await next();
            throw new RequiredObjectException("the object is required");
        });
        builder.Run(_ => Task.CompletedTask);
        RequestDelegate pipeline = builder.Build();
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await pipeline(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
    }

    private static IApplicationBuilder CreateApplicationBuilder(string environmentName)
    {
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(environmentName);

        ServiceCollection services = new();
        services.AddLogging();
        services.AddSingleton(environmentMock.Object);

        return new ApplicationBuilder(services.BuildServiceProvider());
    }

    private static ErrorMessageForClient? ReadError(MemoryStream body)
    {
        string json = Encoding.UTF8.GetString(body.ToArray());
        return JsonConvert.DeserializeObject<ErrorMessageForClient>(json);
    }
}
