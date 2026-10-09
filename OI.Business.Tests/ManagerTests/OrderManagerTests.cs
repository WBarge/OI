using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for OrderManager")]
public class OrderManagerTests
{
    [Test, Description("Constructor should throw when orderRepo is null")]
    public void Constructor_ThrowsWhenOrderRepoIsNull()
    {
        Action act = () => _ = new OrderManager(null!, NullLogger<OrderManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("orderRepo");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        Action act = () => _ = new OrderManager(orderRepoMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("CreateOrderAsync should return the order from the repo")]
    public async Task CreateOrderAsync_ReturnsOrderFromRepo()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> expectedOrder = new();
        expectedOrder.Setup(o => o.OrderNumber).Returns(1000);
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedOrder.Object);

        IOrder result = await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        result.Should().Be(expectedOrder.Object);
    }

    [Test, Description("CreateOrderAsync should get the next order number from the repo")]
    public async Task CreateOrderAsync_GetsNextOrderNumberFromRepo()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        orderRepoMock.Verify(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("CreateOrderAsync should call CreateOrderAsync on the repo exactly once")]
    public async Task CreateOrderAsync_CallsRepoOnce()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        orderRepoMock.Verify(
            r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test,
     Description("CreateOrderAsync should pass the order number from GetNextOrderNumberAsync to CreateOrderAsync")]
    public async Task CreateOrderAsync_PassesOrderNumberToRepo()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1042);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        orderRepoMock.Verify(
            r => r.CreateOrderAsync(requestMock.Object, 1042, It.IsAny<bool>(), It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Test, Description("CreateOrderAsync should set OrderDate to UTC now when not provided in request")]
    public async Task CreateOrderAsync_SetsOrderDateToUtcNowWhenNotProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.OrderDate, null);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.OrderDate.Should().NotBeNull("OrderDate should be populated by the manager");
        requestMock.Object.OrderDate!.Value.Date.Should()
            .Be(DateTime.UtcNow.Date, "OrderDate should default to UTC now");
    }

    [Test, Description("CreateOrderAsync should preserve OrderDate when already provided in request")]
    public async Task CreateOrderAsync_PreservesOrderDateWhenProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        DateTime specificDate = new DateTime(2025, 3, 10, 0, 0, 0, DateTimeKind.Utc);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.OrderDate, specificDate);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.OrderDate.Should().Be(specificDate, "OrderDate should not be overwritten when already set");
    }

    [Test, Description("CreateOrderAsync should pass the request to the repo")]
    public async Task CreateOrderAsync_PassesRequestToRepo()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        orderMock.Setup(o => o.OrderNumber).Returns(1000);
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        orderRepoMock.Verify(
            r => r.CreateOrderAsync(requestMock.Object, It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("CreateOrderAsync should pass isPending as true to the repo (business rule)")]
    public async Task CreateOrderAsync_PassesIsPendingTrueToRepo()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        orderRepoMock.Verify(
            r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), true, It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Test, Description("CreateOrderAsync should succeed when request is null, using defaults")]
    public async Task CreateOrderAsync_SucceedsWhenRequestIsNull()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        Func<Task> act = async () => await sut.CreateOrderAsync(null, CancellationToken.None);

        await act.Should().NotThrowAsync("a null request should be treated as an empty order request");
    }

    [Test, Description("CreateOrderAsync should default SubTotal to zero when not provided")]
    public async Task CreateOrderAsync_DefaultsSubTotalToZeroWhenNotProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.SubTotal.Should().Be(0m, "SubTotal should default to zero when not provided");
    }

    [Test, Description("CreateOrderAsync should preserve SubTotal when already provided")]
    public async Task CreateOrderAsync_PreservesSubTotalWhenProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)49.99m);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.SubTotal.Should().Be(49.99m, "SubTotal should not be overwritten when already set");
    }

    [Test, Description("CreateOrderAsync should default Shipping, Tax, and Total to zero when not provided")]
    public async Task CreateOrderAsync_DefaultsShippingTaxTotalToZeroWhenNotProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupAllProperties();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.Shipping.Should().Be(0m, "Shipping should default to zero when not provided");
        requestMock.Object.Tax.Should().Be(0m, "Tax should default to zero when not provided");
        requestMock.Object.Total.Should().Be(0m, "Total should default to zero when not provided");
    }

    [Test, Description("CreateOrderAsync should calculate SubTotal from order items when items are present")]
    public async Task CreateOrderAsync_CalculatesSubTotalFromOrderItems()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        Mock<ICreateOrderItem> item1 = new();
        item1.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item1.Setup(i => i.Price).Returns(10.00m);
        item1.Setup(i => i.Quantity).Returns(2);
        Mock<ICreateOrderItem> item2 = new();
        item2.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item2.Setup(i => i.Price).Returns(5.00m);
        item2.Setup(i => i.Quantity).Returns(3);
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item1.Object, item2.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.SubTotal.Should()
            .Be(35.00m, "SubTotal should be sum of Price * Quantity for all items (10*2 + 5*3)");
    }

    [Test,
     Description(
         "CreateOrderAsync should override SubTotal with calculated value when items are present and SubTotal differs")]
    public async Task CreateOrderAsync_OverridesSubTotalWhenItemsProducesDifferentValue()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        Mock<ICreateOrderItem> item1 = new();
        item1.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item1.Setup(i => i.Price).Returns(20.00m);
        item1.Setup(i => i.Quantity).Returns(1);
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)99.99m);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item1.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.SubTotal.Should()
            .Be(20.00m, "SubTotal should be overridden by the calculated value from order items");
    }

    [Test, Description("CreateOrderAsync should set Total to SubTotal + Shipping + Tax")]
    public async Task CreateOrderAsync_SetsTotalToSubTotalPlusShippingPlusTax()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        Mock<ICreateOrderItem> item1 = new();
        item1.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item1.Setup(i => i.Price).Returns(50.00m);
        item1.Setup(i => i.Quantity).Returns(1);
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)5.99m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)4.12m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item1.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.Total.Should().Be(60.11m, "Total should equal SubTotal (50) + Shipping (5.99) + Tax (4.12)");
    }

    [Test, Description("CreateOrderAsync should set Total to zero when no items and no totals provided")]
    public async Task CreateOrderAsync_SetsTotalToZeroWhenNoItemsAndNoTotals()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)null);
        requestMock.SetupProperty(r => r.Tax, (decimal?)null);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns((IEnumerable<ICreateOrderItem>?)null);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.Total.Should().Be(0m, "Total should be zero when no items and no totals are provided");
    }

    // ---------- ORDER ITEM VALIDATION ----------

    [Test, Description("CreateOrderAsync should throw RequestException when an order item has an empty ProductId")]
    public async Task CreateOrderAsync_ThrowsRequestExceptionWhenItemProductIdIsEmpty()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrderItem> item = new();
        item.Setup(i => i.ProductId).Returns(Guid.Empty);
        item.Setup(i => i.Price).Returns(10m);
        item.Setup(i => i.Quantity).Returns(1);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        Func<Task> act = async () => await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        await act.Should().ThrowAsync<RequestException>("an order item must reference a product");
    }

    [Test,
     Description(
         "CreateOrderAsync should throw when a later item has an empty ProductId even if earlier items are valid")]
    public async Task CreateOrderAsync_ThrowsWhenSecondItemProductIdIsEmpty()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrderItem> validItem = new();
        validItem.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        validItem.Setup(i => i.Price).Returns(10m);
        validItem.Setup(i => i.Quantity).Returns(1);
        Mock<ICreateOrderItem> invalidItem = new();
        invalidItem.Setup(i => i.ProductId).Returns(Guid.Empty);
        invalidItem.Setup(i => i.Price).Returns(5m);
        invalidItem.Setup(i => i.Quantity).Returns(1);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { validItem.Object, invalidItem.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        Func<Task> act = async () => await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        await act.Should().ThrowAsync<RequestException>("every item is validated, not just the first");
    }

    [Test,
     Description("CreateOrderAsync should not consume an order number or create an order when an item is invalid")]
    public async Task CreateOrderAsync_DoesNotCallRepoWhenItemProductIdIsEmpty()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrderItem> item = new();
        item.Setup(i => i.ProductId).Returns(Guid.Empty);
        item.Setup(i => i.Price).Returns(10m);
        item.Setup(i => i.Quantity).Returns(1);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        Func<Task> act = async () => await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);
        await act.Should().ThrowAsync<RequestException>();

        orderRepoMock.Verify(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>()), Times.Never,
            "validation must happen before an order number is consumed");
        orderRepoMock.Verify(
            r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()), Times.Never);
    }

