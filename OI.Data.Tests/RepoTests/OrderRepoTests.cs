using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using OI.Data.Model;
using OI.Data.Repos;
using OI.Glue.Models;
// ReSharper disable AccessToDisposedClosure

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for the order repository")]
public class OrderRepoTests
{
    private IServiceProvider _serviceProvider;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _serviceProvider = TestSetupHelper.GetServiceProvider();

        // Ensure the in-memory database is created and seeded
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = scope.ServiceProvider.GetRequiredService<OiDbContext>();
        context.Database.EnsureCreated();
    }

    [Test, Description("OrderRepo constructor should throw when dbContext is null")]
    public void Constructor_ThrowsWhenDbContextIsNull()
    {
        Action act = () => _ = new OrderRepo(null!);
        act.Should().Throw<ArgumentNullException>("dbContext is required by OrderRepo");
    }

    [Test, Description("GetNextOrderNumberAsync should return an order number starting at 1000")]
    public async Task GetNextOrderNumberAsync_ReturnsOrderNumberStartingAt1000()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        int orderNumber = await sut.GetNextOrderNumberAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        orderNumber.Should().BeGreaterThanOrEqualTo(1000, "order numbers start at 1000");
    }

    [Test, Description("GetNextOrderNumberAsync should increment the order number for subsequent calls")]
    public async Task GetNextOrderNumberAsync_IncrementsOrderNumber()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        int first = await sut.GetNextOrderNumberAsync(CancellationToken.None);
        int second = await sut.GetNextOrderNumberAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        second.Should().Be(first + 1, "each call should return the next sequential number");
    }

    [Test, Description("CreateOrderAsync should default OrderDate to UTC now when not provided in request")]
    public async Task CreateOrderAsync_DefaultsOrderDateToUtcNowWhenNotProvided()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.OrderDate.Date.Should().Be(DateTime.UtcNow.Date, "order date should default to today when not provided");
    }

    [Test, Description("CreateOrderAsync should use the OrderDate from the request when provided")]
    public async Task CreateOrderAsync_UsesOrderDateFromRequestWhenProvided()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        DateTime specificDate = new DateTime(2025, 6, 15, 0, 0, 0, DateTimeKind.Utc);
        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.OrderDate).Returns(specificDate);
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.OrderDate.Should().Be(specificDate, "order date should use the value from the request");
    }

    [Test, Description("CreateOrderAsync should map all request fields correctly")]
    public async Task CreateOrderAsync_MapsAllRequestFieldsCorrectly()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        Guid customerId = Guid.NewGuid();
        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(customerId);
        requestMock.Setup(r => r.OrderDate).Returns((DateTime?)null);
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns("Apt 1");
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("456 Elm St");
        requestMock.Setup(r => r.ShippingAddress2).Returns("Suite 2");
        requestMock.Setup(r => r.ShippingCity).Returns("Dallas");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("75201");

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.CustomerId.Should().Be(customerId);
        result.BillingAddress1.Should().Be("123 Main St");
        result.BillingAddress2.Should().Be("Apt 1");
        result.BillingCity.Should().Be("Austin");
        result.BillingStateCode.Should().Be("TX");
        result.BillingZipCode.Should().Be("78701");
        result.ShippingAddress1.Should().Be("456 Elm St");
        result.ShippingAddress2.Should().Be("Suite 2");
        result.ShippingCity.Should().Be("Dallas");
        result.ShippingStateCode.Should().Be("TX");
        result.ShippingZipCode.Should().Be("75201");
    }

    [Test, Description("CreateOrderAsync should set IsPending to true when isPending parameter is true")]
    public async Task CreateOrderAsync_SetsIsPendingTrue()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.IsPending.Should().BeTrue("orders are created in a pending state");
    }

    [Test, Description("CreateOrderAsync should default totals to zero when not provided in request")]
    public async Task CreateOrderAsync_DefaultsTotalsToZeroWhenNotProvided()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.SubTotal.Should().Be(0m, "SubTotal should default to zero when not provided");
        result.Shipping.Should().Be(0m, "Shipping should default to zero when not provided");
        result.Tax.Should().Be(0m, "Tax should default to zero when not provided");
        result.Total.Should().Be(0m, "Total should default to zero when not provided");
    }

    [Test, Description("CreateOrderAsync should store provided totals correctly")]
    public async Task CreateOrderAsync_StoresProvidedTotalsCorrectly()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.SubTotal).Returns(49.99m);
        requestMock.Setup(r => r.Shipping).Returns(5.99m);
        requestMock.Setup(r => r.Tax).Returns(4.12m);
        requestMock.Setup(r => r.Total).Returns(60.10m);
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.SubTotal.Should().Be(49.99m);
        result.Shipping.Should().Be(5.99m);
        result.Tax.Should().Be(4.12m);
        result.Total.Should().Be(60.10m);
    }

    // ---------- ORDER ITEMS ----------

    [Test, Description("CreateOrderAsync should create order items from the request and map all fields")]
    public async Task CreateOrderAsync_CreatesOrderItemsFromRequest()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        Guid productId1 = Guid.NewGuid();
        Guid productId2 = Guid.NewGuid();

        Mock<ICreateOrderItem> item1Mock = new();
        item1Mock.Setup(i => i.ProductId).Returns(productId1);
        item1Mock.Setup(i => i.Name).Returns("Widget");
        item1Mock.Setup(i => i.Description).Returns("A widget");
        item1Mock.Setup(i => i.Sku).Returns("WID-001");
        item1Mock.Setup(i => i.Price).Returns(10.50m);
        item1Mock.Setup(i => i.Quantity).Returns(2);
        item1Mock.Setup(i => i.Total).Returns(21.00m);

        Mock<ICreateOrderItem> item2Mock = new();
        item2Mock.Setup(i => i.ProductId).Returns(productId2);
        item2Mock.Setup(i => i.Name).Returns("Gadget");
        item2Mock.Setup(i => i.Description).Returns("A gadget");
        item2Mock.Setup(i => i.Sku).Returns("GAD-002");
        item2Mock.Setup(i => i.Price).Returns(5.25m);
        item2Mock.Setup(i => i.Quantity).Returns(3);
        item2Mock.Setup(i => i.Total).Returns(15.75m);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns([item1Mock.Object, item2Mock.Object]);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        List<OrderItem> items = await verifyContext.Set<OrderItem>().Where(i => i.OrderId == result.Id).ToListAsync();
        items.Should().HaveCount(2, "both request items should be persisted");

        OrderItem widget = items.Single(i => i.Sku == "WID-001");
        widget.ProductId.Should().Be(productId1);
        widget.Name.Should().Be("Widget");
        widget.Description.Should().Be("A widget");
        widget.Price.Should().Be(10.50m);
        widget.Quantity.Should().Be(2);
        widget.Total.Should().Be(21.00m);

        OrderItem gadget = items.Single(i => i.Sku == "GAD-002");
        gadget.ProductId.Should().Be(productId2);
        gadget.Name.Should().Be("Gadget");
        gadget.Description.Should().Be("A gadget");
        gadget.Price.Should().Be(5.25m);
        gadget.Quantity.Should().Be(3);
        gadget.Total.Should().Be(15.75m);
    }

    [Test, Description("CreateOrderAsync should default item Price, Quantity and Total to zero when null")]
    public async Task CreateOrderAsync_DefaultsItemValuesToZeroWhenNull()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrderItem> itemMock = new();
        itemMock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        itemMock.Setup(i => i.Name).Returns("Widget");
        itemMock.Setup(i => i.Description).Returns("A widget");
        itemMock.Setup(i => i.Sku).Returns("WID-001");
        itemMock.Setup(i => i.Price).Returns((decimal?)null);
        itemMock.Setup(i => i.Quantity).Returns((int?)null);
        itemMock.Setup(i => i.Total).Returns((decimal?)null);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns([itemMock.Object]);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderItem item = await verifyContext.Set<OrderItem>().SingleAsync(i => i.OrderId == result.Id);
        item.Price.Should().Be(0m, "Price should default to zero when not provided");
        item.Quantity.Should().Be(0, "Quantity should default to zero when not provided");
        item.Total.Should().Be(0m, "Total should default to zero when not provided");
    }

    [Test, Description("CreateOrderAsync should not create items when OrderItems is null")]
    public async Task CreateOrderAsync_HandlesNullOrderItems()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns((IEnumerable<ICreateOrderItem>?)null);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        int itemCount = await verifyContext.Set<OrderItem>().CountAsync(i => i.OrderId == result.Id);
        itemCount.Should().Be(0, "no items were supplied");
    }

    [Test, Description("CreateOrderAsync should not create items when OrderItems is empty")]
    public async Task CreateOrderAsync_HandlesEmptyOrderItems()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns(new List<ICreateOrderItem>());

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        int itemCount = await verifyContext.Set<OrderItem>().CountAsync(i => i.OrderId == result.Id);
        itemCount.Should().Be(0, "an empty item list should create no items");
    }

    [Test, Description("CreateOrderAsync should assign the new order's Id to each item's OrderId")]
    public async Task CreateOrderAsync_AssignsOrderIdToItems()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrderItem> item1Mock = new();
        item1Mock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item1Mock.Setup(i => i.Name).Returns("Widget");
        item1Mock.Setup(i => i.Description).Returns("A widget");
        item1Mock.Setup(i => i.Sku).Returns("WID-001");

        Mock<ICreateOrderItem> item2Mock = new();
        item2Mock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item2Mock.Setup(i => i.Name).Returns("Gadget");
        item2Mock.Setup(i => i.Description).Returns("A gadget");
        item2Mock.Setup(i => i.Sku).Returns("GAD-002");

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns([item1Mock.Object, item2Mock.Object]);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        List<OrderItem> items = await verifyContext.Set<OrderItem>().Where(i => i.OrderId == result.Id).ToListAsync();
        items.Should().HaveCount(2);
        items.Should().OnlyContain(i => i.OrderId == result.Id, "every item belongs to the new order");
    }

    [Test, Description("CreateOrderAsync should assign a unique non-empty Id to each item")]
    public async Task CreateOrderAsync_AssignsUniqueIdsToItems()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrderItem> item1Mock = new();
        item1Mock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item1Mock.Setup(i => i.Name).Returns("Widget");
        item1Mock.Setup(i => i.Description).Returns("A widget");
        item1Mock.Setup(i => i.Sku).Returns("WID-001");

        Mock<ICreateOrderItem> item2Mock = new();
        item2Mock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item2Mock.Setup(i => i.Name).Returns("Gadget");
        item2Mock.Setup(i => i.Description).Returns("A gadget");
        item2Mock.Setup(i => i.Sku).Returns("GAD-002");

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns([item1Mock.Object, item2Mock.Object]);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        List<Guid> itemIds = await verifyContext.Set<OrderItem>().Where(i => i.OrderId == result.Id).Select(i => i.Id)
            .ToListAsync();
        itemIds.Should().HaveCount(2);
        itemIds.Should().NotContain(Guid.Empty, "item ids must be generated");
        itemIds.Should().OnlyHaveUniqueItems("each item needs its own id");
    }

