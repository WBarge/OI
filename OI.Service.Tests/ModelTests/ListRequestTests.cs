using System.Text.Json;
using FluentAssertions;
using OI.Service.Models.Requests;

namespace OI.Service.Tests.ModelTests;

[TestFixture, Description("Tests for ListRequest and FilterMetaData")]
public class ListRequestTests
{
    [Test, Description("A new ListRequest should have no page, page size or filters")]
    public void NewListRequest_HasNoValues()
    {
        ListRequest sut = new();

        sut.Page.Should().BeNull();
        sut.PageSize.Should().BeNull();
        sut.Filters.Should().BeNull();
    }

    [Test, Description("A new FilterMetaData should have no values")]
    public void NewFilterMetaData_HasNoValues()
    {
        FilterMetaData sut = new();

        sut.SearchValue.Should().BeNull();
        sut.MatchMode.Should().BeNull();
        sut.LogicalOperator.Should().BeNull();
    }

    [Test, Description("ListRequest should deserialize a camelCase JSON body the way a client sends it")]
    public void ListRequest_DeserializesCamelCaseJson()
    {
        const string JSON = """
            {
              "page": 2,
              "pageSize": 50,
              "filters": {
                "LastName": [
                  { "searchValue": "Smith", "matchMode": "equals", "logicalOperator": "and" }
                ]
              }
            }
            """;

        ListRequest? sut = JsonSerializer.Deserialize<ListRequest>(JSON, new JsonSerializerOptions(JsonSerializerDefaults.Web));

        sut.Should().NotBeNull();
        sut!.Page.Should().Be(2);
        sut.PageSize.Should().Be(50);
        sut.Filters.Should().ContainKey("LastName");
        FilterMetaData filter = sut.Filters!["LastName"].Should().ContainSingle().Subject;
        filter.SearchValue.Should().Be("Smith");
        filter.MatchMode.Should().Be("equals");
        filter.LogicalOperator.Should().Be("and");
    }

    [Test, Description("ListRequest should deserialize an empty JSON object to a request with no values")]
    public void ListRequest_DeserializesEmptyObject()
    {
        ListRequest? sut = JsonSerializer.Deserialize<ListRequest>("{}", new JsonSerializerOptions(JsonSerializerDefaults.Web));

        sut.Should().NotBeNull();
        sut!.Page.Should().BeNull();
        sut.PageSize.Should().BeNull();
        sut.Filters.Should().BeNull();
    }
}
