using FluentAssertions;
using Moq;
using OI.Glue.Models;
using OI.Service.Models.Requests;
using System.Text.Json;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for the CreateOrder and CreateOrderItem request models")]
public class CreateOrderTests
{
    [Test, Description("CreateOrder should default strings to empty and nullable values to null")]
    public void CreateOrder_HasExpectedDefaults()
    {
        CreateOrder sut = new();

        sut.CustomerId.Should().BeNull();
        sut.OrderDate.Should().BeNull();
        sut.BillingAddress1.Should().BeEmpty();
        sut.BillingAddress2.Should().BeEmpty();
        sut.BillingCity.Should().BeEmpty();
        sut.BillingStateCode.Should().BeEmpty();
        sut.BillingZipCode.Should().BeEmpty();
        sut.ShippingAddress1.Should().BeEmpty();
        sut.ShippingAddress2.Should().BeEmpty();
        sut.ShippingCity.Should().BeEmpty();
        sut.ShippingStateCode.Should().BeEmpty();
        sut.ShippingZipCode.Should().BeEmpty();
        sut.SubTotal.Should().BeNull();
        sut.Shipping.Should().BeNull();
        sut.Tax.Should().BeNull();
        sut.Total.Should().BeNull();
        sut.OrderItems.Should().BeNull();
    }

    [Test, Description("CreateOrderItem should default ProductId to empty, strings to empty and nullable values to null")]
    public void CreateOrderItem_HasExpectedDefaults()
    {
        CreateOrderItem sut = new();

        sut.ProductId.Should().Be(Guid.Empty);
        sut.Name.Should().BeEmpty();
        sut.Description.Should().BeEmpty();
        sut.Sku.Should().BeEmpty();
        sut.Price.Should().BeNull();
        sut.Quantity.Should().BeNull();
        sut.Total.Should().BeNull();
    }

    [Test, Description("CreateOrder should deserialize with the web defaults when there are no order items")]
    public void CreateOrder_DeserializesWithoutOrderItems()
    {
        string json = "{\"billingCity\":\"Austin\",\"subTotal\":10.5}";

        CreateOrder? result = JsonSerializer.Deserialize<CreateOrder>(json, JsonSerializerOptions.Web);

        result.Should().NotBeNull();
        result!.BillingCity.Should().Be("Austin");
        result.SubTotal.Should().Be(10.5m);
    }

    [Test, Description("CreateOrder should deserialize order items from JSON the way ASP.NET Core model binding does")]
    public void CreateOrder_DeserializesOrderItems()
    {
        Guid productId = Guid.NewGuid();
        string json = $"{{\"orderItems\":[{{\"productId\":\"{productId}\",\"name\":\"Widget\",\"description\":\"A widget\",\"sku\":\"WID-001\",\"price\":10,\"quantity\":2,\"total\":20}}]}}";

        CreateOrder? result = JsonSerializer.Deserialize<CreateOrder>(json, JsonSerializerOptions.Web);

        result.Should().NotBeNull();
        result!.OrderItems.Should().NotBeNull();
        CreateOrderItem item = result.OrderItems!.Single();
        item.ProductId.Should().Be(productId);
        item.Name.Should().Be("Widget");
        item.Description.Should().Be("A widget");
        item.Sku.Should().Be("WID-001");
        item.Price.Should().Be(10m);
        item.Quantity.Should().Be(2);
        item.Total.Should().Be(20m);
    }

    [Test, Description("CreateOrder should serialize and deserialize order items as a full round trip")]
    public void CreateOrder_RoundTripsOrderItems()
    {
        Guid productId = Guid.NewGuid();
        CreateOrder original = new()
        {
            BillingCity = "Austin",
            OrderItems =
            [
                new CreateOrderItem { ProductId = productId, Name = "Widget", Sku = "WID-001", Price = 10m, Quantity = 2, Total = 20m }
            ]
        };

        string json = JsonSerializer.Serialize(original, JsonSerializerOptions.Web);
        CreateOrder? result = JsonSerializer.Deserialize<CreateOrder>(json, JsonSerializerOptions.Web);

        result.Should().NotBeNull();
        result!.BillingCity.Should().Be("Austin");
        result.OrderItems.Should().ContainSingle();
        result.OrderItems!.Single().ProductId.Should().Be(productId);
        result.OrderItems!.Single().Total.Should().Be(20m);
    }

