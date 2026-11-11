using FluentAssertions;
using OI.Common.Extensions.Comparison;
using OI.Common.Extensions.Transformations;

namespace OI.Common.Tests.Extensions
{
    [TestFixture, Description("DateTimeExtensions tests")]
    public class DateTimeExtensionsTests
    {
        [Test, Description("Test DateTime returns true")]
        public void IsEmpty_DefaultValue_Success()
        {
            DateTime test = default;
            bool result = test.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime returns true")]
        public void IsEmpty_MinValue_Success()
        {
            DateTime test = DateTime.MinValue;
            bool result = test.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime returns true")]
        public void IsEmpty_MaxValue_Success()
        {
            DateTime test = DateTime.MaxValue;
            bool result = test.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime returns false")]
        public void IsEmpty_Value_Success()
        {
            DateTime test = DateTime.Now;
            bool result = test.IsEmpty();
            result.Should().BeFalse();
        }

        [Test, Description("Test DateTime returns true")]
        public void IsNotEmpty_Value_Success()
        {
            DateTime test = DateTime.Now;
            bool result = test.IsNotEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime? returns true")]
        public void NullableIsEmpty_NullValue_Success()
        {
            DateTime? test = null;
            bool result = test.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime returns true")]
        public void NullableIsEmpty_MinValue_Success()
        {
            DateTime? test = DateTime.MinValue;
            bool result = test.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime returns true")]
        public void NullableIsEmpty_MaxValue_Success()
        {
            DateTime? test = DateTime.MaxValue;
            bool result = test.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test DateTime returns false")]
        public void NullableIsEmpty_Value_Success()
        {
            DateTime? test = DateTime.Now;
            bool result = test.IsEmpty();
            result.Should().BeFalse();
        }

        [Test, Description("Test DateTime returns true")]
        public void NullableIsNotEmpty_Value_Success()
        {
            DateTime? test = DateTime.Now;
            bool result = test.IsNotEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Change nullable to non-nullable with a default value")]
        public void ToDateTime_UseDefault_Success()
        {
            DateTime? testDateTime = null;
            DateTime result = testDateTime.ToDateTime(DateTime.Now);
            result.Hour.Should().Be(DateTime.Now.Hour);
        }

        [Test, Description("Change nullable to non-nullable without a default value")]
        public void ToDateTime_DoNotUseDefault_Success()
        {
            DateTime? testDateTime = DateTime.Now;
            DateTime result = testDateTime.ToDateTime(DateTime.MaxValue);
            result.Hour.Should().Be(DateTime.Now.Hour);
        }

        [Test, Description("Change nullable to non-nullable")]
        public void ToDateTime_UseMinDefault_Success()
        {
            DateTime? testDateTime = null;
            DateTime result = testDateTime.ToDateTime();
            result.Should().Be(DateTime.MinValue);
        }
    }
}