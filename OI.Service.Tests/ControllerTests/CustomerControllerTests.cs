using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Controllers;
using CrossCutting.Exceptions;
using OI.Service.Models.Requests;

namespace OI.Service.Tests.ControllerTests;

[TestFixture, Description("Tests for CustomerController")]
public class CustomerControllerTests
{
    [Test, Description("Constructor should throw when customerManager is null")]
    public void Constructor_ThrowsWhenCustomerManagerIsNull()
    {
        Action act = () => _ = new CustomerController(null!, NullLogger<CustomerController>.Instance);
        act.Should().Throw<ArgumentNullException>().WithParameterName("customerManager");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        Action act = () => _ = new CustomerController(customerManagerMock.Object, null!);
        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("GetCustomerById should return 200 OK with the customer when it exists")]
    public async Task GetCustomerById_Returns200WithCustomer_WhenFound()
    {
        Guid id = Guid.NewGuid();
        ICustomer customer = CreateCustomer(id);
        Mock<ICustomerManager> customerManagerMock = new();
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        customerManagerMock.Setup(m => m.GetCustomerByIdAsync(id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(customer);

        IActionResult result = await sut.GetCustomerById(id, CancellationToken.None);

        OkObjectResult okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.StatusCode.Should().Be(StatusCodes.Status200OK);
        okResult.Value.Should().BeSameAs(customer);
    }

    [Test, Description("GetCustomerById should return 404 Not Found when no customer has the id")]
    public async Task GetCustomerById_Returns404_WhenNotFound()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        customerManagerMock.Setup(m => m.GetCustomerByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((ICustomer?)null);

        IActionResult result = await sut.GetCustomerById(Guid.NewGuid(), CancellationToken.None);

        result.Should().BeOfType<NotFoundResult>()
            .Which.StatusCode.Should().Be(StatusCodes.Status404NotFound);
    }

    [Test, Description("GetCustomerById should pass the id and the cancellation token to the manager exactly once")]
    public async Task GetCustomerById_PassesIdAndTokenToManager()
    {
        Guid id = Guid.NewGuid();
        using CancellationTokenSource cts = new();
        Mock<ICustomerManager> customerManagerMock = new();
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        customerManagerMock.Setup(m => m.GetCustomerByIdAsync(id, cts.Token))
            .ReturnsAsync(CreateCustomer(id));

        await sut.GetCustomerById(id, cts.Token);

        customerManagerMock.Verify(m => m.GetCustomerByIdAsync(id, cts.Token), Times.Once);
    }

    [Test, Description("GetCustomerById should not swallow exceptions thrown by the manager")]
    public async Task GetCustomerById_PropagatesManagerException()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        customerManagerMock.Setup(m => m.GetCustomerByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        Func<Task> act = () => sut.GetCustomerById(Guid.NewGuid(), CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("The endpoint should be GET api/Customer/{id} with the id constrained to a guid")]
    public void GetCustomerById_IsGetRouteWithGuidIdConstraint()
    {
        RouteAttribute? controllerRoute = typeof(CustomerController).GetCustomAttribute<RouteAttribute>();
        HttpGetAttribute? getAttribute = typeof(CustomerController)
            .GetMethod(nameof(CustomerController.GetCustomerById))!
            .GetCustomAttribute<HttpGetAttribute>();

        // The [controller] token is the class name without "Controller", so the class name is part of the URL.
        nameof(CustomerController).Should().Be("CustomerController");
        controllerRoute.Should().NotBeNull();
        controllerRoute!.Template.Should().Be("api/[controller]");
        getAttribute.Should().NotBeNull();
        getAttribute!.Template.Should().Be("{id:guid}");
    }

    [Test, Description("CreateCustomer should return 201 Created pointing at the new customer, with the customer as the body")]
    public async Task CreateCustomer_Returns201CreatedAtGetCustomerById()
    {
        Guid id = Guid.NewGuid();
        ICustomer customer = CreateCustomer(id);
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.CreateCustomerAsync(It.IsAny<ICreateCustomer?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(customer);

        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        IActionResult result = await sut.CreateCustomer(CancellationToken.None, new CreateCustomer { LastName = "Smith", PhoneNumber = "512-555-0100" });

        CreatedAtActionResult createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.StatusCode.Should().Be(StatusCodes.Status201Created);
        createdResult.ActionName.Should().Be(nameof(CustomerController.GetCustomerById));
        createdResult.RouteValues.Should().NotBeNull();
        createdResult.RouteValues!["id"].Should().Be(id);
        createdResult.Value.Should().BeSameAs(customer);
    }

    [Test, Description("CreateCustomer should pass the request and the cancellation token to the manager exactly once")]
    public async Task CreateCustomer_PassesRequestAndTokenToManager()
    {
        using CancellationTokenSource cts = new();
        CreateCustomer request = new() { LastName = "Smith", PhoneNumber = "512-555-0100" };
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.CreateCustomerAsync(request, cts.Token))
            .ReturnsAsync(CreateCustomer(Guid.NewGuid()));

        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        await sut.CreateCustomer(cts.Token, request);

        customerManagerMock.Verify(m => m.CreateCustomerAsync(request, cts.Token), Times.Once);
    }

    [Test, Description("CreateCustomer should pass a missing body on to the manager, which decides what that means")]
    public async Task CreateCustomer_PassesNullRequestToManager()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock
            .Setup(m => m.CreateCustomerAsync(It.IsAny<ICreateCustomer?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(CreateCustomer(Guid.NewGuid()));

        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        await sut.CreateCustomer(CancellationToken.None, null);

        customerManagerMock.Verify(m => m.CreateCustomerAsync(It.Is<ICreateCustomer?>(r => r == null), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("CreateCustomer should not swallow a RequestException, so the exception handler can turn it into a 400")]
    public async Task CreateCustomer_PropagatesRequestException()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.CreateCustomerAsync(It.IsAny<ICreateCustomer?>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new RequestException("LastName is required."));

        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        Func<Task> act = () => sut.CreateCustomer(CancellationToken.None, new CreateCustomer
        {
            LastName = "test",
            PhoneNumber = "123"
        });

        await act.Should().ThrowAsync<RequestException>().WithMessage("LastName is required.");
    }

    [Test, Description("CreateCustomer should not swallow unexpected exceptions thrown by the manager")]
    public async Task CreateCustomer_PropagatesManagerException()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock
            .Setup(m => m.CreateCustomerAsync(It.IsAny<ICreateCustomer?>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        Func<Task> act = () => sut.CreateCustomer(CancellationToken.None, new CreateCustomer
        {
            LastName = "what",
            PhoneNumber = "123"
        });

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("boom");
    }

    [Test, Description("The create endpoint should be POST api/Customer with no extra route segment")]
    public void CreateCustomer_IsPostOnTheControllerRoute()
    {
        HttpPostAttribute? postAttribute = typeof(CustomerController)
            .GetMethod(nameof(CustomerController.CreateCustomer))!
            .GetCustomAttribute<HttpPostAttribute>();

        postAttribute.Should().NotBeNull();
        postAttribute!.Template.Should().BeNull("the route is the controller's api/Customer with no id");
    }

    private static ICustomer CreateCustomer(Guid id)
    {
        Mock<ICustomer> mock = new();
        mock.Setup(c => c.Id).Returns(id);
        mock.Setup(c => c.FirstName).Returns("Jane");
        mock.Setup(c => c.LastName).Returns("Smith");
        mock.Setup(c => c.PhoneNumber).Returns("512-555-0100");
        return mock.Object;
    }
}