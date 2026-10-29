using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Helpers;
using OI.Data.Model.Orders;
using OI.Glue.Models;

namespace OI.Data.Tests.HelperTests;

/// <summary>
/// A small type to filter on. It has one property of each type the engine knows how to parse.
/// </summary>
internal sealed class FilterTestItem
{
    public string Name { get; set; } = string.Empty;
    public int Qty { get; set; }
    public decimal Price { get; set; }
    public DateTime When { get; set; }
    public bool Active { get; set; }
}

[TestFixture, Description("Tests for FilteringEngine")]
public class FilteringEngineTests
{
    private static readonly List<FilterTestItem> _items =
    [
        new() { Name = "Alpha", Qty = 1, Price = 1.5m, When = new DateTime(2026, 1, 1), Active = true },
        new() { Name = "Beta", Qty = 2, Price = 2.5m, When = new DateTime(2026, 2, 1), Active = false },
        new() { Name = "Alphabet", Qty = 3, Price = 3.5m, When = new DateTime(2026, 3, 1), Active = true },
        new() { Name = "Zeta", Qty = 2, Price = 1.5m, When = new DateTime(2026, 1, 1), Active = false }
    ];

    private static readonly string[] _everyName = ["Alpha", "Beta", "Alphabet", "Zeta"];

    #region constants

    [Test, Description("The logical operator and match mode names should be the strings the Angular grid sends")]
    public void Constants_MatchTheStringsTheClientSends()
    {
        FilteringEngine.AND_LOGICAL_OPERATOR.Should().Be("and");
        FilteringEngine.OR_LOGICAL_OPERATOR.Should().Be("or");
        FilteringEngine.EQUALS_COMPARISON.Should().Be("equals");
        FilteringEngine.NOT_EQUALS_COMPARISON.Should().Be("notEquals");
        FilteringEngine.STARTS_WITH_COMPARISON.Should().Be("startsWith");
        FilteringEngine.CONTAINS_COMPARISON.Should().Be("contains");
        FilteringEngine.NOT_CONTAINS_COMPARISON.Should().Be("notContains");
        FilteringEngine.ENDS_WITH_COMPARISON.Should().Be("endsWith");
    }

    #endregion

    #region no filters

    [Test, Description("An empty set of filters should match every item")]
    public void BuildLambdaExpressionForCollections_MatchesEverything_WhenThereAreNoFilters()
    {
        List<string> names = Apply(new Dictionary<string, IFilterMetaData[]>());

        names.Should().Equal(_everyName);
    }

    [Test, Description("A property with an empty array of filters should not restrict the result")]
    public void BuildLambdaExpressionForCollections_IgnoresPropertyWithEmptyFilterArray()
    {
        List<string> names = Apply(Filters(("Name", Array.Empty<FilterCriteria>())));

        names.Should().Equal(_everyName);
    }

    #endregion

    #region match modes on strings

    [TestCase("equals", "Alpha", new[] { "Alpha" })]
    [TestCase("notEquals", "Alpha", new[] { "Beta", "Alphabet", "Zeta" })]
    [TestCase("startsWith", "Alpha", new[] { "Alpha", "Alphabet" })]
    [TestCase("contains", "eta", new[] { "Beta", "Zeta" })]
    [TestCase("notContains", "eta", new[] { "Alpha", "Alphabet" })]
    [TestCase("endsWith", "eta", new[] { "Beta", "Zeta" })]
    [Description("Each string match mode should keep exactly the items it describes")]
    public void BuildLambdaExpressionForCollections_AppliesStringMatchMode(string matchMode, string searchValue, string[] expected)
    {
        List<string> names = Apply(Filters(("Name", [Filter(searchValue, matchMode)])));

        names.Should().Equal(expected);
    }

    [Test, Description("String comparisons on a collection should be case sensitive")]
    public void BuildLambdaExpressionForCollections_StringComparisonIsCaseSensitive()
    {
        List<string> names = Apply(Filters(("Name", [Filter("alpha", "startsWith")])));

        names.Should().BeEmpty();
    }

