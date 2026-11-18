using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Repos
{
    [TestFixture, Description("Tests for the product option repository")]
    public class ProductOptionRepoTests
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
                serviceScope.SeedDataForProductOptions();
            }
        }

        [TearDown]
        public void TearDown()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.RemoveProductOptionData();
            }
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new ProductOptionRepo(null!));
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Success()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOptionRepo sut = new(context);
                    sut.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test an instance is returned")]
        public async Task CreateInstance_ReturnsAnInstanceOfIProductOption_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IProductOption result = sut.CreateInstance();

                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test that a product option is inserted using the option's price when not overridden")]
        public async Task AddProductOptionAsync_InsertsUsingOptionPrice_Success()
        {
            Guid insertedId;
            Guid productId;
            Guid optionId;
            decimal expectedPrice;
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => p.Deleted == false);
                    Option option = context.Options.First(o => o.Deleted == false);
                    productId = product.Id;
                    optionId = option.Id;
                    expectedPrice = option.Price;

                    ProductOptionRepo sut = new(context);
                    IProductOption data = sut.CreateInstance();
                    data.ProductId = productId;
                    data.OptionId = optionId;
                    data.Price = 0M; // not overridden, so the option's price should be used

                    await TestContext.Out.WriteLineAsync("Executing test");
                    insertedId = await sut.AddProductOptionAsync(data, TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    insertedId.Should().NotBe(Guid.Empty);
                }
            }

            using (IServiceScope testServiceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext testContext = testServiceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOption? po = testContext.ProductOptions.FirstOrDefault(po => po.Id == insertedId);
                    po.Should().NotBeNull();
                    po!.ProductId.Should().Be(productId);
                    po.OptionId.Should().Be(optionId);
                    po.Price.Should().Be(expectedPrice, "the option's price should be used when no override is supplied");
                }
            }
        }

        [Test, Description("Test that a product option is inserted using an overridden price")]
        public async Task AddProductOptionAsync_InsertsUsingOverriddenPrice_Success()
        {
            const decimal OVERRIDE_PRICE = 999M;
            Guid insertedId;
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => p.Deleted == false);
                    Option option = context.Options.First(o => o.Deleted == false);

                    ProductOptionRepo sut = new(context);
                    IProductOption data = sut.CreateInstance();
                    data.ProductId = product.Id;
                    data.OptionId = option.Id;
                    data.Price = OVERRIDE_PRICE;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    insertedId = await sut.AddProductOptionAsync(data, TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    insertedId.Should().NotBe(Guid.Empty);
                }
            }

            using (IServiceScope testServiceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext testContext = testServiceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOption? po = testContext.ProductOptions.FirstOrDefault(po => po.Id == insertedId);
                    po.Should().NotBeNull();
                    po!.Price.Should().Be(OVERRIDE_PRICE, "an explicitly supplied price should override the option's price");
                }
            }
        }

        [Test, Description("Test that a null product option throws")]
        public async Task AddProductOptionAsync_NullProductOption_Throws()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.AddProductOptionAsync(null!);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that an invalid product id throws")]
        public async Task AddProductOptionAsync_InvalidProductId_Throws()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Option option = context.Options.First(o => o.Deleted == false);

                    ProductOptionRepo sut = new(context);
                    IProductOption data = sut.CreateInstance();
                    data.ProductId = Guid.NewGuid();
                    data.OptionId = option.Id;
                    data.Price = 10M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.AddProductOptionAsync(data);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that an invalid option id throws")]
        public async Task AddProductOptionAsync_InvalidOptionId_Throws()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product product = context.Products.First(p => p.Deleted == false);

                    ProductOptionRepo sut = new(context);
                    IProductOption data = sut.CreateInstance();
                    data.ProductId = product.Id;
                    data.OptionId = Guid.NewGuid();
                    data.Price = 10M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.AddProductOptionAsync(data);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that a product option is marked deleted")]
        public async Task DeleteAsync_MarksTheProductOptionDeleted_Success()
        {
            Guid existingProductOptionId;
            await TestContext.Out.WriteLineAsync("Setting up and test");

            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOption po = context.ProductOptions.First(po => po.Deleted == false);
                    po.Should().NotBeNull();
                    existingProductOptionId = po.Id;

                    ProductOptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.DeleteAsync(po.Id);
                }
            }
            using (IServiceScope testServiceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext testContext = testServiceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    await TestContext.Out.WriteLineAsync("Examining results");
                    ProductOption? updated = testContext.ProductOptions.FirstOrDefault(po => po.Id == existingProductOptionId);
                    updated.Should().NotBeNull();
                    updated!.Deleted.Should().BeTrue();
                }
            }
        }

        [Test, Description("Test that deleting a non-existent product option does not throw")]
        public async Task DeleteAsync_NonExistentId_DoesNotThrow()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductOptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.DeleteAsync(Guid.NewGuid());

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().NotThrowAsync();
                }
            }
        }
    }
}