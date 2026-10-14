using FluentAssertions;
using OI.Glue.Models;
using OI.Service.Models.Requests;
using OI.Service.Models.Transformers;

namespace OI.Service.Tests.TransformerTests;

[TestFixture, Description("Tests for FilterTransformers")]
public class FilterTransformersTests
{

    [Test, Description("TransformFilters should return null when the request has no filters")]
    public void TransformFilters_ReturnsNull_WhenRequestHasNoFilters()
    {
        Dictionary<string, IFilterMetaData[]> result = FilterTransformers.TransformFilters(new ListRequest());

        result.Should().BeNull();
    }

    [Test, Description("TransformFilters should return an empty dictionary when the request filters are empty")]
    public void TransformFilters_ReturnsEmpty_WhenRequestFiltersAreEmpty()
    {
        ListRequest request = new() { Filters = new Dictionary<string, FilterMetaData[]>() };

        Dictionary<string, IFilterMetaData[]> result = FilterTransformers.TransformFilters(request);

        result.Should().NotBeNull();
        result.Should().BeEmpty();
    }

    [Test, Description("TransformFilters should keep every key and filter, and reuse the filter instances")]
    public void TransformFilters_KeepsKeysAndFilters()
    {
        FilterMetaData first = new() { SearchValue = "Smith", MatchMode = "equals", LogicalOperator = "and" };
        FilterMetaData second = new() { SearchValue = "Jones", MatchMode = "equals", LogicalOperator = "or" };
        FilterMetaData third = new() { SearchValue = "512", MatchMode = "startsWith", LogicalOperator = "and" };
        ListRequest request = new()
        {
            Filters = new Dictionary<string, FilterMetaData[]>
            {
                ["LastName"] = [first, second],
                ["PhoneNumber"] = [third]
            }
        };

        Dictionary<string, IFilterMetaData[]> result = FilterTransformers.TransformFilters(request);

        result.Should().NotBeNull();
        result.Keys.Should().BeEquivalentTo("LastName", "PhoneNumber");
        result["LastName"].Should().HaveCount(2);
        result["LastName"][0].Should().BeSameAs(first);
        result["LastName"][1].Should().BeSameAs(second);
        result["PhoneNumber"].Should().ContainSingle().Which.Should().BeSameAs(third);
    }

    [Test, Description("TransformFilters should turn a null filter array into an empty array")]
    public void TransformFilters_TurnsNullFilterArrayIntoEmptyArray()
    {
        ListRequest request = new()
        {
            Filters = new Dictionary<string, FilterMetaData[]> { ["LastName"] = null! }
        };

        Dictionary<string, IFilterMetaData[]> result = FilterTransformers.TransformFilters(request);

        result.Should().NotBeNull();
        result["LastName"].Should().BeEmpty();
    }
}