    [Test, Description("Spaces around the match mode should be ignored")]
    public void BuildLambdaExpressionForCollections_TrimsTheMatchMode()
    {
        List<string> names = Apply(Filters(("Name", [Filter("Beta", " equals ")])));

        names.Should().Equal("Beta");
    }

    #endregion

    #region typed values

    [Test, Description("An int property should be compared as a number")]
    public void BuildLambdaExpressionForCollections_ComparesIntegers()
    {
        List<string> names = Apply(Filters(("Qty", [Filter("2", "equals")])));

        names.Should().Equal("Beta", "Zeta");
    }

    [Test, Description("A decimal property should be compared as a number")]
    public void BuildLambdaExpressionForCollections_ComparesDecimals()
    {
        List<string> names = Apply(Filters(("Price", [Filter("1.5", "equals")])));

        names.Should().Equal("Alpha", "Zeta");
    }

    [Test, Description("A DateTime property should be compared as a date")]
    public void BuildLambdaExpressionForCollections_ComparesDates()
    {
        List<string> names = Apply(Filters(("When", [Filter("2026-01-01", "equals")])));

        names.Should().Equal("Alpha", "Zeta");
    }

    [Test, Description("A bool property should be compared as true or false")]
    public void BuildLambdaExpressionForCollections_ComparesBooleans()
    {
        List<string> names = Apply(Filters(("Active", [Filter("true", "equals")])));

        names.Should().Equal("Alpha", "Alphabet");
    }

    [Test, Description("A bool search value that is not true or false should be treated as false")]
    public void BuildLambdaExpressionForCollections_TreatsUnparseableBooleanAsFalse()
    {
        List<string> names = Apply(Filters(("Active", [Filter("garbage", "equals")])));

        names.Should().Equal("Beta", "Zeta");
    }

    [Test, Description("notEquals should work on numbers too")]
    public void BuildLambdaExpressionForCollections_NotEqualsWorksOnNumbers()
    {
        List<string> names = Apply(Filters(("Qty", [Filter("2", "notEquals")])));

        names.Should().Equal("Alpha", "Alphabet");
    }

    [TestCase("startsWith")]
    [TestCase("contains")]
    [TestCase("notContains")]
    [TestCase("endsWith")]
    [Description("A string-only match mode on a non-string property should not restrict the result")]
    public void BuildLambdaExpressionForCollections_IgnoresStringOnlyMatchModeOnNonStringProperty(string matchMode)
    {
        List<string> names = Apply(Filters(("Qty", [Filter("2", matchMode)])));

        names.Should().Equal(_everyName);
    }

    #endregion

    #region bad input

    [Test, Description("A number that cannot be parsed should throw a FormatException")]
    public void BuildLambdaExpressionForCollections_Throws_WhenNumberCannotBeParsed()
    {
        Action act = () => Apply(Filters(("Qty", [Filter("abc", "equals")])));

        act.Should().Throw<FormatException>();
    }

    [Test, Description("A property that does not exist on the type should throw an ArgumentException naming it")]
    public void BuildLambdaExpressionForCollections_Throws_WhenPropertyDoesNotExist()
    {
        Action act = () => Apply(Filters(("Nope", [Filter("A", "equals")])));

        act.Should().Throw<ArgumentException>().WithMessage("*Nope*");
    }

    [TestCase("like")]
    [TestCase("Contains")]
    [TestCase("EQUALS")]
    [Description("A match mode the engine does not know, including a different casing of a known one, should throw")]
    public void BuildLambdaExpressionForCollections_Throws_WhenMatchModeIsUnknown(string matchMode)
    {
        Action act = () => Apply(Filters(("Name", [Filter("A", matchMode)])));

        act.Should().Throw<ArgumentOutOfRangeException>().WithParameterName("comparisonOperation");
    }

    #endregion

    #region skipped filters

    [Test, Description("A filter with no search value should be skipped")]
    public void BuildLambdaExpressionForCollections_SkipsFilterWithEmptySearchValue()
    {
        List<string> names = Apply(Filters(("Name", [Filter("", "equals")])));

        names.Should().Equal(_everyName);
    }

