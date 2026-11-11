// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="StringExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Text;
using OI.Common.Extensions.Comparison;

namespace OI.Common.Extensions.Transformations
{
    /// <summary>
    /// Class StringExtensions.
    /// </summary>
    public static partial class StringExtensions
    {

        /// <summary>
        /// Convert the string to an enum
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="str">The string to convert.</param>
        /// <param name="defaultValue">The default value to set the enum to if the string can not be converted.</param>
        /// <returns>The converted value or the default value if conversion fails</returns>
        public static T ToEnum<T>(this string str, T defaultValue) where T : Enum
        {
            T returnValue = defaultValue;

            if (str.IsEmpty()) return returnValue;
            if (Enum.IsDefined(defaultValue.GetType(), str) == false)
            {
                int val = str.ToInt(int.MinValue);
                if (val != int.MinValue && Enum.IsDefined(defaultValue.GetType(), val))
                {
                    returnValue = (T)Enum.Parse(defaultValue.GetType(), str, false);
                }
            }
            else
            {
                returnValue = (T)Enum.Parse(defaultValue.GetType(), str, true);
            }

            return returnValue;
        }

        /// <summary>
        /// To the date time.
        /// </summary>
        /// <param name="str">The date as a string.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns>The converted value of the default value if conversion fails</returns>
        public static DateTime ToDateTime(this string str, DateTime defaultValue)
        {
            DateTime returnValue = defaultValue;
            if (DateTime.TryParse(str, out DateTime result))
            {
                returnValue = result;
            }
            return (returnValue);
        }

        /// <summary>
        /// Converts a string into a byte array using unicode encoding
        /// </summary>
        /// <param name="stringToEncode">The string to encode.</param>
        /// <returns>System.Byte[].</returns>
        public static byte[] ToByteArray(this string stringToEncode)
        {
            byte[] returnValue = new byte[] { };
            if (stringToEncode.IsNotEmpty())
            {
                returnValue = Encoding.Unicode.GetBytes(stringToEncode);
            }
            return returnValue;
        }

        /// <summary>
        /// Truncates the specified maximum size.
        /// </summary>
        /// <param name="stringToTruncate">The string to truncate.</param>
        /// <param name="maxSize">The maximum size.</param>
        /// <returns>System.String.</returns>
        public static string Truncate(this string stringToTruncate, int maxSize)
        {
            return (string.IsNullOrEmpty(stringToTruncate) || stringToTruncate.Length < maxSize)
                ? stringToTruncate
                : stringToTruncate[..maxSize];//new way of doing substring(0,MAX_SIZE)
        }

    }
}
