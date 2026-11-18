using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Repos
{
    [TestFixture, Description("Tests for the product characteristic repository")]
    public class ProductCharacteristicRepoTests
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
                serviceScope.SeedDataForProductCharacteristics();
            }
        }

        [TearDown]
        public void TearDown()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.RemoveProductCharacteristicData();
            }
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Fail()
        {
            Assert.Throws<ArgumentNullException>(() => new ProductCharacteristicRepo(null!));
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Success()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(context);
                    sut.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test that CreateInstance returns a new, non-null instance")]
        public void CreateInstance_ReturnsNewInstance_Success()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(context);
                    IProductCharacteristic result = sut.CreateInstance();
                    result.Should().NotBeNull();
                    result.Should().BeOfType<ProductCharacteristic>();
                }
            }
        }

        [Test, Description("Test to retrieve non-deleted characteristics for a specific product")]
        public async Task ListProductCharacteristicsAsync_ReturnsOnlyNonDeletedCharacteristicsForProduct_Success()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => p.Sku == "PCT1");
                    int expectedCount = context.ProductCharacteristics
                        .Count(pc => pc.ProductId == product.Id && !pc.Deleted);

                    ProductCharacteristicRepo sut = new(context);
                    IEnumerable<IProductCharacteristic> results =
                        await sut.ListProductCharacteristicsAsync(product.Id, CancellationToken.None);

                    results.Should().NotBeEmpty("this product has seeded, non-deleted characteristics");
                    results.Count().Should().Be(expectedCount,
                        "the query should exclude soft-deleted rows and rows belonging to other products");
                    results.Should().OnlyContain(pc => pc.ProductId == product.Id);
                }
            }
        }

        [Test, Description("Test that ListProductCharacteristicsAsync excludes characteristics belonging to a different product")]
        public async Task ListProductCharacteristicsAsync_DoesNotReturnOtherProductsCharacteristics_Success()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product1 = context.Products.First(p => p.Sku == "PCT1");
                    Product product2 = context.Products.First(p => p.Sku == "PCT2");

                    ProductCharacteristicRepo sut = new(context);
                    IEnumerable<IProductCharacteristic> results =
                        await sut.ListProductCharacteristicsAsync(product1.Id, CancellationToken.None);

                    results.Should().NotContain(pc => pc.ProductId == product2.Id);
                }
            }
        }

        [Test, Description("Test that ListProductCharacteristicsAsync returns an empty collection for a product with no characteristics")]
        public async Task ListProductCharacteristicsAsync_ReturnsEmpty_WhenProductHasNoCharacteristics()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(context);
                    IEnumerable<IProductCharacteristic> results =
                        await sut.ListProductCharacteristicsAsync(Guid.NewGuid(), CancellationToken.None);

                    results.Should().NotBeNull();
                    results.Should().BeEmpty("no characteristics were seeded for a random product ID");
                }
            }
        }

        [Test, Description("Test to add a new product characteristic")]
        public async Task AddProductCharacteristicAsync_AddsNewCharacteristic_Success()
        {
            Guid productId;
            Guid newId;

            // Create the initial service scope and context
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => p.Sku == "PCT1");
                    productId = product.Id;

                    // Create the repository
                    ProductCharacteristicRepo sut = new(context);
                    // Create a new product characteristic
                    IProductCharacteristic newCharacteristic = sut.CreateInstance();
                    newCharacteristic.ProductId = productId;
                    newCharacteristic.Name = "Weight";
                    newCharacteristic.CharacteristicValue = "2kg";

                    // Add the new product characteristic
                    newId = await sut.AddProductCharacteristicAsync(newCharacteristic, CancellationToken.None);
                    // Assert the result is a real ID
                    newId.Should().NotBe(Guid.Empty);
                }
            }

            // Create a new service scope and context to validate the changes
            using (IServiceScope validationScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext =
                       validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Validate that the new product characteristic exists in the database
                    ProductCharacteristic? saved = validationContext.ProductCharacteristics
                        .FirstOrDefault(pc => pc.Id == newId);

                    saved.Should().NotBeNull("the new characteristic should have been persisted");
                    saved!.ProductId.Should().Be(productId);
                    saved.Name.Should().Be("Weight");
                    saved.CharacteristicValue.Should().Be("2kg");
                    saved.Deleted.Should().BeFalse();
                }
            }
        }

        [Test, Description("Test that adding a null product characteristic throws")]
        public void AddProductCharacteristicAsync_ThrowsArgumentException_WhenCharacteristicIsNull()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(context);

                    Func<Task> act = async () =>
                        await sut.AddProductCharacteristicAsync(null!, CancellationToken.None);

                    act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that adding a characteristic with an invalid product ID throws")]
        public void AddProductCharacteristicAsync_ThrowsArgumentException_WhenProductIdIsInvalid()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(context);
                    IProductCharacteristic newCharacteristic = sut.CreateInstance();
                    newCharacteristic.ProductId = Guid.NewGuid();
                    newCharacteristic.Name = "Weight";
                    newCharacteristic.CharacteristicValue = "2kg";

                    Func<Task> act = async () =>
                        await sut.AddProductCharacteristicAsync(newCharacteristic, CancellationToken.None);

                    act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test to delete (soft-delete) a product characteristic")]
        public async Task DeleteAsync_MarksCharacteristicAsDeleted_Success()
        {
            Guid existingId;

            // Create the initial service scope and context
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Get an existing, non-deleted product characteristic
                    ProductCharacteristic existing = context.ProductCharacteristics.First(pc => !pc.Deleted);
                    existingId = existing.Id;

                    // Create the repository
                    ProductCharacteristicRepo sut = new(context);
                    // Delete the product characteristic
                    await sut.DeleteAsync(existingId, CancellationToken.None);
                }
            }

            // Create a new service scope and context to validate the changes
            using (IServiceScope validationScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext =
                       validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Validate that the row still exists but is flagged as deleted
                    ProductCharacteristic? deleted = validationContext.ProductCharacteristics
                        .FirstOrDefault(pc => pc.Id == existingId);

                    deleted.Should().NotBeNull("delete is a soft-delete, so the row should remain");
                    deleted!.Deleted.Should().BeTrue("the characteristic should be marked as deleted");
                }
            }
        }

        [Test, Description("Test that a soft-deleted characteristic is excluded from ListProductCharacteristicsAsync")]
        public async Task DeleteAsync_RemovesCharacteristicFromListResults_Success()
        {
            Guid existingId;
            Guid productId;

            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristic existing = context.ProductCharacteristics.First(pc => !pc.Deleted);
                    existingId = existing.Id;
                    productId = existing.ProductId;

                    ProductCharacteristicRepo sut = new(context);
                    await sut.DeleteAsync(existingId, CancellationToken.None);
                }
            }

            using (IServiceScope validationScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext =
                       validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(validationContext);
                    IEnumerable<IProductCharacteristic> results =
                        await sut.ListProductCharacteristicsAsync(productId, CancellationToken.None);

                    results.Should().NotContain(pc => pc.Id == existingId);
                }
            }
        }

        [Test, Description("Test that deleting a non-existent ID does not throw")]
        public void DeleteAsync_DoesNotThrow_WhenIdNotFound()
        {
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductCharacteristicRepo sut = new(context);

                    Func<Task> act = async () =>
                        await sut.DeleteAsync(Guid.NewGuid(), CancellationToken.None);

                    act.Should().NotThrowAsync();
                }
            }
        }
    }
}