    [Test, Description("A filter with a null search value should be skipped")]
    public void BuildLambdaExpressionForCollections_SkipsFilterWithNullSearchValue()
    {
        List<string> names = Apply(Filters(("Name", [Filter(null, "equals")])));

        names.Should().Equal(_everyName);
    }

    [Test, Description("A filter with no match mode should be skipped")]
    public void BuildLambdaExpressionForCollections_SkipsFilterWithEmptyMatchMode()
    {
        List<string> names = Apply(Filters(("Name", [Filter("Alpha", "")])));

        names.Should().Equal(_everyName);
    }

    [Test, Description("A filter with no logical operator should be skipped, even the first one for a property")]
    public void BuildLambdaExpressionForCollections_SkipsFilterWithEmptyLogicalOperator()
    {
        List<string> names = Apply(Filters(("Name", [Filter("Alpha", "equals", "")])));

        names.Should().Equal(_everyName);
    }

    [Test, Description("A valid filter followed by a blank one for the same property should apply the valid one")]
    public void BuildLambdaExpressionForCollections_AppliesValidFilter_WhenFollowedByBlankFilter()
    {
        List<string> names = Apply(Filters(("Name", [Filter("Beta", "equals"), Filter("", "equals")])));

        names.Should().Equal("Beta");
    }

    [Test, Description("A blank property followed by a valid one should apply the valid one")]
    public void BuildLambdaExpressionForCollections_AppliesValidProperty_WhenAnEarlierPropertyIsBlank()
    {
        List<string> names = Apply(Filters(("Name", [Filter("", "equals")]), ("Qty", [Filter("2", "equals")])));

        names.Should().Equal("Beta", "Zeta");
    }

    [Test, Description("A valid property followed by a blank one should apply the valid one")]
    public void BuildLambdaExpressionForCollections_AppliesValidProperty_WhenALaterPropertyIsBlank()
    {
        List<string> names = Apply(Filters(("Qty", [Filter("2", "equals")]), ("Name", [Filter("", "equals")])));

        names.Should().Equal("Beta", "Zeta");
    }

    #endregion

    #region combining filters

    [Test, Description("Filters on different properties should all have to match")]
    public void BuildLambdaExpressionForCollections_CombinesDifferentPropertiesWithAnd()
    {
        List<string> names = Apply(Filters(
            ("Name", [Filter("Alpha", "startsWith")]),
            ("Qty", [Filter("3", "equals")])));

        names.Should().Equal("Alphabet");
    }

    [Test, Description("Two filters on one property joined with 'and' should both have to match")]
    public void BuildLambdaExpressionForCollections_CombinesSamePropertyWithAnd()
    {
        List<string> names = Apply(Filters(("Name", [Filter("A", "startsWith", "and"), Filter("bet", "contains", "and")])));

        names.Should().Equal("Alphabet");
    }

    [Test, Description("Two filters on one property joined with 'or' should match either")]
    public void BuildLambdaExpressionForCollections_CombinesSamePropertyWithOr()
    {
        List<string> names = Apply(Filters(("Name", [Filter("Beta", "equals", "or"), Filter("Zeta", "equals", "or")])));

        names.Should().Equal("Beta", "Zeta");
    }

    [Test, Description("The logical operator on the later filter should be the one that joins it to the earlier one")]
    public void BuildLambdaExpressionForCollections_UsesTheLaterFiltersOperator()
    {
        // first filter says 'or' but the second says 'and', and the second one decides how they join
        List<string> names = Apply(Filters(("Name", [Filter("Alpha", "startsWith", "or"), Filter("bet", "contains", "and")])));

        names.Should().Equal("Alphabet");
    }

    #endregion


    [Test, Description("A blank first filter followed by a valid one for the same property should apply the valid one")]
    public void BuildLambdaExpressionForCollections_AppliesValidFilter_WhenPrecededByBlankFilter()
    {
        List<string> names = Apply(Filters(("Name", [Filter("", "equals", "and"), Filter("Beta", "equals", "and")])));

        names.Should().Equal("Beta");
    }


