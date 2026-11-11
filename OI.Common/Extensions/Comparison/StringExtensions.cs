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

using System.Globalization;
using System.Text.RegularExpressions;
using JetBrains.Annotations;
using OI.Common.Exceptions;

namespace OI.Common.Extensions.Comparison
{
    /// <summary>
    /// Class StringExtensions.
    /// </summary>
    public static partial class StringExtensions
    {
        /// <summary>
        /// Determines whether the specified string is null or empty.
        /// </summary>
        /// <param name="s">The string to examine.</param>
        /// <returns><c>true</c> if the specified string is empty or null; otherwise, <c>false</c>.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsEmpty(this string s)
        {
            return string.IsNullOrWhiteSpace(s);
        }//Empty

        /// <summary>
        /// Checks if the input string is not empty.
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns>true if the string is not empty, else false.</returns>
        [ContractAnnotation("null => false")]
        public static bool IsNotEmpty(this string s)
        {
            return (!s.IsEmpty());
        }//NotEmpty

        /// <summary>
        /// Method to check for all decimal digits in a string
        /// </summary>
        /// <param name="number">the string to check</param>
        /// <returns>true - the string is all numbers
        /// false - the string is not all numbers</returns>
        public static bool IsNumeric(this string number)
        {
            bool returnValue;
            try
            {
                NumberFormatInfo format = new NumberFormatInfo();
                returnValue = double.TryParse(number, NumberStyles.Number, format, out double unused);
            }
            catch { returnValue = false; }
            return returnValue;
        }//end of IsNumeric

        /// <summary>
        /// Method that verifies the email format is correct
        /// </summary>
        /// <param name="email">email address to check</param>
        /// <returns>true - the email is in a valid format
        /// false - the email is not a valid email format</returns>
        public static bool IsValidEmail(this string email)
        {
            bool returnValue = false;
            const string REGEX_LOCAL_PART1 = @"(([-!$&*=^`|~#%'+/?_`{}\w]+)(\.([-!$&*=^`|~#%'+/?_`{}\w])+)*)";
            const string REGEX_LOCAL_PART2 = @"(""([^""\r]|\\[""\r\\])+"")";
            const string REGEX_DOMAIN = @"@([\w]+[-.])*[\w]+[.]([a-zA-Z]{2,9})";
            try
            {
                string trimmedEmail = email.Trim();
                string regex = $@"^({REGEX_LOCAL_PART1}|{REGEX_LOCAL_PART2}){REGEX_DOMAIN}$";
                Regex reg = new Regex(regex, RegexOptions.None);
                returnValue = reg.Match(trimmedEmail).Success;
            }
            catch
            {
                // ignored
            }

            return returnValue;
        }//IsValidEmail

        /// <summary>
        /// Method to see if the email address is not in the correct format
        /// </summary>
        /// <param name="email">email address to check</param>
        /// <returns>true - the email is not a valid email format
        /// false - the email is in a valid format</returns>
        public static bool IsNotValidEmail(this string email)
        {
            return (!email.IsValidEmail());
        }

        /// <summary>
        /// Looks for the string in the specified list
        /// </summary>
        /// <param name="stringToFind">The string to find.</param>
        /// <param name="listToSearch">The list to search.</param>
        /// <returns><c>true</c> if string was found, <c>false</c> otherwise.</returns>
        public static bool In(this string stringToFind, IEnumerable<string> listToSearch)
        {
            return listToSearch.Any(tempStr => tempStr == stringToFind);
        }

        /// <summary>
        /// Checks the string to ensure it is not null.  If so an exceptions is thrown
        /// </summary>
        /// <param name="o">The o.</param>
        /// <param name="name">The name.</param>
        /// <exception cref="RequiredObjectException"></exception>
        public static void Required(this string o,string name = "")
        {
            if (o.IsEmpty())
            {
                string msg = name.IsEmpty() ? "" : $"{name} is required";
                throw new RequiredObjectException(msg);
            }
        }
    }
}