    [Test, Description("Serialization should write order items once under orderItems and not expose the explicit interface member")]
    public void CreateOrder_SerializesOrderItemsOnlyOnce()
    {
        CreateOrder original = new()
        {
            OrderItems = [new CreateOrderItem { ProductId = Guid.NewGuid(), Name = "Widget" }]
        };

        string json = JsonSerializer.Serialize(original, JsonSerializerOptions.Web);

        json.Split("\"orderItems\"").Length.Should().Be(2, "exactly one orderItems property should be written");
    }

    [Test, Description("The ICreateOrder view should return the same item instances so manager changes are visible on the request")]
    public void ICreateOrder_OrderItemsReturnsSameInstances()
    {
        CreateOrderItem item = new() { ProductId = Guid.NewGuid(), Price = 5m, Quantity = 3 };
        CreateOrder sut = new() { OrderItems = [item] };
        ICreateOrder asInterface = sut;

        ICreateOrderItem viaInterface = asInterface.OrderItems!.Single();
        viaInterface.Total = 15m;

        viaInterface.Should().BeSameAs(item);
        sut.OrderItems!.Single().Total.Should().Be(15m, "mutations through the interface must reach the request's items");
    }

    [Test, Description("The ICreateOrder view should return null when no items were set")]
    public void ICreateOrder_OrderItemsReturnsNullWhenNotSet()
    {
        CreateOrder sut = new();
        ICreateOrder asInterface = sut;

        asInterface.OrderItems.Should().BeNull();
    }

    [Test, Description("Setting items through ICreateOrder should keep CreateOrderItem instances as they are")]
    public void ICreateOrder_SetterKeepsCreateOrderItemInstances()
    {
        CreateOrderItem item = new() { ProductId = Guid.NewGuid(), Name = "Widget" };
        CreateOrder sut = new();
        ICreateOrder asInterface = sut;

        asInterface.OrderItems = [item];

        sut.OrderItems.Should().ContainSingle();
        sut.OrderItems!.Single().Should().BeSameAs(item);
    }

    [Test, Description("Setting items through ICreateOrder should copy other ICreateOrderItem implementations")]
    public void ICreateOrder_SetterCopiesOtherImplementations()
    {
        Guid productId = Guid.NewGuid();
        Mock<ICreateOrderItem> itemMock = new();
        itemMock.Setup(i => i.ProductId).Returns(productId);
        itemMock.Setup(i => i.Name).Returns("Widget");
        itemMock.Setup(i => i.Description).Returns("A widget");
        itemMock.Setup(i => i.Sku).Returns("WID-001");
        itemMock.Setup(i => i.Price).Returns(10m);
        itemMock.Setup(i => i.Quantity).Returns(2);
        itemMock.Setup(i => i.Total).Returns(20m);
        CreateOrder sut = new();
        ICreateOrder asInterface = sut;

        asInterface.OrderItems = [itemMock.Object];

        CreateOrderItem copied = sut.OrderItems!.Single();
        copied.ProductId.Should().Be(productId);
        copied.Name.Should().Be("Widget");
        copied.Description.Should().Be("A widget");
        copied.Sku.Should().Be("WID-001");
        copied.Price.Should().Be(10m);
        copied.Quantity.Should().Be(2);
        copied.Total.Should().Be(20m);
    }

    [Test, Description("Setting null through ICreateOrder should clear the items")]
    public void ICreateOrder_SetterAcceptsNull()
    {
        CreateOrder sut = new() { OrderItems = [new CreateOrderItem { ProductId = Guid.NewGuid() }] };
        ICreateOrder asInterface = sut;

        asInterface.OrderItems = null;

        sut.OrderItems.Should().BeNull();
    }
}