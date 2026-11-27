using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Controllers;

namespace ProductManager.Service.Tests.Controllers
{
    [TestFixture, Description("Tests for the CharacteristicValueController")]
    public class CharacteristicValueControllerTests
    {
        [Test, Description("Constructor throws exception when logger is null")]
        public void Constructor_ThrowsException_WhenLoggerIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CharacteristicValueController(null!, new Mock<ICharacteristicService>().Object));
        }
       
        [Test, Description("Constructor throws exception when service is null")]
        public void Constructor_ThrowsException_WhenServiceIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CharacteristicValueController(new Mock<ILogger<CharacteristicValueController>>().Object, null!));
        }
        
        [Test, Description("Constructor successfully creates an instance")]
        public void Constructor_SuccessfullyCreatesInstance()
        {
            // Arrange
            Mock<ILogger<CharacteristicValueController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            // Act
            CharacteristicValueController sut = new(logger.Object, characteristicService.Object)
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
        
        [Test, Description("Post successfully adds a value to a characteristic")]
        public async Task Post_SuccessfullyAddsValueToCharacteristic()
        {
            // Arrange
            Mock<ILogger<CharacteristicValueController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            Guid characteristicId = Guid.NewGuid();
            string value = "Test Value";
            characteristicService.Setup(s => s.AddValueToCharacteristicAsync(characteristicId, value, It.IsAny<CancellationToken>()))
                .ReturnsAsync((new Mock<ICharacteristicValue>()).Object);
            CharacteristicValueController sut = new(logger.Object, characteristicService.Object)
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
            IActionResult result = await sut.Post(characteristicId, value);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be(200);
            castedResult.Value.Should().NotBeNull();
            characteristicService.Verify(s => s.AddValueToCharacteristicAsync(characteristicId, value, It.IsAny<CancellationToken>()), Times.Once);
        }
        
        [Test, Description("Post handles exceptions gracefully")]
        public void Post_HandlesExceptionsGracefully()
        {
            // Arrange
            Mock<ILogger<CharacteristicValueController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            Guid characteristicId = Guid.NewGuid();
            string value = "Test Value";
            characteristicService.Setup(s => s.AddValueToCharacteristicAsync(characteristicId, value, It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Test exception"));
            CharacteristicValueController sut = new(logger.Object, characteristicService.Object)
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
            Func<Task> act = async () => await sut.Post(characteristicId, value);
            act.Should().ThrowAsync<Exception>().WithMessage("Test exception");
        }
    }
}
