// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="DateTimeExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace OI.Common.Extensions.Transformations
{
    /// <summary>
    /// Class DateTimeExtensions.
    /// </summary>
    public static partial class DateTimeExtensions
    {

        /// <summary>
        /// Converts nullable datetime to a datetime
        /// </summary>
        /// <param name="dt">the nullable datetime</param>
        /// <param name="defaultTime">The default datetime to use if dt is null</param>
        /// <returns>If nullable datetime is null then DateTime.Min else the value passed in</returns>
        public static DateTime ToDateTime(this DateTime? dt, DateTime defaultTime)
        {
            DateTime returnValue = defaultTime;
            if (dt.HasValue)
            {
                returnValue = dt.Value;
            }
            return (returnValue);
        }

        /// <summary>
        /// To the date time.
        /// </summary>
        /// <param name="dt">The dt.</param>
        /// <returns>DateTime.</returns>
        public static DateTime ToDateTime(this DateTime? dt)
        {
            return (dt.ToDateTime(DateTime.MinValue));
        }

    }
}