    #region BuildFilterQueryAsync against a database

    [Test, Description("BuildFilterQueryAsync should return every row when the criteria are null")]
    public async Task BuildFilterQueryAsync_ReturnsEveryRow_WhenCriteriaAreNull()
    {
        IsolatedDatabase db = new();
        await SeedCustomersAsync(db, "Alpha", "Beta", "Zeta");
        using OiServiceDbContext context = db.CreateContext();

        IQueryable<Customer> query = await context.Customers.BuildFilterQueryAsync(null!, CancellationToken.None);

        (await query.CountAsync()).Should().Be(3);
    }

    [Test, Description("BuildFilterQueryAsync should return every row when the criteria are empty")]
    public async Task BuildFilterQueryAsync_ReturnsEveryRow_WhenCriteriaAreEmpty()
    {
        IsolatedDatabase db = new();
        await SeedCustomersAsync(db, "Alpha", "Beta", "Zeta");
        using OiServiceDbContext context = db.CreateContext();

        IQueryable<Customer> query = await context.Customers.BuildFilterQueryAsync(new Dictionary<string, IFilterMetaData[]>(), CancellationToken.None);

        (await query.CountAsync()).Should().Be(3);
    }

    [TestCase("equals", "Alpha", new[] { "Alpha" })]
    [TestCase("notEquals", "Alpha", new[] { "Alphabet", "Beta", "Zeta" })]
    [TestCase("startsWith", "Alpha", new[] { "Alpha", "Alphabet" })]
    [TestCase("contains", "eta", new[] { "Beta", "Zeta" })]
    [TestCase("notContains", "eta", new[] { "Alpha", "Alphabet" })]
    [TestCase("endsWith", "eta", new[] { "Beta", "Zeta" })]
    [Description("BuildFilterQueryAsync should produce a query EF can run for every string match mode")]
    public async Task BuildFilterQueryAsync_AppliesStringMatchModeInTheDatabase(string matchMode, string searchValue, string[] expected)
    {
        IsolatedDatabase db = new();
        await SeedCustomersAsync(db, "Alpha", "Beta", "Alphabet", "Zeta");
        using OiServiceDbContext context = db.CreateContext();
        Dictionary<string, IFilterMetaData[]> filters = Filters(("LastName", [Filter(searchValue, matchMode)]));

        IQueryable<Customer> query = await context.Customers.BuildFilterQueryAsync(filters, CancellationToken.None);

        List<string> lastNames = await query.OrderBy(c => c.LastName).Select(c => c.LastName).ToListAsync();
        lastNames.Should().Equal(expected);
    }

    [Test, Description("BuildFilterQueryAsync should combine filters on different properties")]
    public async Task BuildFilterQueryAsync_CombinesFiltersOnDifferentProperties()
    {
        IsolatedDatabase db = new();
        await using (OiServiceDbContext seed = db.CreateContext())
        {
            seed.Customers.AddRange(
                new Customer { Id = Guid.NewGuid(), LastName = "Smith", PhoneNumber = "512-555-0100", Created = DateTime.UtcNow },
                new Customer { Id = Guid.NewGuid(), LastName = "Smith", PhoneNumber = "214-555-0101", Created = DateTime.UtcNow },
                new Customer { Id = Guid.NewGuid(), LastName = "Jones", PhoneNumber = "512-555-0102", Created = DateTime.UtcNow });
            await seed.SaveChangesAsync();
        }
        using OiServiceDbContext context = db.CreateContext();
        Dictionary<string, IFilterMetaData[]> filters = Filters(
            ("LastName", [Filter("Smith", "equals")]),
            ("PhoneNumber", [Filter("512", "startsWith")]));

        IQueryable<Customer> query = await context.Customers.BuildFilterQueryAsync(filters, CancellationToken.None);

        List<Customer> matches = await query.ToListAsync();
        matches.Should().ContainSingle().Which.PhoneNumber.Should().Be("512-555-0100");
    }

