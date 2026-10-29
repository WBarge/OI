using FluentAssertions;
using OI.Data.Contexts;
using OI.Data.Helpers;
using OI.Data.Model.Orders;
using OI.Data.Repos;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

/// <summary>
/// Tests for the order search side of <see cref="OrderRepo"/>: <c>FindPagedOrderRecordsAsync</c> and
/// <c>GetOrdersCountAsync</c>. Creating orders is covered by <see cref="OrderRepoTests"/>.
/// Every test gets its own empty database so counts and row order can be asserted exactly.
/// </summary>
[TestFixture, Description("Tests for the order repository's search and count")]
public class OrderRepoSearchTests
{
    private IsolatedDatabase _db = null!;
    private int _nextOrderNumber;

    [SetUp]
    public void SetUp()
    {
        _db = new IsolatedDatabase();
        _nextOrderNumber = 1000;
    }

    #region FindPagedOrderRecordsAsync

    [Test, Description("FindPagedOrderRecordsAsync should return only the orders that match the filter")]
    public async Task FindPagedOrderRecordsAsync_ReturnsOnlyMatchingOrders()
    {
        Guid wanted = await SeedOrderAsync(city: "Austin");
        await SeedOrderAsync(city: "Dallas");
        await SeedOrderAsync(city: "Houston");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        result.Select(o => o.Id).Should().Equal(wanted);
    }

    [Test, Description("FindPagedOrderRecordsAsync should map the order's search fields, using the customer's full name and phone number")]
    public async Task FindPagedOrderRecordsAsync_MapsSearchFields()
    {
        DateTime orderDate = new(2026, 3, 15, 10, 30, 0, DateTimeKind.Utc);
        DateTime completedDate = new(2026, 3, 16, 9, 0, 0, DateTimeKind.Utc);
        Guid customerId = await SeedCustomerAsync("Smith", "Jane", "512-555-0100");
        Guid orderId = await SeedOrderAsync(customerId: customerId, city: "Austin", total: 123.45m, isPending: false,
            orderDate: orderDate, completedDate: completedDate);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        IOrderSearch order = result.Should().ContainSingle().Subject;
        order.Id.Should().Be(orderId);
        order.CustomerName.Should().Be("Jane Smith");
        order.PhoneNumber.Should().Be("512-555-0100");
        order.OrderDate.Should().Be(orderDate);
        order.CompletedDate.Should().Be(completedDate);
        order.Total.Should().Be(123.45m);
        order.IsPending.Should().BeFalse();
    }

    [Test, Description("FindPagedOrderRecordsAsync should return a null completed date and a pending flag for an order that is not complete")]
    public async Task FindPagedOrderRecordsAsync_MapsPendingOrderWithNoCompletedDate()
    {
        Guid customerId = await SeedCustomerAsync("Smith", "Jane", "512-555-0100");
        await SeedOrderAsync(customerId: customerId, city: "Austin", isPending: true, completedDate: null);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        IOrderSearch order = result.Should().ContainSingle().Subject;
        order.IsPending.Should().BeTrue();
        order.CompletedDate.Should().BeNull();
    }

    [Test, Description("FindPagedOrderRecordsAsync should return the order number of each order")]
    public async Task FindPagedOrderRecordsAsync_MapsOrderNumber()
    {
        Guid customerId = await SeedCustomerAsync("Smith", "Jane", "512-555-0100");
        await SeedOrderAsync(customerId: customerId, city: "Austin", orderNumber: 4321);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        result.Should().ContainSingle().Which.OrderNumber.Should().Be(4321);
    }

    [Test, Description("FindPagedOrderRecordsAsync should still return an order that has no customer, with an empty name and phone number")]
    public async Task FindPagedOrderRecordsAsync_ReturnsOrderWithoutCustomer()
    {
        Guid orderId = await SeedOrderAsync(customerId: null, city: "Austin");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        IOrderSearch order = result.Should().ContainSingle().Subject;
        order.Id.Should().Be(orderId);
        order.CustomerName.Trim().Should().BeEmpty();
        order.PhoneNumber.Should().BeEmpty();
    }

    [Test, Description("FindPagedOrderRecordsAsync should return an order once even when it has several items")]
    public async Task FindPagedOrderRecordsAsync_ReturnsOrderOnce_WhenItHasManyItems()
    {
        Guid customerId = await SeedCustomerAsync("Smith", "Jane", "512-555-0100");
        Guid orderId = await SeedOrderAsync(customerId: customerId, city: "Austin", itemCount: 3);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        result.Select(o => o.Id).Should().Equal(orderId);
    }

