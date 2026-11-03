using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using OI.Glue.Security;
using OI.Integration.Security;

namespace OI.Integration.Tests.SecurityTests;

[TestFixture, Description("Tests for ClientContextMiddleware")]
public class ClientContextMiddlewareTests
{
    private static HttpContext SignedInRequest() => new DefaultHttpContext
    {
        User = new ClaimsPrincipal(new ClaimsIdentity([new Claim("sub", "user-1"), new Claim("token_use", "user")], "Bearer"))
    };

    private static HttpContext AnonymousRequest() => new DefaultHttpContext();

    [Test, Description("Constructor should throw when next is null")]
    public void Constructor_ThrowsWhenNextIsNull()
    {
        Action act = () => _ = new ClientContextMiddleware(null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("next");
    }

    [Test, Description("InvokeAsync should put the context the factory builds into the accessor")]
    public async Task InvokeAsync_SetsTheContextForASignedInUser()
    {
        ClientContext built = new("user-1", "Pat", null, [], []);
        Mock<IClientContextFactory> factory = new();
        factory.Setup(f => f.CreateAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>())).ReturnsAsync(built);
        ClientContextAccessor accessor = new();
        ClientContextMiddleware sut = new(_ => Task.CompletedTask);

        await sut.InvokeAsync(SignedInRequest(), accessor, factory.Object);

        accessor.Current.Should().BeSameAs(built);
    }

    [Test, Description("InvokeAsync should give the factory the request's user and its cancellation token")]
    public async Task InvokeAsync_PassesTheUserAndCancellationTokenToTheFactory()
    {
        HttpContext request = SignedInRequest();
        using CancellationTokenSource aborted = new();
        request.RequestAborted = aborted.Token;
        Mock<IClientContextFactory> factory = new();
        factory.Setup(f => f.CreateAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>())).ReturnsAsync(ClientContext.Anonymous);
        ClientContextMiddleware sut = new(_ => Task.CompletedTask);

        await sut.InvokeAsync(request, new ClientContextAccessor(), factory.Object);

        factory.Verify(f => f.CreateAsync(request.User, aborted.Token), Times.Once);
    }

    [Test, Description("InvokeAsync should leave the anonymous context, and not ask the factory, when nobody is signed in")]
    public async Task InvokeAsync_LeavesTheAnonymousContextWhenNobodyIsSignedIn()
    {
        Mock<IClientContextFactory> factory = new();
        ClientContextAccessor accessor = new();
        ClientContextMiddleware sut = new(_ => Task.CompletedTask);

        await sut.InvokeAsync(AnonymousRequest(), accessor, factory.Object);

        accessor.Current.Should().BeSameAs(ClientContext.Anonymous);
        factory.Verify(f => f.CreateAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("InvokeAsync should call the next step in the pipeline, for signed-in and anonymous requests alike")]
    public async Task InvokeAsync_AlwaysCallsNext()
    {
        Mock<IClientContextFactory> factory = new();
        factory.Setup(f => f.CreateAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>())).ReturnsAsync(ClientContext.Anonymous);
        int calls = 0;
        ClientContextMiddleware sut = new(_ => { calls++; return Task.CompletedTask; });

        await sut.InvokeAsync(SignedInRequest(), new ClientContextAccessor(), factory.Object);
        await sut.InvokeAsync(AnonymousRequest(), new ClientContextAccessor(), factory.Object);

        calls.Should().Be(2);
    }

    [Test, Description("The context should already be in place when the next step runs, so controllers can use it")]
    public async Task InvokeAsync_SetsTheContextBeforeCallingNext()
    {
        ClientContext built = new("user-1", "Pat", null, [], []);
        Mock<IClientContextFactory> factory = new();
        factory.Setup(f => f.CreateAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>())).ReturnsAsync(built);
        ClientContextAccessor accessor = new();
        IClientContext? seenByNext = null;
        ClientContextMiddleware sut = new(_ => { seenByNext = accessor.Current; return Task.CompletedTask; });

        await sut.InvokeAsync(SignedInRequest(), accessor, factory.Object);

        seenByNext.Should().BeSameAs(built);
    }

    [Test, Description("A failure while building the context should not be swallowed, and the request should not carry on without one")]
    public async Task InvokeAsync_DoesNotCallNextWhenTheFactoryFails()
    {
        Mock<IClientContextFactory> factory = new();
        factory.Setup(f => f.CreateAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>())).ThrowsAsync(new InvalidOperationException("boom"));
        bool nextCalled = false;
        ClientContextMiddleware sut = new(_ => { nextCalled = true; return Task.CompletedTask; });

        Func<Task> act = () => sut.InvokeAsync(SignedInRequest(), new ClientContextAccessor(), factory.Object);

        await act.Should().ThrowAsync<InvalidOperationException>();
        nextCalled.Should().BeFalse();
    }
}
