using FluentAssertions;
using OI.Data.Model.Orders;
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

    [Test, Description("ToSearch should map id, first name, last name and phone number")]
    public void ToSearch_MapsIdFirstNameLastNameAndPhoneNumber()
    {
        Guid customerId = Guid.NewGuid();
        IQueryable<Customer> customers = new List<Customer>
        {
            new() { Id = customerId, LastName = "Smith", FirstName = "Jane", PhoneNumber = "512-555-0100", Created = DateTime.UtcNow }
        }.AsQueryable();

        IEnumerable<ICustomerSearch> results = [.. customers.ToSearch()];

        ICustomerSearch result = results.Should().ContainSingle().Subject;
        result.Id.Should().Be(customerId);
        result.FirstName.Should().Be("Jane");
        result.LastName.Should().Be("Smith");
        result.PhoneNumber.Should().Be("512-555-0100");
    }

    [Test, Description("ToSearch should not produce the full customer model, so addresses can never be exposed")]
    public void ToSearch_DoesNotProduceFullCustomerModel()
    {
        IQueryable<Customer> customers = new List<Customer>
        {
            new()
            {
                Id = Guid.NewGuid(),
                LastName = "Smith",
                FirstName = "Jane",
                PhoneNumber = "512-555-0100",
                DefaultBillingAddress1 = "123 Main St",
                DefaultShippingAddress1 = "456 Elm St",
                Created = DateTime.UtcNow
            }
        }.AsQueryable();

        object result = customers.ToSearch().Single();

        result.Should().NotBeAssignableTo<ICustomer>();
    }

    [Test, Description("ToSearch should keep every customer in the order they were supplied")]
    public void ToSearch_KeepsAllCustomersInOrder()
    {
        IQueryable<Customer> customers = new List<Customer>
        {
            new() { Id = Guid.NewGuid(), LastName = "Adams", FirstName = "Al", PhoneNumber = "111", Created = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), LastName = "Baker", FirstName = "Bo", PhoneNumber = "222", Created = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), LastName = "Clark", FirstName = "Cy", PhoneNumber = "333", Created = DateTime.UtcNow }
        }.AsQueryable();

        List<ICustomerSearch> results = customers.ToSearch().Cast<ICustomerSearch>().ToList();

        results.Select(c => c.LastName).Should().Equal("Adams", "Baker", "Clark");
    }

    [Test, Description("ToSearch should return nothing when there are no customers")]
    public void ToSearch_ReturnsEmpty_WhenNoCustomers()
    {
        IQueryable<Customer> customers = new List<Customer>().AsQueryable();

        customers.ToSearch().Should().BeEmpty();
    }

    [Test, Description("ToSearch should return an empty first name when the customer has none")]
    public void ToSearch_ReturnsEmptyFirstName_WhenCustomerHasNoFirstName()
    {
        IQueryable<Customer> customers = new List<Customer>
        {
            new() { Id = Guid.NewGuid(), LastName = "Smith", FirstName = null, PhoneNumber = "512-555-0100", Created = DateTime.UtcNow }
        }.AsQueryable();

        ICustomerSearch result = customers.ToSearch().Single();

        result.FirstName.Should().Be(string.Empty);
    }
}
