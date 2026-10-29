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

[TestFixture, Description("Tests for CustomerController.UpdateCustomer")]
public class CustomerControllerUpdateTests
{
    private static UpdateCustomer ValidRequest() => new() { Id = Guid.NewGuid(), LastName = "Smith", PhoneNumber = "512-555-0100" };

    [Test, Description("UpdateCustomer should return 200 OK when the customer was updated")]
    public async Task UpdateCustomer_Returns200Ok()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);

        IActionResult result = await sut.UpdateCustomer(CancellationToken.None, ValidRequest());

        OkResult okResult = result.Should().BeOfType<OkResult>().Subject;
        okResult.StatusCode.Should().Be(StatusCodes.Status200OK);
    }

    [Test, Description("UpdateCustomer should pass the request and the cancellation token to the manager exactly once")]
    public async Task UpdateCustomer_PassesRequestAndTokenToManager()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);
        UpdateCustomer request = ValidRequest();
        using CancellationTokenSource cts = new();

        await sut.UpdateCustomer(cts.Token, request);

        customerManagerMock.Verify(m => m.UpdateCustomerAsync(request, cts.Token), Times.Once);
    }

    [Test, Description("UpdateCustomer should throw an ArgumentNullException and not call the manager when the request is null")]
    public async Task UpdateCustomer_ThrowsWhenRequestIsNull()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);

        Func<Task> act = async () => await sut.UpdateCustomer(CancellationToken.None, null!);

        await act.Should().ThrowAsync<ArgumentNullException>();
        customerManagerMock.Verify(m => m.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("UpdateCustomer should let exceptions from the manager through so the error handling can turn them into a response")]
    public async Task UpdateCustomer_PropagatesManagerException()
    {
        Mock<ICustomerManager> customerManagerMock = new();
        customerManagerMock.Setup(m => m.UpdateCustomerAsync(It.IsAny<IUpdateCustomer>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("manager failed"));
        CustomerController sut = new(customerManagerMock.Object, NullLogger<CustomerController>.Instance);

        Func<Task> act = async () => await sut.UpdateCustomer(CancellationToken.None, ValidRequest());

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("manager failed");
    }

    [Test, Description("UpdateCustomer should be exposed as an HTTP PUT endpoint on the controller route")]
    public void UpdateCustomer_IsDecoratedWithHttpPut()
    {
        MethodInfo? method = typeof(CustomerController).GetMethod(nameof(CustomerController.UpdateCustomer));

        method.Should().NotBeNull();
        HttpPutAttribute? attribute = method!.GetCustomAttribute<HttpPutAttribute>();
        attribute.Should().NotBeNull("updating a customer must be a PUT");
        attribute!.Template.Should().BeNull("the customer id travels in the body so PUT api/customer is the route");
    }
}
