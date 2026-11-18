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

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests of the OptionController")]
    public class OptionControllerTests
    {
        [Test, Description("Test required logger object")]
        public void Constructor_RequiredILogger_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionController(null!, new Mock<IOptionService>().Object));
        }

        [Test, Description("Test required service object")]
        public void Constructor_RequiredIOptionService_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new OptionController(new Mock<ILogger<OptionController>>().Object, null!));
        }

        [Test, Description("Test required objects")]
        public async Task Constructor_RequiredObjects_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            await TestContext.Out.WriteLineAsync("Executing test");
            OptionController sut = new(logger.Object, optionService.Object)
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

        [Test, Description("Tests retrieving an option by a valid ID.")]
        public async Task GetOptionById_ValidId_ReturnsOkWithOption()
        {
            // Arrange
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            Guid optionId = Guid.NewGuid();
            Mock<IOption> optionMock = new();
            optionMock.SetupGet(o => o.Id).Returns(optionId);
            optionMock.SetupGet(o => o.Name).Returns("Extra Cheese");
            optionMock.SetupGet(o => o.Description).Returns("Add extra cheese to the order");
            optionMock.SetupGet(o => o.Price).Returns(1.50m);
            IOption option = optionMock.Object;

            optionService.Setup(s => s.GetOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(option);

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };
            // Act
            IActionResult result = await sut.Get(optionId);

            // Assert
            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult.Value.Should().BeEquivalentTo(option);
        }

        [Test, Description("Tests retrieving an option by an invalid ID.")]
        public async Task GetOptionById_InvalidId_ReturnsNotFound()
        {
            // Arrange
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            Guid optionId = Guid.NewGuid();
            optionService.Setup(s => s.GetOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync((IOption?)null);

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };
            // Act
            IActionResult result = await sut.Get(optionId);

            // Assert
            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<NotFoundResult>();
        }

        [Test, Description("Ensure Post rejects a null request body")]
        public async Task Post_NullRequest_ReturnsBadRequest()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
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
            // ReSharper disable once AssignNullToNotNullAttribute
            IActionResult result = await sut.Post(null!);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.AddOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Post rejects a missing name")]
        [TestCase(null)]
        [TestCase("")]
        [TestCase("   ")]
        public async Task Post_MissingName_ReturnsBadRequest(string? name)
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            OptionRequest request = new()
            {
                Name = name!,
                Description = "A test option",
                Price = 10.00m
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.Post(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.AddOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Post rejects a negative price")]
        public async Task Post_NegativePrice_ReturnsBadRequest()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            OptionRequest request = new()
            {
                Name = "Extra Cheese",
                Description = "A test option",
                Price = -1.00m
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.Post(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.AddOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Post calls the option service and returns the created option")]
        public async Task Post_Valid_ReturnsCreatedWithOption()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            Guid newOptionId = Guid.NewGuid();
            optionService.Setup(s => s.AddOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(newOptionId);

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            OptionRequest request = new()
            {
                Name = "Extra Cheese",
                Description = "A test option",
                Price = 10.00m
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.Post(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<CreatedResult>();
            CreatedResult? castedResult = result as CreatedResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.Created);
            IOption? returnedOption = castedResult.Value as IOption;
            returnedOption.Should().NotBeNull();
            returnedOption!.Id.Should().Be(newOptionId);
            optionService.Verify(s => s.AddOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Ensure Put rejects a null request body")]
        public async Task Put_NullRequest_ReturnsBadRequest()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
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
            // ReSharper disable once AssignNullToNotNullAttribute
            IActionResult result = await sut.Put(null!);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.UpdateOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Put rejects a missing ID")]
        public async Task Put_EmptyId_ReturnsBadRequest()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            OptionRequest request = new()
            {
                Id = Guid.Empty,
                Name = "Extra Cheese",
                Description = "A test option",
                Price = 10.00m
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.Put(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.UpdateOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Put rejects invalid option data")]
        public async Task Put_InvalidData_ReturnsBadRequest()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            OptionRequest request = new()
            {
                Id = Guid.NewGuid(),
                Name = string.Empty,
                Description = string.Empty,
                Price = -5.00m
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.Put(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.UpdateOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Put calls the option service and returns the update result")]
        public async Task Put_Valid_ReturnsOkWithResult()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            optionService.Setup(s => s.UpdateOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            OptionController sut = new(logger.Object, optionService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            OptionRequest request = new()
            {
                Id = Guid.NewGuid(),
                Name = "Extra Cheese",
                Description = "A test option",
                Price = 10.00m
            };

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult result = await sut.Put(request);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult.Value.Should().Be(true);
            optionService.Verify(s => s.UpdateOptionAsync(It.IsAny<IOption>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Ensure Delete rejects a missing ID")]
        public async Task DeleteOption_EmptyId_ReturnsBadRequest()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            OptionController sut = new(logger.Object, optionService.Object)
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
            IActionResult result = await sut.Delete(Guid.Empty);

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<BadRequestObjectResult>();
            optionService.Verify(s => s.DeleteOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Test, Description("Ensure Delete calls the option service")]
        public async Task DeleteOption_Successfully_Returns()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<OptionController>> logger = new();
            Mock<IOptionService> optionService = new();

            optionService.Setup(s => s.DeleteOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            OptionController sut = new(logger.Object, optionService.Object)
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
            IActionResult result = await sut.Delete(Guid.NewGuid());

            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult.Value.Should().Be(true);
            optionService.Verify(s => s.DeleteOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}