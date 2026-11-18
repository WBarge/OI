using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Data.EF.Transformers.InternalModels;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;
using ProductManager.Service.Models.Request;
using System.Net;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests of the ProductController")]

    public class ProductControllerTests
    {
       

        [Test, Description("Test required logger object")]
        public void Constructor_RequiredILogger_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new ProductController(null!,new Mock<IProductService>().Object));
        }

        [Test, Description("Test required service object")]
        public void Constructor_RequiredIProductService_Fail()
        {
            // ReSharper disable once AssignNullToNotNullAttribute
            Assert.Throws<ArgumentNullException>(() => new ProductController(new Mock<ILogger<ProductController>>().Object  ,null!));
        }

        [Test, Description("Test required objects")]
        public async Task Constructor_RequiredObjects_Success()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<ProductController>> logger = new();
            Mock<IProductService> productService = new();

            await TestContext.Out.WriteLineAsync("Executing test");
            ProductController sut = new(logger.Object, productService.Object)
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


        [Test, Description("Tests retrieving a product by a valid ID.")]
        public async Task GetProductById_ValidId_ReturnsOkWithProduct()
        {
            // Arrange
            Mock<ILogger<ProductController>> logger = new();
            Mock<IProductService> productService = new();

            Guid productId = Guid.NewGuid();
            IFullProduct product = new FullProduct(
                productId,
                "Laptop",
                "test",
                "P12343",
                1200.00m,
                "Full Test",
                0,
                0,
                null!,
                null!,
                null!
                );
            productService.Setup(s => s.GetProductAsync(It.IsAny<Guid>(),It.IsAny<CancellationToken>())).ReturnsAsync(product);

            ProductController sut = new ProductController(logger.Object, productService.Object)
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
            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult!.Value.Should().BeEquivalentTo(product);
        }

        [Test, Description("Tests retrieving a product by an invalid ID.")]
        public async Task GetProductById_InvalidId_ReturnsNotFound()
        {
            // Arrange
            Mock<ILogger<ProductController>> logger = new();
            Mock<IProductService> productService = new();

            Guid productId = Guid.NewGuid();
            productService.Setup(s => s.GetProductAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync((IFullProduct?)null);

            ProductController sut = new ProductController(logger.Object, productService.Object)
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
            await TestContext.Out.WriteLineAsync("Examining results");
            result.Should().BeOfType<NotFoundResult>();
        }


        [Test, Description("Ensure QuickAdd calls the product service")]
        public async Task QuickAdd_Successfully_Returns()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<ProductController>> logger = new();
            Mock<IProductService> productService = new();

            productService.Setup(s => s.CreateMinimumViableProductAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<decimal>(),
                It.IsAny<CancellationToken>()));

            ProductController sut = new(logger.Object, productService.Object)
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
            QuickProductRequest request = new()
            {
                Sku = string.Empty,
                Name = string.Empty,
                ShortDescription = string.Empty,
                Price = 0M
            };
            IActionResult result = await sut.QuickAdd(request);
            await TestContext.Out.WriteLineAsync("Examining results");
            productService.Verify();
        }

        [Test, Description("Ensure delete calls the product service")]
        public async Task DeleteProduct_Successfully_Returns()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            Mock<ILogger<ProductController>> logger = new();
            Mock<IProductService> productService = new();

            productService.Setup(s => s.DeleteProductAsync(
                It.IsAny<Guid>(),
                It.IsAny<CancellationToken>()));

            ProductController sut = new(logger.Object, productService.Object)
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
            IActionResult result = await sut.DeleteProduct(Guid.NewGuid());
            await TestContext.Out.WriteLineAsync("Examining results");
            productService.Verify();
        }
    }
}
