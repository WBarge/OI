using FluentAssertions;
using OI.Data.Contexts;
using OI.Data.Helpers;
using OI.Data.Model.Orders;
using OI.Data.Repos;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

/// <summary>
/// Extra tests for the customer repository's filtered count, filter match modes and error paths.
/// The basic search and paging tests are in <see cref="CustomerRepoTests"/>.
/// Every test gets its own database so counts can be asserted exactly.
/// </summary>
[TestFixture, Description("Tests for the customer repository's filtered count and filter modes")]
public class CustomerRepoFilterAndCountTests
{
    private IsolatedDatabase _db = null!;

    [SetUp]
    public void SetUp() => _db = new IsolatedDatabase();

    [Test, Description("GetCustomerCountAsync should count only the customers that match the filter")]
    public async Task GetCustomerCountAsync_CountsOnlyMatchingCustomers()
    {
        await SeedAsync("Smith", "Smith", "Jones");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        long count = await sut.GetCustomerCountAsync(Filter("LastName", "Smith", "equals"), CancellationToken.None);

        count.Should().Be(2);
    }

    [Test, Description("GetCustomerCountAsync should count every customer when the filters are null")]
    public async Task GetCustomerCountAsync_CountsEveryCustomer_WhenFiltersAreNull()
    {
        await SeedAsync("Alpha", "Beta", "Zeta");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        long count = await sut.GetCustomerCountAsync(null, CancellationToken.None);

        count.Should().Be(3);
    }

    [Test, Description("GetCustomerCountAsync should return zero when no customer matches")]
    public async Task GetCustomerCountAsync_ReturnsZero_WhenNothingMatches()
    {
        await SeedAsync("Smith");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        long count = await sut.GetCustomerCountAsync(Filter("LastName", "Nobody", "equals"), CancellationToken.None);

        count.Should().Be(0);
    }

    [Test, Description("GetCustomerCountAsync should apply filters on more than one property together")]
    public async Task GetCustomerCountAsync_CombinesFiltersOnDifferentProperties()
    {
        await SeedAsync("Smith", "Smith", "Jones");
        await using (OiServiceDbContext seed = _db.CreateContext())
        {
            seed.Customers.Add(new Customer { Id = Guid.NewGuid(), LastName = "Smith", PhoneNumber = "214-555-0199", Created = DateTime.UtcNow });
            await seed.SaveChangesAsync();
        }
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = new()
        {
            ["LastName"] = [Criteria("Smith", "equals")],
            ["PhoneNumber"] = [Criteria("512", "startsWith")]
        };

        long count = await sut.GetCustomerCountAsync(filters, CancellationToken.None);

        count.Should().Be(2);
    }

    [Test, Description("GetCustomerCountAsync should equal the number of customers the search returns across all pages for the same filter")]
    public async Task GetCustomerCountAsync_MatchesTheNumberOfCustomersAcrossAllPages()
    {
        await SeedAsync("Smith", "Smith", "Smith", "Smith", "Smith", "Jones");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = Filter("LastName", "Smith", "equals");

        long count = await sut.GetCustomerCountAsync(filters, CancellationToken.None);
        int found = 0;
        for (int page = 1; page <= 3; page++)
        {
            found += (await sut.FindPagedCustomerRecordsAsync(filters, page, 2, CancellationToken.None)).Count();
        }

        count.Should().Be(found);
    }

    [Test, Description("GetCustomerCountAsync should fail with an ArgumentException when a filter names a property that does not exist")]
    public async Task GetCustomerCountAsync_Throws_WhenPropertyDoesNotExist()
    {
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        Func<Task> act = () => sut.GetCustomerCountAsync(Filter("NoSuchProperty", "x", "equals"), CancellationToken.None);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<ArgumentException>();
    }

    [Test, Description("GetCustomerCountAsync should fail with a cancellation exception when the token is already cancelled")]
    public async Task GetCustomerCountAsync_Throws_WhenCancelled()
    {
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        Func<Task> act = () => sut.GetCustomerCountAsync(null, cts.Token);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<OperationCanceledException>();
    }

