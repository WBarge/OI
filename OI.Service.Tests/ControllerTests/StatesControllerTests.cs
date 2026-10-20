using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Controllers;

namespace OI.Service.Tests.ControllerTests;

[TestFixture, Description("Tests for StatesController")]
public class StatesControllerTests
{
    [Test, Description("Constructor should throw when stateManager is null")]
    public void Constructor_ThrowsWhenStateManagerIsNull()
    {
        Action act = () => _ = new StatesController(null!, NullLogger<StatesController>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("stateManager");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<IStateManager> stateManagerMock = new();
        Action act = () => _ = new StatesController(stateManagerMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("GetAllStates should return 200 OK with states")]
    public async Task GetAllStates_Returns200WithStates()
    {
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        List<IState> states =
        [
            CreateState("Texas", "TX"),
            CreateState("California", "CA")
        ];
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(states);

        IActionResult result = await sut.GetAllStates(TestContext.CurrentContext.CancellationToken);

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.StatusCode.Should().Be(StatusCodes.Status200OK);
        okResult.Value.Should().BeEquivalentTo(states);
    }

    [Test, Description("GetAllStates should call the manager exactly once")]
    public async Task GetAllStates_CallsManagerOnce()
    {
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.GetAllStates(TestContext.CurrentContext.CancellationToken);

        stateManagerMock.Verify(m => m.ListStatesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetAllStates should return 200 OK with empty list when no states exist")]
    public async Task GetAllStates_Returns200WithEmptyList_WhenNoStates()
    {
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        IActionResult result = await sut.GetAllStates(TestContext.CurrentContext.CancellationToken);

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().BeAssignableTo<IEnumerable<IState>>()
            .Which.Should().BeEmpty();
    }

    [Test, Description("GetAllStates should return the manager's states unchanged and in the same order")]
    public async Task GetAllStates_ReturnsStatesInManagerOrder()
    {
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        List<IState> states =
        [
            CreateState("Texas", "TX"),
            CreateState("California", "CA"),
            CreateState("Arizona", "AZ")
        ];
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(states);

        IActionResult result = await sut.GetAllStates(CancellationToken.None);

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().BeAssignableTo<IEnumerable<IState>>()
            .Which.Should().Equal(states);
    }

    [Test, Description("GetAllStates should forward the cancellation token to the manager")]
    public async Task GetAllStates_ForwardsCancellationToken()
    {
        using CancellationTokenSource cts = new();
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.GetAllStates(cts.Token);

        stateManagerMock.Verify(m => m.ListStatesAsync(cts.Token), Times.Once);
    }

    [Test, Description("GetAllStates should not swallow exceptions thrown by the manager")]
    public async Task GetAllStates_PropagatesManagerException()
    {
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.GetAllStates(CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("StatesController should be decorated with [ApiController]")]
    public void StatesController_IsDecoratedWithApiController()
    {
        typeof(StatesController).GetCustomAttribute<ApiControllerAttribute>().Should().NotBeNull();
    }

    [Test, Description("StatesController should be routed at api/[controller], which resolves to api/States")]
    public void StatesController_HasExpectedRouteTemplate()
    {
        RouteAttribute? attribute = typeof(StatesController).GetCustomAttribute<RouteAttribute>();

        // The [controller] token is the class name without "Controller", so the class name is part of the URL.
        nameof(StatesController).Should().Be("StatesController");
        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be("api/[controller]");
    }

    [Test, Description("GetAllStates should be exposed as an HTTP GET endpoint on the controller route")]
    public void GetAllStates_IsDecoratedWithHttpGet()
    {
        MethodInfo? method = typeof(StatesController).GetMethod(nameof(StatesController.GetAllStates));

        method.Should().NotBeNull();
        HttpGetAttribute? attribute = method!.GetCustomAttribute<HttpGetAttribute>();
        attribute.Should().NotBeNull("listing states is a read-only GET");
        attribute!.Template.Should().BeNull("the endpoint lives on the controller route itself");
    }

    private static IState CreateState(string name, string code)
    {
        Mock<IState> mock = new();
        mock.Setup(s => s.Name).Returns(name);
        mock.Setup(s => s.Code).Returns(code);
        return mock.Object;
    }
}
