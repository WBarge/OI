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
    [TestFixture, Description("Tests for the CharacteristicController")]
    public class CharacteristicControllerTests
    {
        [Test, Description("Constructor throws exception when logger is null")]
        public void Constructor_ThrowsException_WhenLoggerIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CharacteristicController(null!, new Mock<ICharacteristicService>().Object));
        }
        
        [Test, Description("Constructor throws exception when service is null")]
        public void Constructor_ThrowsException_WhenServiceIsNull()
        {
            // Arrange & Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CharacteristicController(new Mock<ILogger<CharacteristicController>>().Object, null!));
        }
        
        [Test, Description("Constructor successfully creates an instance")]
        public void Constructor_SuccessfullyCreatesInstance()
        {
            // Arrange
            Mock<ILogger<CharacteristicController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            
            // Act
            CharacteristicController sut = new(logger.Object, characteristicService.Object)
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
        
        [Test, Description("GetCharacteristic returns the characteristic by ID")]
        public async Task GetCharacteristic_ReturnsCharacteristicById()
        {
            // Arrange
            Mock<ILogger<CharacteristicController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            Guid characteristicId = Guid.NewGuid();
            IFullCharacteristic mockCharacteristic = new Mock<IFullCharacteristic>().Object;
            characteristicService.Setup(s => s.GetFullCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockCharacteristic);
            CharacteristicController sut = new CharacteristicController(logger.Object, characteristicService.Object)
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
            IActionResult result = await sut.GetCharacteristic(characteristicId);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.StatusCode.Should().Be((int)HttpStatusCode.OK);
            castedResult.Value.Should().BeEquivalentTo(mockCharacteristic);
        }
        
        [Test, Description("CreateCharacteristic successfully creates a new characteristic")]
        public async Task CreateCharacteristic_SuccessfullyCreatesCharacteristic()
        {
            // Arrange
            Mock<ILogger<CharacteristicController>> logger = new();
            Mock<ICharacteristicService> characteristicService = new();
            string characteristicName = "Test Characteristic";
            Guid mockCharacteristicId = Guid.NewGuid();
            Mock<ICharacteristic> mockCharacteristic = new();
            mockCharacteristic.SetupAllProperties();
            ICharacteristic mockedCharacteristic = mockCharacteristic.Object;
            mockedCharacteristic.Id = mockCharacteristicId;
            mockedCharacteristic.Name = characteristicName;

            characteristicService.Setup(s => s.CreateCharacteristicAsync(characteristicName, It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockedCharacteristic);
            CharacteristicController sut = new CharacteristicController(logger.Object, characteristicService.Object)
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
            IActionResult result = await sut.CreateCharacteristic(characteristicName);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
            OkObjectResult? castedResult = result as OkObjectResult;
            castedResult.Should().NotBeNull();
            castedResult!.Value.Should().BeEquivalentTo(mockedCharacteristic);
        }
    }
}
