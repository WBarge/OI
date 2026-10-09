using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for StateManager")]
public class StateManagerTests
{
    [Test, Description("Constructor should throw when stateRepo is null")]
    public void Constructor_ThrowsWhenStateRepoIsNull()
    {
        Action act = () => _ = new StateManager(null!, NullLogger<StateManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("stateRepo");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<IStateRepo> stateRepoMock = new();
        Action act = () => _ = new StateManager(stateRepoMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("ListStatesAsync should return states from the repo")]
    public async Task ListStatesAsync_ReturnsStatesFromRepo()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        List<IState> expected =
        [
            CreateState("Texas", "TX"),
            CreateState("California", "CA")
        ];
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        IEnumerable<IState> result = await sut.ListStatesAsync(CancellationToken.None);

        result.Should().BeEquivalentTo(expected);
    }

    [Test, Description("ListStatesAsync should call the repo exactly once")]
    public async Task ListStatesAsync_CallsRepoOnce()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.ListStatesAsync(CancellationToken.None);

        stateRepoMock.Verify(r => r.ListStatesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("ListStatesAsync should return empty when repo returns empty")]
    public async Task ListStatesAsync_ReturnsEmpty_WhenRepoReturnsEmpty()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        IEnumerable<IState> result = await sut.ListStatesAsync(CancellationToken.None);

        result.Should().BeEmpty();
    }

    private static IState CreateState(string name, string code)
    {
        Mock<IState> mock = new();
        mock.Setup(s => s.Name).Returns(name);
        mock.Setup(s => s.Code).Returns(code);
        return mock.Object;
    }
}
