using FluentAssertions;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;

namespace OI.Data.Tests.TranslatorTests;

[TestFixture, Description("Tests for OrderItemTranslator")]
public class OrderItemTranslatorTests
{
    [Test, Description("Translate should map all order item fields")]
    public void Translate_MapsAllFields()
    {
        Guid itemId = Guid.NewGuid();
        OrderItem orderItem = new()
        {
            Id = itemId,
            OrderId = Guid.NewGuid(),
            ProductId = Guid.NewGuid(),
            Name = "Widget",
            Description = "A widget",
            Sku = "WID-001",
            Price = 10.50m,
            Quantity = 2,
            Total = 21.00m,
            Created = DateTime.UtcNow
        };

        IOrderItem result = orderItem.Translate();

        result.Id.Should().Be(itemId);
        result.Name.Should().Be("Widget");
        result.Description.Should().Be("A widget");
        result.Sku.Should().Be("WID-001");
        result.Price.Should().Be(10.50m);
        result.Quantity.Should().Be(2);
        result.Total.Should().Be(21.00m);
    }

    [Test, Description("Translate should return a new instance on each call")]
    public void Translate_ReturnsNewInstanceEachCall()
    {
        OrderItem orderItem = new()
        {
            Id = Guid.NewGuid(),
            OrderId = Guid.NewGuid(),
            ProductId = Guid.NewGuid(),
            Name = "Widget",
            Description = "A widget",
            Sku = "WID-001",
            Price = 10m,
            Quantity = 1,
            Total = 10m,
            Created = DateTime.UtcNow
        };

        IOrderItem first = orderItem.Translate();
        IOrderItem second = orderItem.Translate();

        first.Should().NotBeSameAs(second, "each translation produces its own model");
    }
}