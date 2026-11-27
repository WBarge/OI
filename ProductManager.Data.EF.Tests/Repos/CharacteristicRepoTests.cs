using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Repos
{
    [TestFixture, Description("Tests for the characteristic repository")]
    public class CharacteristicRepoTests
    {
        private IServiceProvider _serviceProvider;

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            _serviceProvider = TestSetupHelper.GetServiceProvider();
        }

        [SetUp]
        public void Setup()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.SeedDataForCharacteristics();
            }
        }

        [TearDown]
        public void TearDown()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.RemoveCharacteristicData();
            }
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Fail()
        {
            Assert.Throws<ArgumentNullException>(() => new CharacteristicRepo(null!));
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Success()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    CharacteristicRepo sut = new(context);
                    sut.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test to retrieve all characteristics")]
        public async Task GetAll_ReturnsAllCharacteristics_Success()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    CharacteristicRepo sut = new(context);
                    IEnumerable<IFullCharacteristic> results = await sut.GetAll(CancellationToken.None);
                    results.Should().NotBeEmpty("This test should return all characteristics seeded in the database.");
                    results.Count().Should().Be(context.Characteristics.Count(),
                        "The query should return the same record count as the dbSet.");
                }
            }
        }

        [Test, Description("Test to add a new characteristic")]
        public async Task Add_AddsNewCharacteristic_Success()
        {
            // Create the initial service scope and context
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Create the repository
                    CharacteristicRepo sut = new(context);
                    // Create a new characteristic
                    ICharacteristic newCharacteristic = sut.CreateInstance();
                    newCharacteristic.Id = Guid.NewGuid();
                    newCharacteristic.Name = "New Characteristic";
                    // Add the new characteristic
                    ICharacteristic result = await sut.Add(newCharacteristic, CancellationToken.None);
                    // Assert the result is not null
                    result.Should().NotBeNull();
                }
            }

            // Create a new service scope and context to validate the changes
            using (IServiceScope validationScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext =
                       validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Validate that the new characteristic exists in the database
                    validationContext.Characteristics
                        .Any(c => c.Name == "New Characteristic")
                        .Should()
                        .BeTrue("The new characteristic should be added to the database.");
                }
            }
        }

        [Test, Description("Test to add a new characteristic value")]
        public async Task AddValue_AddsNewCharacteristicValue_Success()
        {
            // Create the initial service scope and context
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Create the repository
                    CharacteristicRepo sut = new(context);
                    // Get an existing characteristic
                    Characteristic existingCharacteristic = context.Characteristics.First();
                    ICharacteristicValue newValue = new CharacteristicValue
                    {
                        CharacteristicId = existingCharacteristic.Id, Value = "New Value"
                    };
                    // Add the new characteristic value
                    ICharacteristicValue result = await sut.AddValue(newValue, CancellationToken.None);
                    // Assert the result is true
                    result.Id.Should()
                        .NotBeEmpty(
                            "the record was just added to the system and the insert should be returning the id of the record plus the record itself");
                }
            }

            // Create a new service scope and context to validate the changes
            using (IServiceScope validationScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext =
                       validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Validate that the new characteristic value exists in the database
                    validationContext.CharacteristicValues
                        .Any(v => v.Value == "New Value")
                        .Should()
                        .BeTrue("The new characteristic value should be added to the database.");
                }
            }
        }

        [Test, Description("Test to delete a characteristic")]
        public async Task Delete_RemovesCharacteristic_Success()
        {
            Guid existingID = Guid.Empty;
            // Create the initial service scope and context
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Get an existing characteristic
                    Characteristic existingCharacteristic = context.Characteristics.First();
                    existingID = existingCharacteristic.Id;
                    // Create the repository
                    CharacteristicRepo sut = new(context);
                    // Delete the characteristic
                    bool result = await sut.Delete(existingCharacteristic.Id, CancellationToken.None);
                    // Assert the result is true
                    result.Should().BeTrue();
                }
            }

            // Create a new service scope and context to validate the changes
            using (IServiceScope validationScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext =
                       validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Validate that the characteristic no longer exists in the database
                    validationContext.Characteristics.FirstOrDefault(c => c.Id == existingID)
                        .Should()
                        .BeNull("The characteristic should be removed from the database.");
                }
            }
        }

        [Test, Description("Test to retrieve a full characteristic by ID")]
        public async Task GetFullCharacteristicAsync_ReturnsFullCharacteristic_Success()
        {
            Guid existingID;
            string expectedName;
            int expectedValueCount;

            // Step 1: Get an ID from one context
            using (IServiceScope scope1 = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context1 = scope1.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Characteristic characteristic = context1.Characteristics.Include(c => c.Values).First();
                    existingID = characteristic.Id;
                    expectedName = characteristic.Name;
                    expectedValueCount = characteristic.Values!.Count;
                }
            }

            // Step 2: Use a fresh context for the repository call to ensure values are loaded correctly
            using (IServiceScope scope2 = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context2 = scope2.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    CharacteristicRepo sut = new(context2);
                    
                    // Retrieve the full characteristic
                    IFullCharacteristic result = await sut.GetFullCharacteristicAsync(existingID, CancellationToken.None);
                    
                    // Assert
                    result.Should().NotBeNull();
                    result.Id.Should().Be(existingID);
                    result.Name.Should().Be(expectedName);
                    result.Values.Should().NotBeNull();
                    result.Values.Count().Should().Be(expectedValueCount, "Values should be loaded from the database even in a fresh context");
                }
            }
        }

        [Test, Description("Test to retrieve a full characteristic by ID that does not exist")]
        public void GetFullCharacteristicAsync_ThrowsKeyNotFoundException_WhenCharacteristicNotFound()
        {
            Guid nonExistentID = Guid.NewGuid();
            // Create the initial service scope and context
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Create the repository
                    CharacteristicRepo sut = new(context);
                    // Act & Assert
                    Func<Task> act = async () =>
                        await sut.GetFullCharacteristicAsync(nonExistentID, CancellationToken.None);
                    act.Should().ThrowAsync<KeyNotFoundException>()
                        .WithMessage($"Characteristic with ID {nonExistentID} not found.");
                }
            }
        }

    }
}
