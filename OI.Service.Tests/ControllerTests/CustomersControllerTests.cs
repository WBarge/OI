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

[TestFixture, Description("Tests for CustomersController")]
public class CustomersControllerTests
{
    [Test, Description("Constructor should throw when customerManager is null")]
    public void Constructor_ThrowsWhenCustomerManagerIsNull()
    {
        Action act = () => _ = new CustomersController(null!, NullLogger<CustomersController>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("customerManager");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        Action act = () => _ = new CustomersController(customerManagerMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("GetCustomers should return 200 OK with the customers as data and the total as totalRecordSize")]
    public async Task GetCustomers_Returns200WithDataAndTotalRecordSize()
    {
        IEnumerable<ICustomerSearch> customers =
        [
            CreateCustomer("Jane", "Smith", "512-555-0100"),
            CreateCustomer("John", "Jones", "214-555-0101")
        ];
        Mock<ICustomerManager> customerManagerMock = CreateManagerMock(new PagedResult<ICustomerSearch>(customers, 42L));
        CustomersController sut = new(customerManagerMock.Object, NullLogger<CustomersController>.Instance);

        IActionResult result = await sut.GetCustomers(CancellationToken.None, new ListRequest());

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.StatusCode.Should().Be(StatusCodes.Status200OK);
        GetValue<IEnumerable<ICustomerSearch>>(okResult.Value, "data").Should().BeSameAs(customers);
        GetValue<long>(okResult.Value, "totalRecordSize").Should().Be(42L);
    }

    [Test, Description("GetCustomers should return an empty data list and a zero total when there are no customers")]
    public async Task GetCustomers_ReturnsEmptyDataAndZeroTotal_WhenNoCustomers()
    {
        Mock<ICustomerManager> customerManagerMock = CreateManagerMock(new PagedResult<ICustomerSearch>([], 0L));
        CustomersController sut = new(customerManagerMock.Object, NullLogger<CustomersController>.Instance);

        IActionResult result = await sut.GetCustomers(CancellationToken.None, new ListRequest());

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        GetValue<IEnumerable<ICustomerSearch>>(okResult.Value, "data").Should().BeEmpty();
        GetValue<long>(okResult.Value, "totalRecordSize").Should().Be(0L);
    }

    [Test, Description("GetCustomers should pass no filters, page or page size to the manager when the request body is missing")]
    public async Task GetCustomers_PassesNothing_WhenRequestIsNull()
    {
        Mock<ICustomerManager> customerManagerMock = CreateManagerMock();
        CustomersController sut = new(customerManagerMock.Object, NullLogger<CustomersController>.Instance);

        IActionResult result = await sut.GetCustomers(CancellationToken.None, null!);

        result.Should().BeOfType<OkObjectResult>();
        customerManagerMock.Verify(m => m.GetCustomersPagedAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>?>(f => f == null),
            null,
            null,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetCustomers should pass the requested page, page size and transformed filters to the manager")]
    public async Task GetCustomers_PassesRequestValuesToManager()
    {
        Mock<ICustomerManager> customerManagerMock = CreateManagerMock();
        CustomersController sut = new(customerManagerMock.Object, NullLogger<CustomersController>.Instance);
        FilterMetaData lastNameFilter = new() { SearchValue = "Smith", MatchMode = "equals", LogicalOperator = "and" };
        ListRequest request = new()
        {
            Page = 3,
            PageSize = 25,
            Filters = new Dictionary<string, FilterMetaData[]> { ["LastName"] = [lastNameFilter] }
        };

        await sut.GetCustomers(CancellationToken.None, request);

        customerManagerMock.Verify(m => m.GetCustomersPagedAsync(
            It.Is<Dictionary<string, IFilterMetaData[]>?>(f =>
                f != null
                && f.Count == 1
                && f.ContainsKey("LastName")
                && f["LastName"].Length == 1
                && ReferenceEquals(f["LastName"][0], lastNameFilter)),
            3,
            25,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetCustomers should forward the cancellation token to the manager")]
    public async Task GetCustomers_ForwardsCancellationToken()
    {
        using CancellationTokenSource cts = new();
        Mock<ICustomerManager> customerManagerMock = CreateManagerMock();
        CustomersController sut = new(customerManagerMock.Object, NullLogger<CustomersController>.Instance);

        await sut.GetCustomers(cts.Token, new ListRequest());

        customerManagerMock.Verify(m => m.GetCustomersPagedAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<int?>(), It.IsAny<int?>(), cts.Token), Times.Once);
    }

    [Test, Description("GetCustomers should not swallow exceptions thrown by the manager")]
    public async Task GetCustomers_PropagatesManagerException()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        CustomersController sut = new(customerManagerMock.Object, NullLogger<CustomersController>.Instance);
        customerManagerMock.Setup(m => m.GetCustomersPagedAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<int?>(), It.IsAny<int?>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.GetCustomers(CancellationToken.None, new ListRequest());

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    private static Mock<ICustomerManager> CreateManagerMock(PagedResult<ICustomerSearch>? result = null)
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.GetCustomersPagedAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<int?>(), It.IsAny<int?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(result ?? new PagedResult<ICustomerSearch>([], 0L));
        return customerManagerMock;
    }

    private static ICustomerSearch CreateCustomer(string firstName, string lastName, string phoneNumber)
    {
        Mock<ICustomerSearch> mock = new();
        mock.Setup(c => c.Id).Returns(Guid.NewGuid());
        mock.Setup(c => c.FirstName).Returns(firstName);
        mock.Setup(c => c.LastName).Returns(lastName);
        mock.Setup(c => c.PhoneNumber).Returns(phoneNumber);
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