using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;
using ProductManager.Service.Models.Request;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests for the ProductCharacteristicController")]
    public class ProductCharacteristicControllerTests
    {
        [Test, Description("Constructor throws exception when logger is null")]
        public void Constructor_ThrowsException_WhenLoggerIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProductCharacteristicController(null!, new Mock<IProductService>().Object));
        }

        [Test, Description("Constructor throws exception when service is null")]
        public void Constructor_ThrowsException_WhenServiceIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProductCharacteristicController(new Mock<ILogger<ProductCharacteristicController>>().Object, null!));
        }

        [Test, Description("Constructor successfully creates an instance")]
        public void Constructor_SuccessfullyCreatesInstance()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            // Act
            ProductCharacteristicController sut = new(logger.Object, productService.Object);
            // Assert
            sut.Should().NotBeNull();
        }

        [Test, Description("Get (list) successfully returns all characteristics for a product")]
        public async Task Get_SuccessfullyReturnsCharacteristicsForProduct()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Mock<IProductCharacteristic> characteristic = new();
            IEnumerable<IProductCharacteristic> data = new List<IProductCharacteristic> { characteristic.Object };
            productService.Setup(s => s.ListProductCharacteristicsAsync(productId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(data);
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Get(productId);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            castedResult.Value.Should().BeEquivalentTo(data);
            productService.Verify(s => s.ListProductCharacteristicsAsync(productId, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Get (list) handles exceptions gracefully")]
        public void Get_List_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            productService.Setup(s => s.ListProductCharacteristicsAsync(productId, It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            Func<Task> act = async () => await sut.Get(productId);
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }

        [Test, Description("Get (by id) successfully returns the matching characteristic")]
        public async Task Get_ById_SuccessfullyReturnsMatchingCharacteristic()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid characteristicId = Guid.NewGuid();

            Mock<IProductCharacteristic> matching = new();
            matching.SetupGet(c => c.Id).Returns(characteristicId);
            Mock<IProductCharacteristic> other = new();
            other.SetupGet(c => c.Id).Returns(Guid.NewGuid());

            IEnumerable<IProductCharacteristic> data = new List<IProductCharacteristic> { other.Object, matching.Object };
            productService.Setup(s => s.ListProductCharacteristicsAsync(productId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(data);
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Get(productId, characteristicId);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            castedResult.Value.Should().Be(matching.Object);
        }

        [Test, Description("Get (by id) returns Ok with a null value when no characteristic matches")]
        public async Task Get_ById_ReturnsOkWithNull_WhenCharacteristicNotFound()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid characteristicId = Guid.NewGuid();

            IEnumerable<IProductCharacteristic> data = new List<IProductCharacteristic>();
            productService.Setup(s => s.ListProductCharacteristicsAsync(productId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(data);
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Get(productId, characteristicId);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.Value.Should().BeNull();
        }

        [Test, Description("Post successfully adds a characteristic to a product")]
        public async Task Post_SuccessfullyAddsCharacteristicToProduct()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid newId = Guid.NewGuid();
            string name = "Color";
            string value = "Red";
            productService.Setup(s => s.AddProductCharacteristicAsync(productId, name, value, It.IsAny<CancellationToken>()))
                .ReturnsAsync(newId);
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Post(productId, new CharacteristicRequest { Name = name, Value = value });
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            castedResult.Value.Should().Be(newId);
            productService.Verify(s => s.AddProductCharacteristicAsync(productId, name, value, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Post handles exceptions gracefully")]
        public void Post_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            string name = "Color";
            string value = "Red";
            productService.Setup(s => s.AddProductCharacteristicAsync(productId, name, value, It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            Func<Task> act = async () => await sut.Post(productId, new CharacteristicRequest { Name = name, Value = value });
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }

        [Test, Description("Delete successfully removes a product characteristic")]
        public async Task Delete_SuccessfullyRemovesCharacteristic()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid characteristicId = Guid.NewGuid();
            productService.Setup(s => s.DeleteProductCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.Delete(productId, characteristicId);
            // Assert
            result.Should().BeOfType<OkResult>();
            OkResult? castedResult = result as OkResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            productService.Verify(s => s.DeleteProductCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("Delete handles exceptions gracefully")]
        public void Delete_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<ProductCharacteristicController>> logger = new();
            Mock<IProductService> productService = new();
            Guid productId = Guid.NewGuid();
            Guid characteristicId = Guid.NewGuid();
            productService.Setup(s => s.DeleteProductCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            ProductCharacteristicController sut = new(logger.Object, productService.Object)
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
            Func<Task> act = async () => await sut.Delete(productId, characteristicId);
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }
    }
}