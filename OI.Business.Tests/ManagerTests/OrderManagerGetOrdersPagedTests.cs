using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Tests.ManagerTests;

/// <summary>
/// Tests for <see cref="OrderManager.GetOrdersPagedAsync"/>, the order search/list use case.
/// The create-order use case is covered by <see cref="OrderManagerTests"/>.
/// </summary>
[TestFixture, Description("Tests for OrderManager.GetOrdersPagedAsync")]
public class OrderManagerGetOrdersPagedTests
{
    // Written out here on purpose, not read from OrderManager, so an accidental change to the default is caught.
    private const int EXPECTED_DEFAULT_PAGE_SIZE = 100000;

    [Test, Description("GetOrdersPagedAsync should return the orders from the repo as data and the repo's count as the total")]
    public async Task GetOrdersPagedAsync_ReturnsOrdersAndTotalFromRepo()
    {
        IEnumerable<IOrderSearch> orders = [CreateOrder(1000), CreateOrder(1001)];
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock(orders, 42L);
        OrderManager sut = CreateSut(orderRepoMock);

        PagedResult<IOrderSearch> result = await sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        result.Data.Should().BeSameAs(orders);
        result.TotalRecordSize.Should().Be(42L);
    }

    [Test, Description("GetOrdersPagedAsync should report the total of all matching orders, not the size of the page returned")]
    public async Task GetOrdersPagedAsync_TotalIsIndependentOfPageContents()
    {
        IEnumerable<IOrderSearch> onePage = [CreateOrder(1000)];
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock(onePage, 500L);
        OrderManager sut = CreateSut(orderRepoMock);

        PagedResult<IOrderSearch> result = await sut.GetOrdersPagedAsync(null!, 1, 1, CancellationToken.None);

        result.Data.Should().HaveCount(1);
        result.TotalRecordSize.Should().Be(500L);
    }

    [Test, Description("GetOrdersPagedAsync should return no data and a zero total when the repo has no orders")]
    public async Task GetOrdersPagedAsync_ReturnsEmpty_WhenRepoReturnsEmpty()
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock([], 0L);
        OrderManager sut = CreateSut(orderRepoMock);

