using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;
using ProductManager.Service.Models.Request;
using System.Net;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests for the ProductSellsController")]
    public class ProductSellsControllerTests
    {
        [Test, Description("Constructor throws exception when logger is null")]
        public void Constructor_ThrowsException_WhenLoggerIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProductSellsController(null!, new Mock<IProductService>().Object));
        }

        [Test, Description("Constructor throws exception when service is null")]
        public void Constructor_ThrowsException_WhenServiceIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProductSellsController(new Mock<ILogger<ProductSellsController>>().Object, null!));
        }

        [Test, Description("Constructor successfully creates an instance")]
        public void Constructor_SuccessfullyCreatesInstance()
        {
            // Arrange
            Mock<ILogger<ProductSellsController>> logger = new();
            Mock<IProductService> productService = new();

            // Act
            ProductSellsController sut = new(logger.Object, productService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };

            // Assert
            sut.Should().NotBeNull();
        }

        [Test, Description("Post returns the new sell period ID")]
        public async Task Post_ReturnsNewSellPeriodId()
        {
            // Arrange
            Mock<ILogger<ProductSellsController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            DateTime start = DateTime.UtcNow;
            DateTime end = start.AddDays(30);
            decimal price = 9.99m;
            Guid newSellPeriodId = Guid.NewGuid();

            productService.Setup(s => s.AddSellPeriodAsync(productId, start, end, price, It.IsAny<CancellationToken>()))
                .ReturnsAsync(newSellPeriodId);

            ProductSellsController sut = new(logger.Object, productService.Object)
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
            ProductSellsRequest request = new () { Start= start, End = end, Price = price };
            IActionResult result = await sut.Post(productId, request);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult.Value.Should().Be(newSellPeriodId);
        }

        [Test, Description("Delete successfully removes a sell period and returns Ok")]
        public async Task Delete_SuccessfullyDeletesSellPeriod()
        {
            // Arrange
            Mock<ILogger<ProductSellsController>> logger = new();
            Mock<IProductService> productService = new();
            Guid sellPeriodId = Guid.NewGuid();

            productService.Setup(s => s.DeleteSellPeriodAsync(sellPeriodId, It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            ProductSellsController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Delete(sellPeriodId);

            // Assert
            result.Should().BeOfType<OkResult>();
            productService.Verify(s => s.DeleteSellPeriodAsync(sellPeriodId, It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
