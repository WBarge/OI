using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Business.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Business.Tests.ManagerTests;

[TestFixture, Description("Tests for CustomerManager.UpdateCustomerAsync")]
public class CustomerManagerUpdateTests
{
    private const string LAST_NAME = "Smith";
    private const string PHONE_NUMBER = "512-555-0100";

    private static StubUpdateCustomer ValidRequest() => new() { Id = Guid.NewGuid(), LastName = LAST_NAME, PhoneNumber = PHONE_NUMBER };

    private static Mock<ICustomerRepo> SetupRepoToSucceed()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        return customerRepoMock;
    }

    private static void VerifyNothingSaved(Mock<ICustomerRepo> customerRepoMock)
    {
        customerRepoMock.Verify(r => r.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    private static void SetProperty(StubUpdateCustomer request, string propertyName, string value)
    {
        typeof(ICreateCustomer).GetProperty(propertyName)!.SetValue(request, value);
    }

    [Test, Description("UpdateCustomerAsync should throw an ArgumentNullException and not touch the repo when the request is null")]
    public async Task UpdateCustomerAsync_ThrowsWhenRequestIsNull()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(null!, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<ArgumentNullException>();
        VerifyNothingSaved(customerRepoMock);
    }

    [Test, Description("UpdateCustomerAsync should throw a RequestException and not touch the repo when the customer id is empty")]
    public async Task UpdateCustomerAsync_ThrowsWhenIdIsEmpty()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);
        StubUpdateCustomer request = ValidRequest();
        request.Id = Guid.Empty;

        Func<Task> act = () => sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>();
        VerifyNothingSaved(customerRepoMock);
    }

    [Test, Description("UpdateCustomerAsync should save the request through the repo with the cancellation token")]
    public async Task UpdateCustomerAsync_SavesRequestThroughRepo()
    {
        using CancellationTokenSource cts = new();
        StubUpdateCustomer request = ValidRequest();
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.UpdateCustomerAsync(request, cts.Token);

        customerRepoMock.Verify(r => r.UpdateCustomerAsync(request, cts.Token), Times.Once);
    }

    [Test, Description("UpdateCustomerAsync should trim surrounding spaces from every value before saving")]
    public async Task UpdateCustomerAsync_TrimsValuesBeforeSaving()
    {
        StubUpdateCustomer request = new()
        {
            Id = Guid.NewGuid(),
            LastName = "  " + LAST_NAME + " ",
            FirstName = " Jane  ",
            PhoneNumber = " " + PHONE_NUMBER + " ",
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

        await sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

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

    [Test, Description("UpdateCustomerAsync should save blank optional values as null so an update can clear them")]
    public async Task UpdateCustomerAsync_SavesBlankOptionalValuesAsNull()
    {
        StubUpdateCustomer request = new()
        {
            Id = Guid.NewGuid(),
            LastName = LAST_NAME,
            PhoneNumber = PHONE_NUMBER,
            FirstName = "   ",
            DefaultBillingAddress1 = "",
            DefaultBillingAddress2 = " ",
            DefaultBillingCity = "",
            DefaultBillingStateCode = " ",
            DefaultBillingZipCode = "",
            DefaultShippingAddress1 = " ",
            DefaultShippingAddress2 = "",
            DefaultShippingCity = " ",
            DefaultShippingStateCode = "",
            DefaultShippingZipCode = " "
        };
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

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

    [Test, Description("UpdateCustomerAsync should accept a request that has only the required values")]
    public async Task UpdateCustomerAsync_AcceptsOnlyRequiredValues()
    {
        StubUpdateCustomer request = ValidRequest();
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.UpdateCustomerAsync(request, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("   ")]
    [Description("UpdateCustomerAsync should reject a missing last name and not touch the repo")]
    public async Task UpdateCustomerAsync_Throws_WhenLastNameIsMissing(string? lastName)
    {
        StubUpdateCustomer request = ValidRequest();
        request.LastName = lastName!;
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>().WithMessage("*LastName is required.*");
        VerifyNothingSaved(customerRepoMock);
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("   ")]
    [Description("UpdateCustomerAsync should reject a missing phone number and not touch the repo")]
    public async Task UpdateCustomerAsync_Throws_WhenPhoneNumberIsMissing(string? phoneNumber)
    {
        StubUpdateCustomer request = ValidRequest();
        request.PhoneNumber = phoneNumber!;
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>().WithMessage("*PhoneNumber is required.*");
        VerifyNothingSaved(customerRepoMock);
    }

    [TestCase(nameof(ICreateCustomer.LastName), CustomerManager.MAX_LAST_NAME_LENGTH)]
    [TestCase(nameof(ICreateCustomer.FirstName), CustomerManager.MAX_FIRST_NAME_LENGTH)]
    [TestCase(nameof(ICreateCustomer.PhoneNumber), CustomerManager.MAX_PHONE_NUMBER_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultBillingAddress1), CustomerManager.MAX_ADDRESS_LINE_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultBillingStateCode), CustomerManager.MAX_STATE_CODE_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultShippingCity), CustomerManager.MAX_CITY_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultShippingZipCode), CustomerManager.MAX_ZIP_CODE_LENGTH)]
    [Description("UpdateCustomerAsync should accept a value that is exactly as long as the column allows")]
    public async Task UpdateCustomerAsync_Accepts_ValueAtMaximumLength(string propertyName, int maxLength)
    {
        StubUpdateCustomer request = ValidRequest();
        SetProperty(request, propertyName, new string('x', maxLength));
        Mock<ICustomerRepo> customerRepoMock = SetupRepoToSucceed();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        await sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        customerRepoMock.Verify(r => r.UpdateCustomerAsync(request, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(nameof(ICreateCustomer.LastName), CustomerManager.MAX_LAST_NAME_LENGTH)]
    [TestCase(nameof(ICreateCustomer.FirstName), CustomerManager.MAX_FIRST_NAME_LENGTH)]
    [TestCase(nameof(ICreateCustomer.PhoneNumber), CustomerManager.MAX_PHONE_NUMBER_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultBillingAddress1), CustomerManager.MAX_ADDRESS_LINE_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultBillingStateCode), CustomerManager.MAX_STATE_CODE_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultShippingCity), CustomerManager.MAX_CITY_LENGTH)]
    [TestCase(nameof(ICreateCustomer.DefaultShippingZipCode), CustomerManager.MAX_ZIP_CODE_LENGTH)]
    [Description("UpdateCustomerAsync should reject a value one character longer than the column allows and not touch the repo")]
    public async Task UpdateCustomerAsync_Throws_WhenValueIsTooLong(string propertyName, int maxLength)
    {
        StubUpdateCustomer request = ValidRequest();
        SetProperty(request, propertyName, new string('x', maxLength + 1));
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>().WithMessage($"*{propertyName} must be {maxLength} characters or fewer.*");
        VerifyNothingSaved(customerRepoMock);
    }

    [Test, Description("UpdateCustomerAsync should report every problem in one message")]
    public async Task UpdateCustomerAsync_ReportsEveryProblemTogether()
    {
        StubUpdateCustomer request = ValidRequest();
        request.LastName = "";
        request.PhoneNumber = "";
        request.DefaultShippingStateCode = "TEXAS";
        Mock<ICustomerRepo> customerRepoMock = new();
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequestException>()
            .WithMessage("*LastName is required.*PhoneNumber is required.*DefaultShippingStateCode must be 2 characters or fewer.*");
        VerifyNothingSaved(customerRepoMock);
    }

    [Test, Description("UpdateCustomerAsync should not swallow a RequiredObjectException the repo throws for an unknown customer")]
    public async Task UpdateCustomerAsync_PropagatesRepoRequiredObjectException()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new RequiredObjectException("customer was not found"));
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(ValidRequest(), TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequiredObjectException>();
    }

    [Test, Description("UpdateCustomerAsync should not swallow other exceptions thrown by the repo")]
    public async Task UpdateCustomerAsync_PropagatesRepoException()
    {
        Mock<ICustomerRepo> customerRepoMock = new();
        customerRepoMock.Setup(r => r.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));
        CustomerManager sut = new(customerRepoMock.Object, NullLogger<CustomerManager>.Instance);

        Func<Task> act = () => sut.UpdateCustomerAsync(ValidRequest(), TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    private sealed class StubUpdateCustomer : IUpdateCustomer
    {
        public Guid Id { get; set; }
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
}
