// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="RequiredObjectException.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary>
//  This is a domain specific error and is encoded so a centralized error handling mechanism can be created at the highest level of the application.
//  This allows the developer to delineate between an argumentNull exception from the system and bad data being passed
// </summary>
// 
// ***********************************************************************

namespace OI.Common.Exceptions
{
    /// <summary>
    /// Class RequiredObjectException.
    /// Implements the <see cref="Exception" />
    /// </summary>
    /// <seealso cref="Exception" />
    public class RequiredObjectException: Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RequiredObjectException" /> class.
        /// </summary>
        public RequiredObjectException() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="RequiredObjectException" /> class.
        /// </summary>
        /// <param name="message">A message that describes the error.</param>
        public RequiredObjectException(string message) : base(message) { }
        /// <summary>
        /// Initializes a new instance of the <see cref="RequiredObjectException" /> class.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="inner">The inner.</param>
        public RequiredObjectException(string message, Exception inner) : base(message, inner) { }
    }
}