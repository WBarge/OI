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

        IActionResult result = await sut.GetAllStates(CancellationToken.None);

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

        await sut.GetAllStates(CancellationToken.None);

        stateManagerMock.Verify(m => m.ListStatesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetAllStates should return 200 OK with empty list when no states exist")]
    public async Task GetAllStates_Returns200WithEmptyList_WhenNoStates()
    {
        Mock<IStateManager> stateManagerMock = new();
        StatesController sut = new(stateManagerMock.Object, NullLogger<StatesController>.Instance);
        stateManagerMock.Setup(m => m.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        IActionResult result = await sut.GetAllStates(CancellationToken.None);

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().BeAssignableTo<IEnumerable<IState>>()
            .Which.Should().BeEmpty();
    }

    private static IState CreateState(string name, string code)
    {
        Mock<IState> mock = new();
        mock.Setup(s => s.Name).Returns(name);
        mock.Setup(s => s.Code).Returns(code);
        return mock.Object;
    }
}
