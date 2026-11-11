using FluentAssertions;
using OI.Common.Models;

namespace OI.Common.Tests.Models
{
    [TestFixture, Description("DateRange tests")]
    public class DateRangeTests
    {
        [Test, Description("Test creation of object")]
        public void CreateDateRange_InitialValue_Success()
        {
            DateRange sut = new DateRange();
            sut.Start.Should().Be(sut.DefaultStart);
            sut.End.Should().Be(sut.DefaultEnd);
        }

        [Test, Description("Test default of a bad start date string")]
        public void DateRange_WithBadStartString_ShouldDefault()
        {
            string endDate = DateTime.Now.ToShortDateString();
            DateRange sut = new DateRange(string.Empty, endDate);
            sut.Start.Should().Be(sut.DefaultStart);
            sut.End.ToShortDateString().Should().Be(endDate);
        }

        [Test, Description("Test default of a bad end date string")]
        public void DateRange_WithBadEndString_ShouldDefault()
        {
            string startDate = DateTime.Now.ToShortDateString();
            DateRange sut = new DateRange(startDate, string.Empty);
            sut.Start.ToShortDateString().Should().Be(startDate);
            sut.End.Should().Be(sut.DefaultEnd);
        }

        [Test, Description("Test default of a bad start date")]
        public void DateRange_WithBadStart_ShouldDefault()
        {
            DateTime? endDate = DateTime.Now;
            DateRange sut = new DateRange(null, endDate);
            sut.Start.Should().Be(sut.DefaultStart);
            sut.End.Should().Be(endDate);
        }

        [Test, Description("Test default of a bad end date")]
        public void DateRange_WithBadEnd_ShouldDefault()
        {
            DateTime? startDate = DateTime.Now;
            DateRange sut = new DateRange(startDate, null);
            sut.Start.Should().Be(startDate);
            sut.End.Should().Be(sut.DefaultEnd);
        }

        [Test, Description("A date is within the range excluding the end points")]
        public void DateRange_ContainsDateExcludingEndpoints_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange sut = new DateRange(yesterday, tomorrow);
            bool result = sut.Overlaps(DateTime.Now, false);
            result.Should().BeTrue();
        }

        [Test, Description("A date is within the range excluding the end points")]
        public void DateRange_ContainsDateExcludingEndpoints_Fails()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange sut = new DateRange(yesterday, tomorrow);
            bool result = sut.Overlaps(tomorrow, false);
            result.Should().BeFalse();
        }

        [Test, Description("A date is within the range including the end points")]
        public void DateRange_ContainsDateIncludingEndpoints_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange sut = new DateRange(yesterday, tomorrow);
            bool result = sut.Overlaps(yesterday);
            result.Should().BeTrue();
        }

        [Test, Description("Do two ranges overlap")]
        public void DateRanges_Overlap_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime today = DateTime.Now;
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, today);
            DateRange range2 = new DateRange(today, tomorrow);
            bool result = range1.Overlaps(range2);
            result.Should().BeTrue();
        }

        [Test, Description("Do two ranges not overlap")]
        public void DateRanges_Overlap_Fail()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime today = DateTime.Now;
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, today);
            DateRange range2 = new DateRange(today.AddDays(1), tomorrow.AddDays(1));
            bool result = range1.Overlaps(range2);
            result.Should().BeFalse();
        }

        [Test, Description("Is one range within another range including end points")]
        public void DateRange_WithInAnotherRangeIncludeEndPoints_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime today = DateTime.Now;
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, tomorrow);
            DateRange range2 = new DateRange(today, tomorrow);
            bool result = range1.WithIn(range2);
            result.Should().BeTrue();
        }

        [Test, Description("Is one range within another range excluding end points")]
        public void DateRange_WithInAnotherRangeExcludeEndPoints_Fails()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime today = DateTime.Now;
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, tomorrow);
            DateRange range2 = new DateRange(today, tomorrow);
            bool result = range1.WithIn(range2,false);
            result.Should().BeFalse();
        }

        [Test, Description("Is one range within another range where end points don't matter")]
        public void DateRange_WithInAnotherRangeReguardlessOfEndPoints_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime today = DateTime.Now;
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday.AddDays(-1), tomorrow.AddDays(1));
            DateRange range2 = new DateRange(yesterday, tomorrow);
            bool result = range1.WithIn(range2);
            result.Should().BeTrue();
            result = range1.WithIn(range2,false);
            result.Should().BeTrue();
        }


        [Test, Description("A data range with its initial default values is considered empty")]
        public void DateRange_WithItsDefaultValuesIsEmpty_Success()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange sut = new DateRange();
            bool result = sut.IsEmpty();
            result.Should().BeTrue();
            //check the inverse
            result = sut.IsNotEmpty();
            result.Should().BeFalse();
        }

        [Test, Description("A data range with out its initial default values is considered not empty")]
        public void DateRange_WithOutItsDefaultValuesIsNotEmpty_Success()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange sut = new DateRange(yesterday, tomorrow);
            bool result = sut.IsNotEmpty();
            result.Should().BeTrue();
            //check the inverse
            result = sut.IsEmpty();
            result.Should().BeFalse();
            }

        [Test, Description("ToString will produce a value")]
        public void DateRangeToString_ProducesAValue_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange sut = new DateRange(yesterday, tomorrow);
            string result = sut.ToString();
            result.Should().NotBeNullOrEmpty();
        }

        [Test, Description("Equals and == being tested")]
        public void DateRangeEqual_ForSameObjectValues_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, tomorrow);
            DateRange range2 = new DateRange(yesterday, tomorrow);

            bool result = range1.Equals(range2);
            result.Should().BeTrue();

            result = range1 == range2;
            result.Should().BeTrue();
        }

        [Test, Description("Equals and != being tested")]
        public void DateRangeNotEqual_ForDifferentObjectValues_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, tomorrow);
            DateRange range2 = new DateRange(yesterday, tomorrow.AddDays(1));

            bool result = range1.Equals(range2);
            result.Should().BeFalse();

            result = range1 != range2;
            result.Should().BeTrue();
        }

        [Test, Description("See GetHashCode produces a value")]
        public void DateRangeHashCode_ProducesAResult_Succeeds()
        {
            DateTime yesterday = DateTime.Now.AddDays(-1);
            DateTime tomorrow = DateTime.Now.AddDays(1);

            DateRange range1 = new DateRange(yesterday, tomorrow);
            int hashCode = range1.GetHashCode();
            hashCode.Should().NotBe(17);
        }
    }
}