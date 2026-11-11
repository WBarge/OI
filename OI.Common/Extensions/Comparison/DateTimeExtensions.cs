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

using JetBrains.Annotations;

namespace OI.Common.Extensions.Comparison
{
    /// <summary>
    /// Class DateTimeExtensions.
    /// </summary>
    public static partial class DateTimeExtensions
    {
        /// <summary>
        /// Checks if the input datetime is empty.
        /// </summary>
        /// <param name="obj">datetime to be checked.</param>
        /// <returns>true if the obj is null or == DateTime.MinValue or == DateTime.MaxValue, else false.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsEmpty(this DateTime obj)
        {
            return ((object)obj).IsEmpty() || obj == DateTime.MinValue || obj == DateTime.MaxValue;
        }//Empty

        /// <summary>
        /// Checks if the input System.DateTime is not empty.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns>true if the System.DateTime is not empty.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsNotEmpty(this DateTime obj)
        {
            return (!obj.IsEmpty());
        }

        /// <summary>
        /// Determines whether the specified object is empty.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns><c>true</c> if the specified object is empty; otherwise, <c>false</c>.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsEmpty(this DateTime? obj)
        {
            return !obj.HasValue || obj.Value.IsEmpty();
        }

        /// <summary>
        /// Determines whether [is not empty] [the specified object].
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns><c>true</c> if [is not empty] [the specified object]; otherwise, <c>false</c>.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsNotEmpty(this DateTime? obj)
        {
            return (!obj.IsEmpty());
        }

    }
}
