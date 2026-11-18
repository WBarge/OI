using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;
using ProductManager.Service.Models.Request;
using System.Net;
using System.Reflection;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests of the OptionsController")]
    public class OptionsControllerTests
    {
        [Test, Description("Test required logger object")]
        public void Constructor_RequiredILogger_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionsController(null!, new Mock<IOptionService>().Object));
        }

        [Test, Description("Test required service object")]
        public void Constructor_RequiredIOptionService_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionsController(new Mock<ILogger<OptionsController>>().Object, null!));
        }

        [Test, Description("Test required objects")]
        public async Task Constructor_RequiredObjects_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionsController>> logger = new();
            Mock<IOptionService> optionService = new();

            await TestContext.Out.WriteLineAsync("Executing test");
            OptionsController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            await TestContext.Out.WriteLineAsync("Examining results");
            sut.Should().NotBeNull();
        }

        [Test, Description("Simulate a get with no parameters")]
        public async Task GetOptions_Successfully_ReturnsData()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionsController>> logger = new();
            Mock<IOptionService> optionService = new();

            IEnumerable<IOption> data = new List<IOption>
            {
                new Mock<IOption>().Object,
                new Mock<IOption>().Object
            };

            optionService.Setup(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                    It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(data);
            optionService.Setup(s => s.GetOptionCountAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(data.Count());

            OptionsController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.GetOptions(null!);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            object? resultData = castedResult.Value;
            Type t = resultData!.GetType();
            t.Name.Should().Contain("AnonymousType");
            PropertyInfo[] f = t.GetProperties();
            f.Length.Should().Be(2);
            IEnumerable<IOption>? returnedData = (IEnumerable<IOption>?)f[0].GetValue(resultData);
            returnedData.Should().NotBeNull();
            returnedData!.Count().Should().Be(2);
            long totalRecordSize = (long)(f[1].GetValue(resultData) ?? 0L);
            totalRecordSize.Should().Be(data.Count());
        }

        [Test, Description("Simulate a get with the paging information set")]
        public async Task GetOptionsPaged_Successfully_Returns()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionsController>> logger = new();
            Mock<IOptionService> optionService = new();

            IEnumerable<IOption> data = new List<IOption>
            {
                new Mock<IOption>().Object
            };

            optionService.Setup(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                    It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(data);
            optionService.Setup(s => s.GetOptionCountAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(data.Count());

            OptionsController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            ListRequest request = new()
            {
                Page = 1,
                PageSize = 1,
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.GetOptions(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            optionService.Verify(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                1, 1, It.IsAny<CancellationToken>()));
        }

        [Test, Description("Verify that a null or invalid page number defaults to 1")]
        [TestCase(null)]
        [TestCase(0)]
        [TestCase(-1)]
        public async Task GetOptions_InvalidPage_DefaultsToOne(int? page)
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionsController>> logger = new();
            Mock<IOptionService> optionService = new();

            optionService.Setup(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                    It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<IOption>());
            optionService.Setup(s => s.GetOptionCountAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(0);

            OptionsController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            ListRequest request = new() { Page = page };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.GetOptions(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            optionService.Verify(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                1, It.IsAny<int>(), It.IsAny<CancellationToken>()));
        }

        [Test, Description("Verify that a null or invalid page size defaults to the configured data size")]
        [TestCase(null)]
        [TestCase(0)]
        [TestCase(-1)]
        public async Task GetOptions_InvalidPageSize_DefaultsToDataSize(int? pageSize)
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            const int EXPECTED_DEFAULT_PAGE_SIZE = 100000;
            Mock<ILogger<OptionsController>> logger = new();
            Mock<IOptionService> optionService = new();

            optionService.Setup(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                    It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<IOption>());
            optionService.Setup(s => s.GetOptionCountAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(0);

            OptionsController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            ListRequest request = new() { PageSize = pageSize };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.GetOptions(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            optionService.Verify(s => s.GetOptionsAsync(It.IsAny<Dictionary<string, IFilterMetaData[]>>(),
                It.IsAny<int>(), EXPECTED_DEFAULT_PAGE_SIZE, It.IsAny<CancellationToken>()));
        }
    }
}
