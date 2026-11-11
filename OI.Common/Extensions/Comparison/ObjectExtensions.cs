// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="ObjectExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using JetBrains.Annotations;
using OI.Common.Exceptions;

namespace OI.Common.Extensions.Comparison
{
    /// <summary>
    /// Class ObjectExtensions.
    /// </summary>
    public static partial class ObjectExtensions
    {
        /// <summary>
        /// Checks if the input variable is null or empty.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns>true if the object is null else false.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsEmpty(this object? obj)
        {
            return (obj == null);
        } //Empty

        /// <summary>
        /// Checks if the input variable is not empty.
        /// </summary>
        /// <param name="o">Object to be checked.</param>
        /// <returns>true if the object is not empty, else false.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsNotEmpty(this object? o)
        {
            return !o.IsEmpty();
        } //NotEmpty

        /// <summary>
        /// Checks the object to ensure it is not null.  If so an exceptions is thrown
        /// </summary>
        /// <param name="o">The object to check</param>
        /// <param name="name">When set, it will cause the message in the exception to {name} is required</param>
        /// <exception cref="RequiredObjectException"></exception>
        public static void Required(this object? o,string name = "")
        {
            if (o.IsEmpty())
            {
                string msg = StringExtensions.IsEmpty(name) ? "" : $"{name} is required";
                throw new RequiredObjectException(msg);
            }
        }

    }
}
