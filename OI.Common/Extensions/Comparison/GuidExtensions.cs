// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="GuidExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using JetBrains.Annotations;
using OI.Common.Exceptions;

namespace OI.Common.Extensions.Comparison
{
    /// <summary>
    /// Class GuidExtensions.
    /// </summary>
    public static partial class GuidExtensions
    {
        /// <summary>
        /// Checks is the input Guid is empty
        /// </summary>
        /// <param name="g">guid to be checked</param>
        /// <returns>true if the g is null or == Guid.Empty</returns>
        [ContractAnnotation("null => false")]
        public static bool IsEmpty(this Guid g)
        {
            return ((object)g).IsEmpty() || g == Guid.Empty;
        }

        /// <summary>
        /// Checks if the input System.DateTime is not empty.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns>true if the Guid is not empty.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsNotEmpty(this Guid obj)
        {
            return (!obj.IsEmpty());
        }

        /// <summary>
        /// Checks the guid to ensure it is not null.  If so an exceptions is thrown
        /// </summary>
        /// <param name="o">The o.</param>
        /// <param name="name">The name.</param>
        /// <exception cref="RequiredObjectException"></exception>
        public static void Required(this Guid o,string name = "")
        {
            if (o.IsEmpty())
            {
                string msg = name.IsEmpty() ? "" : $"{name} is required";
                throw new RequiredObjectException(msg);
            }
        }
    }
}
