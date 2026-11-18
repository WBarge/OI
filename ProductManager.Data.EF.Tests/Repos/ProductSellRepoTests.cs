using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Models;
namespace ProductManager.Data.EF.Tests.Repos
{
    [TestFixture, Description("Tests for the product sell repository")]
    public class ProductSellRepoTests
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
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.SeedDataForProductSells();
            }
        }

        [TearDown]
        public void TearDown()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.RemoveProductSellData();
            }
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Fail()
        {
            Assert.Throws<ArgumentNullException>(() => new ProductSellRepo(null!));
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Success()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductSellRepo sut = new(context);
                    sut.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test to add a new product sell")]
        public async Task AddProductSellAsync_AddsNewSell_Success()
        {
            Guid productId;
            Guid newId;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => !p.Deleted);
                    productId = product.Id;
                    ProductSellRepo sut = new(context);
                    IProductSell newSell = sut.CreateInstance();
                    newSell.ProductId = productId;
                    newSell.Start = DateTime.UtcNow;
                    newSell.End = DateTime.UtcNow.AddDays(7);
                    newSell.Price = 100m;
                    newId = await sut.AddProductSellAsync(newSell, CancellationToken.None);
                    newId.Should().NotBe(Guid.Empty);
                }
            }
            using (IServiceScope validationScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext = validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductSell? saved = validationContext.Sells.FirstOrDefault(ps => ps.Id == newId);
                    saved.Should().NotBeNull();
                    saved!.ProductId.Should().Be(productId);
                    saved.Price.Should().Be(100m);
                }
            }
        }

        [Test, Description("Test to delete a product sell")]
        public async Task DeleteAsync_MarksSellAsDeleted_Success()
        {
            Guid existingId;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductSell existing = context.Sells.First(ps => !ps.Deleted);
                    existingId = existing.Id;
                    ProductSellRepo sut = new(context);
                    await sut.DeleteAsync(existingId, CancellationToken.None);
                }
            }
            using (IServiceScope validationScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext validationContext = validationScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductSell? deleted = validationContext.Sells.FirstOrDefault(ps => ps.Id == existingId);
                    deleted.Should().NotBeNull();
                    deleted!.Deleted.Should().BeTrue();
                }
            }
        }

        [Test, Description("CreateInstance should return a new instance of IProductSell")]
        public void CreateInstance_ReturnsNewInstance_Success()
        {
            // Arrange
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductSellRepo sut = new(context);
                    // Act
                    IProductSell instance = sut.CreateInstance();
                    // Assert
                    instance.Should().NotBeNull();
                    instance.Should().BeOfType<ProductSell>();
                }
            }
        }

        [Test, Description("ListProductSellsAsync should return all product sells for a given product ID")]
        public async Task ListProductSellsAsync_ReturnsProductSells_Success()
        {
            // Arrange
            Guid productId;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => !p.Deleted);
                    productId = product.Id;
                    ProductSellRepo sut = new(context);
                    // Act
                    IEnumerable<IProductSell> sells = await sut.ListProductSellsAsync(productId, CancellationToken.None);
                    // Assert
                    sells.Should().NotBeNull();
                    sells.Should().NotBeEmpty();
                    sells.All(s => s.ProductId == productId).Should().BeTrue();
                }
            }
        }

    }
}
