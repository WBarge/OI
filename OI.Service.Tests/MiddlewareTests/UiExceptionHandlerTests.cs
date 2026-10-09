using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Moq;
using Newtonsoft.Json;
using OI.Service.Middleware;
using OI.Service.Models.Results;
using System.Text;

namespace OI.Service.Tests.MiddlewareTests;

[TestFixture, Description("Tests for UiExceptionHandler")]
public class UiExceptionHandlerTests
{
    [Test, Description("Invoke should call the next delegate and leave the response untouched when nothing throws")]
    public async Task Invoke_CallsNextAndLeavesResponseUntouchedWhenNothingThrows()
    {
        bool nextCalled = false;
        RequestDelegate next = _ =>
        {
            nextCalled = true;
            return Task.CompletedTask;
        };
        UiExceptionHandler sut = new(next);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        nextCalled.Should().BeTrue();
        context.Response.StatusCode.Should().Be(StatusCodes.Status200OK);
        body.Length.Should().Be(0, "nothing should be written when there is no error");
    }

    [Test, Description("Invoke should return 400 when a RequestException is thrown")]
    public async Task Invoke_Returns400WhenRequestExceptionThrown()
    {
        RequestDelegate next = _ => throw new RequestException("ProductId");
        UiExceptionHandler sut = new(next);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
    }

    [Test, Description("Invoke should return 400 when an ArgumentNullException is thrown")]
    public async Task Invoke_Returns400WhenArgumentNullExceptionThrown()
    {
        RequestDelegate next = _ => throw new ArgumentNullException("someParam");
        UiExceptionHandler sut = new(next);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
    }

    [Test, Description("Invoke should return 500 for any other exception type")]
    public async Task Invoke_Returns500ForUnmappedException()
    {
        RequestDelegate next = _ => throw new InvalidOperationException("boom");
        UiExceptionHandler sut = new(next);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
    }

    [Test, Description("Invoke should write the exception message and type name to the response body as JSON")]
    public async Task Invoke_WritesErrorMessageForClientToBody()
    {
        RequestDelegate next = _ => throw new InvalidOperationException("boom");
        UiExceptionHandler sut = new(next);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        // the handler disposes its StreamWriter, which closes the stream, so read via ToArray()
        string json = Encoding.UTF8.GetString(body.ToArray());
        ErrorMessageForClient? error = JsonConvert.DeserializeObject<ErrorMessageForClient>(json);
        error.Should().NotBeNull();
        error!.Message.Should().Be("boom");
        error.ExceptionType.Should().Be(nameof(InvalidOperationException));
    }

    [Test, Description("BuildResponseBodyAsync should serialize using the camelCase message and exceptionType property names")]
    public async Task BuildResponseBodyAsync_WritesExpectedJsonPropertyNames()
    {
        UiExceptionHandler sut = new(_ => Task.CompletedTask);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.BuildResponseBodyAsync(context, new InvalidOperationException("boom"));

        string json = Encoding.UTF8.GetString(body.ToArray());
        json.Should().Contain("\"message\":\"boom\"");
        json.Should().Contain("\"exceptionType\":\"InvalidOperationException\"");
    }

    [Test, Description("Invoke should not change the response or rethrow when the response has already started")]
    public async Task Invoke_DoesNotTouchResponseWhenAlreadyStarted()
    {
        RequestDelegate next = _ => throw new InvalidOperationException("boom");
        UiExceptionHandler sut = new(next);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        Mock<IHttpResponseFeature> responseFeatureMock = new();
        responseFeatureMock.SetupGet(f => f.HasStarted).Returns(true);
        responseFeatureMock.SetupProperty(f => f.StatusCode, StatusCodes.Status200OK);
        responseFeatureMock.SetupProperty(f => f.Body, body);
        context.Features.Set(responseFeatureMock.Object);

        Func<Task> act = async () => await sut.Invoke(context);

        await act.Should().NotThrowAsync("the handler swallows exceptions once the response has started");
        context.Response.StatusCode.Should().Be(StatusCodes.Status200OK, "headers are already sent, so the status cannot change");
        body.Length.Should().Be(0);
    }
}