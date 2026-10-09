using FluentAssertions;
using Newtonsoft.Json;
using OI.Service.Models.Results;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for ErrorMessageForClient")]
public class ErrorMessageForClientTests
{
    [Test, Description("Default constructor should leave Message and ExceptionType null")]
    public void DefaultConstructor_LeavesPropertiesNull()
    {
        ErrorMessageForClient sut = new();

        sut.Message.Should().BeNull();
        sut.ExceptionType.Should().BeNull();
    }

    [Test, Description("Exception constructor should copy the message and the exception type name")]
    public void ExceptionConstructor_MapsMessageAndTypeName()
    {
        ArgumentException exception = new("bad argument");

        ErrorMessageForClient sut = new(exception);

        sut.Message.Should().Be("bad argument");
        sut.ExceptionType.Should().Be("ArgumentException", "the short type name is sent, not the full name");
    }

    [Test, Description("Serialization should use the message and exceptionType property names")]
    public void Serialization_UsesCamelCasePropertyNames()
    {
        ErrorMessageForClient sut = new() { Message = "oops", ExceptionType = "SomeException" };

        string json = JsonConvert.SerializeObject(sut);

        json.Should().Be("{\"message\":\"oops\",\"exceptionType\":\"SomeException\"}");
    }
}