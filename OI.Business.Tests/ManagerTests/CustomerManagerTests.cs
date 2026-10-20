using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using CrossCutting.Exceptions;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for CustomerManager")]
public class CustomerManagerTests
{
    private const string LAST_NAME = "Smith";
    private const string PHONE_NUMBER = "512-555-0100";

    [Test, Description("Constructor should throw when customerRepo is null")]
    public void Constructor_ThrowsWhenCustomerRepoIsNull()
    {
        Action act = () => _ = new CustomerManager(null!, NullLogger<CustomerManager>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("customerRepo");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        Action act = () => _ = new CustomerManager(customerRepoMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("GetCustomersPagedAsync should return the customers from the repo")]
    public async Task GetCustomersPagedAsync_ReturnsCustomersFromRepo()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        IEnumerable<ICustomerSearch> expected =
        [
            CreateCustomer("Jane", "Smith", "512-555-0100"),
            CreateCustomer("John", "Jones", "214-555-0101")
        ];
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        PagedResult<ICustomerSearch> result =
            await sut.GetCustomersPagedAsync(null, 1, 10, TestContext.CurrentContext.CancellationToken);

        result.Data.Should().BeSameAs(expected);
    }

    [Test, Description("GetCustomersPagedAsync should pass the filters, page, page size and cancellation token to the repo")]
    public async Task GetCustomersPagedAsync_PassesArgumentsToRepo()
    {
        using CancellationTokenSource cts = new();
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        Dictionary<string, IFilterMetaData[]> filters = new()
        {
            ["LastName"] = [new Mock<IFilterMetaData>().Object]
        };
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(filters, 3, 25, cts.Token))
            .ReturnsAsync([]);

        await sut.GetCustomersPagedAsync(filters, 3, 25, cts.Token);

        customerRepoMock.Verify(r => r.FindPagedCustomerRecordsAsync(filters, 3, 25, cts.Token), Times.Once);
    }

    [Test, Description("GetCustomersPagedAsync should pass null filters through to the repo")]
    public async Task GetCustomersPagedAsync_PassesNullFiltersToRepo()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.GetCustomersPagedAsync(null, 1, 10, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.FindPagedCustomerRecordsAsync(
                It.Is<Dictionary<string, IFilterMetaData[]>?>(f => f == null), 1, 10, It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Test, Description("GetCustomersPagedAsync should return empty when the repo returns empty")]
    public async Task GetCustomersPagedAsync_ReturnsEmpty_WhenRepoReturnsEmpty()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        PagedResult<ICustomerSearch> result =
            await sut.GetCustomersPagedAsync(null, 1, 10, TestContext.CurrentContext.CancellationToken);

        result.Data.Should().BeEmpty();
        result.TotalRecordSize.Should().Be(0);
    }

