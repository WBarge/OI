using CrossCutting.Exceptions;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OI.Data.Contexts;
using OI.Data.Model.Orders;
using OI.Data.Repos;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for CustomerRepo.UpdateCustomerAsync")]
public class CustomerRepoUpdateTests
{
    private IServiceProvider _serviceProvider = null!;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _serviceProvider = TestSetupHelper.GetServiceProvider();

        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        context.Database.EnsureCreated();
    }

    /// <summary>saves a customer that has every value filled in and returns its id</summary>
    private async Task<Guid> SeedFullCustomerAsync(string lastName = "Original")
    {
        Guid customerId = Guid.NewGuid();
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        context.Customers.Add(new Customer
        {
            Id = customerId,
            LastName = lastName,
            FirstName = "Olivia",
            PhoneNumber = "000-000-0000",
            DefaultBillingAddress1 = "1 Old Bill St",
            DefaultBillingAddress2 = "Old Apt",
            DefaultBillingCity = "Oldtown",
            DefaultBillingStateCode = "OK",
            DefaultBillingZipCode = "00001",
            DefaultShippingAddress1 = "1 Old Ship St",
            DefaultShippingAddress2 = "Old Suite",
            DefaultShippingCity = "Shipville",
            DefaultShippingStateCode = "OR",
            DefaultShippingZipCode = "00002",
            Created = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        });
        await context.SaveChangesAsync();
        return customerId;
    }

    private async Task<Customer> ReadCustomerAsync(Guid customerId)
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        return await context.Customers.AsNoTracking().SingleAsync(c => c.Id == customerId);
    }

    private async Task UpdateAsync(StubUpdateCustomer request, CancellationToken token = default)
    {
        using IServiceScope scope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        using OiServiceDbContext context = scope.ServiceProvider.GetRequiredService<OiServiceDbContext>();
        CustomerRepo sut = new(context);
        await sut.UpdateCustomerAsync(request, token);
    }

    [Test, Description("UpdateCustomerAsync should throw a RequiredObjectException when no customer has the id")]
    public async Task UpdateCustomerAsync_ThrowsWhenCustomerDoesNotExist()
    {
        StubUpdateCustomer request = new() { Id = Guid.NewGuid(), LastName = "Smith", PhoneNumber = "512-555-0100" };

        Func<Task> act = () => UpdateAsync(request, TestContext.CurrentContext.CancellationToken);

        await act.Should().ThrowAsync<RequiredObjectException>("there is no customer to update");
    }

    [Test, Description("UpdateCustomerAsync should save every value of the request")]
    public async Task UpdateCustomerAsync_SavesEveryValue()
    {
        Guid customerId = await SeedFullCustomerAsync();
        StubUpdateCustomer request = new()
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
            DefaultShippingZipCode = "75201"
        };

        await UpdateAsync(request, TestContext.CurrentContext.CancellationToken);

        Customer saved = await ReadCustomerAsync(customerId);
        saved.LastName.Should().Be("Smith");
        saved.FirstName.Should().Be("Jane");
        saved.PhoneNumber.Should().Be("512-555-0100");
        saved.DefaultBillingAddress1.Should().Be("123 Main St");
        saved.DefaultBillingAddress2.Should().Be("Apt 1");
        saved.DefaultBillingCity.Should().Be("Austin");
        saved.DefaultBillingStateCode.Should().Be("TX");
        saved.DefaultBillingZipCode.Should().Be("78701");
        saved.DefaultShippingAddress1.Should().Be("456 Elm St");
        saved.DefaultShippingAddress2.Should().Be("Suite 2");
        saved.DefaultShippingCity.Should().Be("Dallas");
        saved.DefaultShippingStateCode.Should().Be("TX");
        saved.DefaultShippingZipCode.Should().Be("75201");
    }

    [Test, Description("UpdateCustomerAsync should clear the optional values the request leaves out")]
    public async Task UpdateCustomerAsync_ClearsOptionalValuesNotSupplied()
    {
        Guid customerId = await SeedFullCustomerAsync();
        StubUpdateCustomer request = new() { Id = customerId, LastName = "Smith", PhoneNumber = "512-555-0100" };

        await UpdateAsync(request, TestContext.CurrentContext.CancellationToken);

        Customer saved = await ReadCustomerAsync(customerId);
        saved.LastName.Should().Be("Smith");
        saved.FirstName.Should().BeNull();
        saved.DefaultBillingAddress1.Should().BeNull();
        saved.DefaultBillingAddress2.Should().BeNull();
        saved.DefaultBillingCity.Should().BeNull();
        saved.DefaultBillingStateCode.Should().BeNull();
        saved.DefaultBillingZipCode.Should().BeNull();
        saved.DefaultShippingAddress1.Should().BeNull();
        saved.DefaultShippingAddress2.Should().BeNull();
        saved.DefaultShippingCity.Should().BeNull();
        saved.DefaultShippingStateCode.Should().BeNull();
        saved.DefaultShippingZipCode.Should().BeNull();
    }

    [Test, Description("UpdateCustomerAsync should set the modified date to now and leave the created date alone")]
    public async Task UpdateCustomerAsync_SetsModifiedAndKeepsCreated()
    {
        Guid customerId = await SeedFullCustomerAsync();
        StubUpdateCustomer request = new() { Id = customerId, LastName = "Smith", PhoneNumber = "512-555-0100" };

        await UpdateAsync(request, TestContext.CurrentContext.CancellationToken);

        Customer saved = await ReadCustomerAsync(customerId);
        saved.Modified.Should().NotBeNull();
        saved.Modified!.Value.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromMinutes(1));
        saved.Created.Should().Be(new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc));
    }

    [Test, Description("UpdateCustomerAsync should not change any other customer")]
    public async Task UpdateCustomerAsync_DoesNotChangeOtherCustomers()
    {
        Guid updatedId = await SeedFullCustomerAsync("Updated");
        Guid untouchedId = await SeedFullCustomerAsync("Untouched");
        StubUpdateCustomer request = new() { Id = updatedId, LastName = "Smith", PhoneNumber = "512-555-0100" };

        await UpdateAsync(request, TestContext.CurrentContext.CancellationToken);

        Customer untouched = await ReadCustomerAsync(untouchedId);
        untouched.LastName.Should().Be("Untouched");
        untouched.FirstName.Should().Be("Olivia");
        untouched.DefaultShippingCity.Should().Be("Shipville");
        untouched.Modified.Should().BeNull();
    }

    [Test, Description("UpdateCustomerAsync should throw when the token is already cancelled")]
    public async Task UpdateCustomerAsync_ThrowsWhenCancelled()
    {
        Guid customerId = await SeedFullCustomerAsync();
        StubUpdateCustomer request = new() { Id = customerId, LastName = "Smith", PhoneNumber = "512-555-0100" };
        using CancellationTokenSource cts = new();
        await cts.CancelAsync();

        Func<Task> act = () => UpdateAsync(request, cts.Token);

        await act.Should().ThrowAsync<OperationCanceledException>();
        (await ReadCustomerAsync(customerId)).LastName.Should().Be("Original", "a cancelled update must not be saved");
    }

    private sealed class StubUpdateCustomer : IUpdateCustomer
    {
        public Guid Id { get; set; }
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
}
