using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests for the ProductOptionController")]
    public class ProductOptionControllerTests
    {
        [Test, Description("Constructor throws exception when logger is null")]
        public void Constructor_ThrowsException_WhenLoggerIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProductOptionController(null!, new Mock<IProductService>().Object));
        }

        [Test, Description("Constructor throws exception when service is null")]
        public void Constructor_ThrowsException_WhenServiceIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProductOptionController(new Mock<ILogger<ProductOptionController>>().Object, null!));
        }

        [Test, Description("Constructor successfully creates an instance")]
        public void Constructor_SuccessfullyCreatesInstance()
        {
            // Arrange
            Mock<ILogger<ProductOptionController>> logger = new();
            Mock<IProductService> productService = new();
            // Act
            ProductOptionController sut = new(logger.Object, productService.Object)
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

        [Test, Description("Post returns Ok when product option is successfully added")]
        public async Task Post_ReturnsOk_WhenProductOptionIsSuccessfullyAdded()
        {
            // Arrange
            Mock<ILogger<ProductOptionController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid id = Guid.NewGuid();
            decimal priceOverride = 9.99m;
            productService.Setup(s => s.AddProductOptionAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<decimal>(),It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);
            ProductOptionController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Post(productId, id, priceOverride);
            // Assert
            result.Should().BeOfType<OkResult>();
            OkResult? castedResult = result as OkResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            productService.Verify(s => s.AddProductOptionAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<decimal>(),It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Post returns BadRequest when product option fails to be added")]
        public async Task Post_ReturnsBadRequest_WhenProductOptionFailsToBeAdded()
        {
            // Arrange
            Mock<ILogger<ProductOptionController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid id = Guid.NewGuid();
            decimal priceOverride = 9.99m;
            productService.Setup(s => s.AddProductOptionAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<decimal>(),It.IsAny<CancellationToken>()))
                .ReturnsAsync(false);
            ProductOptionController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Post(productId, id, priceOverride);
            // Assert
            result.Should().BeOfType<BadRequestResult>();
            BadRequestResult? castedResult = result as BadRequestResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(400);
            productService.Verify(s => s.AddProductOptionAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<decimal>(),It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Post handles exceptions gracefully")]
        public void Post_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<ProductOptionController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid id = Guid.NewGuid();
            decimal priceOverride = 9.99m;
            productService.Setup(s => s.AddProductOptionAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<decimal>(),It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            ProductOptionController sut = new(logger.Object, productService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };
            // Act & Assert
            Func<Task> act = async () => await sut.Post(productId, id, priceOverride);
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }

        [Test, Description("Delete successfully removes a product option")]
        public async Task Delete_SuccessfullyRemovesProductOption()
        {
            // Arrange
            Mock<ILogger<ProductOptionController>> logger = new();
            Mock<IProductService> productService = new();
            Guid id = Guid.NewGuid();
            productService.Setup(s => s.DeleteProductOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);
            ProductOptionController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Delete(id);
            // Assert
            result.Should().BeOfType<OkResult>();
            OkResult? castedResult = result as OkResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            productService.Verify(s => s.DeleteProductOptionAsync(id, CancellationToken.None), Times.Once);
        }

        [Test, Description("Delete handles exceptions gracefully")]
        public void Delete_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<ProductOptionController>> logger = new();
            Mock<IProductService> productService = new();
            Guid id = Guid.NewGuid();
            productService.Setup(s => s.DeleteProductOptionAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            ProductOptionController sut = new(logger.Object, productService.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                    {
                        RequestAborted = TestContext.CurrentContext.CancellationToken
                    }
                }
            };
            // Act & Assert
            Func<Task> act = async () => await sut.Delete(id);
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }
    }
}