using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Controllers;
using OI.Service.Models.Requests;

namespace OI.Service.Tests.ControllerTests;

/// <summary>
/// Tests for <see cref="OrdersController"/> (the list/search endpoint).
/// Note: <see cref="OrderControllerTests"/> covers the singular <see cref="OrderController"/> (create).
/// </summary>
[TestFixture, Description("Tests for OrdersController")]
public class OrdersControllerTests
{
    [Test, Description("Constructor should throw when orderManager is null")]
    public void Constructor_ThrowsWhenOrderManagerIsNull()
    {
        Action act = () => _ = new OrdersController(null!, NullLogger<IOrderManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("orderManager");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<IOrderManager> orderManagerMock = new();
        Action act = () => _ = new OrdersController(orderManagerMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("GetOrders should return 200 OK with the orders as data and the total as totalRecordSize")]
    public async Task GetOrders_Returns200WithDataAndTotalRecordSize()
    {
        IEnumerable<IOrderSearch> orders =
        [
            CreateOrder(1000, "Jane Smith", "512-555-0100"),
            CreateOrder(1001, "John Jones", "214-555-0101")
        ];
        Mock<IOrderManager> orderManagerMock = CreateManagerMock(new PagedResult<IOrderSearch>(orders, 42L));
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        IActionResult result = await sut.GetOrders(CancellationToken.None, new ListRequest());

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.StatusCode.Should().Be(StatusCodes.Status200OK);
        GetValue<IEnumerable<IOrderSearch>>(okResult.Value, "data").Should().BeSameAs(orders);
        GetValue<long>(okResult.Value, "totalRecordSize").Should().Be(42L);
    }

    [Test, Description("GetOrders should report the total of all matching orders, not just the size of the page returned")]
    public async Task GetOrders_ReportsTotalRecordSizeIndependentOfPageContents()
    {
        IEnumerable<IOrderSearch> onePage = [CreateOrder(1000, "Jane Smith", "512-555-0100")];
        Mock<IOrderManager> orderManagerMock = CreateManagerMock(new PagedResult<IOrderSearch>(onePage, 500L));
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        IActionResult result = await sut.GetOrders(CancellationToken.None, new ListRequest { Page = 1, PageSize = 1 });

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        GetValue<IEnumerable<IOrderSearch>>(okResult.Value, "data").Should().HaveCount(1);
        GetValue<long>(okResult.Value, "totalRecordSize").Should().Be(500L);
    }

    [Test, Description("GetOrders should return an empty data list and a zero total when there are no orders")]
    public async Task GetOrders_ReturnsEmptyDataAndZeroTotal_WhenNoOrders()
    {
        Mock<IOrderManager> orderManagerMock = CreateManagerMock(new PagedResult<IOrderSearch>([], 0L));
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        IActionResult result = await sut.GetOrders(CancellationToken.None, new ListRequest());

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        GetValue<IEnumerable<IOrderSearch>>(okResult.Value, "data").Should().BeEmpty();
        GetValue<long>(okResult.Value, "totalRecordSize").Should().Be(0L);
    }

    [Test, Description("GetOrders should treat a missing request body as an empty request and pass no filters, page or page size to the manager")]
    public async Task GetOrders_PassesNothing_WhenRequestIsNull()
    {
        Mock<IOrderManager> orderManagerMock = CreateManagerMock();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        IActionResult result = await sut.GetOrders(CancellationToken.None, null!);

        result.Should().BeOfType<OkObjectResult>();
        orderManagerMock.Verify(m => m.GetOrdersPagedAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>?>(f => f == null)!,
            null,
            null,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetOrders should pass no filters when the request has a page but no filters")]
    public async Task GetOrders_PassesNullFilters_WhenRequestHasNoFilters()
    {
        Mock<IOrderManager> orderManagerMock = CreateManagerMock();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        await sut.GetOrders(CancellationToken.None, new ListRequest { Page = 2, PageSize = 10 });

        orderManagerMock.Verify(m => m.GetOrdersPagedAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>?>(f => f == null)!,
            2,
            10,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetOrders should pass the requested page, page size and transformed filters to the manager")]
    public async Task GetOrders_PassesRequestValuesToManager()
    {
        Mock<IOrderManager> orderManagerMock = CreateManagerMock();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);
        FilterMetaData customerNameFilter = new() { SearchValue = "Smith", MatchMode = "contains", LogicalOperator = "and" };
        FilterMetaData phoneFilter = new() { SearchValue = "512", MatchMode = "startsWith", LogicalOperator = "or" };
        ListRequest request = new()
        {
            Page = 3,
            PageSize = 25,
            Filters = new Dictionary<string, FilterMetaData[]>
            {
                ["CustomerName"] = [customerNameFilter],
                ["PhoneNumber"] = [phoneFilter]
            }
        };

        await sut.GetOrders(CancellationToken.None, request);

        orderManagerMock.Verify(m => m.GetOrdersPagedAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>?>(f =>
                f != null
                && f.Count == 2
                && f["CustomerName"].Length == 1
                && ReferenceEquals(f["CustomerName"][0], customerNameFilter)
                && f["PhoneNumber"].Length == 1
                && ReferenceEquals(f["PhoneNumber"][0], phoneFilter))!,
            3,
            25,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetOrders should call the manager exactly once")]
    public async Task GetOrders_CallsManagerOnce()
    {
        Mock<IOrderManager> orderManagerMock = CreateManagerMock();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        await sut.GetOrders(CancellationToken.None, new ListRequest());

        orderManagerMock.Verify(m => m.GetOrdersPagedAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int?>(), It.IsAny<int?>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetOrders should forward the cancellation token to the manager")]
    public async Task GetOrders_ForwardsCancellationToken()
    {
        using CancellationTokenSource cts = new();
        Mock<IOrderManager> orderManagerMock = CreateManagerMock();
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        await sut.GetOrders(cts.Token, new ListRequest());

        orderManagerMock.Verify(m => m.GetOrdersPagedAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int?>(), It.IsAny<int?>(), cts.Token), Times.Once);
    }

    [Test, Description("GetOrders should not swallow exceptions thrown by the manager")]
    public async Task GetOrders_PropagatesManagerException()
    {
        Mock<IOrderManager> orderManagerMock = new();
        orderManagerMock.Setup(m => m.GetOrdersPagedAsync(
                It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int?>(), It.IsAny<int?>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));
        OrdersController sut = new(orderManagerMock.Object, NullLogger<IOrderManager>.Instance);

        Func<Task> act = () => sut.GetOrders(CancellationToken.None, new ListRequest());

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("OrdersController should be decorated with [ApiController]")]
    public void OrdersController_IsDecoratedWithApiController()
    {
        typeof(OrdersController).GetCustomAttribute<ApiControllerAttribute>()
            .Should().NotBeNull("[ApiController] enables automatic model validation and binding behavior");
    }

    [Test, Description("OrdersController should be routed at api/[controller], which resolves to api/Orders")]
    public void OrdersController_HasExpectedRouteTemplate()
    {
        RouteAttribute? attribute = typeof(OrdersController).GetCustomAttribute<RouteAttribute>();

        // The [controller] token is the class name without "Controller", so the class name is part of the URL
        // the Angular client calls. Renaming the class would silently break the UI.
        nameof(OrdersController).Should().Be("OrdersController");
        attribute.Should().NotBeNull();
        attribute!.Template.Should().Be("api/[controller]");
    }

    [Test, Description("GetOrders should be exposed as an HTTP POST endpoint on the controller route")]
    public void GetOrders_IsDecoratedWithHttpPost()
    {
        MethodInfo? method = typeof(OrdersController).GetMethod(nameof(OrdersController.GetOrders));

        method.Should().NotBeNull();
        HttpPostAttribute? attribute = method!.GetCustomAttribute<HttpPostAttribute>();
        attribute.Should().NotBeNull("the filter body can only be sent with a POST");
        attribute!.Template.Should().BeNull("the endpoint lives on the controller route itself");
    }

    [Test, Description("GetOrders should declare a 200 response type for the API description")]
    public void GetOrders_DeclaresOkResponseType()
    {
        MethodInfo method = typeof(OrdersController).GetMethod(nameof(OrdersController.GetOrders))!;

        method.GetCustomAttributes<ProducesResponseTypeAttribute>()
            .Should().Contain(a => a.StatusCode == StatusCodes.Status200OK);
    }

    private static Mock<IOrderManager> CreateManagerMock(PagedResult<IOrderSearch>? result = null)
    {
        Mock<IOrderManager> orderManagerMock = new();
        orderManagerMock.Setup(m => m.GetOrdersPagedAsync(
                It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int?>(), It.IsAny<int?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(result ?? new PagedResult<IOrderSearch>([], 0L));
        return orderManagerMock;
    }

    private static IOrderSearch CreateOrder(int orderNumber, string customerName, string phoneNumber)
    {
        Mock<IOrderSearch> mock = new();
        mock.Setup(o => o.Id).Returns(Guid.NewGuid());
        mock.Setup(o => o.OrderNumber).Returns(orderNumber);
        mock.Setup(o => o.CustomerName).Returns(customerName);
        mock.Setup(o => o.PhoneNumber).Returns(phoneNumber);
        return mock.Object;
    }

    /// <summary>
    /// Reads a property from the anonymous response object the controller returns.
    /// </summary>
    private static T GetValue<T>(object? source, string propertyName)
    {
        source.Should().NotBeNull();
        PropertyInfo? property = source!.GetType().GetProperty(propertyName);
        property.Should().NotBeNull($"the response should expose '{propertyName}'");
        return (T)property!.GetValue(source)!;
    }
}
