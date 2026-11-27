// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-10-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="UIExceptionHandlerExtensions.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace ProductManager.Service.Middleware
{
    /// <summary>
    /// Class UiExceptionHandlerExtensions.
    /// This class is responsible for registering an exception handler in the pipeline
    /// </summary>
    public static class UiExceptionHandlerExtensions
    {
        /// <summary>
        /// Uses the UI exception handler.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns>IApplicationBuilder.</returns>
        public static IApplicationBuilder UseUiExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UiExceptionHandler>();
        }
    }
}