// ---------- PERSISTENCE ----------

    [Test, Description("CreateOrderAsync should persist the order so it can be read from a new context")]
    public async Task CreateOrderAsync_PersistsOrderToDatabase()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        Guid customerId = Guid.NewGuid();

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(customerId);
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns("Apt 1");
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("456 Elm St");
        requestMock.Setup(r => r.ShippingAddress2).Returns("Suite 2");
        requestMock.Setup(r => r.ShippingCity).Returns("Dallas");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("75201");
        requestMock.Setup(r => r.SubTotal).Returns(49.99m);
        requestMock.Setup(r => r.Shipping).Returns(5.99m);
        requestMock.Setup(r => r.Tax).Returns(4.12m);
        requestMock.Setup(r => r.Total).Returns(60.10m);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1234, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        Order? saved = await verifyContext.Set<Order>().SingleOrDefaultAsync(o => o.Id == result.Id);
        saved.Should().NotBeNull("the order should have been saved");
        saved!.OrderNumber.Should().Be(1234);
        saved.CustomerId.Should().Be(customerId);
        saved.BillingAddress1.Should().Be("123 Main St");
        saved.ShippingCity.Should().Be("Dallas");
        saved.SubTotal.Should().Be(49.99m);
        saved.Shipping.Should().Be(5.99m);
        saved.Tax.Should().Be(4.12m);
        saved.Total.Should().Be(60.10m);
    }

    [Test, Description("CreateOrderAsync should persist the order and its items together")]
    public async Task CreateOrderAsync_PersistsOrderWithItems()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrderItem> itemMock = new();
        itemMock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        itemMock.Setup(i => i.Name).Returns("Widget");
        itemMock.Setup(i => i.Description).Returns("A widget");
        itemMock.Setup(i => i.Sku).Returns("WID-001");
        itemMock.Setup(i => i.Price).Returns(10m);
        itemMock.Setup(i => i.Quantity).Returns(1);
        itemMock.Setup(i => i.Total).Returns(10m);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns([itemMock.Object]);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        Order saved = await verifyContext.Set<Order>().Include(o => o.OrderItems).SingleAsync(o => o.Id == result.Id);
        saved.Should().NotBeNull();
        saved.OrderItems.Should().NotBeEmpty();
        saved.OrderItems.Should().HaveCount(1, "the item should be loaded through the order's navigation property");
        saved.OrderItems!.Single().Sku.Should().Be("WID-001");
    }

    [Test, Description("GetNextOrderNumberAsync should persist the incremented counter")]
    public async Task GetNextOrderNumberAsync_PersistsIncrementedCounter()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        int orderNumber = await sut.GetNextOrderNumberAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderCounter counter = await verifyContext.OrderCounters.FirstAsync();
        counter.NextOrderNumber.Should().Be(orderNumber + 1, "the counter should be saved after being incremented");
    }

    [Test, Description("GetNextOrderNumberAsync should update the counter's Modified timestamp")]
    public async Task GetNextOrderNumberAsync_UpdatesModifiedTimestamp()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        await sut.GetNextOrderNumberAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderCounter counter = await verifyContext.OrderCounters.FirstAsync();
        counter.Modified.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5),
            "Modified should be set when the counter is incremented");
    }