    [TestCase("startsWith", "Smi", new[] { "Smith", "Smithers" })]
    [TestCase("contains", "mit", new[] { "Smith", "Smithers" })]
    [TestCase("endsWith", "ers", new[] { "Smithers" })]
    [TestCase("notContains", "mit", new[] { "Jones" })]
    [TestCase("notEquals", "Smith", new[] { "Jones", "Smithers" })]
    [Description("FindPagedCustomerRecordsAsync should apply every match mode, not just equals")]
    public async Task FindPagedCustomerRecordsAsync_AppliesMatchMode(string matchMode, string searchValue, string[] expected)
    {
        await SeedAsync("Smith", "Smithers", "Jones");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> result = await sut.FindPagedCustomerRecordsAsync(
            Filter("LastName", searchValue, matchMode), 1, 10, CancellationToken.None);

        result.Select(c => c.LastName).Should().Equal(expected);
    }

    [Test, Description("FindPagedCustomerRecordsAsync should give every customer exactly once across the pages even when names are identical")]
    public async Task FindPagedCustomerRecordsAsync_PagesDoNotOverlap_WhenNamesAreIdentical()
    {
        await SeedAsync("Smith", "Smith", "Smith", "Smith", "Smith");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        List<Guid> ids = [];
        for (int page = 1; page <= 3; page++)
        {
            ids.AddRange((await sut.FindPagedCustomerRecordsAsync(null, page, 2, CancellationToken.None)).Select(c => c.Id));
        }

        ids.Should().HaveCount(5);
        ids.Should().OnlyHaveUniqueItems();
    }

    [Test, Description("FindPagedCustomerRecordsAsync should return an empty list, not throw, when the offset overflows an int")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsEmpty_WhenOffsetOverflowsInt()
    {
        await SeedAsync("Smith");
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> result = await sut.FindPagedCustomerRecordsAsync(null, int.MaxValue, int.MaxValue, CancellationToken.None);

        result.Should().BeEmpty();
    }

    [Test, Description("FindPagedCustomerRecordsAsync should fail with an ArgumentException when a filter names a property that does not exist")]
    public async Task FindPagedCustomerRecordsAsync_Throws_WhenPropertyDoesNotExist()
    {
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);

        Func<Task> act = () => sut.FindPagedCustomerRecordsAsync(Filter("NoSuchProperty", "x", "equals"), 1, 10, CancellationToken.None);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<ArgumentException>();
    }

    [Test, Description("FindPagedCustomerRecordsAsync should fail with a cancellation exception when the token is already cancelled")]
    public async Task FindPagedCustomerRecordsAsync_Throws_WhenCancelled()
    {
        using OiServiceDbContext context = _db.CreateContext();
        CustomerRepo sut = new(context);
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        Func<Task> act = () => sut.FindPagedCustomerRecordsAsync(null, 1, 10, cts.Token);

        Exception thrown = (await act.Should().ThrowAsync<Exception>()).Which;
        thrown.Unwrap().Should().BeAssignableTo<OperationCanceledException>();
    }

    private static IFilterMetaData Criteria(string searchValue, string matchMode)
    {
        return new FilterCriteria { SearchValue = searchValue, MatchMode = matchMode, LogicalOperator = "and" };
    }

    private static Dictionary<string, IFilterMetaData[]> Filter(string property, string searchValue, string matchMode)
    {
        return new Dictionary<string, IFilterMetaData[]> { [property] = [Criteria(searchValue, matchMode)] };
    }

    private async Task SeedAsync(params string[] lastNames)
    {
        await using OiServiceDbContext seed = _db.CreateContext();
        foreach (string lastName in lastNames)
        {
            seed.Customers.Add(new Customer { Id = Guid.NewGuid(), LastName = lastName, PhoneNumber = "512-555-0100", Created = DateTime.UtcNow });
        }
        await seed.SaveChangesAsync();
    }
}
