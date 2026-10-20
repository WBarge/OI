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

        IEnumerable<IState> result = await sut.ListStatesAsync(TestContext.CurrentContext.CancellationToken);

        result.Should().BeEquivalentTo(expected);
    }

    [Test, Description("ListStatesAsync should call the repo exactly once")]
    public async Task ListStatesAsync_CallsRepoOnce()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.ListStatesAsync(TestContext.CurrentContext.CancellationToken);

        stateRepoMock.Verify(r => r.ListStatesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("ListStatesAsync should return empty when repo returns empty")]
    public async Task ListStatesAsync_ReturnsEmpty_WhenRepoReturnsEmpty()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        IEnumerable<IState> result = await sut.ListStatesAsync(TestContext.CurrentContext.CancellationToken);

        result.Should().BeEmpty();
    }

    [Test, Description("ListStatesAsync should return the repo's states unchanged and in the same order")]
    public async Task ListStatesAsync_ReturnsStatesInRepoOrder()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        List<IState> states = [CreateState("Texas", "TX"), CreateState("Arizona", "AZ"), CreateState("California", "CA")];
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(states);

        IEnumerable<IState> result = await sut.ListStatesAsync(TestContext.CurrentContext.CancellationToken);

        result.Should().Equal(states);
    }

    [Test, Description("ListStatesAsync should forward the cancellation token to the repo")]
    public async Task ListStatesAsync_ForwardsCancellationToken()
    {
        using CancellationTokenSource cts = new();
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.ListStatesAsync(cts.Token);

        stateRepoMock.Verify(r => r.ListStatesAsync(cts.Token), Times.Once);
    }

    [Test, Description("ListStatesAsync should not swallow exceptions thrown by the repo")]
    public async Task ListStatesAsync_PropagatesRepoException()
    {
        Mock<IStateRepo> stateRepoMock = new();
        StateManager sut = new(stateRepoMock.Object, NullLogger<StateManager>.Instance);
        stateRepoMock.Setup(r => r.ListStatesAsync(It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.ListStatesAsync(TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    private static IState CreateState(string name, string code)
    {
        Mock<IState> mock = new();
        mock.Setup(s => s.Name).Returns(name);
        mock.Setup(s => s.Code).Returns(code);
        return mock.Object;
    }
}
