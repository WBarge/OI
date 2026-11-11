// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="EnumExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Text;

namespace OI.Common.Extensions.Transformations
{
    /// <summary>
    /// Class EnumExtensions.
    /// </summary>
    public static partial class EnumExtensions
    {
        /// <summary>
        /// Convert the enum to an integer value
        /// </summary>
        /// <param name="theEnum">The enum.</param>
        /// <returns>System.Int32.</returns>
        public static int ToInt(this Enum theEnum)
        {
            int returnValue = (int)(theEnum as object);
            return (returnValue);
        }

        /// <summary>
        /// Convert the enum to its integer value and return the integer value as a string
        /// </summary>
        /// <param name="theEnum">The enum.</param>
        /// <returns>System.String.</returns>
        public static string ToIntString(this Enum theEnum)
        {
            int returnValue = theEnum.ToInt();
            return returnValue.ToString();
        }

        /// <summary>
        /// Convert the enum to a string with a space before each capital letter in the enum
        /// </summary>
        /// <param name="theEnum">The enum.</param>
        /// <returns>System.String.</returns>
        public static string ToSpacedString(this Enum theEnum)
        {
            StringBuilder returnValue = new StringBuilder();
            char[] charList = theEnum.ToString().ToCharArray();
            for (int offSet = 0; offSet < charList.Length; offSet++)
            {
                if (offSet > 0 && charList[offSet] >= 'A' && charList[offSet] <= 'Z')
                {
                    returnValue.Append(" ");
                }

                returnValue.Append(charList[offSet]);
            }
            return (returnValue.ToString().Trim());
        }

        /// <summary>
        /// Gets the values of the enum.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="theEnum">The enum.</param>
        /// <returns>IEnumerable&lt;T&gt;.</returns>
        public static IEnumerable<T> GetValues<T>(this Enum theEnum)
        {
            IEnumerable<T> returnValues = Enum.GetValues(typeof(T)).Cast<T>();
            return returnValues;
        }

    }
}
