// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="DateRange.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Diagnostics.CodeAnalysis;
using OI.Common.Extensions.Comparison;
using OI.Common.Extensions.Transformations;

namespace OI.Common.Models
{
    /// <summary>
    /// Class DateRange.
    /// </summary>
    public class DateRange
	{
        #region Properties

        /// <summary>
        /// Gets the default value for the start date part of the range.
        /// </summary>
        /// <value>The default start.</value>
        public DateTime DefaultStart { get => DateTime.MinValue; }

        /// <summary>
        /// Gets the default value for the end date part of the range.
        /// </summary>
        /// <value>The default end.</value>
        public DateTime DefaultEnd { get => DateTime.MaxValue;}


        /// <summary>
        /// Gets or sets the start.
        /// </summary>
        /// <value>The start.</value>
        public DateTime Start { get; set; }
        /// <summary>
        /// Gets or sets the end.
        /// </summary>
        /// <value>The end.</value>
        public DateTime End { get; set; }

        #endregion Properties

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="DateRange" /> class.
        /// </summary>
        public DateRange()
		{
			CommonInit();
		}

        /// <summary>
        /// Initializes a new instance of the <see cref="DateRange" /> class.
        /// </summary>
        /// <param name="start">The start.</param>
        /// <param name="end">The end.</param>
        public DateRange(string start, string end) :this(start.ToDateTime(DateTime.MinValue),end.ToDateTime(DateTime.MaxValue))
		{
		}

        /// <summary>
        /// Initializes a new instance of the <see cref="DateRange" /> class.
        /// </summary>
        /// <param name="start">The start.</param>
        /// <param name="end">The end.</param>
        public DateRange(DateTime? start, DateTime? end) : this((DateTime)start.ToDateTime(DateTime.MinValue), (DateTime)end.ToDateTime(DateTime.MaxValue))
		{
		}

        /// <summary>
        /// Initializes a new instance of the <see cref="DateRange" /> class.
        /// </summary>
        /// <param name="start">The start.</param>
        /// <param name="end">The end.</param>
        public DateRange(DateTime start, DateTime end) : this()
		{
			Start = start;
			End = end;
		}

        #endregion Constructors

        #region Methods

        #region Private Methods

        /// <summary>
        /// Common initialize logic.
        /// </summary>
        private void CommonInit()
		{
			Start = DateTime.MinValue;
			End = DateTime.MaxValue;
		}

        #endregion

        #region Public Methods

        /// <summary>
        /// Does the range overlap the as of date inclusive of the start and end
        /// </summary>
        /// <param name="asOfDate">The date to check.</param>
        /// <param name="includeEndPoints">if set to <c>true</c> [include end points].</param>
        /// <returns>true - the date is within the date range
        /// false - the date is no within the date range</returns>
        public bool Overlaps(DateTime asOfDate, bool includeEndPoints = true)
		{
            bool returnValue;
            if (includeEndPoints)
			{
				returnValue = OverlapsInclusive(asOfDate);
			}
			else
			{
				returnValue = OverlapsExclusive(asOfDate);
			}
			return returnValue;
		}

        /// <summary>
        /// Overlapses the specified range inclusive.
        /// </summary>
        /// <param name="range">The range.</param>
        /// <returns>true - the ranges overlap
        /// false - the ranges do not overlag</returns>
        public bool Overlaps(DateRange range)
		{
			return Overlaps(range.Start) || Overlaps(range.End);
		}

        /// <summary>
        /// Is the date range inside this date range
        /// </summary>
        /// <param name="range">The range.</param>
        /// <param name="includeEndPoints">if set to <see langword="true" /> [include end points].</param>
        /// <returns>true - the range is within this range
        /// false - the range is not within this range</returns>
        public bool WithIn(DateRange range, bool includeEndPoints = true)
		{
            bool returnValue;
            if (includeEndPoints)
			{
				returnValue = OverlapsInclusive(range.Start) && OverlapsInclusive(range.End);
			}
			else
			{
				returnValue = OverlapsExclusive(range.Start) && OverlapsExclusive(range.End);
			}
			return returnValue;
		}

        /// <summary>
        /// Determines whether this instance is empty.
        /// </summary>
        /// <returns><c>true</c> if this instance is empty; otherwise, <c>false</c>.</returns>
        public bool IsEmpty() => Start.IsEmpty() && End.IsEmpty();

        /// <summary>
        /// Determines whether [is not empty].
        /// </summary>
        /// <returns><c>true</c> if [is not empty]; otherwise, <c>false</c>.</returns>
        public bool IsNotEmpty() => !IsEmpty();

        /// <summary>
        /// Does the range overlap the as of date exclusive of the start and end
        /// </summary>
        /// <param name="asOfDate">The date to check.</param>
        /// <returns>true - the date is within the daterange
        /// false - the date is no within the daterange</returns>
        private bool OverlapsExclusive(DateTime asOfDate)
		{
			bool returnValue = asOfDate.Date > Start.Date && asOfDate.Date < End.Date;
			return returnValue;
		}

        /// <summary>
        /// Does the range overlap the as of date inclusive of the start and end
        /// </summary>
        /// <param name="asOfDate">The date to check.</param>
        /// <returns>true - the date is within the daterange
        /// false - the date is no within the daterange</returns>
        private bool OverlapsInclusive(DateTime asOfDate)
		{
			bool returnValue = asOfDate.Date >= Start.Date && asOfDate.Date <= End.Date;
			return returnValue;
		}

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
		{
			return $"{Start.ToShortDateString()}-{End.ToShortDateString()}";
		}

        /// <summary>
        /// Determines whether the specified <see cref="System.Object" /> is equal to this instance.
        /// </summary>
        /// <param name="obj">The object to compare with the current object.</param>
        /// <returns><c>true</c> if the specified <see cref="System.Object" /> is equal to this instance; otherwise, <c>false</c>.</returns>
        /// <font color="red">Badly formed XML comment.</font>
        public override bool Equals(object? obj)
		{
            bool returnValue = false;
            if (obj is DateRange incoming)
			{
                returnValue = Start.Equals(incoming.Start) && End.Equals(incoming.End);
			}
			return returnValue;
		}

        /// <summary>
        /// Returns a hash code for this instance.
        /// </summary>
        /// <returns>A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.</returns>
        [SuppressMessage("ReSharper", "NonReadonlyMemberInGetHashCode")]
        public override int GetHashCode()
        {
            unchecked
            {
                int result = 17;
                result = result * 23 + Start.GetHashCode();
                result += result * 23 + End.GetHashCode();
                return result;
            }
        }

        /// <summary>
        /// Implements the operator ==.
        /// </summary>
        /// <param name="d1">The d1.</param>
        /// <param name="d2">The d2.</param>
        /// <returns><see langword="true" /> if the left hand (d1) equals the right hand (d2) otherwise, <see langword="false" />.</returns>
        public static bool operator == (DateRange d1, DateRange d2)
	    {
	        return d1.Equals(d2);
	    }

        /// <summary>
        /// Implements the operator !=.
        /// </summary>
        /// <param name="d1">The d1.</param>
        /// <param name="d2">The d2.</param>
        /// <returns><see langword="true" /> if the left hand (d1) DOES NOT equals the right hand (d2) otherwise, <see langword="false" />.</returns>
        public static bool operator !=(DateRange d1, DateRange d2)
	    {
	        return !d1.Equals(d2);
	    }


		#endregion Public Methods

		#endregion Methods
	
	}
}
