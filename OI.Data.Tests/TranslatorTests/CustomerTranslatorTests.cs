using FluentAssertions;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;

namespace OI.Data.Tests.TranslatorTests;

[TestFixture, Description("Tests for CustomerTranslator")]
public class CustomerTranslatorTests
{
    [Test, Description("Translate should map all customer fields")]
    public void Translate_MapsAllFields()
    {
        Guid customerId = Guid.NewGuid();
        Customer customer = new()
        {
            Id = customerId,
            LastName = "Smith",
            FirstName = "Jane",
            PhoneNumber = "512-555-0100",
            DefaultBillingAddress1 = "123 Main St",
            DefaultBillingAddress2 = "Apt 1",
            DefaultBillingCity = "Austin",
            DefaultBillingStateCode = "TX",
            DefaultBillingZipCode = "78701",
            DefaultShippingAddress1 = "456 Elm St",
            DefaultShippingAddress2 = "Suite 2",
            DefaultShippingCity = "Dallas",
            DefaultShippingStateCode = "TX",
            DefaultShippingZipCode = "75201",
            Created = DateTime.UtcNow
        };

        ICustomer result = customer.Translate();

        result.Id.Should().Be(customerId);
        result.LastName.Should().Be("Smith");
        result.FirstName.Should().Be("Jane");
        result.PhoneNumber.Should().Be("512-555-0100");
        result.DefaultBillingAddress1.Should().Be("123 Main St");
        result.DefaultBillingAddress2.Should().Be("Apt 1");
        result.DefaultBillingCity.Should().Be("Austin");
        result.DefaultBillingStateCode.Should().Be("TX");
        result.DefaultBillingZipCode.Should().Be("78701");
        result.DefaultShippingAddress1.Should().Be("456 Elm St");
        result.DefaultShippingAddress2.Should().Be("Suite 2");
        result.DefaultShippingCity.Should().Be("Dallas");
        result.DefaultShippingStateCode.Should().Be("TX");
        result.DefaultShippingZipCode.Should().Be("75201");
    }

    [Test, Description("Translate should keep optional fields null when they are null")]
    public void Translate_KeepsNullOptionalFieldsNull()
    {
        Customer customer = new()
        {
            Id = Guid.NewGuid(),
            LastName = "Smith",
            PhoneNumber = "512-555-0100",
            Created = DateTime.UtcNow
        };

        ICustomer result = customer.Translate();

        result.FirstName.Should().BeNull();
        result.DefaultBillingAddress1.Should().BeNull();
        result.DefaultBillingAddress2.Should().BeNull();
        result.DefaultBillingCity.Should().BeNull();
        result.DefaultBillingStateCode.Should().BeNull();
        result.DefaultBillingZipCode.Should().BeNull();
        result.DefaultShippingAddress1.Should().BeNull();
        result.DefaultShippingAddress2.Should().BeNull();
        result.DefaultShippingCity.Should().BeNull();
        result.DefaultShippingStateCode.Should().BeNull();
        result.DefaultShippingZipCode.Should().BeNull();
    }

    [Test, Description("Translate should return a new instance on each call")]
    public void Translate_ReturnsNewInstanceEachCall()
    {
        Customer customer = new()
        {
            Id = Guid.NewGuid(),
            LastName = "Smith",
            PhoneNumber = "512-555-0100",
            Created = DateTime.UtcNow
        };

        ICustomer first = customer.Translate();
        ICustomer second = customer.Translate();

        first.Should().NotBeSameAs(second, "each translation produces its own model");
    }
}