    [Test, Description("GetCustomersPagedAsync should not swallow exceptions thrown by the repo")]
    public async Task GetCustomersPagedAsync_PropagatesRepoException()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.GetCustomersPagedAsync(null, 1, 10, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("GetCustomerCountAsync should return the count from the repo")]
    public async Task GetCustomerCountAsync_ReturnsCountFromRepo()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r =>
                r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                    It.IsAny<CancellationToken>()))
            .ReturnsAsync(42L);

        long result = await sut.GetCustomerCountAsync(TestContext.CurrentContext.CancellationToken);

        result.Should().Be(42L);
    }

    [Test, Description("GetCustomerCountAsync should forward the cancellation token and call the repo exactly once")]
    public async Task GetCustomerCountAsync_ForwardsCancellationTokenAndCallsRepoOnce()
    {
        using CancellationTokenSource cts = new();
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock
            .Setup(r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(), cts.Token))
            .ReturnsAsync(0L);

        await sut.GetCustomerCountAsync(cts.Token);

        customerRepoMock.Verify(
            r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(), cts.Token), Times.Once);
    }

    [Test, Description("GetCustomersPagedAsync should return the total from the repo's count, using the same filters as the page query")]
    public async Task GetCustomersPagedAsync_ReturnsTotalCountedWithSameFilters()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        Dictionary<string, IFilterMetaData[]> filters = new()
        {
            ["LastName"] = [new Mock<IFilterMetaData>().Object]
        };
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);
        // Only a count that receives the filters returns 7; anything else returns 100.
        customerRepoMock.Setup(r => r.GetCustomerCountAsync(filters, It.IsAny<CancellationToken>())).ReturnsAsync(7L);
        customerRepoMock.Setup(r => r.GetCustomerCountAsync(null, It.IsAny<CancellationToken>())).ReturnsAsync(100L);

        PagedResult<ICustomerSearch> result =
            await sut.GetCustomersPagedAsync(filters, 1, 10, TestContext.CurrentContext.CancellationToken);

        result.TotalRecordSize.Should().Be(7L);
    }

    [Test, Description("GetCustomersPagedAsync should use the first page and the default page size when they are not supplied")]
    public async Task GetCustomersPagedAsync_UsesDefaults_WhenPageAndPageSizeAreNull()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.GetCustomersPagedAsync(null, null, null, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.FindPagedCustomerRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), 1, CustomerManager.DEFAULT_PAGE_SIZE,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(0)]
    [TestCase(-3)]
    [Description("GetCustomersPagedAsync should treat a page below 1 as the first page")]
    public async Task GetCustomersPagedAsync_TreatsPageBelowOneAsFirstPage(int page)
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.GetCustomersPagedAsync(null, page, 10, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.FindPagedCustomerRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), 1, 10, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(0)]
    [TestCase(-10)]
    [Description("GetCustomersPagedAsync should treat a page size below 1 as the default page size")]
    public async Task GetCustomersPagedAsync_TreatsPageSizeBelowOneAsDefault(int pageSize)
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        await sut.GetCustomersPagedAsync(null, 2, pageSize, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.FindPagedCustomerRecordsAsync(
            It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), 2, CustomerManager.DEFAULT_PAGE_SIZE,
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("GetCustomerByIdAsync should return the customer from the repo")]
    public async Task GetCustomerByIdAsync_ReturnsCustomerFromRepo()
    {
        Guid id = Guid.NewGuid();
        ICustomer expected = CreateFullCustomer(id);
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.GetCustomerByIdAsync(id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        ICustomer? result = await sut.GetCustomerByIdAsync(id, TestContext.CurrentContext.CancellationToken);

        result.Should().BeSameAs(expected);
    }

    [Test, Description("GetCustomerByIdAsync should return null when the repo finds no customer")]
    public async Task GetCustomerByIdAsync_ReturnsNull_WhenRepoReturnsNull()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.GetCustomerByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((ICustomer?)null);

        ICustomer? result =
            await sut.GetCustomerByIdAsync(Guid.NewGuid(), TestContext.CurrentContext.CancellationToken);

        result.Should().BeNull();
    }

    [Test, Description("GetCustomerByIdAsync should pass the id and cancellation token to the repo exactly once")]
    public async Task GetCustomerByIdAsync_PassesIdAndTokenToRepo()
    {
        Guid id = Guid.NewGuid();
        using CancellationTokenSource cts = new();
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.GetCustomerByIdAsync(id, cts.Token))
            .ReturnsAsync(CreateFullCustomer(id));

        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        await sut.GetCustomerByIdAsync(id, cts.Token);

        customerRepoMock.Verify(r => r.GetCustomerByIdAsync(id, cts.Token), Times.Once);
    }

    [Test, Description("GetCustomerByIdAsync should return null without calling the repo when the id is empty")]
    public async Task GetCustomerByIdAsync_ReturnsNullWithoutCallingRepo_WhenIdIsEmpty()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        ICustomer? result = await sut.GetCustomerByIdAsync(Guid.Empty, TestContext.CurrentContext.CancellationToken);

        result.Should().BeNull();
        customerRepoMock.Verify(r => r.GetCustomerByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }

    [Test, Description("GetCustomerByIdAsync should not swallow exceptions thrown by the repo")]
    public async Task GetCustomerByIdAsync_PropagatesRepoException()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.GetCustomerByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.GetCustomerByIdAsync(Guid.NewGuid(), TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("CreateCustomerAsync should throw RequiredObjectException and not touch the repo when the request is null")]
    public async Task CreateCustomerAsync_ThrowsRequiredObjectException_WhenRequestIsNull()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.CreateCustomerAsync(null, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequiredObjectException>();
        VerifyNothingSaved(customerRepoMock);
    }

    [Test, Description("CreateCustomerAsync should save the request through the repo and return the saved customer")]
    public async Task CreateCustomerAsync_SavesRequestAndReturnsSavedCustomer()
    {
        using CancellationTokenSource cts = new();
        StubCreateCustomer request = ValidRequest();
        ICustomer saved = CreateFullCustomer(Guid.NewGuid());
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.CreateCustomerAsync(request, cts.Token)).ReturnsAsync(saved);

        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        ICustomer result = await sut.CreateCustomerAsync(request, cts.Token);

        result.Should().BeSameAs(saved);
        customerRepoMock.Verify(r => r.CreateCustomerAsync(request, cts.Token), Times.Once);
    }

    [Test, Description("CreateCustomerAsync should trim surrounding spaces from every value before saving")]
    public async Task CreateCustomerAsync_TrimsValuesBeforeSaving()
    {
        StubCreateCustomer request = new()
        {
            LastName = "  "+LAST_NAME+" ",
            FirstName = " Jane  ",
            PhoneNumber = " "+PHONE_NUMBER+" ",
            DefaultBillingAddress1 = " 123 Main St ",
            DefaultBillingAddress2 = " Apt 1 ",
            DefaultBillingCity = " Austin ",
            DefaultBillingStateCode = " TX ",
            DefaultBillingZipCode = " 78701 ",
            DefaultShippingAddress1 = " 456 Elm St ",
            DefaultShippingAddress2 = " Suite 2 ",
            DefaultShippingCity = " Dallas ",
            DefaultShippingStateCode = " TX ",
            DefaultShippingZipCode = " 75201 "
        };
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        request.LastName.Should().Be(LAST_NAME);
        request.FirstName.Should().Be("Jane");
        request.PhoneNumber.Should().Be(PHONE_NUMBER);
        request.DefaultBillingAddress1.Should().Be("123 Main St");
        request.DefaultBillingAddress2.Should().Be("Apt 1");
        request.DefaultBillingCity.Should().Be("Austin");
        request.DefaultBillingStateCode.Should().Be("TX");
        request.DefaultBillingZipCode.Should().Be("78701");
        request.DefaultShippingAddress1.Should().Be("456 Elm St");
        request.DefaultShippingAddress2.Should().Be("Suite 2");
        request.DefaultShippingCity.Should().Be("Dallas");
        request.DefaultShippingStateCode.Should().Be("TX");
        request.DefaultShippingZipCode.Should().Be("75201");
    }

    [Test, Description("CreateCustomerAsync should save blank optional values as null")]
    public async Task CreateCustomerAsync_SavesBlankOptionalValuesAsNull()
    {
        StubCreateCustomer request = new()
        {
            LastName = LAST_NAME,
            PhoneNumber = PHONE_NUMBER,
            FirstName = "   ",
            DefaultBillingAddress1 = "",
            DefaultBillingAddress2 = " ",
            DefaultBillingCity = "",
            DefaultBillingStateCode = "  ",
            DefaultBillingZipCode = "",
            DefaultShippingAddress1 = " ",
            DefaultShippingAddress2 = "",
            DefaultShippingCity = " ",
            DefaultShippingStateCode = "",
            DefaultShippingZipCode = "  "
        };
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        request.FirstName.Should().BeNull();
        request.DefaultBillingAddress1.Should().BeNull();
        request.DefaultBillingAddress2.Should().BeNull();
        request.DefaultBillingCity.Should().BeNull();
        request.DefaultBillingStateCode.Should().BeNull();
        request.DefaultBillingZipCode.Should().BeNull();
        request.DefaultShippingAddress1.Should().BeNull();
        request.DefaultShippingAddress2.Should().BeNull();
        request.DefaultShippingCity.Should().BeNull();
        request.DefaultShippingStateCode.Should().BeNull();
        request.DefaultShippingZipCode.Should().BeNull();
    }

    [Test, Description("CreateCustomerAsync should accept a request that has only the required values")]
    public async Task CreateCustomerAsync_AcceptsOnlyRequiredValues()
    {
        StubCreateCustomer request = ValidRequest();
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.CreateCustomerAsync(request, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("   ")]
    [Description("CreateCustomerAsync should reject a missing last name and not touch the repo")]
    public async Task CreateCustomerAsync_Throws_WhenLastNameIsMissing(string? lastName)
    {
        StubCreateCustomer request = ValidRequest();
        request.LastName = lastName!;
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>().WithMessage("*LastName is required.*");
        VerifyNothingSaved(customerRepoMock);
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("   ")]
    [Description("CreateCustomerAsync should reject a missing phone number and not touch the repo")]
    public async Task CreateCustomerAsync_Throws_WhenPhoneNumberIsMissing(string? phoneNumber)
    {
        StubCreateCustomer request = ValidRequest();
        request.PhoneNumber = phoneNumber!;
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>().WithMessage("*PhoneNumber is required.*");
        VerifyNothingSaved(customerRepoMock);
    }

    // The limits are written out here on purpose, not read from CustomerManager, so a wrong constant is caught.
    // They are the column sizes in OI.Data's CustomerConfig.
    private static IEnumerable<object[]> LengthLimits() =>
    [
        [nameof(ICreateCustomer.LastName), 100],
        [nameof(ICreateCustomer.FirstName), 100],
        [nameof(ICreateCustomer.PhoneNumber), 20],
        [nameof(ICreateCustomer.DefaultBillingAddress1), 200],
        [nameof(ICreateCustomer.DefaultBillingAddress2), 200],
        [nameof(ICreateCustomer.DefaultBillingCity), 100],
        [nameof(ICreateCustomer.DefaultBillingStateCode), 2],
        [nameof(ICreateCustomer.DefaultBillingZipCode), 10],
        [nameof(ICreateCustomer.DefaultShippingAddress1), 200],
        [nameof(ICreateCustomer.DefaultShippingAddress2), 200],
        [nameof(ICreateCustomer.DefaultShippingCity), 100],
        [nameof(ICreateCustomer.DefaultShippingStateCode), 2],
        [nameof(ICreateCustomer.DefaultShippingZipCode), 10]
    ];

    [TestCaseSource(nameof(LengthLimits))]
    [Description("CreateCustomerAsync should accept a value that is exactly as long as the column allows")]
    public async Task CreateCustomerAsync_Accepts_ValueAtMaximumLength(string propertyName, int maxLength)
    {
        StubCreateCustomer request = ValidRequest();
        SetProperty(request, propertyName, new string('x', maxLength));
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.CreateCustomerAsync(request, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCaseSource(nameof(LengthLimits))]
    [Description("CreateCustomerAsync should reject a value one character longer than the column allows and not touch the repo")]
    public async Task CreateCustomerAsync_Throws_WhenValueIsTooLong(string propertyName, int maxLength)
    {
        StubCreateCustomer request = ValidRequest();
        SetProperty(request, propertyName, new string('x', maxLength + 1));
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>()
            .WithMessage($"*{propertyName} must be {maxLength} characters or fewer.*");
        VerifyNothingSaved(customerRepoMock);
    }

    [Test, Description("CreateCustomerAsync should report every problem in one message")]
    public async Task CreateCustomerAsync_ReportsEveryProblemTogether()
    {
        StubCreateCustomer request = ValidRequest();
        request.LastName = "";
        request.PhoneNumber = "";
        request.DefaultBillingStateCode = "TXX";
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>()
            .WithMessage(
                "*LastName is required.*PhoneNumber is required.*DefaultBillingStateCode must be 2 characters or fewer.*");
    }

    [Test, Description("CreateCustomerAsync should not swallow exceptions thrown by the repo")]
    public async Task CreateCustomerAsync_PropagatesRepoException()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.CreateCustomerAsync(It.IsAny<ICreateCustomer>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.CreateCustomerAsync(ValidRequest(), TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("GetCustomersPagedAsync should not swallow an exception thrown by the count")]
    public async Task GetCustomersPagedAsync_PropagatesCountException()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);
        customerRepoMock.Setup(r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("count failed"));

        Func<Task> act = () => sut.GetCustomersPagedAsync(null, 1, 10, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("count failed");
    }

    [Test, Description("GetCustomersPagedAsync should not count when the search failed")]
    public async Task GetCustomersPagedAsync_DoesNotCountWhenFindFails()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("find failed"));

        Func<Task> act = () => sut.GetCustomersPagedAsync(null, 1, 10, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>();
        customerRepoMock.Verify(r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("GetCustomersPagedAsync should run the search and the count one after the other because they share one DbContext")]
    public async Task GetCustomersPagedAsync_RunsSearchAndCountOneAfterTheOther()
    {
        TaskCompletionSource<IEnumerable<ICustomerSearch>> findGate = new();
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        customerRepoMock.Setup(r => r.FindPagedCustomerRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(),
                It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .Returns(findGate.Task);
        customerRepoMock.Setup(r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(1L);

        Task<PagedResult<ICustomerSearch>> pending = sut.GetCustomersPagedAsync(null, 1, 10, CancellationToken.None);

        // The search has not finished, so a sequential implementation cannot have started the count yet.
        customerRepoMock.Verify(r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<CancellationToken>()), Times.Never);

        findGate.SetResult([]);
        PagedResult<ICustomerSearch> result = await pending;

        customerRepoMock.Verify(r => r.GetCustomerCountAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>?>(), It.IsAny<CancellationToken>()), Times.Once);
        result.TotalRecordSize.Should().Be(1L);
    }

    [TestCaseSource(nameof(LengthLimits))]
    [Description("CreateCustomerAsync should measure the length after trimming, so a maximum-length value padded with spaces is accepted")]
    public async Task CreateCustomerAsync_Accepts_MaximumLengthValuePaddedWithSpaces(string propertyName, int maxLength)
    {
        StubCreateCustomer request = ValidRequest();
        SetProperty(request, propertyName, "  " + new string('x', maxLength) + "  ");
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.CreateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.CreateCustomerAsync(request, It.IsAny<CancellationToken>()), Times.Once);
    }

    private static StubCreateCustomer ValidRequest() => new() { LastName = LAST_NAME, PhoneNumber = PHONE_NUMBER };

    private static Mock<ICustomerRepo> SetupRepoToSucceed()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.CreateCustomerAsync(It.IsAny<ICreateCustomer>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(CreateFullCustomer(Guid.NewGuid()));
        return customerRepoMock;
    }

    private static void VerifyNothingSaved(Mock<ICustomerRepo> customerRepoMock)
    {
        customerRepoMock.Verify(r => r.CreateCustomerAsync(It.IsAny<ICreateCustomer>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }

    private static void SetProperty(StubCreateCustomer request, string propertyName, string value)
    {
        typeof(ICreateCustomer).GetProperty(propertyName)!.SetValue(request, value);
    }

    private sealed class StubCreateCustomer : ICreateCustomer
    {
        public string LastName { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string? DefaultBillingAddress1 { get; set; }
        public string? DefaultBillingAddress2 { get; set; }
        public string? DefaultBillingCity { get; set; }
        public string? DefaultBillingStateCode { get; set; }
        public string? DefaultBillingZipCode { get; set; }
        public string? DefaultShippingAddress1 { get; set; }
        public string? DefaultShippingAddress2 { get; set; }
        public string? DefaultShippingCity { get; set; }
        public string? DefaultShippingStateCode { get; set; }
        public string? DefaultShippingZipCode { get; set; }
    }
    private static ICustomer CreateFullCustomer(Guid id)
    {
        Mock<ICustomer> mock = new();
        mock.Setup(c => c.Id).Returns(id);
        mock.Setup(c => c.FirstName).Returns("Jane");
        mock.Setup(c => c.LastName).Returns(LAST_NAME);
        mock.Setup(c => c.PhoneNumber).Returns(PHONE_NUMBER);
        return mock.Object;
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
}