    [Test, Description("BuildFilterQueryAsync should return a query that can be composed further, for example ordered and paged")]
    public async Task BuildFilterQueryAsync_ReturnsComposableQuery()
    {
        IsolatedDatabase db = new();
        await SeedCustomersAsync(db, "Alpha", "Alphabet", "Beta");
        using OiServiceDbContext context = db.CreateContext();
        Dictionary<string, IFilterMetaData[]> filters = Filters(("LastName", [Filter("Alpha", "startsWith")]));

        IQueryable<Customer> query = await context.Customers.BuildFilterQueryAsync(filters, CancellationToken.None);

        List<string> page = await query.OrderByDescending(c => c.LastName).Take(1).Select(c => c.LastName).ToListAsync();
        page.Should().Equal("Alphabet");
    }

    [Test, Description("BuildFilterQueryAsync should fail with an ArgumentException when a property does not exist")]
    public async Task BuildFilterQueryAsync_Throws_WhenPropertyDoesNotExist()
    {
        IsolatedDatabase db = new();
        using OiServiceDbContext context = db.CreateContext();
        Dictionary<string, IFilterMetaData[]> filters = Filters(("NoSuchProperty", [Filter("x", "equals")]));

        Func<Task> act = () => context.Customers.BuildFilterQueryAsync(filters, CancellationToken.None);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<ArgumentException>().Which.Message.Should().Contain("NoSuchProperty");
    }

    [Test, Description("BuildFilterQueryAsync should fail with a cancellation exception when the token is already cancelled")]
    public async Task BuildFilterQueryAsync_Throws_WhenCancelled()
    {
        IsolatedDatabase db = new();
        using OiServiceDbContext context = db.CreateContext();
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        Func<Task> act = () => context.Customers.BuildFilterQueryAsync(null!, cts.Token);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<OperationCanceledException>();
    }

    #endregion

    #region FilterCriteria

    [Test, Description("A new FilterCriteria should have no values")]
    public void FilterCriteria_StartsEmpty()
    {
        FilterCriteria sut = new();

        sut.SearchValue.Should().BeNull();
        sut.MatchMode.Should().BeNull();
        sut.LogicalOperator.Should().BeNull();
    }

    [Test, Description("FilterCriteria should keep the values it is given and be usable as an IFilterMetaData")]
    public void FilterCriteria_KeepsValuesAndIsAFilterMetaData()
    {
        IFilterMetaData sut = new FilterCriteria { SearchValue = "Smith", MatchMode = "equals", LogicalOperator = "and" };

        sut.SearchValue.Should().Be("Smith");
        sut.MatchMode.Should().Be("equals");
        sut.LogicalOperator.Should().Be("and");
    }

    #endregion

    #region helpers

    private static FilterCriteria Filter(string? searchValue, string matchMode, string logicalOperator = "and")
    {
        return new FilterCriteria { SearchValue = searchValue, MatchMode = matchMode, LogicalOperator = logicalOperator };
    }

    private static Dictionary<string, IFilterMetaData[]> Filters(params (string Property, FilterCriteria[] Criteria)[] filters)
    {
        return filters.ToDictionary(f => f.Property, f => f.Criteria.Cast<IFilterMetaData>().ToArray());
    }

    private static List<string> Apply(Dictionary<string, IFilterMetaData[]> filters)
    {
        Func<FilterTestItem, bool> predicate = FilteringEngine.BuildLambdaExpressionForCollections<FilterTestItem>(filters);
        return _items.Where(predicate).Select(i => i.Name).ToList();
    }

    private static async Task SeedCustomersAsync(IsolatedDatabase db, params string[] lastNames)
    {
        await using OiServiceDbContext seed = db.CreateContext();
        foreach (string lastName in lastNames)
        {
            seed.Customers.Add(new Customer { Id = Guid.NewGuid(), LastName = lastName, PhoneNumber = "512-555-0100", Created = DateTime.UtcNow });
        }
        await seed.SaveChangesAsync();
    }

    #endregion
}