        PagedResult<IOrderSearch> result = await sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        result.Data.Should().BeEmpty();
        result.TotalRecordSize.Should().Be(0L);
    }

    [Test, Description("GetOrdersPagedAsync should pass the filters, page, page size and cancellation token to the repo's search")]
    public async Task GetOrdersPagedAsync_PassesArgumentsToFind()
    {
        using CancellationTokenSource cts = new();
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);
        Dictionary<string, IFilterMetaData[]> filters = CreateFilters();

        await sut.GetOrdersPagedAsync(filters, 3, 25, cts.Token);

        orderRepoMock.Verify(r => r.FindPagedOrderRecordsAsync(filters, 3, 25, cts.Token), Times.Once);
    }

    [Test, Description("GetOrdersPagedAsync should count with the same filters and cancellation token so the total matches the search")]
    public async Task GetOrdersPagedAsync_CountsWithSameFiltersAndToken()
    {
        using CancellationTokenSource cts = new();
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);
        Dictionary<string, IFilterMetaData[]> filters = CreateFilters();

        await sut.GetOrdersPagedAsync(filters, 3, 25, cts.Token);

        orderRepoMock.Verify(r => r.GetOrdersCountAsync(filters, cts.Token), Times.Once);
    }

    [Test, Description("GetOrdersPagedAsync should pass null filters straight through, meaning every order")]
    public async Task GetOrdersPagedAsync_PassesNullFiltersToRepo()
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.GetOrdersPagedAsync(null!, 2, 10, CancellationToken.None);

        orderRepoMock.Verify(r => r.FindPagedOrderRecordsAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>>(f => f == null), 2, 10, It.IsAny<CancellationToken>()), Times.Once);
        orderRepoMock.Verify(r => r.GetOrdersCountAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>>(f => f == null), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetOrdersPagedAsync should use the first page and the default page size when neither is given")]
    public async Task GetOrdersPagedAsync_UsesDefaults_WhenPageAndPageSizeAreNull()
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.GetOrdersPagedAsync(null!, null, null, CancellationToken.None);

        orderRepoMock.Verify(r => r.FindPagedOrderRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), 1, EXPECTED_DEFAULT_PAGE_SIZE, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(0)]
    [TestCase(-1)]
    [TestCase(-100)]
    [Description("GetOrdersPagedAsync should treat a page number below 1 as the first page")]
    public async Task GetOrdersPagedAsync_TreatsPageBelowOneAsFirstPage(int page)
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.GetOrdersPagedAsync(null!, page, 10, CancellationToken.None);

        orderRepoMock.Verify(r => r.FindPagedOrderRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), 1, 10, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(0)]
    [TestCase(-1)]
    [TestCase(-100)]
    [Description("GetOrdersPagedAsync should treat a page size below 1 as the default page size")]
    public async Task GetOrdersPagedAsync_TreatsPageSizeBelowOneAsDefault(int pageSize)
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.GetOrdersPagedAsync(null!, 2, pageSize, CancellationToken.None);

        orderRepoMock.Verify(r => r.FindPagedOrderRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), 2, EXPECTED_DEFAULT_PAGE_SIZE, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(1, 1)]
    [TestCase(2, 50)]
    [TestCase(7, 100000)]
    [Description("GetOrdersPagedAsync should leave valid page and page size values as they are")]
    public async Task GetOrdersPagedAsync_KeepsValidPageAndPageSize(int page, int pageSize)
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.GetOrdersPagedAsync(null!, page, pageSize, CancellationToken.None);

        orderRepoMock.Verify(r => r.FindPagedOrderRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), page, pageSize, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetOrdersPagedAsync should run the search and the count one after the other because they share one DbContext")]
    public async Task GetOrdersPagedAsync_RunsSearchAndCountOneAfterTheOther()
    {
        TaskCompletionSource<IEnumerable<IOrderSearch>> findGate = new();
        Mock<IOrderRepo> orderRepoMock = new();
        orderRepoMock.Setup(r => r.FindPagedOrderRecordsAsync(
                It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .Returns(findGate.Task);
        orderRepoMock.Setup(r => r.GetOrdersCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(1L);
        OrderManager sut = CreateSut(orderRepoMock);

        Task<PagedResult<IOrderSearch>> pending = sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        // The search has not finished, so a sequential implementation cannot have started the count yet.
        orderRepoMock.Verify(r => r.GetOrdersCountAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<CancellationToken>()), Times.Never);

        findGate.SetResult([]);
        PagedResult<IOrderSearch> result = await pending;

        orderRepoMock.Verify(r => r.GetOrdersCountAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<CancellationToken>()), Times.Once);
        result.TotalRecordSize.Should().Be(1L);
    }

    [Test, Description("GetOrdersPagedAsync should not swallow an exception thrown by the search")]
    public async Task GetOrdersPagedAsync_PropagatesFindException()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        orderRepoMock.Setup(r => r.FindPagedOrderRecordsAsync(
                It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("find failed"));
        OrderManager sut = CreateSut(orderRepoMock);

        Func<Task> act = () => sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("find failed");
    }

    [Test, Description("GetOrdersPagedAsync should not count when the search failed")]
    public async Task GetOrdersPagedAsync_DoesNotCountWhenFindFails()
    {
        Mock<IOrderRepo> orderRepoMock = new();
        orderRepoMock.Setup(r => r.FindPagedOrderRecordsAsync(
                It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("find failed"));
        OrderManager sut = CreateSut(orderRepoMock);

        Func<Task> act = () => sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>();
        orderRepoMock.Verify(r => r.GetOrdersCountAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("GetOrdersPagedAsync should not swallow an exception thrown by the count")]
    public async Task GetOrdersPagedAsync_PropagatesCountException()
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        orderRepoMock.Setup(r => r.GetOrdersCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("count failed"));
        OrderManager sut = CreateSut(orderRepoMock);

        Func<Task> act = () => sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("count failed");
    }

    [Test, Description("GetOrdersPagedAsync should not touch the customer repo")]
    public async Task GetOrdersPagedAsync_DoesNotUseCustomerRepo()
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        Mock<ICustomerRepo> customerRepoMock = new();
        OrderManager sut = new(orderRepoMock.Object, customerRepoMock.Object, NullLogger<OrderManager>.Instance);

        await sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        customerRepoMock.VerifyNoOtherCalls();
    }

    [Test, Description("GetOrdersPagedAsync should not create or number an order")]
    public async Task GetOrdersPagedAsync_DoesNotCreateOrders()
    {
        Mock<IOrderRepo> orderRepoMock = CreateRepoMock();
        OrderManager sut = CreateSut(orderRepoMock);

        await sut.GetOrdersPagedAsync(null!, 1, 10, CancellationToken.None);

        orderRepoMock.Verify(r => r.CreateOrderAsync(
            It.IsAny<ICreateOrder>(), It.IsAny<int>(), It.IsAny<bool>(), It.IsAny<CancellationToken>()), Times.Never);
        orderRepoMock.Verify(r => r.GetNextOrderNumberAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    private static OrderManager CreateSut(Mock<IOrderRepo> orderRepoMock)
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        return new OrderManager(orderRepoMock.Object, customerRepoMock.Object, NullLogger<OrderManager>.Instance);
    }

    private static Mock<IOrderRepo> CreateRepoMock(IEnumerable<IOrderSearch>? data = null, long total = 0L)
    {
        Mock<IOrderRepo> orderRepoMock = new();
        orderRepoMock.Setup(r => r.FindPagedOrderRecordsAsync(
                It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(data ?? Array.Empty<IOrderSearch>());
        orderRepoMock.Setup(r => r.GetOrdersCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(total);
        return orderRepoMock;
    }

    private static Dictionary<string, IFilterMetaData[]> CreateFilters()
    {
        return new Dictionary<string, IFilterMetaData[]>
        {
            ["BillingCity"] = [new Mock<IFilterMetaData>().Object]
        };
    }

    private static IOrderSearch CreateOrder(int orderNumber)
    {
        Mock<IOrderSearch> mock = new();
        mock.Setup(o => o.Id).Returns(Guid.NewGuid());
        mock.Setup(o => o.OrderNumber).Returns(orderNumber);
        return mock.Object;
    }
}
