using FluentAssertions;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;
using OrderSearch = OI.Data.Translators.Internal_Models.OrderSearch;

namespace OI.Data.Tests.TranslatorTests;

/// <summary>
/// Tests for <c>OrderTranslator.ToSearchResult</c>, which projects orders into the rows of the order search grid.
/// It runs here over an in-memory list, so it checks the mapping itself; the database round trip is in OrderRepoSearchTests.
/// </summary>
[TestFixture, Description("Tests for OrderTranslator.ToSearchResult")]
public class OrderSearchTranslatorTests
{
    [Test, Description("ToSearchResult should map the order's own fields")]
    public void ToSearchResult_MapsOrderFields()
    {
        DateTime orderDate = new(2026, 3, 15, 10, 30, 0, DateTimeKind.Utc);
        DateTime completedDate = new(2026, 3, 16, 9, 0, 0, DateTimeKind.Utc);
        Order order = CreateOrder(customer: null);
        order.OrderDate = orderDate;
        order.CompletedDate = completedDate;
        order.Total = 99.99m;
        order.IsPending = false;

        OrderSearch result = Project(order).Single();

        result.Id.Should().Be(order.Id);
        result.OrderDate.Should().Be(orderDate);
        result.CompletedDate.Should().Be(completedDate);
        result.Total.Should().Be(99.99m);
        result.IsPending.Should().BeFalse();
    }

    [Test, Description("ToSearchResult should combine the customer's first and last name and map their phone number")]
    public void ToSearchResult_MapsCustomerNameAndPhone()
    {
        Order order = CreateOrder(new Customer
        {
            Id = Guid.NewGuid(), FirstName = "Jane", LastName = "Smith", PhoneNumber = "512-555-0100", Created = DateTime.UtcNow
        });

        OrderSearch result = Project(order).Single();

        result.CustomerName.Should().Be("Jane Smith");
        result.PhoneNumber.Should().Be("512-555-0100");
    }

    [Test, Description("ToSearchResult should still show the last name for a customer with no first name")]
    public void ToSearchResult_MapsCustomerWithoutFirstName()
    {
        Order order = CreateOrder(new Customer
        {
            Id = Guid.NewGuid(), FirstName = null, LastName = "Smith", PhoneNumber = "512-555-0100", Created = DateTime.UtcNow
        });

        OrderSearch result = Project(order).Single();

        result.CustomerName.Trim().Should().Be("Smith");
    }

    [Test, Description("ToSearchResult should give an empty name and phone number for an order with no customer")]
    public void ToSearchResult_MapsOrderWithoutCustomer()
    {
        Order order = CreateOrder(customer: null);

        OrderSearch result = Project(order).Single();

        result.CustomerName.Trim().Should().BeEmpty();
        result.PhoneNumber.Should().BeEmpty();
    }

    [Test, Description("ToSearchResult should keep a null completed date null")]
    public void ToSearchResult_KeepsNullCompletedDate()
    {
        Order order = CreateOrder(customer: null);
        order.CompletedDate = null;

        OrderSearch result = Project(order).Single();

        result.CompletedDate.Should().BeNull();
    }

    [Test, Description("ToSearchResult should return one result per order, in the same order")]
    public void ToSearchResult_ReturnsOneResultPerOrder()
    {
        Order first = CreateOrder(customer: null);
        Order second = CreateOrder(customer: null);
        Order third = CreateOrder(customer: null);

        List<OrderSearch> result = Project(first, second, third).ToList();

        result.Select(r => r.Id).Should().Equal(first.Id, second.Id, third.Id);
    }

    [Test, Description("ToSearchResult should return nothing for no orders")]
    public void ToSearchResult_ReturnsEmpty_ForNoOrders()
    {
        Project().Should().BeEmpty();
    }

    [Test, Description("ToSearchResult should map the order number")]
    public void ToSearchResult_MapsOrderNumber()
    {
        Order order = CreateOrder(customer: null);
        order.OrderNumber = 4321;

        OrderSearch result = Project(order).Single();

        result.OrderNumber.Should().Be(4321);
    }

    [Test, Description("A new OrderSearch should start with empty strings and zeroes rather than nulls")]
    public void OrderSearch_StartsWithDefaults()
    {
        IOrderSearch sut = new OrderSearch();

        sut.Id.Should().BeEmpty();
        sut.OrderNumber.Should().Be(0);
        sut.CustomerName.Should().NotBeNull();
        sut.PhoneNumber.Should().NotBeNull();
        sut.CompletedDate.Should().BeNull();
    }

    private static IQueryable<OrderSearch> Project(params Order[] orders) => orders.AsQueryable().ToSearchResult();

    private static Order CreateOrder(Customer? customer)
    {
        return new Order
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            Customer = customer,
            CustomerId = customer?.Id,
            Total = 10m,
            IsPending = true,
            Created = DateTime.UtcNow
        };
    }
}
