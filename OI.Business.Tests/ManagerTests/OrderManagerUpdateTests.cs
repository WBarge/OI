using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for OrderManager.UpdateOrderAsync")]
public class OrderManagerUpdateTests
{
    private static OrderManager CreateSut(Mock<IOrderRepo> orderRepoMock)
        => new(orderRepoMock.Object, new Mock<ICustomerRepo>().Object, NullLogger<OrderManager>.Instance);

    /// <summary>a request for an existing order with no date and no order number, so the manager has to fill them in</summary>
    private static Mock<IUpdateOrder> CreateRequest(Guid orderId, DateTime? orderDate = null, int orderNumber = 0)
    {
        Mock<IUpdateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.Id, orderId);
        requestMock.SetupProperty(r => r.OrderDate, orderDate);
        requestMock.SetupProperty(r => r.OrderNumber, orderNumber);
        return requestMock;
    }

    private static Mock<IOrderRepo> CreateRepoWithExistingOrder(Guid orderId, DateTime orderDate, int orderNumber)
    {
        Mock<IOrder> existingOrder = new();
        existingOrder.Setup(o => o.Id).Returns(orderId);
        existingOrder.Setup(o => o.OrderDate).Returns(orderDate);
        existingOrder.Setup(o => o.OrderNumber).Returns(orderNumber);
        Mock<IOrderRepo> orderRepoMock = new();
        orderRepoMock.Setup(r => r.GetOrderAsync(orderId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(existingOrder.Object);
        orderRepoMock.Setup(r => r.UpdateOrder(It.IsAny<IUpdateOrder>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        return orderRepoMock;
    }

    [Test, Description("UpdateOrderAsync should throw a RequiredObjectException and not touch the repo when the request is null")]
    public async Task UpdateOrderAsync_ThrowsWhenRequestIsNull()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = CreateSut(orderRepoMock);

        Func<Task> act = async () => await sut.UpdateOrderAsync(null!, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequiredObjectException>();
        orderRepoMock.Verify(r => r.UpdateOrder(It.IsAny<IUpdateOrder>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("UpdateOrderAsync should throw a RequiredObjectException and not touch the repo when the order id is empty")]
    public async Task UpdateOrderAsync_ThrowsWhenIdIsEmpty()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(Guid.Empty);

        Func<Task> act = async () => await sut.UpdateOrderAsync(requestMock.Object, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequiredObjectException>();
        orderRepoMock.Verify(r => r.GetOrderAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Never);
        orderRepoMock.Verify(r => r.UpdateOrder(It.IsAny<IUpdateOrder>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("UpdateOrderAsync should throw a RequiredObjectException and not update anything when the order does not exist")]
    public async Task UpdateOrderAsync_ThrowsWhenOrderDoesNotExist()
    {
        Guid orderId = Guid.NewGuid();
        Mock<IOrderRepo> orderRepoMock = new();
        orderRepoMock.Setup(r => r.GetOrderAsync(orderId, It.IsAny<CancellationToken>())).ReturnsAsync((IOrder?)null);
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(orderId);

        Func<Task> act = async () => await sut.UpdateOrderAsync(requestMock.Object, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequiredObjectException>();
        orderRepoMock.Verify(r => r.UpdateOrder(It.IsAny<IUpdateOrder>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("UpdateOrderAsync should look the existing order up by the request id with the cancellation token")]
    public async Task UpdateOrderAsync_LooksUpExistingOrderWithIdAndCancellationToken()
    {
        Guid orderId = Guid.NewGuid();
        using CancellationTokenSource cts = new();
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, new DateTime(2026, 3, 15, 0, 0, 0, DateTimeKind.Utc), 1001);
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.UpdateOrderAsync(CreateRequest(orderId).Object, cts.Token);

        orderRepoMock.Verify(r => r.GetOrderAsync(orderId, cts.Token), Times.Once);
    }

    [Test, Description("UpdateOrderAsync should pass the request and the cancellation token to the repo")]
    public async Task UpdateOrderAsync_PassesRequestAndCancellationTokenToRepo()
    {
        Guid orderId = Guid.NewGuid();
        using CancellationTokenSource cts = new();
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, new DateTime(2026, 3, 15, 0, 0, 0, DateTimeKind.Utc), 1001);
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(orderId);

        await sut.UpdateOrderAsync(requestMock.Object, cts.Token);

        orderRepoMock.Verify(r => r.UpdateOrder(requestMock.Object, cts.Token), Times.Once);
    }

    [Test, Description("UpdateOrderAsync should keep the order date of the existing order when the request has none")]
    public async Task UpdateOrderAsync_UsesExistingOrderDateWhenRequestHasNone()
    {
        Guid orderId = Guid.NewGuid();
        DateTime existingDate = new(2026, 3, 15, 10, 30, 0, DateTimeKind.Utc);
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, existingDate, 1001);
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(orderId, orderDate: null);

        await sut.UpdateOrderAsync(requestMock.Object, TestContext.CurrentContext.CancellationToken);

        requestMock.Object.OrderDate.Should().Be(existingDate);
    }

    [Test, Description("UpdateOrderAsync should not replace an order date the request supplies")]
    public async Task UpdateOrderAsync_KeepsOrderDateTheRequestSupplies()
    {
        Guid orderId = Guid.NewGuid();
        DateTime requestedDate = new(2026, 4, 1, 8, 0, 0, DateTimeKind.Utc);
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, new DateTime(2026, 3, 15, 10, 30, 0, DateTimeKind.Utc), 1001);
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(orderId, orderDate: requestedDate);

        await sut.UpdateOrderAsync(requestMock.Object, TestContext.CurrentContext.CancellationToken);

        requestMock.Object.OrderDate.Should().Be(requestedDate);
    }

    [Test, Description("UpdateOrderAsync should keep the order number of the existing order when the request has none")]
    public async Task UpdateOrderAsync_UsesExistingOrderNumberWhenRequestHasNone()
    {
        Guid orderId = Guid.NewGuid();
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, new DateTime(2026, 3, 15, 0, 0, 0, DateTimeKind.Utc), 1042);
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(orderId, orderNumber: 0);

        await sut.UpdateOrderAsync(requestMock.Object, TestContext.CurrentContext.CancellationToken);

        requestMock.Object.OrderNumber.Should().Be(1042);
    }

    [Test, Description("UpdateOrderAsync should not replace an order number the request supplies")]
    public async Task UpdateOrderAsync_KeepsOrderNumberTheRequestSupplies()
    {
        Guid orderId = Guid.NewGuid();
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, new DateTime(2026, 3, 15, 0, 0, 0, DateTimeKind.Utc), 1042);
        OrderManager sut = CreateSut(orderRepoMock);
        Mock<IUpdateOrder> requestMock = CreateRequest(orderId, orderNumber: 2000);

        await sut.UpdateOrderAsync(requestMock.Object, TestContext.CurrentContext.CancellationToken);

        requestMock.Object.OrderNumber.Should().Be(2000);
    }

    [Test, Description("UpdateOrderAsync should propagate exceptions thrown by the repo")]
    public async Task UpdateOrderAsync_PropagatesRepoException()
    {
        Guid orderId = Guid.NewGuid();
        Mock<IOrderRepo> orderRepoMock = CreateRepoWithExistingOrder(orderId, new DateTime(2026, 3, 15, 0, 0, 0, DateTimeKind.Utc), 1001);
        orderRepoMock.Setup(r => r.UpdateOrder(It.IsAny<IUpdateOrder>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("save failed"));
        OrderManager sut = CreateSut(orderRepoMock);

        Func<Task> act = async () => await sut.UpdateOrderAsync(CreateRequest(orderId).Object, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("save failed");
    }
}
