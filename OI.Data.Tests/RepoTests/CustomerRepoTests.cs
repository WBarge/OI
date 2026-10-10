using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Model;
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
        using OiDbContext context = scope.ServiceProvider.GetRequiredService<OiDbContext>();
        context.Database.EnsureCreated();
    }

    [Test, Description("CustomerRepo constructor should throw when dbContext is null")]
    public void Constructor_ThrowsWhenDbContextIsNull()
    {
        Action act = () => _ = new CustomerRepo(null!);
        act.Should().Throw<ArgumentNullException>("dbContext is required by CustomerRepo");
    }

    [Test, Description("GetCustomerByIdAsync should return the customer with all fields mapped when it exists")]
    public async Task GetCustomerByIdAsync_ReturnsMappedCustomerWhenFound()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        Guid customerId = Guid.NewGuid();
        using IServiceScope seedScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext seedContext = seedScope.ServiceProvider.GetRequiredService<OiDbContext>();
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
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
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
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        CustomerRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        ICustomer? result = await sut.GetCustomerByIdAsync(Guid.NewGuid(), CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.Should().BeNull("no customer exists with that id");
    }

    [Test, Description("GetCustomerByIdAsync should return null for an empty Guid")]
    public async Task GetCustomerByIdAsync_ReturnsNullForEmptyGuid()
    {
        await TestContext.Out.WriteLineAsync("Setting up test");
        using IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiDbContext context = serviceScope.ServiceProvider.GetRequiredService<OiDbContext>();
        CustomerRepo sut = new(context);

        await TestContext.Out.WriteLineAsync("Executing test");
        ICustomer? result = await sut.GetCustomerByIdAsync(Guid.Empty, CancellationToken.None);

        await TestContext.Out.WriteLineAsync("Examining results");
        result.Should().BeNull("an empty Guid never identifies a customer");
    }
}