// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="CollectionExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using JetBrains.Annotations;

namespace OI.Common.Extensions.Comparison
{
    /// <summary>
    /// Class CollectionExtensions.
    /// </summary>
    public static partial class CollectionExtensions
    {
        /// <summary>
        /// Determines whether the specified object is empty.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj">The object.</param>
        /// <returns><c>true</c> if the specified object is empty; otherwise, <c>false</c>.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsEmpty<T>(this IEnumerable<T> obj)
        {
            return ((object)obj).IsEmpty() || !obj.Any();
        }

        /// <summary>
        /// Determines whether [is not empty] [the specified object].
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj">The object.</param>
        /// <returns><c>true</c> if [is not empty] [the specified object]; otherwise, <c>false</c>.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsNotEmpty<T>(this IEnumerable<T> obj)
        {
            return (!obj.IsEmpty());
        }//Empty

    }
}
