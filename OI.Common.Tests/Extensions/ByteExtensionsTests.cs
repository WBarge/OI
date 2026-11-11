using System.Text;
using FluentAssertions;
using OI.Common.Extensions.Transformations;

namespace OI.Common.Tests.Extensions
{
    [TestFixture, Description("ByteExtensions tests")]
    public class ByteExtensionsTests
    {
        [Test,Description("Test byte array to a string")]
        public void FromArrayToString_ValidValue_Success()
        {
            const string TEST_VALUE = "testValue";
            byte[] testData = Encoding.Unicode.GetBytes(TEST_VALUE);
            string result = testData.FromArrayToString();
            result.Should().BeEquivalentTo(TEST_VALUE);
        }
    }
}