using FluentAssertions;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Transformers;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Transformers
{
    [TestFixture,Description("Tests for the characteristic transformer")]
    public class CharacteristicTransformerTests
    {
        [Test, Description("Should return null when input is null")]
        public void Transform_NullInput_ReturnsNull()
        {
            // Act
            IFullCharacteristic? result = CharacteristicTransformer.Transform(null!);
            // Assert
            result.Should().BeNull();
        }

        [Test, Description("Should transform an empty characteristic correctly")]
        public void Transform_EmptyCharacteristic_ReturnsEmptyFullCharacteristic()
        {
            // Arrange
            Guid id = Guid.NewGuid();
            Characteristic characteristic = new Characteristic
            {
                Id = id,
                Name = "EmptyCharacteristic",
                Values = null
            };
            // Act
            IFullCharacteristic? result = CharacteristicTransformer.Transform(characteristic);
            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().Be(characteristic.Id);
            result.Name.Should().Be(characteristic.Name);
            result.Values.Should().BeEmpty();
        }
        [Test, Description("Should transform a characteristic with values correctly")]
        public void Transform_CharacteristicWithValues_ReturnsFullCharacteristicWithValues()
        {
            // Arrange
            Guid id1 = Guid.NewGuid();
            Guid id2 = Guid.NewGuid();
            List<CharacteristicValue> characteristicValues = new List<CharacteristicValue>
            {
                new CharacteristicValue { Id = id1, Value = "Value1" },
                new CharacteristicValue { Id = id2, Value = "Value2" }
            };
            Characteristic characteristic = new Characteristic
            {
                Id = id2,
                Name = "CharacteristicWithValues",
                Values = characteristicValues
            };
            // Act
            IFullCharacteristic? result = CharacteristicTransformer.Transform(characteristic);
            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().Be(characteristic.Id);
            result.Name.Should().Be(characteristic.Name);
            result.Values.Should().HaveCount(2);
            result.Values.Select(v => v.Id).Should().BeEquivalentTo(characteristicValues.Select(v => v.Id));
            result.Values.Select(v => v.Value).Should().BeEquivalentTo(characteristicValues.Select(v => v.Value));
        }
        [Test, Description("Should handle empty values list correctly")]
        public void Transform_EmptyValuesList_ReturnsFullCharacteristicWithEmptyValues()
        {
            // Arrange
            Characteristic characteristic = new Characteristic
            {
                Id = Guid.NewGuid(),
                Name = "EmptyValuesList",
                Values = new List<CharacteristicValue>()
            };
            // Act
            IFullCharacteristic? result = CharacteristicTransformer.Transform(characteristic);
            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().Be(characteristic.Id);
            result.Name.Should().Be(characteristic.Name);
            result.Values.Should().BeEmpty();
        }

        
    }
}