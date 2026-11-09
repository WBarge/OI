using FluentAssertions;
using Newtonsoft.Json;
using OI.Glue.Models;
using OI.Service.Models.Requests;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for the UpdateOrder and FilterMetaData request models")]
public class UpdateOrderAndFilterMetaDataTests
{
    // ---- UpdateOrder

    [Test, Description("UpdateOrder should start with an empty id and order number zero")]
    public void UpdateOrder_HasExpectedDefaults()
    {
        UpdateOrder sut = new();

        sut.Id.Should().Be(Guid.Empty);
        sut.OrderNumber.Should().Be(0);
    }

    [Test, Description("UpdateOrder should be a CreateOrder, with everything a new order has")]
    public void UpdateOrder_IsACreateOrder()
    {
        UpdateOrder sut = new() { CustomerId = Guid.NewGuid(), BillingCity = "Phoenix" };

        sut.Should().BeAssignableTo<CreateOrder>();
        sut.Should().BeAssignableTo<IUpdateOrder>();
        sut.BillingCity.Should().Be("Phoenix");
    }

    [Test, Description("UpdateOrder should hold the id and order number through the interface")]
    public void UpdateOrder_HoldsItsIdentityThroughTheInterface()
    {
        Guid id = Guid.NewGuid();
        IUpdateOrder sut = new UpdateOrder();

        sut.Id = id;
        sut.OrderNumber = 1234;

        sut.Id.Should().Be(id);
        sut.OrderNumber.Should().Be(1234);
    }

    [Test, Description("UpdateOrder should be read from JSON with its id, order number and items")]
    public void UpdateOrder_DeserialisesFromJson()
    {
        Guid id = Guid.NewGuid();
        string json = $$"""{"id":"{{id}}","orderNumber":1001,"billingCity":"Phoenix","orderItems":[{"name":"Widget","quantity":2}]}""";

        UpdateOrder? sut = System.Text.Json.JsonSerializer.Deserialize<UpdateOrder>(json,
            new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web));

        sut.Should().NotBeNull();
        sut!.Id.Should().Be(id);
        sut.OrderNumber.Should().Be(1001);
        sut.BillingCity.Should().Be("Phoenix");
        sut.OrderItems.Should().ContainSingle().Which.Name.Should().Be("Widget");
    }

    // ---- FilterMetaData

    [Test, Description("FilterMetaData should start with every field unset")]
    public void FilterMetaData_HasExpectedDefaults()
    {
        FilterMetaData sut = new();

        sut.SearchValue.Should().BeNull();
        sut.MatchMode.Should().BeNull();
        sut.LogicalOperator.Should().BeNull();
    }

    [Test, Description("FilterMetaData should be read from the camelCase names the client sends")]
    public void FilterMetaData_DeserialisesTheClientNames()
    {
        const string json = """{"searchValue":"Smith","matchMode":"startsWith","logicalOperator":"or"}""";

        FilterMetaData? sut = JsonConvert.DeserializeObject<FilterMetaData>(json);

        sut!.SearchValue.Should().Be("Smith");
        sut.MatchMode.Should().Be("startsWith");
        sut.LogicalOperator.Should().Be("or");
    }

    [Test, Description("FilterMetaData should be written with the camelCase names the client expects")]
    public void FilterMetaData_SerialisesTheClientNames()
    {
        string json = JsonConvert.SerializeObject(new FilterMetaData { SearchValue = "Smith", MatchMode = "equals", LogicalOperator = "and" });

        json.Should().Contain("\"searchValue\":\"Smith\"").And.Contain("\"matchMode\":\"equals\"").And.Contain("\"logicalOperator\":\"and\"");
    }

    [Test, Description("FilterMetaData should be usable as the IFilterMetaData the data layer filters on")]
    public void FilterMetaData_IsAFilterMetaData()
    {
        IFilterMetaData sut = new FilterMetaData { SearchValue = "x", MatchMode = "contains", LogicalOperator = "and" };

        sut.SearchValue.Should().Be("x");
        sut.MatchMode.Should().Be("contains");
        sut.LogicalOperator.Should().Be("and");
    }
}