// ---------- UNTESTED FIELDS / PARAMETERS ----------

    [Test, Description("CreateOrderAsync should set IsPending to false when isPending parameter is false")]
    public async Task CreateOrderAsync_SetsIsPendingFalse()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 1000, false, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.IsPending.Should().BeFalse("the isPending parameter was false");
    }

    [Test, Description("CreateOrderAsync should store the supplied order number")]
    public async Task CreateOrderAsync_StoresSuppliedOrderNumber()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 4321, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.OrderNumber.Should().Be(4321);
    }

    [Test, Description("CreateOrderAsync should leave CompletedDate null on creation")]
    public async Task CreateOrderAsync_LeavesCompletedDateNull()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        Order saved = await verifyContext.Set<Order>().SingleAsync(o => o.Id == result.Id);
        saved.CompletedDate.Should().BeNull("a new order has not been completed");
    }

    [Test, Description("CreateOrderAsync should set Created to the current UTC time")]
    public async Task CreateOrderAsync_SetsCreatedToUtcNow()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(request, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        Order saved = await verifyContext.Set<Order>().SingleAsync(o => o.Id == result.Id);
        saved.Created.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5));
    }

    [Test, Description("CreateOrderAsync should generate a unique non-empty Id for each order")]
    public async Task CreateOrderAsync_GeneratesUniqueOrderIds()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request1 = CreateRequest();
        ICreateOrder request2 = CreateRequest();

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder first = await sut.CreateOrderAsync(request1, 1000, true, CancellationToken.None);
        IOrder second = await sut.CreateOrderAsync(request2, 1001, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        first.Id.Should().NotBe(Guid.Empty);
        second.Id.Should().NotBe(Guid.Empty);
        first.Id.Should().NotBe(second.Id, "each order gets its own id");
    }

