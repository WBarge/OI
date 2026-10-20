using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OI.Service.Controllers;

namespace OI.Service.Tests.ControllerTests;

[TestFixture, Description("Tests for PingController")]
public class PingControllerTests
{
    [Test, Description("Get should return a bare 200 OK so callers can tell the service is up")]
    public void Get_Returns200Ok()
    {
        PingController sut = new();

        IActionResult result = sut.Get();

        OkResult okResult = result.Should().BeOfType<OkResult>().Subject;
        okResult.StatusCode.Should().Be(StatusCodes.Status200OK);
    }

    [Test, Description("Get should return 200 OK every time it is called")]
    public void Get_Returns200OkOnRepeatedCalls()
    {
        PingController sut = new();

        IActionResult first = sut.Get();
        IActionResult second = sut.Get();

        first.Should().BeOfType<OkResult>();
        second.Should().BeOfType<OkResult>();
    }

    [Test, Description("PingController should be decorated with [ApiController]")]
    public void PingController_IsDecoratedWithApiController()
    {
        typeof(PingController).GetCustomAttribute<ApiControllerAttribute>().Should().NotBeNull();
    }

    [Test, Description("PingController should be routed at api/[controller], which resolves to api/Ping")]
    public void PingController_HasExpectedRouteTemplate()
    {
        RouteAttribute? attribute = typeof(PingController).GetCustomAttribute<RouteAttribute>();

        // The [controller] token is the class name without "Controller"; monitoring that calls api/ping depends on it.
        nameof(PingController).Should().Be("PingController");
        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be("api/[controller]");
    }

    [Test, Description("Get should be exposed as an HTTP GET endpoint on the controller route")]
    public void Get_IsDecoratedWithHttpGet()
    {
        MethodInfo? method = typeof(PingController).GetMethod(nameof(PingController.Get));

        method.Should().NotBeNull();
        HttpGetAttribute? attribute = method!.GetCustomAttribute<HttpGetAttribute>();
        attribute.Should().NotBeNull("a health check must be callable with a plain GET");
        attribute!.Template.Should().BeNull("the endpoint lives on the controller route itself");
    }

    [Test, Description("Get should declare a 200 response type for the API description")]
    public void Get_DeclaresOkResponseType()
    {
        MethodInfo method = typeof(PingController).GetMethod(nameof(PingController.Get))!;

        method.GetCustomAttributes<ProducesResponseTypeAttribute>()
            .Should().Contain(a => a.StatusCode == StatusCodes.Status200OK);
    }
}
