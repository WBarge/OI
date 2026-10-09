using FluentAssertions;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;

namespace OI.Data.Tests.TranslatorTests;

[TestFixture, Description("Tests for OrderTranslator")]
public class OrderTranslatorTests
{
    [Test, Description("Translate should return a non-null IOrder")]
    public void Translate_ReturnsNonNullOrder()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 49.99m,
            Shipping = 5.99m,
            Tax = 4.12m,
            Total = 60.10m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.Should().NotBeNull();
    }

    [Test, Description("Translate should map Id, OrderNumber, OrderDate and CustomerId")]
    public void Translate_MapsIdentityFields()
    {
        Guid orderId = Guid.NewGuid();
        Guid customerId = Guid.NewGuid();
        DateTime orderDate = new(2025, 6, 15, 10, 30, 0, DateTimeKind.Utc);
        Order order = new()
        {
            Id = orderId,
            OrderNumber = 1234,
            OrderDate = orderDate,
            CompletedDate = null,
            IsPending = true,
            CustomerId = customerId,
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 49.99m,
            Shipping = 5.99m,
            Tax = 4.12m,
            Total = 60.10m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.Id.Should().Be(orderId);
        result.OrderNumber.Should().Be(1234);
        result.OrderDate.Should().Be(orderDate);
        result.CustomerId.Should().Be(customerId);
    }

    [Test, Description("Translate should map all billing address fields")]
    public void Translate_MapsBillingAddressFields()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.BillingAddress1.Should().Be("123 Main St");
        result.BillingAddress2.Should().Be("Apt 1");
        result.BillingCity.Should().Be("Austin");
        result.BillingStateCode.Should().Be("TX");
        result.BillingZipCode.Should().Be("78701");
    }

    [Test, Description("Translate should map all shipping address fields")]
    public void Translate_MapsShippingAddressFields()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.ShippingAddress1.Should().Be("456 Elm St");
        result.ShippingAddress2.Should().Be("Suite 2");
        result.ShippingCity.Should().Be("Dallas");
        result.ShippingStateCode.Should().Be("TX");
        result.ShippingZipCode.Should().Be("75201");
    }

    [Test, Description("Translate should map SubTotal, Shipping, Tax and Total")]
    public void Translate_MapsTotals()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 49.99m,
            Shipping = 5.99m,
            Tax = 4.12m,
            Total = 60.10m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.SubTotal.Should().Be(49.99m);
        result.Shipping.Should().Be(5.99m);
        result.Tax.Should().Be(4.12m);
        result.Total.Should().Be(60.10m);
    }

    [Test, Description("Translate should map IsPending when true")]
    public void Translate_MapsIsPendingTrue()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.IsPending.Should().BeTrue();
    }

    [Test, Description("Translate should map IsPending when false")]
    public void Translate_MapsIsPendingFalse()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = DateTime.UtcNow,
            IsPending = false,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.IsPending.Should().BeFalse();
    }

    [Test, Description("Translate should map CompletedDate when it has a value")]
    public void Translate_MapsCompletedDateWhenProvided()
    {
        DateTime completedDate = new(2025, 7, 1, 8, 0, 0, DateTimeKind.Utc);
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = completedDate,
            IsPending = false,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.CompletedDate.Should().Be(completedDate);
    }

    [Test, Description("Translate should map a null CompletedDate to DateTime.MinValue")]
    public void Translate_MapsNullCompletedDateToMinValue()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.CompletedDate.Should().Be(DateTime.MinValue, "an uncompleted order uses DateTime.MinValue as its sentinel");
    }

    [Test, Description("Translate should map null billing address fields to empty strings")]
    public void Translate_MapsNullBillingAddressFieldsToEmptyStrings()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = null!,
            BillingAddress2 = null!,
            BillingCity = null!,
            BillingStateCode = null!,
            BillingZipCode = null!,
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.BillingAddress1.Should().Be(string.Empty);
        result.BillingAddress2.Should().Be(string.Empty);
        result.BillingCity.Should().Be(string.Empty);
        result.BillingStateCode.Should().Be(string.Empty);
        result.BillingZipCode.Should().Be(string.Empty);
    }

    [Test, Description("Translate should map null shipping address fields to empty strings")]
    public void Translate_MapsNullShippingAddressFieldsToEmptyStrings()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = null!,
            ShippingAddress2 = null!,
            ShippingCity = null!,
            ShippingStateCode = null!,
            ShippingZipCode = null!,
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.ShippingAddress1.Should().Be(string.Empty);
        result.ShippingAddress2.Should().Be(string.Empty);
        result.ShippingCity.Should().Be(string.Empty);
        result.ShippingStateCode.Should().Be(string.Empty);
        result.ShippingZipCode.Should().Be(string.Empty);
    }

    [Test, Description("Translate should preserve empty string address fields as empty strings")]
    public void Translate_PreservesEmptyStringAddressFields()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = string.Empty,
            BillingAddress2 = string.Empty,
            BillingCity = string.Empty,
            BillingStateCode = string.Empty,
            BillingZipCode = string.Empty,
            ShippingAddress1 = string.Empty,
            ShippingAddress2 = string.Empty,
            ShippingCity = string.Empty,
            ShippingStateCode = string.Empty,
            ShippingZipCode = string.Empty,
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder result = order.Translate();

        result.BillingAddress2.Should().BeEmpty();
        result.ShippingAddress2.Should().BeEmpty();
    }

    [Test, Description("Translate should return a new instance on each call")]
    public void Translate_ReturnsNewInstanceEachCall()
    {
        Order order = new()
        {
            Id = Guid.NewGuid(),
            OrderNumber = 1000,
            OrderDate = DateTime.UtcNow,
            CompletedDate = null,
            IsPending = true,
            CustomerId = Guid.NewGuid(),
            BillingAddress1 = "123 Main St",
            BillingAddress2 = "Apt 1",
            BillingCity = "Austin",
            BillingStateCode = "TX",
            BillingZipCode = "78701",
            ShippingAddress1 = "456 Elm St",
            ShippingAddress2 = "Suite 2",
            ShippingCity = "Dallas",
            ShippingStateCode = "TX",
            ShippingZipCode = "75201",
            SubTotal = 0m,
            Shipping = 0m,
            Tax = 0m,
            Total = 0m,
            OrderItems = [],
            Created = DateTime.UtcNow
        };

        IOrder first = order.Translate();
        IOrder second = order.Translate();

        first.Should().NotBeSameAs(second, "each translation produces its own model");
    }
}