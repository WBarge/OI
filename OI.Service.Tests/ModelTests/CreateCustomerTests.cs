using System.Text.Json;
using FluentAssertions;
using OI.Glue.Models;
using OI.Service.Models.Requests;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for the CreateCustomer request model")]
public class CreateCustomerTests
{
    const string TEST_VALUE ="123";
    private static readonly JsonSerializerOptions WebOptions = new(JsonSerializerDefaults.Web);

    [Test, Description("A new CreateCustomer should have populated required values and no optional values")]
    public void NewCreateCustomer_HasPopulatedRequiredAndNoOptionalValues()
    {
        CreateCustomer sut = new()
        {
            LastName = TEST_VALUE,
            PhoneNumber = TEST_VALUE
        };

        sut.LastName.Should().Be(TEST_VALUE);
        sut.PhoneNumber.Should().Be(TEST_VALUE);
        sut.FirstName.Should().BeNull();
        sut.DefaultBillingAddress1.Should().BeNull();
        sut.DefaultBillingAddress2.Should().BeNull();
        sut.DefaultBillingCity.Should().BeNull();
        sut.DefaultBillingStateCode.Should().BeNull();
        sut.DefaultBillingZipCode.Should().BeNull();
        sut.DefaultShippingAddress1.Should().BeNull();
        sut.DefaultShippingAddress2.Should().BeNull();
        sut.DefaultShippingCity.Should().BeNull();
        sut.DefaultShippingStateCode.Should().BeNull();
        sut.DefaultShippingZipCode.Should().BeNull();
    }

    [Test, Description("CreateCustomer should be usable wherever the business layer expects an ICreateCustomer")]
    public void CreateCustomer_IsAnICreateCustomer()
    {
        new CreateCustomer
        {
            LastName = TEST_VALUE,
            PhoneNumber = TEST_VALUE
        }.Should().BeAssignableTo<ICreateCustomer>();
    }

    [Test, Description("CreateCustomer should deserialize a camelCase JSON body with every value")]
    public void CreateCustomer_DeserializesCamelCaseJson()
    {
        const string json = """
            {
              "lastName": "Smith",
              "firstName": "Jane",
              "phoneNumber": "512-555-0100",
              "defaultBillingAddress1": "123 Main St",
              "defaultBillingAddress2": "Apt 1",
              "defaultBillingCity": "Austin",
              "defaultBillingStateCode": "TX",
              "defaultBillingZipCode": "78701",
              "defaultShippingAddress1": "456 Elm St",
              "defaultShippingAddress2": "Suite 2",
              "defaultShippingCity": "Dallas",
              "defaultShippingStateCode": "TX",
              "defaultShippingZipCode": "75201"
            }
            """;

        CreateCustomer? sut = JsonSerializer.Deserialize<CreateCustomer>(json, WebOptions);

        sut.Should().NotBeNull();
        sut!.LastName.Should().Be("Smith");
        sut.FirstName.Should().Be("Jane");
        sut.PhoneNumber.Should().Be("512-555-0100");
        sut.DefaultBillingAddress1.Should().Be("123 Main St");
        sut.DefaultBillingAddress2.Should().Be("Apt 1");
        sut.DefaultBillingCity.Should().Be("Austin");
        sut.DefaultBillingStateCode.Should().Be("TX");
        sut.DefaultBillingZipCode.Should().Be("78701");
        sut.DefaultShippingAddress1.Should().Be("456 Elm St");
        sut.DefaultShippingAddress2.Should().Be("Suite 2");
        sut.DefaultShippingCity.Should().Be("Dallas");
        sut.DefaultShippingStateCode.Should().Be("TX");
        sut.DefaultShippingZipCode.Should().Be("75201");
    }

    [Test, Description("CreateCustomer should deserialize a body that has only the required values")]
    public void CreateCustomer_DeserializesBodyWithOnlyRequiredValues()
    {
        CreateCustomer? sut = JsonSerializer.Deserialize<CreateCustomer>(
            """{ "lastName": "Smith", "phoneNumber": "512-555-0100" }""", WebOptions);

        sut.Should().NotBeNull();
        sut!.LastName.Should().Be("Smith");
        sut.PhoneNumber.Should().Be("512-555-0100");
        sut.FirstName.Should().BeNull();
        sut.DefaultBillingAddress1.Should().BeNull();
    }

    [Test, Description("CreateCustomer should have no id, and ignore one sent by the client, because the system assigns it")]
    public void CreateCustomer_HasNoIdAndIgnoresOneSentByTheClient()
    {
        string json = $$"""{ "id": "{{Guid.NewGuid()}}", "lastName": "Smith", "phoneNumber": "512-555-0100" }""";

        CreateCustomer? sut = JsonSerializer.Deserialize<CreateCustomer>(json, WebOptions);

        typeof(CreateCustomer).GetProperty("Id").Should().BeNull();
        typeof(ICreateCustomer).GetProperty("Id").Should().BeNull();
        sut.Should().NotBeNull();
        sut!.LastName.Should().Be("Smith");
    }
}