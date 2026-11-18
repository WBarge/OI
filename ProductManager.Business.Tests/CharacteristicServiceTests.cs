using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Business.Tests
{
    [TestFixture, Description("Unit tests for CharacteristicService")]
    public class CharacteristicServiceTests
    {
        private Mock<ILogger<CharacteristicService>> _loggerMock;
        private Mock<ICharacteristicRepo> _repoMock;
        private CharacteristicService _sut;

        [SetUp]
        public void SetUp()
        {
            _loggerMock = new Mock<ILogger<CharacteristicService>>();
            _repoMock = new Mock<ICharacteristicRepo>();
            _sut = new CharacteristicService(_loggerMock.Object, _repoMock.Object);
        }

        [Test, Description("GetAllCharacteristicsAsync should return all characteristics")]
        public async Task GetAllCharacteristicsAsync_ReturnsAllCharacteristics()
        {
            // Arrange
            List<IFullCharacteristic> mockCharacteristics = new List<IFullCharacteristic>
            {
                new Mock<IFullCharacteristic>().Object, new Mock<IFullCharacteristic>().Object
            };
            _repoMock.Setup(repo => repo.GetAll(It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockCharacteristics);
            // Act
            IEnumerable<IFullCharacteristic> result = await _sut.GetAllCharacteristicsAsync();
            // Assert
            result.Should().BeEquivalentTo(mockCharacteristics);
            _repoMock.Verify(repo => repo.GetAll(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("CreateCharacteristicAsync should create a new characteristic and return its ID")]
        public async Task CreateCharacteristicAsync_CreatesNewCharacteristic()
        {
            // Arrange
            Guid characteristicId = Guid.NewGuid();
            _repoMock.Setup(repo => repo.CreateInstance())
                .Returns(new Mock<ICharacteristic>().Object);
            _repoMock.Setup(repo => repo.Add(It.IsAny<ICharacteristic>(), It.IsAny<CancellationToken>()));
            // Act
            await _sut.CreateCharacteristicAsync("Test Characteristic");
            // Assert
            _repoMock.Verify(repo => repo.CreateInstance(), Times.Once);
            _repoMock.Verify(repo => repo.Add(It.IsAny<ICharacteristic>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("DeleteCharacteristicAsync should delete the characteristic by ID")]
        public async Task DeleteCharacteristicAsync_DeletesCharacteristicById()
        {
            // Arrange
            Guid characteristicId = Guid.NewGuid();
            _repoMock.Setup(repo => repo.Delete(characteristicId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);
            // Act
            await _sut.DeleteCharacteristicAsync(characteristicId);
            // Assert
            _repoMock.Verify(repo => repo.Delete(characteristicId, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("AddValueToCharacteristicAsync should add a value to the characteristic")]
        public async Task AddValueToCharacteristicAsync_AddsValueToCharacteristic()
        {
            // Arrange
            Guid characteristicId = Guid.NewGuid();
            string value = "Test Value";
            _repoMock.Setup(repo => repo.AddValue(It.IsAny<ICharacteristicValue>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync((new Mock<ICharacteristicValue>()).Object);
            // Act
            await _sut.AddValueToCharacteristicAsync(characteristicId, value);
            // Assert
            _repoMock.Verify(
                repo => repo.AddValue(
                    It.Is<ICharacteristicValue>(v => v.CharacteristicId == characteristicId && v.Value == value),
                    It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test, Description("GetFullCharacteristicAsync should return the full characteristic by ID")]
        public async Task GetFullCharacteristicAsync_ReturnsFullCharacteristicById()
        {
            // Arrange
            Guid characteristicId = Guid.NewGuid();
            IFullCharacteristic mockCharacteristic = new Mock<IFullCharacteristic>().Object;
            _repoMock
                .Setup(repo => repo.GetFullCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockCharacteristic);
            // Act
            IFullCharacteristic result = await _sut.GetFullCharacteristicAsync(characteristicId);
            // Assert
            result.Should().Be(mockCharacteristic);
            _repoMock.Verify(
                repo => repo.GetFullCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()),
                Times.Once);
        }

        [Test, Description("GetFullCharacteristicAsync should throw an exception when the characteristic is not found")]
        public void GetFullCharacteristicAsync_ThrowsException_WhenCharacteristicNotFound()
        {
            // Arrange
            Guid characteristicId = Guid.NewGuid();
            _repoMock
                .Setup(repo => repo.GetFullCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()))
                .ThrowsAsync(new KeyNotFoundException($"Characteristic with ID {characteristicId} not found."));
            // Act
            Func<Task> act = async () => await _sut.GetFullCharacteristicAsync(characteristicId);
            // Assert
            act.Should().ThrowAsync<KeyNotFoundException>()
                .WithMessage($"Characteristic with ID {characteristicId} not found.");
            _repoMock.Verify(
                repo => repo.GetFullCharacteristicAsync(characteristicId, It.IsAny<CancellationToken>()),
                Times.Once);
        }
    }
}