// ---------- ORDER ITEM VALUES ----------

    [Test, Description("CreateOrderAsync should default item Price, Quantity and Total to zero when not provided")]
    public async Task CreateOrderAsync_DefaultsItemPriceQuantityTotalToZeroWhenNotProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrderItem> item = new();
        item.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item.SetupProperty(i => i.Price, (decimal?)null);
        item.SetupProperty(i => i.Quantity, (int?)null);
        item.SetupProperty(i => i.Total, (decimal?)null);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        item.Object.Price.Should().Be(0m, "Price should default to zero when not provided");
        item.Object.Quantity.Should().Be(0, "Quantity should default to zero when not provided");
        item.Object.Total.Should().Be(0m, "Total should default to zero when not provided");
    }

    [Test, Description("CreateOrderAsync should override the item Total with Price * Quantity when they differ")]
    public async Task CreateOrderAsync_OverridesItemTotalWhenItDiffersFromPriceTimesQuantity()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrderItem> item = new();
        item.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item.SetupProperty(i => i.Price, (decimal?)12.50m);
        item.SetupProperty(i => i.Quantity, (int?)4);
        item.SetupProperty(i => i.Total, (decimal?)999.99m);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        item.Object.Total.Should().Be(50.00m, "item Total should be recalculated as Price (12.50) * Quantity (4)");
    }

    [Test, Description("CreateOrderAsync should calculate the item Total when the request does not supply one")]
    public async Task CreateOrderAsync_CalculatesItemTotalWhenNotProvided()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrderItem> item = new();
        item.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item.SetupProperty(i => i.Price, (decimal?)3.25m);
        item.SetupProperty(i => i.Quantity, (int?)4);
        item.SetupProperty(i => i.Total, (decimal?)null);
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)null);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new[] { item.Object });
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        item.Object.Total.Should().Be(13.00m, "item Total should be Price (3.25) * Quantity (4)");
    }

