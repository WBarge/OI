using FluentAssertions;
using OI.Glue.Models;
using OI.Service.Models.Requests;
using System.Text.Json;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for the UpdateCustomer request model")]
public class UpdateCustomerTests
{
    [Test, Description("UpdateCustomer should be a CreateCustomer and an IUpdateCustomer")]
    public void UpdateCustomer_IsACreateCustomerAndAnIUpdateCustomer()
    {
        UpdateCustomer sut = new()
        {
            LastName = string.Empty,
            PhoneNumber = string.Empty
        };

        sut.Should().BeAssignableTo<CreateCustomer>();
        sut.Should().BeAssignableTo<IUpdateCustomer>();
        sut.Should().BeAssignableTo<ICreateCustomer>();
    }

    [Test, Description("UpdateCustomer should default the id to empty so the manager can reject a missing id")]
    public void UpdateCustomer_DefaultsIdToEmpty()
    {
        UpdateCustomer sut = new()
        {
            LastName = string.Empty,
            PhoneNumber = string.Empty
        };

        sut.Id.Should().Be(Guid.Empty);
    }

    [Test, Description("UpdateCustomer should deserialize the id together with the customer values")]
    public void UpdateCustomer_DeserializesIdAndCustomerValues()
    {
        Guid id = Guid.NewGuid();
        string json = $"{{\"id\":\"{id}\",\"lastName\":\"Smith\",\"firstName\":\"Jane\",\"phoneNumber\":\"512-555-0100\",\"defaultShippingCity\":\"Dallas\"}}";

        UpdateCustomer? result = JsonSerializer.Deserialize<UpdateCustomer>(json, JsonSerializerOptions.Web);

        result.Should().NotBeNull();
        result!.Id.Should().Be(id);
        result.LastName.Should().Be("Smith");
        result.FirstName.Should().Be("Jane");
        result.PhoneNumber.Should().Be("512-555-0100");
        result.DefaultShippingCity.Should().Be("Dallas");
    }

    [Test, Description("UpdateCustomer should leave every optional value null when the JSON does not have it")]
    public void UpdateCustomer_DeserializesWithoutOptionalValues()
    {
        string json = $"{{\"id\":\"{Guid.NewGuid()}\",\"lastName\":\"Smith\",\"phoneNumber\":\"512-555-0100\"}}";

        UpdateCustomer? result = JsonSerializer.Deserialize<UpdateCustomer>(json, JsonSerializerOptions.Web);

        result.Should().NotBeNull();
        result!.FirstName.Should().BeNull();
        result.DefaultBillingAddress1.Should().BeNull();
        result.DefaultShippingAddress1.Should().BeNull();
        result.DefaultShippingZipCode.Should().BeNull();
    }
}
