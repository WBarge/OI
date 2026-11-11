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

using OI.Common.Extensions.Comparison;

namespace OI.Common.Extensions.Transformations
{
    /// <summary>
    /// Class ObjectExtensions.
    /// </summary>
    public static partial class ObjectExtensions
    {

        /// <summary>
        /// Convert an object to integer.
        /// </summary>
        /// <param name="o">Object to be converted.</param>
        /// <returns>Integer value of the object or DefaultValues.DEFAULT_INT if object is not a valid int</returns>
        public static int ToInt(this object o)
        {
            return (o.ToInt(int.MinValue));
        }

        /// <summary>
        /// Convert an object to integer.
        /// </summary>
        /// <param name="o">Object to be converted.</param>
        /// <param name="defaultValue">the value if object is not a valid int</param>
        /// <returns>Integer value of the object or defaultValue</returns>
        public static int ToInt(this object o, int defaultValue)
        {
            int returnValue = defaultValue;
            if ((o.IsNotEmpty() && o.ToString() != string.Empty))
            {
                try
                {
                    returnValue = Convert.ToInt32(o.ToString());
                }
                catch
                {
                    // ignored
                }
            }
        
            return returnValue;
        }

    }
}
