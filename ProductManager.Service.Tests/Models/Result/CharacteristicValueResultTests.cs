using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Service.Models.Result;

namespace ProductManager.Service.Tests.Models.Result
{
    [TestFixture]
    public class CharacteristicValueResultTests
    {
        private static Mock<ICharacteristicValue> CreateMock(Guid id, string value)
        {
            var mock = new Mock<ICharacteristicValue>();
            mock.SetupGet(x => x.Id).Returns(id);
            mock.SetupGet(x => x.Value).Returns(value);
            return mock;
        }

        #region Constructor

        [Test]
        public void Constructor_WithValidData_MapsIdAndValue()
        {
            // Arrange
            var id = Guid.NewGuid();
            var data = CreateMock(id, "Red");

            // Act
            var result = new CharacteristicValueResult(data.Object);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Id, Is.EqualTo(id));
                Assert.That(result.Value, Is.EqualTo("Red"));
            });
        }

        [Test]
        public void Constructor_WithValidData_ReadsEachPropertyFromSource()
        {
            // Arrange
            var data = CreateMock(Guid.NewGuid(), "Blue");

            // Act
            _ = new CharacteristicValueResult(data.Object);

            // Assert - guards against the result silently dropping/duplicating reads
            data.VerifyGet(x => x.Id, Times.Once);
            data.VerifyGet(x => x.Value, Times.Once);
        }

        [Test]
        public void Constructor_WithNullData_DoesNotThrow()
        {
            Assert.DoesNotThrow(() => new CharacteristicValueResult(null!));
        }

        [Test]
        public void Constructor_WithNullData_LeavesIdAsGuidEmpty()
        {
            // Act
            var result = new CharacteristicValueResult(null!);

            // Assert
            Assert.That(result.Id, Is.EqualTo(Guid.Empty));
        }

        [Test]
        public void Constructor_WithNullData_DoesNotLeavesValueNull()
        {
            // Act
            var result = new CharacteristicValueResult(null!);

            // Assert
            Assert.That(result.Value, Is.EqualTo(string.Empty));
            Assert.That(result.Id, Is.EqualTo(Guid.Empty));
        }

        [TestCase("")]
        [TestCase(" ")]
        [TestCase("Extra Large")]
        [TestCase("100% Cotton / Polyester")]
        [TestCase("Ünïcödé – 日本語 – 🎨")]
        public void Constructor_WithVariousValues_PreservesValueExactly(string value)
        {
            // Arrange
            var data = CreateMock(Guid.NewGuid(), value);

            // Act
            var result = new CharacteristicValueResult(data.Object);

            // Assert
            Assert.That(result.Value, Is.EqualTo(value));
        }

        #endregion

        #region Properties

        [Test]
        public void Properties_CanBeSetAfterConstruction()
        {
            // Arrange
            var result = new CharacteristicValueResult(null!);
            var id = Guid.NewGuid();

            // Act
            result.Id = id;
            result.Value = "Green";

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Id, Is.EqualTo(id));
                Assert.That(result.Value, Is.EqualTo("Green"));
            });
        }

        #endregion

        #region Serialization

        [Test]
        public void Serialize_UsesLowercaseJsonPropertyNames()
        {
            // Arrange
            var result = new CharacteristicValueResult(CreateMock(Guid.NewGuid(), "Red").Object);

            // Act
            var json = JObject.Parse(JsonConvert.SerializeObject(result));

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(json.ContainsKey("id"), Is.True);
                Assert.That(json.ContainsKey("value"), Is.True);
                Assert.That(json.ContainsKey("Id"), Is.False);
                Assert.That(json.ContainsKey("Value"), Is.False);
            });
        }

        [Test]
        public void Serialize_ContainsOnlyIdAndValue()
        {
            // Arrange
            var result = new CharacteristicValueResult(CreateMock(Guid.NewGuid(), "Red").Object);

            // Act
            var json = JObject.Parse(JsonConvert.SerializeObject(result));

            // Assert - the whole point of this class is to expose only these two properties
            var propertyNames = json.Properties().Select(p => p.Name);
            Assert.That(propertyNames, Is.EquivalentTo(new[] { "id", "value" }));
        }

        [Test]
        public void Serialize_WritesExpectedValues()
        {
            // Arrange
            var id = Guid.NewGuid();
            var result = new CharacteristicValueResult(CreateMock(id, "Red").Object);

            // Act
            var json = JObject.Parse(JsonConvert.SerializeObject(result));

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(Guid.Parse(json["id"]!.Value<string>()!), Is.EqualTo(id));
                Assert.That(json["value"]!.Value<string>(), Is.EqualTo("Red"));
            });
        }

        [Test]
        public void Serialize_WhenBuiltFromNull_WritesEmptyGuidAndNullValue()
        {
            // Arrange
            var result = new CharacteristicValueResult(null!);

            // Act
            var json = JObject.Parse(JsonConvert.SerializeObject(result));

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(Guid.Parse(json["id"]!.Value<string>()!), Is.EqualTo(Guid.Empty));
                Assert.That(json["value"]!.Value<string>(), Is.EqualTo(string.Empty));
            });
        }

        [Test]
        public void Serialize_DoesNotLeakExtraPropertiesFromSourceObject()
        {
            // Arrange - a source that carries more data than the result should expose
            var source = new ExtendedCharacteristicValue
            {
                Id = Guid.NewGuid(),
                Value = "Red",
                InternalNotes = "secret",
            };

            // Act
            var json = JsonConvert.SerializeObject(new CharacteristicValueResult(source));

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(json, Does.Not.Contain("InternalNotes"));
                Assert.That(json, Does.Not.Contain("secret"));
            });
        }

        [Test]
        public void Serialize_RoundTrip_RestoresIdAndValue()
        {
            // Arrange
            var id = Guid.NewGuid();
            var original = new CharacteristicValueResult(CreateMock(id, "Red").Object);
            var json = JsonConvert.SerializeObject(original);

            // Act - rebuild via JObject since the class has no parameterless constructor
            var parsed = JObject.Parse(json);
            var roundTripped = new CharacteristicValueResult(null!)
            {
                Id = Guid.Parse(parsed["id"]!.Value<string>()!),
                Value = parsed["value"]!.Value<string>()!,
            };

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(roundTripped.Id, Is.EqualTo(original.Id));
                Assert.That(roundTripped.Value, Is.EqualTo(original.Value));
            });
        }

        #endregion

        /// <summary>
        /// Test double that exposes more than the result class should serialize.
        /// NOTE: if ICharacteristicValue declares additional members, implement them here.
        /// </summary>
        private sealed class ExtendedCharacteristicValue : ICharacteristicValue
        {
            public Guid Id { get; set; }
            public Guid CharacteristicId { get; set; }
            public string Value { get; set; } = null!;
            // ReSharper disable once UnusedAutoPropertyAccessor.Local
            public string InternalNotes { get; set; } = null!;
        }
    }
}