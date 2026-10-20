using System.Linq.Expressions;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using OI.Data.Helpers;
using OI.Data.Model;
using OI.Data.Repos;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

/// <summary>
/// Tests for <see cref="BaseEfRepo{T}"/>. The base class only exposes protected members, so these tests use
/// small subclasses that make them public. Each test gets its own database.
/// </summary>
[TestFixture, Description("Tests for BaseEfRepo")]
public class BaseEfRepoTests
{
    private sealed class CustomerTestRepo(OiDbContext dbContext) : BaseEfRepo<Customer>(dbContext)
    {
        public Task<List<Customer>> All(CancellationToken token = default) => GetAllRecordsAsync(token);
        public Task<List<Customer>> AllPaged(int page, int size) => GetAllRecordsPagedAsync(page, size);
        public Task<List<Customer>> Where(Expression<Func<Customer, bool>> expression) => FindByConditionAsync(expression);
        public Task<List<Customer>> Filtered(Dictionary<string, IFilterMetaData[]>? filters, int page, int size) =>
            FindByConditionPagedAsync(filters!, page, size);
        public Task<Customer?> ById(Guid id) => FindByIdAsync(id);
        public Customer NewEntity() => Create();
        public Task Insert(Customer customer) => InsertAsync(customer);
        public void Change(Customer customer) => Update(customer);
        public void Remove(Customer customer) => Delete(customer);
        public Task Save() => SaveAsync();
    }

    /// <summary>
    /// State has neither a Created nor a Modified property, which the base class has to cope with.
    /// </summary>
    private sealed class StateTestRepo(OiDbContext dbContext) : BaseEfRepo<State>(dbContext)
    {
        public Task Insert(State state) => InsertAsync(state);
        public void Change(State state) => Update(state);
        public Task Save() => SaveAsync();
    }

    private IsolatedDatabase _db = null!;

    [SetUp]
    public void SetUp() => _db = new IsolatedDatabase();

    [Test, Description("The constructor should throw when the DbContext is null")]
    public void Constructor_Throws_WhenDbContextIsNull()
    {
        Action act = () => _ = new CustomerTestRepo(null!);

        act.Should().Throw<ArgumentNullException>();
    }

    [Test, Description("Create should return a new, empty entity each time")]
    public void Create_ReturnsNewInstanceEachTime()
    {
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        Customer first = sut.NewEntity();
        Customer second = sut.NewEntity();

        first.Should().NotBeNull();
        second.Should().NotBeNull();
        first.Should().NotBeSameAs(second);
    }

    [Test, Description("InsertAsync should stamp Created with the current UTC time")]
    public async Task InsertAsync_SetsCreated()
    {
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);
        Customer customer = NewCustomer("Smith");
        customer.Created = DateTime.MinValue;

        await sut.Insert(customer);