// ---------- TOTALS ----------

    [Test, Description("CreateOrderAsync should keep the provided SubTotal when OrderItems is empty")]
    public async Task CreateOrderAsync_PreservesSubTotalWhenOrderItemsIsEmpty()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)49.99m);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)0m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)0m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns(new List<ICreateOrderItem>());
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.SubTotal.Should().Be(49.99m, "SubTotal is only recalculated when there are items");
    }

    [Test, Description("CreateOrderAsync should use the provided SubTotal in the Total when there are no items")]
    public async Task CreateOrderAsync_CalculatesTotalFromProvidedSubTotalWhenNoItems()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)49.99m);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)5.99m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)4.12m);
        requestMock.SetupProperty(r => r.Total, (decimal?)null);
        requestMock.Setup(r => r.OrderItems).Returns((IEnumerable<ICreateOrderItem>?)null);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.Total.Should().Be(60.10m, "Total should be SubTotal (49.99) + Shipping (5.99) + Tax (4.12)");
    }

    [Test, Description("CreateOrderAsync should override a provided Total that differs from SubTotal + Shipping + Tax")]
    public async Task CreateOrderAsync_OverridesTotalWhenProvidedTotalDiffers()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        requestMock.SetupProperty(r => r.SubTotal, (decimal?)10m);
        requestMock.SetupProperty(r => r.Shipping, (decimal?)2m);
        requestMock.SetupProperty(r => r.Tax, (decimal?)1m);
        requestMock.SetupProperty(r => r.Total, (decimal?)999m);
        requestMock.Setup(r => r.OrderItems).Returns((IEnumerable<ICreateOrderItem>?)null);
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        requestMock.Object.Total.Should()
            .Be(13m, "a caller-supplied Total must not be trusted over the calculated one");
    }

// ---------- NULL REQUEST ----------

    [Test, Description("CreateOrderAsync should pass a defaulted request to the repo when the request is null")]
    public async Task CreateOrderAsync_PassesDefaultedRequestToRepoWhenRequestIsNull()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        ICreateOrder? capturedRequest = null;
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .Callback<ICreateOrder, int, bool, CancellationToken>((request, _, _, _) => capturedRequest = request)
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(null, CancellationToken.None);

        capturedRequest.Should().NotBeNull("the manager should substitute a default request");
        capturedRequest!.CustomerId.Should().BeNull();
        capturedRequest.OrderDate.Should().NotBeNull();
        capturedRequest.OrderDate!.Value.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5));
        capturedRequest.SubTotal.Should().Be(0m);
        capturedRequest.Shipping.Should().Be(0m);
        capturedRequest.Tax.Should().Be(0m);
        capturedRequest.Total.Should().Be(0m);
        capturedRequest.BillingAddress1.Should().BeEmpty();
        capturedRequest.ShippingAddress1.Should().BeEmpty();
        capturedRequest.OrderItems.Should().BeNull();
    }

// ---------- CANCELLATION / FAILURES ----------

    [Test, Description("CreateOrderAsync should pass the cancellation token to both repo calls")]
    public async Task CreateOrderAsync_PassesCancellationTokenToRepo()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        using CancellationTokenSource cts = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(cts.Token)).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), 1000, true, cts.Token))
            .ReturnsAsync(orderMock.Object);

        await sut.CreateOrderAsync(requestMock.Object, cts.Token);

        orderRepoMock.Verify(r => r.GetNextOrderNumberAsync(cts.Token), Times.Once);
        orderRepoMock.Verify(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), 1000, true, cts.Token), Times.Once);
    }

    [Test,
     Description("CreateOrderAsync should propagate exceptions from GetNextOrderNumberAsync and not create an order")]
    public async Task CreateOrderAsync_PropagatesExceptionFromGetNextOrderNumber()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<IOrder> orderMock = new();
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("counter unavailable"));
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(orderMock.Object);

        Func<Task> act = async () => await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("counter unavailable");
        orderRepoMock.Verify(
            r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("CreateOrderAsync should propagate exceptions from the repo's CreateOrderAsync")]
    public async Task CreateOrderAsync_PropagatesExceptionFromRepoCreateOrder()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, NullLogger<OrderManager>.Instance);
        Mock<ICreateOrder> requestMock = new();
        orderRepoMock.Setup(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1000);
        orderRepoMock.Setup(r => r.CreateOrderAsync(It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(),
                It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("save failed"));

        Func<Task> act = async () => await sut.CreateOrderAsync(requestMock.Object, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("save failed");
    }
}
