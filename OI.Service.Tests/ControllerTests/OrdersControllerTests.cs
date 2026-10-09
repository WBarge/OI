using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Controllers;
using OI.Service.Models.Requests;
using System.Reflection;

namespace OI.Service.Tests.ControllerTests;

[TestFixture, Description("Tests for OrdersController")]
public class OrdersControllerTests
{
    [Test, Description("Constructor should throw when orderManager is null")]
    public void Constructor_ThrowsWhenOrderManagerIsNull()
    {
        Action act = () => _ = new OrdersController(null!, NullLogger<OrdersController>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("orderManager");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<IOrderManager> orderManagerMock = new();
        Action act = () => _ = new OrdersController(orderManagerMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("CreateOrder should return 201 Created with the order")]
    public async Task CreateOrder_Returns201CreatedWithOrder()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(Guid.NewGuid());
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        CreateOrder request = new() { CustomerId = Guid.NewGuid() };
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        IActionResult result = await sut.CreateOrder(request, CancellationToken.None);

        CreatedAtActionResult createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.StatusCode.Should().Be(StatusCodes.Status201Created);
        createdResult.Value.Should().Be(orderMock.Object);
    }

    [Test, Description("CreateOrder should call the manager exactly once")]
    public async Task CreateOrder_CallsManagerOnce()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(Guid.NewGuid());
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        CreateOrder request = new() { CustomerId = Guid.NewGuid() };
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrder(request, CancellationToken.None);

        orderManagerMock.Verify(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Test, Description("CreateOrder should pass the request to the manager")]
    public async Task CreateOrder_PassesRequestToManager()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(Guid.NewGuid());
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        CreateOrder request = new() { CustomerId = Guid.NewGuid() };
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrder(request, CancellationToken.None);

        orderManagerMock.Verify(m => m.CreateOrderAsync(request, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("CreateOrder should return 201 Created when request is null")]
    public async Task CreateOrder_Returns201CreatedWhenRequestIsNull()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(Guid.NewGuid());
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        IActionResult result = await sut.CreateOrder(null, CancellationToken.None);

        CreatedAtActionResult createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.StatusCode.Should().Be(StatusCodes.Status201Created);
    }

    [Test, Description("CreateOrder should target the CreateOrder action and include the order id as a route value")]
    public async Task CreateOrder_ReturnsCreatedAtActionWithOrderIdRouteValue()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Guid orderId = Guid.NewGuid();
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(orderId);
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        CreateOrder request = new() { CustomerId = Guid.NewGuid() };
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        IActionResult result = await sut.CreateOrder(request, CancellationToken.None);

        CreatedAtActionResult createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.ActionName.Should().Be(nameof(OrdersController.CreateOrder));
        createdResult.RouteValues.Should().NotBeNull();
        createdResult.RouteValues!.ContainsKey("id").Should()
            .BeTrue("the route values should carry the new order's id");
        createdResult.RouteValues["id"].Should().Be(orderId);
    }

    [Test, Description("CreateOrder should pass a null request through to the manager")]
    public async Task CreateOrder_PassesNullRequestToManager()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(Guid.NewGuid());
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrder(null, CancellationToken.None);

        orderManagerMock.Verify(
            m => m.CreateOrderAsync(It.Is<ICreateOrder?>(r => r == null), It.IsAny<CancellationToken>()), Times.Once,
            "the manager owns null-request defaulting, so the controller must not alter it");
    }

    [Test, Description("CreateOrder should pass the cancellation token to the manager")]
    public async Task CreateOrder_PassesCancellationTokenToManager()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.Id).Returns(Guid.NewGuid());
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        CreateOrder request = new() { CustomerId = Guid.NewGuid() };
        using CancellationTokenSource cts = new();
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), cts.Token))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrder(request, cts.Token);

        orderManagerMock.Verify(m => m.CreateOrderAsync(request, cts.Token), Times.Once);
    }

    [Test, Description("CreateOrder should propagate exceptions thrown by the manager")]
    public async Task CreateOrder_PropagatesManagerException()
    {
        Mock<IOrderManager> orderManagerMock = new();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<OrdersController>.Instance);
        CreateOrder request = new() { CustomerId = Guid.NewGuid() };
        orderManagerMock.Setup(m => m.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("manager failed"));

        Func<Task> act = async () => await sut.CreateOrder(request, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("manager failed");
    }

    [Test, Description("OrdersController should be decorated with [ApiController]")]
    public void OrdersController_IsDecoratedWithApiController()
    {
        Type controllerType = typeof(OrdersController);

        ApiControllerAttribute? attribute = controllerType.GetCustomAttribute<ApiControllerAttribute>();

        attribute.Should().NotBeNull("[ApiController] enables automatic model validation and binding behavior");
    }

    [Test, Description("OrdersController should be routed at api/[controller]")]
    public void OrdersController_HasExpectedRouteTemplate()
    {
        Type controllerType = typeof(OrdersController);

        RouteAttribute? attribute = controllerType.GetCustomAttribute<RouteAttribute>();

        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be("api/[controller]");
    }

    [Test, Description("CreateOrder should be exposed as an HTTP POST endpoint")]
    public void CreateOrder_IsDecoratedWithHttpPost()
    {
        MethodInfo? method = typeof(OrdersController).GetMethod(nameof(OrdersController.CreateOrder));

        method.Should().NotBeNull();
        method!.GetCustomAttribute<HttpPostAttribute>().Should().NotBeNull("creating an order must be a POST");
    }
}
