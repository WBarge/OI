using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;
using System.Net;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests for the CharacteristicsController")]
    public class CharacteristicsControllerTests
    {
        [Test, Description("Constructor throws exception when logger is null")]
        public void Constructor_ThrowsException_WhenLoggerIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CharacteristicsController(null!, new Mock<ICharacteristicService>().Object));
        }

        [Test, Description("Constructor throws exception when service is null")]
        public void Constructor_ThrowsException_WhenServiceIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CharacteristicsController(new Mock<ILogger<CharacteristicsController>>().Object, null!));
        }

        [Test, Description("Constructor successfully creates an instance")]
        public void Constructor_SuccessfullyCreatesInstance()
        {
            // Arrange
            Mock<ILogger<CharacteristicsController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            // Act
            CharacteristicsController sut = new(logger.Object, characteristicService.Object)
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

        [Test, Description("GetAllCharacteristics returns all characteristics successfully")]
        public async Task GetAllCharacteristics_ReturnsAllCharacteristics()
        {
            // Arrange
            Mock<ILogger<CharacteristicsController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            IEnumerable<IFullCharacteristic> mockData = new List<IFullCharacteristic>
            {
                new Mock<IFullCharacteristic>().Object,
                new Mock<IFullCharacteristic>().Object
            };
            characteristicService.Setup(s => s.GetAllCharacteristicsAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockData);
            CharacteristicsController sut = new(logger.Object, characteristicService.Object)
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
            IActionResult result = await sut.GetAllCharacteristics();
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult.Value.Should().BeEquivalentTo(mockData);
        }

        [Test, Description("GetAllCharacteristics logs the operation")]
        public async Task GetAllCharacteristics_LogsOperation()
        {
            // Arrange
            Mock<ILogger<CharacteristicsController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            characteristicService.Setup(s => s.GetAllCharacteristicsAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<IFullCharacteristic>());
            CharacteristicsController sut = new(logger.Object, characteristicService.Object)
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
            await sut.GetAllCharacteristics();
            // Assert
            logger.Verify(l => l.Log(
                It.Is<LogLevel>(logLevel => logLevel == LogLevel.Debug),
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v!.ToString()!.Contains("Retrieving all characteristics.")),
                It.IsAny<Exception>(),
                It.Is<Func<It.IsAnyType, Exception?, string>>((v, t) => true)),
                Times.Once);
        }

        [Test, Description("GetAllCharacteristics handles exceptions gracefully")]
        public void GetAllCharacteristics_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<CharacteristicsController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            characteristicService.Setup(s => s.GetAllCharacteristicsAsync(It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            CharacteristicsController sut = new(logger.Object, characteristicService.Object)
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
            Func<Task> act = async () => await sut.GetAllCharacteristics();
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }
    }
}