// ---------- CANCELLATION ----------

    [Test, Description("GetNextOrderNumberAsync should throw when the token is already cancelled")]
    public async Task GetNextOrderNumberAsync_ThrowsWhenCancelled()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        await TestContext.Out.WriteLineAsync("Executing test");
        Func<Task> act = () => sut.GetNextOrderNumberAsync(cts.Token);

        await TestContext.Out.WriteLineAsync("Examining results");
        await act.Should().ThrowAsync<OperationCanceledException>("the token was cancelled before the call");
    }

    [Test, Description("CreateOrderAsync should throw when the token is already cancelled")]
    public async Task CreateOrderAsync_ThrowsWhenCancelled()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        ICreateOrder request = CreateRequest();
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        await TestContext.Out.WriteLineAsync("Executing test");
        Func<Task> act = () => sut.CreateOrderAsync(request, 1000, true, cts.Token);

        await TestContext.Out.WriteLineAsync("Examining results");
        await act.Should().ThrowAsync<OperationCanceledException>("the token was cancelled before the call");
    }

    [Test,
     Description("GetNextOrderNumberAsync should throw InvalidOperationException when no OrderCounter row exists")]
    public async Task GetNextOrderNumberAsync_ThrowsWhenNoCounterExists()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        ServiceCollection services = new();
        services.AddEntityFrameworkInMemoryDatabase()
            .AddDbContext<OiDbContext>(optionsBuilder =>
                optionsBuilder.UseInMemoryDatabase($"NoCounter-{Guid.NewGuid()}"));
        using ServiceProvider isolatedProvider = services.BuildServiceProvider();
        using IServiceScope serviceScope = isolatedProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        await context.Database.EnsureCreatedAsync();
        context.OrderCounters.RemoveRange(context.OrderCounters);
        await context.SaveChangesAsync();
        OrderRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        Func<Task> act = () => sut.GetNextOrderNumberAsync(CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        await act.Should().ThrowAsync<InvalidOperationException>("FirstAsync throws when the table has no rows");
    }

    private static ICreateOrder CreateRequest()
    {
        Mock<ICreateOrder> mock = new();
        mock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        mock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        mock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        mock.Setup(r => r.BillingCity).Returns("Austin");
        mock.Setup(r => r.BillingStateCode).Returns("TX");
        mock.Setup(r => r.BillingZipCode).Returns("78701");
        mock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        mock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        mock.Setup(r => r.ShippingCity).Returns("Austin");
        mock.Setup(r => r.ShippingStateCode).Returns("TX");
        mock.Setup(r => r.ShippingZipCode).Returns("78701");
        mock.Setup(r => r.SubTotal).Returns((decimal?)null);
        mock.Setup(r => r.Shipping).Returns((decimal?)null);
        mock.Setup(r => r.Tax).Returns((decimal?)null);
        mock.Setup(r => r.Total).Returns((decimal?)null);
        return mock.Object;
    }

    [Test, Description("CreateOrderAsync should return the created order items on the returned order")]
    public async Task CreateOrderAsync_ReturnsOrderItemsOnResult()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrderItem> item1Mock = new();
        item1Mock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item1Mock.Setup(i => i.Name).Returns("Widget");
        item1Mock.Setup(i => i.Description).Returns("A widget");
        item1Mock.Setup(i => i.Sku).Returns("WID-001");
        item1Mock.Setup(i => i.Price).Returns(10.50m);
        item1Mock.Setup(i => i.Quantity).Returns(2);
        item1Mock.Setup(i => i.Total).Returns(21.00m);

        Mock<ICreateOrderItem> item2Mock = new();
        item2Mock.Setup(i => i.ProductId).Returns(Guid.NewGuid());
        item2Mock.Setup(i => i.Name).Returns("Gadget");
        item2Mock.Setup(i => i.Description).Returns("A gadget");
        item2Mock.Setup(i => i.Sku).Returns("GAD-002");
        item2Mock.Setup(i => i.Price).Returns(5.25m);
        item2Mock.Setup(i => i.Quantity).Returns(3);
        item2Mock.Setup(i => i.Total).Returns(15.75m);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns([item1Mock.Object, item2Mock.Object]);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        List<IOrderItem> items = result.OrderItems.ToList();
        items.Should().HaveCount(2, "the returned order should carry the items that were saved");
        IOrderItem widget = items.Single(i => i.Sku == "WID-001");
        widget.Name.Should().Be("Widget");
        widget.Description.Should().Be("A widget");
        widget.Price.Should().Be(10.50m);
        widget.Quantity.Should().Be(2);
        widget.Total.Should().Be(21.00m);
        IOrderItem gadget = items.Single(i => i.Sku == "GAD-002");
        gadget.Name.Should().Be("Gadget");
        gadget.Price.Should().Be(5.25m);
        gadget.Quantity.Should().Be(3);
        gadget.Total.Should().Be(15.75m);
    }

    [Test, Description("CreateOrderAsync should return an empty OrderItems collection when the request has no items")]
    public async Task CreateOrderAsync_ReturnsEmptyOrderItemsWhenRequestHasNone()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);

        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns(Guid.NewGuid());
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");
        requestMock.Setup(r => r.OrderItems).Returns((IEnumerable<ICreateOrderItem>?)null);

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.OrderItems.Should().NotBeNull().And
            .BeEmpty("an order without items should still expose an empty collection");
    }

    [Test, Description("CreateOrderAsync should save an order with no customer when CustomerId is null")]
    public async Task CreateOrderAsync_PersistsOrderWithNullCustomerId()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        OrderRepo sut = new(context);
        Mock<ICreateOrder> requestMock = new();
        requestMock.Setup(r => r.CustomerId).Returns((Guid?)null);
        requestMock.Setup(r => r.BillingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.BillingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.BillingCity).Returns("Austin");
        requestMock.Setup(r => r.BillingStateCode).Returns("TX");
        requestMock.Setup(r => r.BillingZipCode).Returns("78701");
        requestMock.Setup(r => r.ShippingAddress1).Returns("123 Main St");
        requestMock.Setup(r => r.ShippingAddress2).Returns(string.Empty);
        requestMock.Setup(r => r.ShippingCity).Returns("Austin");
        requestMock.Setup(r => r.ShippingStateCode).Returns("TX");
        requestMock.Setup(r => r.ShippingZipCode).Returns("78701");

        await TestContext.Out.WriteLineAsync("Executing test");
        IOrder result = await sut.CreateOrderAsync(requestMock.Object, 1000, true, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.CustomerId.Should().BeNull();
        using IServiceScope verifyScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext verifyContext = verifyScope.ServiceProvider.GetRequiredService<OiDbContext>();
        Order saved = await verifyContext.Set<Order>().SingleAsync(o => o.Id == result.Id);
        saved.CustomerId.Should().BeNull("an order without a customer is valid");
    }
}