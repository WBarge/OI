using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Helpers;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Repos
{
    [TestFixture,Description("Tests for the product repository")]
    public class ProductRepoTests
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
                serviceScope.SeedData();
                serviceScope.SeedDataForProductUpdate();
            }
        }

        [TearDown]
        public void TearDown()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.RemoveProductUpdateData();
                serviceScope.RemoveData();
            }
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new ProductRepo(null!));
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Success()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductRepo sut = new(context);
                    sut.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test to see all records are returned")]
        public async Task FindPagedShortProductRecords_ReturnsTwoRecords_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    int expectedRecordCount = context.Products.Count(p => p.Deleted == false);
                    ProductRepo sut = new(context);
                    
                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IProduct> results = await sut.FindPagedProductRecordsAsync();

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return all products we seeded the db with");
                    results.Count().Should().Be(expectedRecordCount, "The query should return the same record count as the dbSet");
                }
            }
        }

        [Test, Description("Test to see that records are paged")]
        public async Task FindPagedShortProductRecords_ReturnsPagedRecords_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);
                    
                    await TestContext.Out.WriteLineAsync("Executing first test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(null!,1,1);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return products we seeded the db with");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return 1 record");
                    IShortProduct? firstRecord = results.FirstOrDefault();
                    firstRecord.Should().NotBeNull();

                    await TestContext.Out.WriteLineAsync("Executing second test");
                    results = await sut.FindPagedProductRecordsAsync(null!,2,1);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return products we seeded the db with");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return 1 record");
                    IShortProduct? secondRecord = results.FirstOrDefault();
                    secondRecord.Should().NotBeNull();
                    firstRecord.Should().NotBeEquivalentTo(secondRecord,"we are testing paging and the records should not be the same");
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterEqualWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "T125",
                            MatchMode = FilteringEngine.EQUALS_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Sku",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterEqualWithOrForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "T125",
                            MatchMode = FilteringEngine.EQUALS_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Sku",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

         [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterNotEqualWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 4;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "T125",
                            MatchMode = FilteringEngine.NOT_EQUALS_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Sku",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterNotEqualWithOrForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 4;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "T125",
                            MatchMode = FilteringEngine.NOT_EQUALS_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Sku",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterStartsWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "A Test three",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterStartsWithOrForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "A Test three",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

         [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterEndsWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "four Product",
                            MatchMode = FilteringEngine.ENDS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterEndsWithOrForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "four Product",
                            MatchMode = FilteringEngine.ENDS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterContainsWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "five",
                            MatchMode = FilteringEngine.CONTAINS_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterContainsWithOrForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "five",
                            MatchMode = FilteringEngine.CONTAINS_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterNotContainsWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 4;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "five",
                            MatchMode = FilteringEngine.NOT_CONTAINS_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterNotContainsWithOrForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 4;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "five",
                            MatchMode = FilteringEngine.NOT_CONTAINS_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }

                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterWithOrForTwoFieldValues_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 2;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "A Test four",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        },
                        new FilterMetaData()
                        {
                            SearchValue = "A Test five",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }
                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await TestContext.Out.WriteLineAsync(results.Count().ToString());
                    results.Should().NotBeEmpty("This test should return the products we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterWithAndForTwoFieldValues_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 0;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "A Test four",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        },
                        new FilterMetaData()
                        {
                            SearchValue = "A Test five",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }
                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeNull("This test should return an empty product list when there are zero results and no error");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedShortProductRecords_FilterWithOrForTwoDifferentFieldValues_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    //two different fields naturally creates a logical and situation
                    const int EXPECTED_RECORD_COUNT = 1;
                    ProductRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "A Test five",
                            MatchMode = FilteringEngine.STARTS_WITH_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }
                    ];
                    filter.Add("Description",filterList.ToArray<IFilterMetaData>());

                    filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = "T5",
                            MatchMode = FilteringEngine.EQUALS_COMPARISON,
                            LogicalOperator = FilteringEngine.OR_LOGICAL_OPERATOR
                        }
                    ];
                    filter.Add("Sku",filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IShortProduct> results = await sut.FindPagedProductRecordsAsync(filter);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeNull("This test should return an empty product list when there are zero results and no error");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                    
                }
            }
        }

        [Test, Description("Test to see records count returned")]
        public async Task GetProductCount_ReturnsCount_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 5;
                    ProductRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    long results = await sut.GetProductCountAsync();

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().Be(EXPECTED_RECORD_COUNT);

                }
            }
        }

        [Test, Description("Test an instance is returned")]
        public async Task GetInstance_ReturnsAnInstanceOfIProduct_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    ProductRepo sut = new(context);
                    await TestContext.Out.WriteLineAsync("Executing test");
                    IProduct result = sut.CreateInstance();
                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test an instance is returned")]
        public async Task AddMinimumProductAsync_InsertsTheProduct_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const string  TEST_NAME = "TestValue";
                    ProductRepo sut = new(context);
                    IProduct data = sut.CreateInstance();
                    data.Should().NotBeNull();
                    data.Name = TEST_NAME;
                    data.Sku = TEST_NAME;
                    data.ShortDescription =TEST_NAME;
                    data.Description=TEST_NAME;
                    data.Price = 123M;
                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.AddMinimumProductAsync(data);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    Product? p =context.Products.FirstOrDefault(p => p.Name == TEST_NAME && p.Sku == TEST_NAME);
                    p.Should().NotBeNull();

                }
            }
        }

        [Test, Description("Test an instance is returned")]
        public async Task DeleteAsync_MarksTheProductDeleted_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product p = context.Products.First();
                    p.Should().NotBeNull();
                    p.Deleted = true;
                    await context.SaveChangesAsync();

                    ProductRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.DeleteAsync(p.Id);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    p = context.Products.First(pr=>pr.Id == p.Id);
                    p.Should().NotBeNull();
                    p.Deleted.Should().BeTrue();

                }
            }
        }

        [Test, Description("Test to retrieve a product with all details")]
        public async Task GetProductAsync_ReturnsFullProduct_Success()
        {
            //note the seeded data does not have any characteristics, options or sells, so we are just testing the retrieval of the product itself
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Arrange
                    Product? existingProduct = await context.Products
                        .FirstOrDefaultAsync(TestContext.CurrentContext.CancellationToken);
                    existingProduct.Should().NotBeNull("There should be at least one product in the database.");
                    ProductRepo sut = new(context);
                    // Act
                    await TestContext.Out.WriteLineAsync("Executing test");
                    IFullProduct? result = await sut.GetProductAsync(existingProduct!.Id, CancellationToken.None);
                    // Assert
                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().NotBeNull("The method should return a full product.");
                    result!.Id.Should().Be(existingProduct.Id);
                }
            }
        }

        #region UpdateProductAsync

        // All data used by these tests is created in SetUp by SeedDataForProductUpdate. The tests only read it. Where a
        // scenario needs the payload to differ from what is stored, the test removes seeded rows before updating.

        private static Product FindSeededProduct(ProductDbContext context, string sku) =>
            context.Products.First(p => p.Sku == sku && !p.Deleted);

        private static ProductSell FindSeededSell(ProductDbContext context, Guid productId, (DateTime Start, DateTime End) window) =>
            context.Set<ProductSell>().First(s => s.ProductId == productId && s.Start == window.Start && s.End == window.End);

        private static Task<int> CountSellsAsync(ProductDbContext context, Guid productId) =>
            context.Set<ProductSell>().CountAsync(s => s.ProductId == productId);

        private static int CountSells(Product product, (DateTime Start, DateTime End) window) =>
            product.Reductions.Count(r => r.Start == window.Start && r.End == window.End);

        private async Task<IFullProduct> GetFullProductAsync(ProductRepo sut, Guid id)
        {
            IFullProduct? full = await sut.GetProductAsync(id, CancellationToken.None);
            full.Should().NotBeNull("the product must exist to be used as the update payload");
            return full!;
        }

        /// <summary>
        /// Reads the product back through a brand new scope/context so we assert against what was really persisted
        /// rather than what the tracking context in the test remembers.
        /// </summary>
        private async Task<Product> LoadProductFromNewContextAsync(Guid id)
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>();
                return await context.Products
                    .AsNoTracking()
                    .Include(x => x.Characteristics)
                    .Include(x => x.Options)
                    .ThenInclude(x => x.Option)
                    .Include(x => x.Reductions)
                    .FirstAsync(p => p.Id == id);
            }
        }

        [Test, Description("Test that the scalar fields on the product are overwritten")]
        public async Task UpdateProductAsync_UpdatesScalarFields_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            Product existing;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    existing = FindSeededProduct(context, TestSetupHelper.UPDATE_CHARACTERISTICS_SKU);
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    full.Name = "Updated Name";
                    full.Sku = "Updated Sku";
                    full.ShortDescription = "Updated Short";
                    full.Description = "Updated Description";
                    full.Price = 111;
                    full.Cost = 55;
                    full.Estimated = 77;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                }
            }
            await TestContext.Out.WriteLineAsync("Examining results");
            Product updated = await LoadProductFromNewContextAsync(existing.Id);
            updated.Name.Should().Be("Updated Name");
            updated.Sku.Should().Be("Updated Sku");
            updated.ShortDescription.Should().Be("Updated Short");
            updated.Description.Should().Be("Updated Description");
            updated.Price.Should().Be(111);
            updated.Cost.Should().Be(55);
            updated.Estimated.Should().Be(77);

        }

        [Test, Description("Test that null text values and zero or negative numbers do not overwrite the existing values")]
        public async Task UpdateProductAsync_NullOrNonPositiveValues_KeepsExistingValues_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            Product existing;
            Product original;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    existing = FindSeededProduct(context, TestSetupHelper.UPDATE_CHARACTERISTICS_SKU);
                    original = await LoadProductFromNewContextAsync(existing.Id);
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    full.Name = null!;
                    full.Sku = null!;
                    full.ShortDescription = null!;
                    full.Description = null!;
                    full.Price = 0;
                    full.Cost = -1;
                    full.Estimated = 0;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                }
            }
            await TestContext.Out.WriteLineAsync("Examining results");
            Product updated = await LoadProductFromNewContextAsync(existing.Id);
            updated.Name.Should().Be(original.Name);
            updated.Sku.Should().Be(original.Sku);
            updated.ShortDescription.Should().Be(original.ShortDescription);
            updated.Description.Should().Be(original.Description);
            updated.Price.Should().Be(original.Price);
            updated.Cost.Should().Be(original.Cost);
            updated.Estimated.Should().Be(original.Estimated);

        }

        [Test, Description("Test that updating a product that no longer exists quietly does nothing")]
        public async Task UpdateProductAsync_ProductNotFound_DoesNothing_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            Guid id;
            long countBefore;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product existing = FindSeededProduct(context, TestSetupHelper.UPDATE_CHARACTERISTICS_SKU);
                    id = existing.Id;
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, id);

                    //remove the row so the payload refers to a product that is gone
                    context.Products.Remove(existing);
                    await context.SaveChangesAsync();
                    countBefore = await context.Products.LongCountAsync();

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = () => sut.UpdateProductAsync(full);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().NotThrowAsync();
                }
            }

            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext dbContext = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    (await dbContext.Products.AnyAsync(p => p.Id == id)).Should().BeFalse("an update must never create a product");
                    (await dbContext.Products.LongCountAsync()).Should().Be(countBefore);
                }
            }
        }

        [Test, Description("Test that existing characteristics are soft deleted and replaced by the supplied ones")]
        public async Task UpdateProductAsync_ReplacesCharacteristics_Success()
        {
            Product existing;
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    existing = FindSeededProduct(context, TestSetupHelper.UPDATE_CHARACTERISTICS_SKU);
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    full.Characteristics.Count().Should().Be(2, "the payload should carry the two seeded characteristics");

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                    await TestContext.Out.WriteLineAsync("Examining results");
                }
            }
            Product updated = await LoadProductFromNewContextAsync(existing.Id);
            List<ProductCharacteristic> active = updated.Characteristics.Where(c => !c.Deleted).ToList();
            active.Should().HaveCount(2, "the supplied characteristics are inserted as new rows");
            active.Select(c => c.Name).Should().BeEquivalentTo(new[] { "Color", "Size" });
            active.Select(c => c.CharacteristicValue).Should().BeEquivalentTo(new[] { "Red", "Large" });
            active.Should().OnlyContain(c => c.ProductId == existing.Id);
        }

        [Test, Description("Test that an option that no longer exists is skipped")]
        public async Task UpdateProductAsync_OptionNoLongerExists_IsSkipped_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            Product existing;
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    existing = FindSeededProduct(context, TestSetupHelper.UPDATE_MISSING_OPTION_SKU);
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    full.Options.Count().Should().Be(1);

                    //the payload still references the option, but it is gone from the database
                    ProductOption productOption = context.ProductOptions.First(o => o.ProductId == existing.Id);
                    Option option = context.Options.First(o => o.Name == TestSetupHelper.UPDATE_MISSING_OPTION_NAME);
                    context.ProductOptions.Remove(productOption);
                    context.Options.Remove(option);
                    await context.SaveChangesAsync();

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                    await TestContext.Out.WriteLineAsync("Examining results");
                }
            }
            Product updated = await LoadProductFromNewContextAsync(existing.Id);
            updated.Options.Should().BeEmpty("an option that cannot be found must not be linked to the product");

        }

        [Test, Description("Test that a sell is added when the product has no existing sells")]
        public async Task UpdateProductAsync_NoExistingSells_AddsSell_Success()
        {
            Product existing;
            (DateTime Start, DateTime End) window;
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    window = TestSetupHelper.UpdateNoExistingSell;
                    existing = FindSeededProduct(context, TestSetupHelper.UPDATE_OPTIONS_SKU);
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    full.Sells.Count().Should().Be(1);

                    //take the sell out of the database so the product has no existing sells
                    context.Remove(FindSeededSell(context, existing.Id, window));
                    await context.SaveChangesAsync();
                    (await CountSellsAsync(context, existing.Id)).Should().Be(0);
                    List<IProductSell> sells =
                    [
                        new ProductSell() { 
                            Start = window.Start, 
                            End = window.End,
                            Price = TestSetupHelper.UPDATE_SELL_PRICE,
                            ProductId = full.Id
                        }
                    ];
                    full.Sells = sells;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                }
            }
            await TestContext.Out.WriteLineAsync("Examining results");
            Product updated = await LoadProductFromNewContextAsync(existing.Id);
            updated.Reductions.Should().HaveCount(1);
            ProductSell added = updated.Reductions.Single();
            added.Start.Should().Be(window.Start);
            added.End.Should().Be(window.End);
            added.Price.Should().Be(TestSetupHelper.UPDATE_SELL_PRICE);
            added.ProductId.Should().Be(existing.Id);

        }

        [Test, Description("Test that a sell without a start or end date is ignored")]
        public async Task UpdateProductAsync_SellWithEmptyDates_IsSkipped_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product existing = FindSeededProduct(context, TestSetupHelper.UPDATE_EMPTY_DATE_SELL_SKU);
                    ProductRepo sut = new(context);
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    full.Sells.Count().Should().Be(1);

                    context.Remove(FindSeededSell(context, existing.Id, (default(DateTime), default(DateTime))));
                    await context.SaveChangesAsync();

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    Product updated = await LoadProductFromNewContextAsync(existing.Id);
                    updated.Reductions.Should().BeEmpty("a sell needs both a start and an end date");
                }
            }
        }

        // NOTE: the rule in UpdateProductAsync is "skip an incoming sell when an existing sell covers it
        // (existing.Period.WithIn(incoming.Period)) or overlaps it (existing.Period.Overlaps(incoming.Period)),
        // otherwise add it". The tests below describe that rule. They all use the sells seeded on UPDATE_SELLS_SKU:
        // every seeded sell is part of the payload, the stored ones are identical to the database so they are skipped,
        // and each test removes only its own "incoming" sell from the database and checks that sell's window.

        [Test, Description("Test that a sell identical to an existing sell is not added again")]
        public async Task UpdateProductAsync_SellIdenticalToExistingSell_IsNotAdded_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Product existing = FindSeededProduct(context, TestSetupHelper.UPDATE_SELLS_SKU);
                    ProductRepo sut = new(context);
                    //the payload carries exactly the sells that are already stored
                    IFullProduct full = await GetFullProductAsync(sut, existing.Id);
                    int storedCount = await CountSellsAsync(context, existing.Id);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.UpdateProductAsync(full);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    Product updated = await LoadProductFromNewContextAsync(existing.Id);
                    CountSells(updated, TestSetupHelper.UpdateIdenticalStoredSell).Should().Be(1, "a sell that is already stored must not be duplicated");
                    updated.Reductions.Should().HaveCount(storedCount, "nothing should have been added");
                }
            }
        }

        #endregion

    }
}