        customer.Created.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(30));
    }

    [Test, Description("InsertAsync should not write to the database until SaveAsync is called")]
    public async Task InsertAsync_DoesNotPersistUntilSaved()
    {
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);
        Customer customer = NewCustomer("Smith");

        await sut.Insert(customer);

        using (OiDbContext before = _db.CreateContext())
        {
            (await before.Customers.CountAsync()).Should().Be(0);
        }

        await sut.Save();

        using OiDbContext after = _db.CreateContext();
        (await after.Customers.CountAsync(c => c.Id == customer.Id)).Should().Be(1);
    }

    [Test, Description("InsertAsync should work for an entity that has no Created property")]
    public async Task InsertAsync_WorksForEntityWithoutCreated()
    {
        using OiDbContext context = _db.CreateContext();
        StateTestRepo sut = new(context);
        State state = new() { Id = Guid.NewGuid(), Name = "Testland", Code = "TL" };

        await sut.Insert(state);
        await sut.Save();

        using OiDbContext verify = _db.CreateContext();
        (await verify.States.CountAsync(s => s.Code == "TL")).Should().Be(1);
    }

    [Test, Description("Update should stamp Modified with the current UTC time and save the change")]
    public async Task Update_SetsModifiedAndPersistsChange()
    {
        Guid id = await SeedCustomerAsync("Smith");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);
        Customer customer = (await sut.ById(id))!;
        customer.Modified.Should().BeNull();
        customer.LastName = "Jones";

        sut.Change(customer);
        await sut.Save();

        using OiDbContext verify = _db.CreateContext();
        Customer saved = await verify.Customers.SingleAsync(c => c.Id == id);
        saved.LastName.Should().Be("Jones");
        saved.Modified.Should().NotBeNull();
        saved.Modified!.Value.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(30));
    }

    [Test, Description("Update should work for an entity that has no Modified property")]
    public async Task Update_WorksForEntityWithoutModified()
    {
        using OiDbContext context = _db.CreateContext();
        StateTestRepo sut = new(context);
        State state = new() { Id = Guid.NewGuid(), Name = "Testland", Code = "TL" };
        await sut.Insert(state);
        await sut.Save();
        state.Name = "Renamed";

        sut.Change(state);
        await sut.Save();

        using OiDbContext verify = _db.CreateContext();
        (await verify.States.SingleAsync(s => s.Code == "TL")).Name.Should().Be("Renamed");
    }

    [Test, Description("Delete should remove the entity once SaveAsync is called, and not before")]
    public async Task Delete_RemovesEntityWhenSaved()
    {
        Guid id = await SeedCustomerAsync("Smith");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);
        Customer customer = (await sut.ById(id))!;

        sut.Remove(customer);

        using (OiDbContext before = _db.CreateContext())
        {
            (await before.Customers.CountAsync(c => c.Id == id)).Should().Be(1);
        }

        await sut.Save();

        using OiDbContext after = _db.CreateContext();
        (await after.Customers.CountAsync(c => c.Id == id)).Should().Be(0);
    }

    [Test, Description("FindByIdAsync should return the entity with that id")]
    public async Task FindByIdAsync_ReturnsEntity_WhenItExists()
    {
        Guid id = await SeedCustomerAsync("Smith");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        Customer? result = await sut.ById(id);

        result.Should().NotBeNull();
        result!.LastName.Should().Be("Smith");
    }

    [Test, Description("FindByIdAsync should return null when no entity has that id")]
    public async Task FindByIdAsync_ReturnsNull_WhenItDoesNotExist()
    {
        await SeedCustomerAsync("Smith");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        Customer? result = await sut.ById(Guid.NewGuid());

        result.Should().BeNull();
    }

    [Test, Description("GetAllRecordsAsync should return every entity")]
    public async Task GetAllRecordsAsync_ReturnsEverything()
    {
        await SeedCustomerAsync("Alpha");
        await SeedCustomerAsync("Beta");
        await SeedCustomerAsync("Zeta");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> result = await sut.All();

        result.Select(c => c.LastName).Should().BeEquivalentTo("Alpha", "Beta", "Zeta");
    }

    [Test, Description("GetAllRecordsAsync should return an empty list when there are no entities")]
    public async Task GetAllRecordsAsync_ReturnsEmpty_WhenThereAreNone()
    {
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> result = await sut.All();

        result.Should().BeEmpty();
    }

    [Test, Description("GetAllRecordsPagedAsync should return the requested page and every entity once across the pages")]
    public async Task GetAllRecordsPagedAsync_ReturnsRequestedPages()
    {
        for (int i = 0; i < 5; i++)
        {
            await SeedCustomerAsync($"Customer{i}");
        }
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> page1 = await sut.AllPaged(1, 2);
        List<Customer> page2 = await sut.AllPaged(2, 2);
        List<Customer> page3 = await sut.AllPaged(3, 2);
        List<Customer> page4 = await sut.AllPaged(4, 2);

        page1.Should().HaveCount(2);
        page2.Should().HaveCount(2);
        page3.Should().HaveCount(1);
        page4.Should().BeEmpty();
        page1.Concat(page2).Concat(page3).Select(c => c.Id).Should().OnlyHaveUniqueItems();
    }

    [Test, Description("FindByConditionAsync should return only the entities that satisfy the expression")]
    public async Task FindByConditionAsync_ReturnsMatchingEntities()
    {
        await SeedCustomerAsync("Smith");
        await SeedCustomerAsync("Smithers");
        await SeedCustomerAsync("Jones");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> result = await sut.Where(c => c.LastName.StartsWith("Smith"));

        result.Select(c => c.LastName).Should().BeEquivalentTo("Smith", "Smithers");
    }

    [Test, Description("FindByConditionAsync should return an empty list when nothing satisfies the expression")]
    public async Task FindByConditionAsync_ReturnsEmpty_WhenNothingMatches()
    {
        await SeedCustomerAsync("Smith");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> result = await sut.Where(c => c.LastName == "Nobody");

        result.Should().BeEmpty();
    }

    [Test, Description("FindByConditionPagedAsync should filter and then page the result")]
    public async Task FindByConditionPagedAsync_FiltersThenPages()
    {
        for (int i = 0; i < 5; i++)
        {
            await SeedCustomerAsync($"Smith{i}");
        }
        await SeedCustomerAsync("Jones");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = new()
        {
            ["LastName"] = [new FilterCriteria { SearchValue = "Smith", MatchMode = "startsWith", LogicalOperator = "and" }]
        };

        List<Customer> page1 = await sut.Filtered(filters, 1, 2);
        List<Customer> page3 = await sut.Filtered(filters, 3, 2);
        List<Customer> page4 = await sut.Filtered(filters, 4, 2);

        page1.Should().HaveCount(2).And.OnlyContain(c => c.LastName.StartsWith("Smith"));
        page3.Should().HaveCount(1).And.OnlyContain(c => c.LastName.StartsWith("Smith"));
        page4.Should().BeEmpty();
    }

    [Test, Description("FindByConditionPagedAsync should page every entity when there are no filters")]
    public async Task FindByConditionPagedAsync_PagesEverything_WhenFiltersAreNull()
    {
        await SeedCustomerAsync("Alpha");
        await SeedCustomerAsync("Beta");
        await SeedCustomerAsync("Zeta");
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> result = await sut.Filtered(null, 1, 10);

        result.Should().HaveCount(3);
    }

    [Test, Description("FindByConditionPagedAsync should treat a page number of zero as the first page")]
    public async Task FindByConditionPagedAsync_TreatsPageZeroAsFirstPage()
    {
        for (int i = 0; i < 4; i++)
        {
            await SeedCustomerAsync($"Customer{i}");
        }
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);

        List<Customer> first = await sut.Filtered(null, 1, 2);
        List<Customer> zero = await sut.Filtered(null, 0, 2);

        zero.Select(c => c.Id).Should().Equal(first.Select(c => c.Id));
    }

    [Test, Description("SaveAsync should persist several pending changes together")]
    public async Task SaveAsync_PersistsAllPendingChanges()
    {
        using OiDbContext context = _db.CreateContext();
        CustomerTestRepo sut = new(context);
        Customer first = NewCustomer("Alpha");
        Customer second = NewCustomer("Beta");

        await sut.Insert(first);
        await sut.Insert(second);
        await sut.Save();

        using OiDbContext verify = _db.CreateContext();
        (await verify.Customers.CountAsync()).Should().Be(2);
    }

    private static Customer NewCustomer(string lastName)
    {
        return new Customer { Id = Guid.NewGuid(), LastName = lastName, PhoneNumber = "512-555-0100", Created = DateTime.UtcNow };
    }

    private async Task<Guid> SeedCustomerAsync(string lastName)
    {
        Customer customer = NewCustomer(lastName);
        await using OiDbContext seed = _db.CreateContext();
        seed.Customers.Add(customer);
        await seed.SaveChangesAsync();
        return customer.Id;
    }
}