    [Test, Description("FindPagedOrderRecordsAsync should order by customer last name, then first name")]
    public async Task FindPagedOrderRecordsAsync_OrdersByCustomerLastNameThenFirstName()
    {
        Guid smithZed = await SeedCustomerAsync("Smith", "Zed", "512-555-0100");
        Guid smithAdam = await SeedCustomerAsync("Smith", "Adam", "512-555-0101");
        Guid jonesZoe = await SeedCustomerAsync("Jones", "Zoe", "512-555-0102");
        await SeedOrderAsync(customerId: smithZed, city: "Austin");
        await SeedOrderAsync(customerId: smithAdam, city: "Austin");
        await SeedOrderAsync(customerId: jonesZoe, city: "Austin");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 10, CancellationToken.None);

        result.Select(o => o.CustomerName).Should().Equal("Zoe Jones", "Adam Smith", "Zed Smith");
    }

    [Test, Description("FindPagedOrderRecordsAsync should return the requested page, and nothing past the last page")]
    public async Task FindPagedOrderRecordsAsync_ReturnsRequestedPage()
    {
        await SeedFiveOrdersForOneCustomerAsync();
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        List<IOrderSearch> page1 = (await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 2, CancellationToken.None)).ToList();
        List<IOrderSearch> page2 = (await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 2, 2, CancellationToken.None)).ToList();
        List<IOrderSearch> page3 = (await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 3, 2, CancellationToken.None)).ToList();
        List<IOrderSearch> page4 = (await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 4, 2, CancellationToken.None)).ToList();

        page1.Should().HaveCount(2);
        page2.Should().HaveCount(2);
        page3.Should().HaveCount(1);
        page4.Should().BeEmpty();
    }

    [Test, Description("FindPagedOrderRecordsAsync should give every order exactly once across the pages, so the paging order is stable")]
    public async Task FindPagedOrderRecordsAsync_PagesDoNotOverlapOrSkipOrders()
    {
        await SeedFiveOrdersForOneCustomerAsync();
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        List<Guid> ids = [];
        for (int page = 1; page <= 3; page++)
        {
            ids.AddRange((await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), page, 2, CancellationToken.None)).Select(o => o.Id));
        }

        ids.Should().HaveCount(5);
        ids.Should().OnlyHaveUniqueItems();
    }

    [Test, Description("FindPagedOrderRecordsAsync should treat a page number below 1 as the first page")]
    public async Task FindPagedOrderRecordsAsync_TreatsPageBelowOneAsFirstPage()
    {
        await SeedFiveOrdersForOneCustomerAsync();
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> first = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 2, CancellationToken.None);
        IEnumerable<IOrderSearch> zero = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 0, 2, CancellationToken.None);

        zero.Select(o => o.Id).Should().Equal(first.Select(o => o.Id));
    }

    [Test, Description("FindPagedOrderRecordsAsync should treat a page size below 1 as a page size of 1")]
    public async Task FindPagedOrderRecordsAsync_TreatsPageSizeBelowOneAsOne()
    {
        await SeedFiveOrdersForOneCustomerAsync();
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), 1, 0, CancellationToken.None);

        result.Should().HaveCount(1);
    }

    [Test, Description("FindPagedOrderRecordsAsync should return an empty list, not throw, when the offset overflows an int")]
    public async Task FindPagedOrderRecordsAsync_ReturnsEmpty_WhenOffsetOverflowsInt()
    {
        await SeedFiveOrdersForOneCustomerAsync();
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), int.MaxValue, int.MaxValue, CancellationToken.None);

        result.Should().BeEmpty();
    }

    [Test, Description("FindPagedOrderRecordsAsync should return an empty list when no order matches the filter")]
    public async Task FindPagedOrderRecordsAsync_ReturnsEmpty_WhenNothingMatches()
    {
        await SeedOrderAsync(city: "Austin");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(CityEquals("Nowhere"), 1, 10, CancellationToken.None);

        result.Should().BeEmpty();
    }

    [Test, Description("FindPagedOrderRecordsAsync should return an empty list when there are no orders at all")]
    public async Task FindPagedOrderRecordsAsync_ReturnsEmpty_WhenThereAreNoOrders()
    {
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(null, 1, 10, CancellationToken.None);

        result.Should().BeEmpty();
    }

    [Test, Description("FindPagedOrderRecordsAsync should return every order when the filters are null")]
    public async Task FindPagedOrderRecordsAsync_ReturnsEveryOrder_WhenFiltersAreNull()
    {
        await SeedOrderAsync(city: "Austin");
        await SeedOrderAsync(city: "Dallas");
        await SeedOrderAsync(city: "Houston");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(null, 1, 100, CancellationToken.None);

        result.Should().HaveCount(3);
    }

    [Test, Description("FindPagedOrderRecordsAsync should return every order when the filters are empty")]
    public async Task FindPagedOrderRecordsAsync_ReturnsEveryOrder_WhenFiltersAreEmpty()
    {
        await SeedOrderAsync(city: "Austin");
        await SeedOrderAsync(city: "Dallas");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(new Dictionary<string, IFilterMetaData[]>(), 1, 100, CancellationToken.None);

        result.Should().HaveCount(2);
    }

    [Test, Description("FindPagedOrderRecordsAsync should apply filters on more than one property together")]
    public async Task FindPagedOrderRecordsAsync_CombinesFiltersOnDifferentProperties()
    {
        Guid pendingAustin = await SeedOrderAsync(city: "Austin", isPending: true);
        await SeedOrderAsync(city: "Austin", isPending: false);
        await SeedOrderAsync(city: "Dallas", isPending: true);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = new()
        {
            ["BillingCity"] = [Criteria("Austin", "equals")],
            ["IsPending"] = [Criteria("true", "equals")]
        };

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(filters, 1, 10, CancellationToken.None);

        result.Select(o => o.Id).Should().Equal(pendingAustin);
    }

    [Test, Description("FindPagedOrderRecordsAsync should filter on a numeric property")]
    public async Task FindPagedOrderRecordsAsync_FiltersOnOrderNumber()
    {
        Guid wanted = await SeedOrderAsync(city: "Austin", orderNumber: 2001);
        await SeedOrderAsync(city: "Austin", orderNumber: 2002);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = new() { ["OrderNumber"] = [Criteria("2001", "equals")] };

        IEnumerable<IOrderSearch> result = await sut.FindPagedOrderRecordsAsync(filters, 1, 10, CancellationToken.None);

        result.Select(o => o.Id).Should().Equal(wanted);
    }

    [Test, Description("FindPagedOrderRecordsAsync should not change any data")]
    public async Task FindPagedOrderRecordsAsync_DoesNotChangeData()
    {
        await SeedOrderAsync(city: "Austin", itemCount: 2);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        await sut.FindPagedOrderRecordsAsync(null, 1, 10, CancellationToken.None);

        using OiServiceDbContext verify = _db.CreateContext();
        verify.Orders.Count().Should().Be(1);
        verify.OrderItems.Count().Should().Be(2);
        context.ChangeTracker.HasChanges().Should().BeFalse();
    }

    /// <summary>
    /// The search is by Order property name. The screen shows the customer's name and phone number, but
    /// those are not Order properties, so filtering by them is not possible and fails.
    /// </summary>
    [Test, Description("FindPagedOrderRecordsAsync should fail with an ArgumentException when asked to filter on a name that is not an Order property")]
    public async Task FindPagedOrderRecordsAsync_Throws_WhenFilteringOnNonOrderProperty()
    {
        await SeedOrderAsync(city: "Austin");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = new() { ["CustomerName"] = [Criteria("Smith", "contains")] };

        Func<Task> act = () => sut.FindPagedOrderRecordsAsync(filters, 1, 10, CancellationToken.None);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<ArgumentException>().Which.Message.Should().Contain("CustomerName");
    }

    [Test, Description("FindPagedOrderRecordsAsync should fail with a cancellation exception when the token is already cancelled")]
    public async Task FindPagedOrderRecordsAsync_Throws_WhenCancelled()
    {
        await SeedOrderAsync(city: "Austin");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        Func<Task> act = () => sut.FindPagedOrderRecordsAsync(null, 1, 10, cts.Token);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<OperationCanceledException>();
    }

    #endregion

    #region GetOrdersCountAsync

    [Test, Description("GetOrdersCountAsync should count only the orders that match the filter")]
    public async Task GetOrdersCountAsync_CountsOnlyMatchingOrders()
    {
        await SeedOrderAsync(city: "Austin");
        await SeedOrderAsync(city: "Austin");
        await SeedOrderAsync(city: "Dallas");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        long count = await sut.GetOrdersCountAsync(CityEquals("Austin"), CancellationToken.None);

        count.Should().Be(2);
    }

    [Test, Description("GetOrdersCountAsync should count every order when the filters are null")]
    public async Task GetOrdersCountAsync_CountsEveryOrder_WhenFiltersAreNull()
    {
        await SeedOrderAsync(city: "Austin");
        await SeedOrderAsync(city: "Dallas");
        await SeedOrderAsync(city: "Houston");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        long count = await sut.GetOrdersCountAsync(null, CancellationToken.None);

        count.Should().Be(3);
    }

    [Test, Description("GetOrdersCountAsync should return zero when no order matches or there are no orders")]
    public async Task GetOrdersCountAsync_ReturnsZero_WhenNothingMatches()
    {
        await SeedOrderAsync(city: "Austin");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        long matching = await sut.GetOrdersCountAsync(CityEquals("Nowhere"), CancellationToken.None);

        matching.Should().Be(0);
    }

    [Test, Description("GetOrdersCountAsync should return zero when there are no orders")]
    public async Task GetOrdersCountAsync_ReturnsZero_WhenThereAreNoOrders()
    {
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        long count = await sut.GetOrdersCountAsync(null, CancellationToken.None);

        count.Should().Be(0);
    }

    [Test, Description("GetOrdersCountAsync should count an order once even when it has several items")]
    public async Task GetOrdersCountAsync_CountsOrderOnce_WhenItHasManyItems()
    {
        await SeedOrderAsync(city: "Austin", itemCount: 4);
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        long count = await sut.GetOrdersCountAsync(CityEquals("Austin"), CancellationToken.None);

        count.Should().Be(1);
    }

    [Test, Description("GetOrdersCountAsync should equal the number of orders the search returns across all pages for the same filter")]
    public async Task GetOrdersCountAsync_MatchesTheNumberOfOrdersAcrossAllPages()
    {
        await SeedFiveOrdersForOneCustomerAsync();
        await SeedOrderAsync(city: "Dallas");
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);

        long count = await sut.GetOrdersCountAsync(CityEquals("Austin"), CancellationToken.None);
        int found = 0;
        for (int page = 1; page <= 3; page++)
        {
            found += (await sut.FindPagedOrderRecordsAsync(CityEquals("Austin"), page, 2, CancellationToken.None)).Count();
        }

        count.Should().Be(found);
    }

    [Test, Description("GetOrdersCountAsync should fail with an ArgumentException when asked to filter on a name that is not an Order property")]
    public async Task GetOrdersCountAsync_Throws_WhenFilteringOnNonOrderProperty()
    {
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = new() { ["PhoneNumber"] = [Criteria("512", "startsWith")] };

        Func<Task> act = () => sut.GetOrdersCountAsync(filters, CancellationToken.None);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<ArgumentException>();
    }

    [Test, Description("GetOrdersCountAsync should fail with a cancellation exception when the token is already cancelled")]
    public async Task GetOrdersCountAsync_Throws_WhenCancelled()
    {
        using OiServiceDbContext context = _db.CreateContext();
        OrderRepo sut = new(context);
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        Func<Task> act = () => sut.GetOrdersCountAsync(null, cts.Token);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<OperationCanceledException>();
    }

    #endregion

    #region helpers

    private static IFilterMetaData Criteria(string searchValue, string matchMode)
    {
        return new FilterCriteria { SearchValue = searchValue, MatchMode = matchMode, LogicalOperator = "and" };
    }

    private static Dictionary<string, IFilterMetaData[]> CityEquals(string city)
    {
        return new Dictionary<string, IFilterMetaData[]> { ["BillingCity"] = [Criteria(city, "equals")] };
    }

    private async Task SeedFiveOrdersForOneCustomerAsync()
    {
        Guid customerId = await SeedCustomerAsync("Smith", "Jane", "512-555-0100");
        for (int i = 0; i < 5; i++)
        {
            await SeedOrderAsync(customerId: customerId, city: "Austin");
        }
    }

    private async Task<Guid> SeedCustomerAsync(string lastName, string? firstName, string phoneNumber)
    {
        Guid id = Guid.NewGuid();
        await using OiServiceDbContext seed = _db.CreateContext();
        seed.Customers.Add(new Customer
        {
            Id = id,
            LastName = lastName,
            FirstName = firstName,
            PhoneNumber = phoneNumber,
            Created = DateTime.UtcNow
        });
        await seed.SaveChangesAsync();
        return id;
    }

    private async Task<Guid> SeedOrderAsync(
        Guid? customerId = null,
        string city = "Austin",
        int? orderNumber = null,
        decimal total = 10m,
        bool isPending = true,
        DateTime? orderDate = null,
        DateTime? completedDate = null,
        int itemCount = 0)
    {
        Guid id = Guid.NewGuid();
        await using OiServiceDbContext seed = _db.CreateContext();
        Order order = new()
        {
            Id = id,
            OrderNumber = orderNumber ?? _nextOrderNumber++,
            OrderDate = orderDate ?? DateTime.UtcNow,
            CompletedDate = completedDate,
            CustomerId = customerId,
            BillingCity = city,
            SubTotal = total,
            Total = total,
            IsPending = isPending,
            Created = DateTime.UtcNow,
            OrderItems = []
        };
        for (int i = 0; i < itemCount; i++)
        {
            order.OrderItems.Add(new OrderItem
            {
                Id = Guid.NewGuid(),
                OrderId = id,
                ProductId = Guid.NewGuid(),
                Name = $"Item {i}",
                Description = "An item",
                Sku = $"SKU{i}",
                Price = 1m,
                Quantity = 1,
                Total = 1m,
                Created = DateTime.UtcNow
            });
        }
        seed.Orders.Add(order);
        await seed.SaveChangesAsync();
        return id;
    }

    #endregion
}
