using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using Newtonsoft.Json;
using OI.Service.Middleware;
using OI.Service.Models.Results;
using System.Text;

namespace OI.Service.Tests.MiddlewareTests;

[TestFixture, Description("Tests for UiExceptionHandler")]
public class UiExceptionHandlerTests
{
    private sealed class DerivedRequestException(string message) : RequestException(message);

    [Test, Description("Constructor should throw when next is null")]
    public void Constructor_ThrowsWhenNextIsNull()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        Action act = () => _ = new UiExceptionHandler(null!, loggerMock.Object, environmentMock.Object);
        act.Should().Throw<ArgumentNullException>().WithParameterName("next");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<IHostEnvironment> environmentMock = new();
        Action act = () => _ = new UiExceptionHandler(_ => Task.CompletedTask, null!, environmentMock.Object);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("Constructor should throw when environment is null")]
    public void Constructor_ThrowsWhenEnvironmentIsNull()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Action act = () => _ = new UiExceptionHandler(_ => Task.CompletedTask, loggerMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("environment");
    }

    [Test, Description("Invoke should call the next delegate, write nothing and log nothing when nothing throws")]
    public async Task Invoke_CallsNextAndLeavesResponseUntouchedWhenNothingThrows()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        bool nextCalled = false;
        RequestDelegate next = _ =>
        {
            nextCalled = true;
            return Task.CompletedTask;
        };
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        nextCalled.Should().BeTrue();
        context.Response.StatusCode.Should().Be(StatusCodes.Status200OK);
        body.Length.Should().Be(0, "nothing should be written when there is no error");
        loggerMock.Verify(l => l.Log(It.IsAny<LogLevel>(), It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Never);
    }

    [Test, Description("Invoke should return 400 and log a warning without a stack trace for a RequestException")]
    public async Task Invoke_Returns400AndLogsWarningWhenRequestExceptionThrown()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new RequestException("ProductId is required");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        loggerMock.Verify(l => l.Log(LogLevel.Warning, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), It.Is<Exception?>(e => e == null), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once, "a client mistake is a warning without the exception attached");
        loggerMock.Verify(l => l.Log(LogLevel.Error, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Never);
    }

    [Test, Description("Invoke should return 400 for a RequiredObjectException")]
    public async Task Invoke_Returns400WhenRequiredObjectExceptionThrown()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new RequiredObjectException("the object is required");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
    }

    [Test, Description("Invoke should return 400 for a subclass of RequestException because matching is by type, not by name")]
    public async Task Invoke_Returns400WhenSubclassOfRequestExceptionThrown()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new DerivedRequestException("derived");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
    }

    [Test, Description("Invoke should return 500 for an ArgumentNullException because it indicates a defect, not bad input")]
    public async Task Invoke_Returns500WhenArgumentNullExceptionThrown()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new ArgumentNullException("someParam");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
    }

    [Test, Description("Invoke should return 500 and log the exception at Error for any other exception")]
    public async Task Invoke_Returns500AndLogsErrorWithExceptionWhenUnmappedExceptionThrown()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        InvalidOperationException exception = new("boom");
        RequestDelegate next = _ => throw exception;
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
        loggerMock.Verify(l => l.Log(LogLevel.Error, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), exception, It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once, "the exception, with its stack trace, must reach the log");
    }

    [Test, Description("Invoke should send a generic message and the trace id, not the real exception details, for a 500 outside Development")]
    public async Task Invoke_HidesExceptionDetailsOutsideDevelopmentFor500()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new InvalidOperationException("secret connection string detail");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        string json = Encoding.UTF8.GetString(body.ToArray());
        json.Should().NotContain("secret connection string detail", "internal details must not reach the client");
        json.Should().NotContain(nameof(InvalidOperationException), "internal type names must not reach the client");
        ErrorMessageForClient? error = JsonConvert.DeserializeObject<ErrorMessageForClient>(json);
        error.Should().NotBeNull();
        error!.Message.Should().NotBeNullOrWhiteSpace();
        error.ExceptionType.Should().Be("UnhandledException");
        error.TraceId.Should().Be(context.TraceIdentifier, "the client needs the id to quote to support");
    }

    [Test, Description("Invoke should send the real message and type for a 500 in the Development environment")]
    public async Task Invoke_ExposesExceptionDetailsInDevelopmentFor500()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Development);
        RequestDelegate next = _ => throw new InvalidOperationException("boom");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        string json = Encoding.UTF8.GetString(body.ToArray());
        ErrorMessageForClient? error = JsonConvert.DeserializeObject<ErrorMessageForClient>(json);
        error.Should().NotBeNull();
        error!.Message.Should().Be("boom");
        error.ExceptionType.Should().Be(nameof(InvalidOperationException));
        error.TraceId.Should().Be(context.TraceIdentifier);
    }

    [Test, Description("Invoke should send the real message for a 400 even outside Development because it is written for the caller")]
    public async Task Invoke_ExposesMessageForClientErrorsOutsideDevelopment()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new RequestException("ProductId is required");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        string json = Encoding.UTF8.GetString(body.ToArray());
        ErrorMessageForClient? error = JsonConvert.DeserializeObject<ErrorMessageForClient>(json);
        error.Should().NotBeNull();
        error!.Message.Should().Be("ProductId is required");
        error.ExceptionType.Should().Be(nameof(RequestException));
        error.TraceId.Should().Be(context.TraceIdentifier);
    }

    [Test, Description("Invoke should set the response content type to application/json")]
    public async Task Invoke_SetsJsonContentType()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new InvalidOperationException("boom");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.ContentType.Should().StartWith("application/json");
    }

    [Test, Description("Invoke should leave the response body stream open after writing the error")]
    public async Task Invoke_DoesNotCloseTheResponseBody()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        RequestDelegate next = _ => throw new InvalidOperationException("boom");
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.Invoke(context);

        body.Length.Should().BeGreaterThan(0);
        body.CanWrite.Should().BeTrue("the handler must not dispose a stream it does not own");
    }

    [Test, Description("BuildResponseBodyAsync should serialize using the message, exceptionType and traceId property names")]
    public async Task BuildResponseBodyAsync_WritesExpectedJsonPropertyNames()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Development);
        UiExceptionHandler sut = new(_ => Task.CompletedTask, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;

        await sut.BuildResponseBodyAsync(context, new InvalidOperationException("boom"));

        string json = Encoding.UTF8.GetString(body.ToArray());
        json.Should().Contain("\"message\":\"boom\"");
        json.Should().Contain("\"exceptionType\":\"InvalidOperationException\"");
        json.Should().Contain($"\"traceId\":\"{context.TraceIdentifier}\"");
    }

    [Test, Description("Invoke should log the exception and neither rethrow nor touch the response when it has already started")]
    public async Task Invoke_LogsErrorAndDoesNotRethrowWhenResponseAlreadyStarted()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        InvalidOperationException exception = new("boom");
        RequestDelegate next = _ => throw exception;
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        Mock<IHttpResponseFeature> responseFeatureMock = new();
        responseFeatureMock.SetupGet(f => f.HasStarted).Returns(true);
        responseFeatureMock.SetupProperty(f => f.StatusCode, StatusCodes.Status200OK);
        responseFeatureMock.SetupProperty(f => f.Body, body);
        context.Features.Set(responseFeatureMock.Object);

        Func<Task> act = async () => await sut.Invoke(context);

        await act.Should().NotThrowAsync("nothing more can be sent once the response has started");
        context.Response.StatusCode.Should().Be(StatusCodes.Status200OK, "headers are already sent, so the status cannot change");
        body.Length.Should().Be(0);
        loggerMock.Verify(l => l.Log(LogLevel.Error, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), exception, It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once, "a swallowed exception must at least be logged");
    }

    [Test, Description("Invoke should return 499 with no body and no error log when the client cancelled the request")]
    public async Task Invoke_Returns499AndLogsInformationWhenClientCancelled()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        using CancellationTokenSource cts = new();
        RequestDelegate next = _ => throw new OperationCanceledException(cts.Token);
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        MemoryStream body = new();
        context.Response.Body = body;
        context.RequestAborted = cts.Token;
        await cts.CancelAsync();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(499);
        body.Length.Should().Be(0, "the client is gone, so there is nobody to read a body");
        loggerMock.Verify(l => l.Log(LogLevel.Information, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
        loggerMock.Verify(l => l.Log(LogLevel.Error, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Never);
    }

    [Test, Description("Invoke should treat an OperationCanceledException as a 500 when the client did not abort the request")]
    public async Task Invoke_Returns500WhenCancellationDidNotComeFromTheClient()
    {
        Mock<ILogger<UiExceptionHandler>> loggerMock = new();
        Mock<IHostEnvironment> environmentMock = new();
        environmentMock.Setup(e => e.EnvironmentName).Returns(Environments.Production);
        OperationCanceledException exception = new("internal timeout");
        RequestDelegate next = _ => throw exception;
        UiExceptionHandler sut = new(next, loggerMock.Object, environmentMock.Object);
        DefaultHttpContext context = new();
        context.Response.Body = new MemoryStream();

        await sut.Invoke(context);

        context.Response.StatusCode.Should().Be(StatusCodes.Status500InternalServerError, "a cancellation the client did not ask for is our problem");
        loggerMock.Verify(l => l.Log(LogLevel.Error, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), exception, It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }
}