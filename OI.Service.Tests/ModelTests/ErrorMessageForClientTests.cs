using FluentAssertions;
using Newtonsoft.Json;
using OI.Service.Models.Results;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for ErrorMessageForClient")]
public class ErrorMessageForClientTests
{
    [Test, Description("Default constructor should leave Message, ExceptionType and TraceId null")]
    public void DefaultConstructor_LeavesPropertiesNull()
    {
        ErrorMessageForClient sut = new();

        sut.Message.Should().BeNull();
        sut.ExceptionType.Should().BeNull();
        sut.TraceId.Should().BeNull();
    }

    [Test, Description("Exception constructor should copy the message and the exception type name")]
    public void ExceptionConstructor_MapsMessageAndTypeName()
    {
        ArgumentException exception = new("bad argument");

        ErrorMessageForClient sut = new(exception);

        sut.Message.Should().Be("bad argument");
        sut.ExceptionType.Should().Be("ArgumentException", "the short type name is sent, not the full name");
        sut.TraceId.Should().BeNull("the exception constructor does not know the trace id");
    }

    [Test, Description("Explicit constructor should copy the message, exception type and trace id")]
    public void ExplicitConstructor_MapsAllValues()
    {
        ErrorMessageForClient sut = new("something went wrong", "UnhandledException", "trace-123");

        sut.Message.Should().Be("something went wrong");
        sut.ExceptionType.Should().Be("UnhandledException");
        sut.TraceId.Should().Be("trace-123");
    }

    [Test, Description("Serialization should use the message and exceptionType property names and omit a null traceId")]
    public void Serialization_UsesCamelCasePropertyNamesAndOmitsNullTraceId()
    {
        ErrorMessageForClient sut = new() { Message = "oops", ExceptionType = "SomeException" };

        string json = JsonConvert.SerializeObject(sut);

        json.Should().Be("{\"message\":\"oops\",\"exceptionType\":\"SomeException\"}");
    }

    [Test, Description("Serialization should include the traceId property when it is set")]
    public void Serialization_IncludesTraceIdWhenSet()
    {
        ErrorMessageForClient sut = new() { Message = "oops", ExceptionType = "SomeException", TraceId = "trace-123" };

        string json = JsonConvert.SerializeObject(sut);

        json.Should().Be("{\"message\":\"oops\",\"exceptionType\":\"SomeException\",\"traceId\":\"trace-123\"}");
    }
}