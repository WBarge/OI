using FluentAssertions;
using OI.Common.Extensions.Transformations;
using OI.Common.Tests.TestDTOs;

namespace OI.Common.Tests.Extensions
{
    [TestFixture, Description("EnumExtensions tests")]
    public class EnumExtensionsTests
    {
        [Test, Description("get the int value of an enum")]
        public void ToInt_Convert_Success()
        {
            TestEnum test = TestEnum.First;
            int result = test.ToInt();
            result.Should().Be(1);
        }

        [Test, Description("get the int value of an enum as a string")]
        public void ToIntString_Convert_Success()
        {
            TestEnum test = TestEnum.First;
            string result = test.ToIntString();
            result.Should().BeEquivalentTo("1");
        }

        [Test, Description("get the enum as a spaced string")]
        public void ToSpacedString_Convert_Success()
        {
            TestEnum test = TestEnum.ATestValue;
            string result = test.ToSpacedString();
            result.Should().BeEquivalentTo("A Test Value");
        }

        [Test]
        public void GetValues_ListOutValues_Success()
        {
            IEnumerable<TestEnum> result = Enum.GetValues<TestEnum>();
            result.Should().HaveCount(3);
        }
    }
}