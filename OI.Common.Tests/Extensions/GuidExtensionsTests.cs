using FluentAssertions;
using OI.Common.Extensions.Comparison;

namespace OI.Common.Tests.Extensions
{
    [TestFixture, Description("GuidExtensions tests")]
    public class GuidExtensionsTests
    {
        [Test, Description("Test Guid returns true")]
        public void IsEmpty_DefaultValue_Success()
        {
            // ReSharper disable once PreferConcreteValueOverDefault
            Guid test = default;
            bool result = test.IsEmpty();
            result.Should().BeTrue();

            // ReSharper disable once PreferConcreteValueOverDefault
            Guid? testNullable = default;
            result = testNullable.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test Guid returns true")]
        public void IsEmpty_NULL_Success()
        {
            Guid? testNullable = null;
            bool result = testNullable.IsEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test Guid returns true")]
        public void IsEmpty_EmptyGuid_Success()
        {
            Guid test = Guid.Empty;
            bool result = test.IsEmpty();
            result.Should().BeTrue();

            Guid? testNullable = Guid.Empty;
            result = testNullable.IsEmpty();
            result.Should().BeTrue();

        }

        [Test, Description("Test Guid returns false")]
        public void IsEmpty_NonEmptyGuid_Success()
        {
            Guid test = Guid.NewGuid();
            bool result = test.IsEmpty();
            result.Should().BeFalse();

            Guid? testNullable = Guid.NewGuid();
            result = testNullable.IsEmpty();
            result.Should().BeFalse();
        }

        [Test, Description("Test Guid returns false")]
        public void IsNotEmpty_NonEmptyGuid_Success()
        {
            Guid test = Guid.NewGuid();
            bool result = test.IsNotEmpty();
            result.Should().BeTrue();
        }

        [Test, Description("Test Guid returns false")]
        public void IsNotEmpty_EmptyGuid_Success()
        {
            Guid test = Guid.Empty;
            bool result = test.IsNotEmpty();
            result.Should().BeFalse();
        }

        [Test, Description("Test Required")]
        public void Required_NonEmptyGuid_Success()
        {
            Guid test = Guid.NewGuid();
            try
            {
                test.Required(nameof(test));
            }
            catch (Exception)
            {
                Assert.Fail("an exception was thrown");
            }
            
        }
        [Test, Description("Test Required")]
        public void Required_EmptyGuid_Success()
        {
            Guid test = Guid.Empty;
            try
            {
                test.Required(nameof(test));
                Assert.Fail("an exception was not thrown");
            }
            catch (Exception)
            {
                Assert.Pass("Test Passed");

//                Assert.True(true,"Test Passed");
            }
            
        }
    }
}