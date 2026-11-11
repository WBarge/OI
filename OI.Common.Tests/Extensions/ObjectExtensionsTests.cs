using FluentAssertions;
using OI.Common.Extensions.Transformations;
using ObjectExtensions = OI.Common.Extensions.Comparison.ObjectExtensions;

namespace OI.Common.Tests.Extensions
{
    [TestFixture, Description("ObjectExtensions tests")]
    public class ObjectExtensionsTests
    {

        [Test, Description("Test object returns true")]
        public void IsEmpty_NullObject_Success()
        {
            object? test = null;
            // ReSharper disable once ExpressionIsAlwaysNull
            bool result = ObjectExtensions.IsEmpty(test);
            result.Should().BeTrue();
        }

        [Test, Description("Test object returns false")]
        public void IsEmpty_NonEmptyObject_Success()
        {
            object test = 2334;
            bool result = ObjectExtensions.IsEmpty(test);
            result.Should().BeFalse();
        }

        [Test, Description("Test object returns false")]
        public void IsNotEmpty_NonEmptyObject_Success()
        {
            object test = 123;
            bool result = ObjectExtensions.IsNotEmpty(test);
            result.Should().BeTrue();
        }

        [Test, Description("Test object returns false")]
        public void IsNotEmpty_EmptyObject_Success()
        {
            object? test = null;
            // ReSharper disable once ExpressionIsAlwaysNull
            bool result = ObjectExtensions.IsNotEmpty(test);
            result.Should().BeFalse();
        }

        [Test, Description("Test Required")]
        public void Required_NonEmptyObject_Success()
        {
            object test = 123;
            try
            {
                ObjectExtensions.Required(test, nameof(test));
            }
            catch (Exception)
            {
                Assert.Fail("an exception was thrown");
            }
            
        }

        [Test, Description("Test Required")]
        public void Required_EmptyObject_Success()
        {
            object? test = null;
            try
            {
                // ReSharper disable once ExpressionIsAlwaysNull
                ObjectExtensions.Required(test, nameof(test));
                Assert.Fail("an exception was not thrown");
            }
            catch (Exception)
            {
                Assert.Pass("Test Passed");

//                Assert.True(true,"Test Passed");
            }
            
        }

        [Test, Description("Test convert to int")]
        public void ToInt_Convert_Success()
        {
            object test = 1;
            int result = test.ToInt();
            result.Should().Be(1);
        }

        [Test, Description("Test convert to int")]
        public void ToInt_ConvertInvalidToMin_Success()
        {
            object test = "a";
            int result = test.ToInt();
            result.Should().Be(int.MinValue);
        }

        [Test, Description("Test convert to int")]
        public void ToInt_ConvertInvalidToMax_Success()
        {
            object test = "a";
            int result = test.ToInt(int.MaxValue);
            result.Should().Be(int.MaxValue);
        }

    }
}