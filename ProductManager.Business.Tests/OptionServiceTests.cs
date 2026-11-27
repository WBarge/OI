using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Business.Tests.DataFactories;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Business.Tests
{
    [TestFixture, Description("Tests of the OptionService")]
    public class OptionServiceTests
    {
        [Test, Description("Test required logger object")]
        public void Constructor_RequiredILogger_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionService(null!, new Mock<IOptionRepo>().Object));
        }

        [Test, Description("Test required repo object")]
        public void Constructor_RequiredIOptionRepo_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionService(new Mock<ILogger<OptionService>>().Object, null!));
        }

        [Test, Description("Test required objects")]
        public async Task Constructor_RequiredObjects_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            await TestContext.Out.WriteLineAsync("Executing test");
            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Examining results");
            sut.Should().NotBeNull();
        }

        [Test, Description("Get options should return data and pass its parameters down to the repo")]
        public async Task GetOptionsAsync_ReturnsData_Successfully()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            IEnumerable<IOption> data = OptionFactory.BuildOptionList();
            optionRepo.Setup(m => m.FindPagedProductRecordsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                    It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(data);

            OptionService sut = new(logger.Object, optionRepo.Object);

            Dictionary<string, IFilterMetaData[]> filterParameter = new();
            const int PAGE = 1;
            const int PAGE_SIZE = 10;

            await TestContext.Out.WriteLineAsync("Executing test");
            IEnumerable<IOption> results = await sut.GetOptionsAsync(filterParameter, PAGE, PAGE_SIZE, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            results.Should().NotBeNull();
            results.Should().NotBeEmpty();
            results.Should().HaveCount(2);
            optionRepo.Verify(m => m.FindPagedProductRecordsAsync(filterParameter, PAGE,
                PAGE_SIZE, It.IsAny<CancellationToken>()));
        }

        [Test, Description("The get option count should call the repo to get the number of options")]
        public async Task GetOptionCountAsync_CallsRepoOptionCount_Successfully()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            optionRepo.Setup(m => m.GetOptionCountAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(25);

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            long results = await sut.GetOptionCountAsync(TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            results.Should().BeGreaterThanOrEqualTo(1, "The mock is set up to return 25");
            optionRepo.Verify();
        }

        [Test, Description("Get option by id should return the option from the repo")]
        public async Task GetOptionAsync_ReturnsData_Successfully()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            IOption option = OptionFactory.BuildOption();
            Guid id = option.Id;

            optionRepo.Setup(m => m.GetOptionAsync(id, It.IsAny<CancellationToken>()))
                .ReturnsAsync(option);

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            IOption? result = await sut.GetOptionAsync(id, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().NotBeNull();
            result.Should().BeSameAs(option);
            optionRepo.Verify(m => m.GetOptionAsync(id, TestContext.CurrentContext.CancellationToken));
        }

        [Test, Description("Get option by id should return null when the repo has no match")]
        public async Task GetOptionAsync_ReturnsNull_WhenNotFound()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            Guid id = Guid.NewGuid();
            optionRepo.Setup(m => m.GetOptionAsync(id, It.IsAny<CancellationToken>()))
                .ReturnsAsync((IOption?)null);

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            IOption? result = await sut.GetOptionAsync(id, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeNull();
        }

        [Test, Description("Add option should call the repo to add the option and return the new id")]
        public async Task AddOptionAsync_CallsRepoAddOption_Successfully()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            IOption option = OptionFactory.BuildOption();
            Guid newId = Guid.NewGuid();

            optionRepo.Setup(m => m.AddOptionAsync(option, It.IsAny<CancellationToken>()))
                .ReturnsAsync(newId);

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            Guid result = await sut.AddOptionAsync(option, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().Be(newId);
            optionRepo.Verify(m => m.AddOptionAsync(option, TestContext.CurrentContext.CancellationToken));
        }

        [Test, Description("Update option should call the repo to update the option and return success")]
        public async Task UpdateOptionAsync_CallsRepoUpdateOption_Successfully()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            IOption option = OptionFactory.BuildOption();

            optionRepo.Setup(m => m.UpdateOptionAsync(option, It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            bool result = await sut.UpdateOptionAsync(option, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeTrue();
            optionRepo.Verify(m => m.UpdateOptionAsync(option, TestContext.CurrentContext.CancellationToken));
        }

        [Test, Description("Update option should return false when the repo update fails")]
        public async Task UpdateOptionAsync_ReturnsFalse_WhenRepoUpdateFails()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            IOption option = OptionFactory.BuildOption();

            optionRepo.Setup(m => m.UpdateOptionAsync(option, It.IsAny<CancellationToken>()))
                .ReturnsAsync(false);

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            bool result = await sut.UpdateOptionAsync(option, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeFalse();
        }

        [Test, Description("Delete option should call the repo to delete the option and always return true")]
        public async Task DeleteOptionAsync_CallsRepoOptionDelete_Successfully()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionService>> logger = new();
            Mock<IOptionRepo> optionRepo = new();

            Guid id = Guid.NewGuid();
            optionRepo.Setup(m => m.DeleteAsync(id, It.IsAny<CancellationToken>()));

            OptionService sut = new(logger.Object, optionRepo.Object);

            await TestContext.Out.WriteLineAsync("Executing test");
            bool result = await sut.DeleteOptionAsync(id, TestContext.CurrentContext.CancellationToken);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeTrue();
            optionRepo.Verify(m => m.DeleteAsync(id, TestContext.CurrentContext.CancellationToken));
        }
    }
}