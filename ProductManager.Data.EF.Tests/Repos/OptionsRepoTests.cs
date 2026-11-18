using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Helpers;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Repos;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Repos
{
    [TestFixture, Description("Tests for the option repository")]
    public class OptionRepoTests
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
                serviceScope.SeedDataForOptions();
            }
        }

        [TearDown]
        public void TearDown()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.RemoveOptionData();
            }
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionRepo(null!));
        }

        [Test, Description("Test required context object")]
        public void Constructor_RequiredContext_Success()
        {
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    sut.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test to see all non-deleted records are returned")]
        public async Task FindPagedProductRecords_ReturnsAllRecords_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    int expectedRecordCount = context.Options.Count(o => o.Deleted == false);
                    OptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IOption> results = await sut.FindPagedProductRecordsAsync(cancellationToken: TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return all options we seeded the db with");
                    results.Count().Should().Be(expectedRecordCount, "The query should return the same record count as the dbSet");
                }
            }
        }

        [Test, Description("Test to see that records are paged")]
        public async Task FindPagedProductRecords_ReturnsPagedRecords_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    const int EXPECTED_RECORD_COUNT = 1;
                    OptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing first test");
                    IEnumerable<IOption> results = await sut.FindPagedProductRecordsAsync(null!, 1, 1, cancellationToken: TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return options we seeded the db with");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return 1 record");
                    IOption? firstRecord = results.FirstOrDefault();
                    firstRecord.Should().NotBeNull();

                    await TestContext.Out.WriteLineAsync("Executing second test");
                    results = await sut.FindPagedProductRecordsAsync(null!, 2, 1, cancellationToken: TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return options we seeded the db with");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return 1 record");
                    IOption? secondRecord = results.FirstOrDefault();
                    secondRecord.Should().NotBeNull();
                    firstRecord.Should().NotBeEquivalentTo(secondRecord, "we are testing paging and the records should not be the same");
                }
            }
        }

        [Test, Description("Test to see filtered records are returned")]
        public async Task FindPagedProductRecords_FilterEqualWithAndForSingleField_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Option? existingOption = context.Options.FirstOrDefault(o => o.Deleted == false);
                    existingOption.Should().NotBeNull("There should be at least one non-deleted option in the seeded data.");
                    const int EXPECTED_RECORD_COUNT = 1;
                    OptionRepo sut = new(context);

                    Dictionary<string, IFilterMetaData[]> filter = new();
                    List<FilterMetaData> filterList =
                    [
                        new FilterMetaData()
                        {
                            SearchValue = existingOption!.Name,
                            MatchMode = FilteringEngine.EQUALS_COMPARISON,
                            LogicalOperator = FilteringEngine.AND_LOGICAL_OPERATOR
                        }
                    ];
                    filter.Add("Name", filterList.ToArray<IFilterMetaData>());

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IEnumerable<IOption> results = await sut.FindPagedProductRecordsAsync(filter, cancellationToken: TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().NotBeEmpty("This test should return the options we are searching for");
                    results.Count().Should().Be(EXPECTED_RECORD_COUNT, "The query should return the same record count as the dbSet");
                }
            }
        }

        [Test, Description("Test to see records count returned")]
        public async Task GetOptionCount_ReturnsCount_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    long expectedRecordCount = context.Options.LongCount(o => o.Deleted == false);
                    OptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    long results = await sut.GetOptionCountAsync(TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    results.Should().Be(expectedRecordCount);
                }
            }
        }

        [Test, Description("Test an instance is returned")]
        public async Task CreateInstance_ReturnsAnInstanceOfIOption_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    await TestContext.Out.WriteLineAsync("Executing test");
                    IOption result = sut.CreateInstance();
                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().NotBeNull();
                }
            }
        }

        [Test, Description("Test an option is inserted")]
        public async Task AddOptionAsync_InsertsTheOption_Success()
        {
            const string TEST_NAME = "TestValue";
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    IOption data = sut.CreateInstance();
                    data.Should().NotBeNull();
                    data.Name = TEST_NAME;
                    data.Description = TEST_NAME;
                    data.Price = 123M;
                    data.Cost = 123M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Guid id = await sut.AddOptionAsync(data, TestContext.CurrentContext.CancellationToken);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    id.Should().NotBe(Guid.Empty);
                }
            }

            using (IServiceScope testServiceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext testContext = testServiceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Option? p = testContext.Options.FirstOrDefault(o => o.Name == TEST_NAME && o.Description == TEST_NAME);
                    p.Should().NotBeNull();
                    p!.Price.Should().Be(123M);
                }
            }
        }

        [Test, Description("Test that a missing name throws")]
        public async Task AddOptionAsync_MissingName_Throws()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    IOption data = sut.CreateInstance();
                    data.Name = null!;
                    data.Description = "TestDescription";
                    data.Price = 123M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.AddOptionAsync(data);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that a missing description throws")]
        public async Task AddOptionAsync_MissingDescription_Throws()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    IOption data = sut.CreateInstance();
                    data.Name = "TestName";
                    data.Description = null!;
                    data.Price = 123M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.AddOptionAsync(data);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that a non-positive price throws")]
        public async Task AddOptionAsync_InvalidPrice_Throws()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    IOption data = sut.CreateInstance();
                    data.Name = "TestName";
                    data.Description = "TestDescription";
                    data.Price = 0M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    Func<Task> act = async () => await sut.AddOptionAsync(data);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    await act.Should().ThrowAsync<ArgumentException>();
                }
            }
        }

        [Test, Description("Test that an existing option is updated")]
        public async Task UpdateOptionAsync_UpdatesTheOption_Success()
        {
            const string UPDATED_NAME = "UpdatedName";
            const string UPDATED_DESCRIPTION = "UpdatedDescription";
            const decimal UPDATED_PRICE = 999M;
            Guid existingOptionId;
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {

                    Option existingOption = context.Options.First();
                    existingOptionId = existingOption.Id;
                    OptionRepo sut = new(context);
                    IOption update = sut.CreateInstance();
                    update.Id = existingOption.Id;
                    update.Name = UPDATED_NAME;
                    update.Description = UPDATED_DESCRIPTION;
                    update.Price = UPDATED_PRICE;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    bool result = await sut.UpdateOptionAsync(update);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().BeTrue();
                }
            }
            using (IServiceScope testServiceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext testContext = testServiceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Option? updated = testContext.Options.FirstOrDefault(o => o.Id == existingOptionId);
                    updated.Should().NotBeNull();
                    updated!.Name.Should().Be(UPDATED_NAME);
                    updated.Description.Should().Be(UPDATED_DESCRIPTION);
                    updated.Price.Should().Be(UPDATED_PRICE);
                }
            }
        }

        [Test, Description("Test that updating a non-existent option returns false")]
        public async Task UpdateOptionAsync_NonExistentOption_ReturnsFalse()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);
                    IOption update = sut.CreateInstance();
                    update.Id = Guid.NewGuid();
                    update.Name = "DoesNotMatter";
                    update.Description = "DoesNotMatter";
                    update.Price = 10M;

                    await TestContext.Out.WriteLineAsync("Executing test");
                    bool result = await sut.UpdateOptionAsync(update);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().BeFalse();
                }
            }
        }

        [Test, Description("Test that an option is marked deleted")]
        public async Task DeleteAsync_MarksTheOptionDeleted_Success()
        {
            Guid existingOptionId;
            await TestContext.Out.WriteLineAsync("Setting up and test");

            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    Option p = context.Options.First(o => o.Deleted == false);
                    p.Should().NotBeNull();
                    existingOptionId = p.Id;

                    OptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    await sut.DeleteAsync(p.Id);

                }
            }
            using (IServiceScope testServiceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext testContext = testServiceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    await TestContext.Out.WriteLineAsync("Examining results");
                    Option? updated = testContext.Options.FirstOrDefault(o => o.Id == existingOptionId);
                    updated.Should().NotBeNull();
                    updated!.Deleted.Should().BeTrue();
                }
            }
        }

        [Test, Description("Test to retrieve an existing option")]
        public async Task GetOptionAsync_ReturnsOption_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    // Arrange
                    Option? existingOption = await context.Options
                        .FirstOrDefaultAsync(TestContext.CurrentContext.CancellationToken);
                    existingOption.Should().NotBeNull("There should be at least one option in the database.");
                    OptionRepo sut = new(context);

                    // Act
                    await TestContext.Out.WriteLineAsync("Executing test");
                    IOption? result = await sut.GetOptionAsync(existingOption!.Id, CancellationToken.None);

                    // Assert
                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().NotBeNull("The method should return the option.");
                    result!.Id.Should().Be(existingOption.Id);
                }
            }
        }

        [Test, Description("Test to retrieve a non-existent option")]
        public async Task GetOptionAsync_NonExistentId_ReturnsNull()
        {
            await TestContext.Out.WriteLineAsync("Setting up and test");
            using (IServiceScope serviceScope =
                   _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (ProductDbContext context = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>())
                {
                    OptionRepo sut = new(context);

                    await TestContext.Out.WriteLineAsync("Executing test");
                    IOption? result = await sut.GetOptionAsync(Guid.NewGuid(), CancellationToken.None);

                    await TestContext.Out.WriteLineAsync("Examining results");
                    result.Should().BeNull("The method should return null for an id that does not exist.");
                }
            }
        }

    }
}