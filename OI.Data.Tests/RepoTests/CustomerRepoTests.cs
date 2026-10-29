using FluentAssertions;
using FluentAssertions.Specialized;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;
using OI.Data.Helpers;
using OI.Data.Model.Orders;
using OI.Data.Repos;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for the customer repository")]
public class CustomerRepoTests
{
    private IServiceProvider _serviceProvider;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _serviceProvider = TestSetupHelper.GetServiceProvider();

        // Ensure the in-memory database is created and seeded
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        context.Database.EnsureCreated();
    }

    [Test, Description("CustomerRepo constructor should throw when serviceDbContext is null")]
    public void Constructor_ThrowsWhenDbContextIsNull()
    {
        Action act = () => _ = new CustomerRepo(null!);
        act.Should().Throw<ArgumentNullException>("serviceDbContext is required by CustomerRepo");
    }

    [Test, Description("GetCustomerByIdAsync should return the customer with all fields mapped when it exists")]
    public async Task GetCustomerByIdAsync_ReturnsMappedCustomerWhenFound()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        Guid customerId = Guid.NewGuid();
        using IServiceScope seedScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext seedContext = seedScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        seedContext.Customers.Add(new Customer
        {
            Id = customerId,
            LastName = "Smith",
            FirstName = "Jane",
            PhoneNumber = "512-555-0100",
            DefaultBillingAddress1 = "123 Main St",
            DefaultBillingAddress2 = "Apt 1",
            DefaultBillingCity = "Austin",
            DefaultBillingStateCode = "TX",
            DefaultBillingZipCode = "78701",
            DefaultShippingAddress1 = "456 Elm St",
            DefaultShippingAddress2 = "Suite 2",
            DefaultShippingCity = "Dallas",
            DefaultShippingStateCode = "TX",
            DefaultShippingZipCode = "75201",
            Created = DateTime.UtcNow
        });
        await seedContext.SaveChangesAsync();
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        ICustomer? result = await sut.GetCustomerByIdAsync(customerId, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.Should().NotBeNull();
        result!.Id.Should().Be(customerId);
        result.LastName.Should().Be("Smith");
        result.FirstName.Should().Be("Jane");
        result.PhoneNumber.Should().Be("512-555-0100");
        result.DefaultBillingAddress1.Should().Be("123 Main St");
        result.DefaultBillingAddress2.Should().Be("Apt 1");
        result.DefaultBillingCity.Should().Be("Austin");
        result.DefaultBillingStateCode.Should().Be("TX");
        result.DefaultBillingZipCode.Should().Be("78701");
        result.DefaultShippingAddress1.Should().Be("456 Elm St");
        result.DefaultShippingAddress2.Should().Be("Suite 2");
        result.DefaultShippingCity.Should().Be("Dallas");
        result.DefaultShippingStateCode.Should().Be("TX");
        result.DefaultShippingZipCode.Should().Be("75201");
    }

    [Test, Description("GetCustomerByIdAsync should return null when no customer has the id")]
    public async Task GetCustomerByIdAsync_ReturnsNullWhenNotFound()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        ICustomer? result = await sut.GetCustomerByIdAsync(Guid.NewGuid(), CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.Should().BeNull("no customer exists with that id");
    }

    [Test,
     Description(
         "FindPagedCustomerRecordsAsync should return the id, first name, last name and phone number as the search model")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsIdFirstLastAndPhone()
    {
        string lastName = UniqueLastName();
        Customer seeded = NewCustomer(lastName, "Jane");
        seeded.DefaultBillingAddress1 = "123 Main St";
        seeded.DefaultBillingCity = "Austin";
        seeded.DefaultShippingAddress1 = "456 Elm St";
        seeded.DefaultShippingZipCode = "75201";
        await SeedAsync(seeded);
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", lastName), 1, 10, CancellationToken.None);

        ICustomerSearch result = results.Should().ContainSingle().Subject;
        result.Id.Should().Be(seeded.Id);
        result.FirstName.Should().Be("Jane");
        result.LastName.Should().Be(lastName);
        result.PhoneNumber.Should().Be("512-555-0100");
        result.Should().NotBeAssignableTo<ICustomer>("the search model must not expose the full customer");
    }

    [Test, Description("FindPagedCustomerRecordsAsync should only return customers that match the filter")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsOnlyMatchingCustomers()
    {
        string wanted = UniqueLastName();
        string other = UniqueLastName();
        await SeedAsync(NewCustomer(wanted, "Jane"), NewCustomer(other, "John"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", wanted), 1, 10, CancellationToken.None);

        results.Should().ContainSingle().Which.FirstName.Should().Be("Jane");
    }

    [Test, Description("FindPagedCustomerRecordsAsync should apply filters on more than one property together")]
    public async Task FindPagedCustomerRecordsAsync_CombinesFiltersOnDifferentProperties()
    {
        string lastName = UniqueLastName();
        await SeedAsync(NewCustomer(lastName, "Jane"), NewCustomer(lastName, "John"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = EqualsFilter("LastName", lastName);
        filters["FirstName"] = EqualsFilter("FirstName", "John")["FirstName"];

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(filters, 1, 10, CancellationToken.None);

        results.Should().ContainSingle().Which.FirstName.Should().Be("John");
    }

    [Test,
     Description(
         "FindPagedCustomerRecordsAsync should return an empty list when existing customers do not match the filter")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsEmpty_WhenNothingMatches()
    {
        await SeedAsync(NewCustomer(UniqueLastName(), "Jane"), NewCustomer(UniqueLastName(), "John"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", UniqueLastName()), 1, 10,
                CancellationToken.None);

        results.Should().BeEmpty();
    }

    [Test, Description("FindPagedCustomerRecordsAsync should return every customer when there are no filters")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsCustomers_WhenFiltersAreNull()
    {
        string lastName = UniqueLastName();
        await SeedAsync(NewCustomer(lastName, "Jane"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(null, 1, 100000, CancellationToken.None);

        results.Select(c => c.LastName).Should().Contain(lastName);
    }

    [Test, Description("FindPagedCustomerRecordsAsync should order by last name and then first name")]
    public async Task FindPagedCustomerRecordsAsync_OrdersByLastNameThenFirstName()
    {
        string sharedLastName = UniqueLastName();
        await SeedAsync(
            NewCustomer(sharedLastName, "Cara"),
            NewCustomer(sharedLastName, "Abe"),
            NewCustomer(sharedLastName, "Bea"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", sharedLastName), 1, 10,
                CancellationToken.None);

        results.Select(c => c.FirstName).Should().Equal("Abe", "Bea", "Cara");
    }

    [Test,
     Description("FindPagedCustomerRecordsAsync should return the requested page, and nothing past the last page")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsRequestedPage()
    {
        string lastName = UniqueLastName();
        await SeedAsync(
            NewCustomer(lastName, "C1"),
            NewCustomer(lastName, "C2"),
            NewCustomer(lastName, "C3"),
            NewCustomer(lastName, "C4"),
            NewCustomer(lastName, "C5"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);
        Dictionary<string, IFilterMetaData[]> filters = EqualsFilter("LastName", lastName);

        IEnumerable<ICustomerSearch> pageOne =
            await sut.FindPagedCustomerRecordsAsync(filters, 1, 2, CancellationToken.None);
        IEnumerable<ICustomerSearch> pageTwo =
            await sut.FindPagedCustomerRecordsAsync(filters, 2, 2, CancellationToken.None);
        IEnumerable<ICustomerSearch> pageThree =
            await sut.FindPagedCustomerRecordsAsync(filters, 3, 2, CancellationToken.None);
        IEnumerable<ICustomerSearch> pageFour =
            await sut.FindPagedCustomerRecordsAsync(filters, 4, 2, CancellationToken.None);

        pageOne.Select(c => c.FirstName).Should().Equal("C1", "C2");
        pageTwo.Select(c => c.FirstName).Should().Equal("C3", "C4");
        pageThree.Select(c => c.FirstName).Should().Equal("C5");
        pageFour.Should().BeEmpty();
    }

    [Test, Description("FindPagedCustomerRecordsAsync should treat a page number below 1 as the first page")]
    public async Task FindPagedCustomerRecordsAsync_TreatsPageBelowOneAsFirstPage()
    {
        string lastName = UniqueLastName();
        await SeedAsync(NewCustomer(lastName, "C1"), NewCustomer(lastName, "C2"), NewCustomer(lastName, "C3"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", lastName), 0, 2, CancellationToken.None);

        results.Select(c => c.FirstName).Should().Equal("C1", "C2");
    }

    [Test, Description("FindPagedCustomerRecordsAsync should treat a page size below 1 as a page size of 1")]
    public async Task FindPagedCustomerRecordsAsync_TreatsPageSizeBelowOneAsOne()
    {
        string lastName = UniqueLastName();
        await SeedAsync(NewCustomer(lastName, "C1"), NewCustomer(lastName, "C2"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", lastName), 1, 0, CancellationToken.None);

        results.Should().ContainSingle().Which.FirstName.Should().Be("C1");
    }

    [Test,
     Description(
         "FindPagedCustomerRecordsAsync should not fail for a page number so large the record offset overflows an int")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsEmpty_WhenOffsetOverflowsInt()
    {
        string lastName = UniqueLastName();
        await SeedAsync(NewCustomer(lastName, "C1"));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", lastName), int.MaxValue, 100000,
                CancellationToken.None);

        results.Should().BeEmpty();
    }

    [Test, Description("FindPagedCustomerRecordsAsync should return an empty first name for a customer without one")]
    public async Task FindPagedCustomerRecordsAsync_ReturnsEmptyFirstName_WhenCustomerHasNoFirstName()
    {
        string lastName = UniqueLastName();
        await SeedAsync(NewCustomer(lastName, null));
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        IEnumerable<ICustomerSearch> results =
            await sut.FindPagedCustomerRecordsAsync(EqualsFilter("LastName", lastName), 1, 10, CancellationToken.None);

        results.Should().ContainSingle().Which.FirstName.Should().Be(string.Empty);
    }

    [Test, Description("GetCustomerCountAsync should count every customer")]
    public async Task GetCustomerCountAsync_CountsAllCustomers()
    {
        long before;
        using (IServiceScope beforeScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
        using (OiServiceDbContext beforeContext = beforeScope.ServiceProvider.GetRequiredService<OiServiceDbContext>())
        {
            before = await new CustomerRepo(beforeContext).GetCustomerCountAsync(null,
                TestContext.CurrentContext.CancellationToken);
        }

        await SeedAsync(NewCustomer(UniqueLastName(), "A"), NewCustomer(UniqueLastName(), "B"),
            NewCustomer(UniqueLastName(), "C"));

        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        long after =
            await new CustomerRepo(context).GetCustomerCountAsync(null, TestContext.CurrentContext.CancellationToken);

        after.Should().Be(before + 3);
    }

    [Test, Description("CreateCustomerAsync should save every value and return the saved customer with a new id")]
    public async Task CreateCustomerAsync_SavesEveryValueAndReturnsCustomer()
    {
        StubCreateCustomer request = FullRequest();
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        ICustomer result = await sut.CreateCustomerAsync(request, CancellationToken.None);

        //id is the only value that should have been changed
        result.Id.Should().NotBe(Guid.Empty);
        result.LastName.Should().Be(request.LastName);
        result.FirstName.Should().Be(request.FirstName);
        result.PhoneNumber.Should().Be(request.PhoneNumber);
        result.DefaultBillingAddress1.Should().Be(request.DefaultBillingAddress1);
        result.DefaultBillingAddress2.Should().Be(request.DefaultBillingAddress2);
        result.DefaultBillingCity.Should().Be(request.DefaultBillingCity);
        result.DefaultBillingStateCode.Should().Be(request.DefaultBillingStateCode);
        result.DefaultBillingZipCode.Should().Be(request.DefaultBillingZipCode);
        result.DefaultShippingAddress1.Should().Be(request.DefaultShippingAddress1);
        result.DefaultShippingAddress2.Should().Be(request.DefaultShippingAddress2);
        result.DefaultShippingCity.Should().Be(request.DefaultShippingCity);
        result.DefaultShippingStateCode.Should().Be(request.DefaultShippingStateCode);
        result.DefaultShippingZipCode.Should().Be(request.DefaultShippingZipCode);

        // Read it back with a fresh context so we know it was really written, not just returned.
        using IServiceScope readScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext readContext = readScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        Customer saved = await readContext.Customers.AsNoTracking().SingleAsync(c => c.Id == result.Id);
        saved.LastName.Should().Be(request.LastName);
        saved.FirstName.Should().Be(request.FirstName);
        saved.PhoneNumber.Should().Be(request.PhoneNumber);
        saved.DefaultBillingAddress1.Should().Be(request.DefaultBillingAddress1);
        saved.DefaultBillingZipCode.Should().Be(request.DefaultBillingZipCode);
        saved.DefaultShippingAddress1.Should().Be(request.DefaultShippingAddress1);
        saved.DefaultShippingStateCode.Should().Be(request.DefaultShippingStateCode);
    }

    [Test, Description("CreateCustomerAsync should set the created date to now and leave modified empty")]
    public async Task CreateCustomerAsync_SetsCreatedToNow()
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        ICustomer result = await sut.CreateCustomerAsync(FullRequest(), CancellationToken.None);

        using IServiceScope readScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext readContext = readScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        Customer saved = await readContext.Customers.AsNoTracking().SingleAsync(c => c.Id == result.Id);
        saved.Created.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromMinutes(1));
        saved.Modified.Should().BeNull();
    }

    [Test, Description("CreateCustomerAsync should give each customer its own id")]
    public async Task CreateCustomerAsync_GivesEachCustomerItsOwnId()
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        ICustomer first = await sut.CreateCustomerAsync(FullRequest(), CancellationToken.None);
        ICustomer second = await sut.CreateCustomerAsync(FullRequest(), CancellationToken.None);

        first.Id.Should().NotBe(second.Id);
    }

    [Test, Description("CreateCustomerAsync should save optional values that were not supplied as null")]
    public async Task CreateCustomerAsync_SavesMissingOptionalValuesAsNull()
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);
        StubCreateCustomer request = new() { LastName = UniqueLastName(), PhoneNumber = "512-555-0100" };

        ICustomer result = await sut.CreateCustomerAsync(request, CancellationToken.None);

        using IServiceScope readScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext readContext = readScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        Customer saved = await readContext.Customers.AsNoTracking().SingleAsync(c => c.Id == result.Id);
        saved.FirstName.Should().BeNull();
        saved.DefaultBillingAddress1.Should().BeNull();
        saved.DefaultBillingStateCode.Should().BeNull();
        saved.DefaultShippingAddress1.Should().BeNull();
        saved.DefaultShippingZipCode.Should().BeNull();
    }

    [Test, Description("A customer added with CreateCustomerAsync should be found by GetCustomerByIdAsync")]
    public async Task CreateCustomerAsync_CustomerCanBeReadBackById()
    {
        StubCreateCustomer request = FullRequest();
        ICustomer created;
        using (IServiceScope createScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
        using (OiServiceDbContext createContext = createScope.ServiceProvider.GetRequiredService<OiServiceDbContext>())
        {
            created = await new CustomerRepo(createContext).CreateCustomerAsync(request, CancellationToken.None);
        }

        using IServiceScope readScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext readContext = readScope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        ICustomer? found = await new CustomerRepo(readContext).GetCustomerByIdAsync(created.Id, CancellationToken.None);

        found.Should().NotBeNull();
        found!.LastName.Should().Be(request.LastName);
        found.PhoneNumber.Should().Be(request.PhoneNumber);
    }

    [Test, Description("CreateCustomerAsync should throw when the request is null")]
    public async Task CreateCustomerAsync_ThrowsWhenRequestIsNull()
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);

        Func<Task> act = () => sut.CreateCustomerAsync(null!, CancellationToken.None);

        ExceptionAssertions<ArgumentNullException> thrown = await act.Should().ThrowAsync<ArgumentNullException>();
        thrown.Which.ParamName.Should().Be("request");
    }

    private static StubCreateCustomer FullRequest() => new()
    {
        LastName = UniqueLastName(),
        FirstName = "Jane",
        PhoneNumber = "512-555-0100",
        DefaultBillingAddress1 = "123 Main St",
        DefaultBillingAddress2 = "Apt 1",
        DefaultBillingCity = "Austin",
        DefaultBillingStateCode = "TX",
        DefaultBillingZipCode = "78701",
        DefaultShippingAddress1 = "456 Elm St",
        DefaultShippingAddress2 = "Suite 2",
        DefaultShippingCity = "Dallas",
        DefaultShippingStateCode = "TX",
        DefaultShippingZipCode = "75201"
    };

    private sealed class StubCreateCustomer : ICreateCustomer
    {
        public string LastName { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string? DefaultBillingAddress1 { get; set; }
        public string? DefaultBillingAddress2 { get; set; }
        public string? DefaultBillingCity { get; set; }
        public string? DefaultBillingStateCode { get; set; }
        public string? DefaultBillingZipCode { get; set; }
        public string? DefaultShippingAddress1 { get; set; }
        public string? DefaultShippingAddress2 { get; set; }
        public string? DefaultShippingCity { get; set; }
        public string? DefaultShippingStateCode { get; set; }
        public string? DefaultShippingZipCode { get; set; }
    }

    private static string UniqueLastName() => $"Test-{Guid.NewGuid():N}";

    private static Customer NewCustomer(string lastName, string? firstName) => new()
    {
        Id = Guid.NewGuid(),
        LastName = lastName,
        FirstName = firstName,
        PhoneNumber = "512-555-0100",
        Created = DateTime.UtcNow
    };

    private static Dictionary<string, IFilterMetaData[]> EqualsFilter(string propertyName, string value) => new()
    {
        [propertyName] =
        [
            new FilterCriteria
            {
                SearchValue = value,
                MatchMode = FilteringEngine.EQUALS_COMPARISON,
                LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
            }
        ]
    };

    private async Task SeedAsync(params Customer[] customers)
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        context.Customers.AddRange(customers);
        await context.SaveChangesAsync();
    }
}
