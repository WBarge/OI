// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-09-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-09-2024
// ***********************************************************************
// <copyright file="RequestException.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary>
//      This is a domain specific error and is encoded so a centralized error handling mechanism can be created at the highest level of the application.
// </summary>
// ***********************************************************************

namespace OI.Common.Exceptions
{
    /// <summary>
    /// Class RequestException.
    /// This represents an error in the request to a service or layer
    /// Implements the <see cref="Exception" />
    /// </summary>
    /// <seealso cref="Exception" />
    public class RequestException: Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RequestException" /> class.
        /// </summary>
        public RequestException() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="RequestException" /> class.
        /// </summary>
        /// <param name="message">A message that describes the error.</param>
        public RequestException(string message) : base(message) { }
        /// <summary>
        /// Initializes a new instance of the <see cref="RequestException" /> class.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="inner">The inner.</param>
        public RequestException(string message, Exception inner) : base(message, inner) { }

    }
}
