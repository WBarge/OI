// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-10-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="RootComposition.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using ProductManager.Business;
using ProductManager.Data.EF;

namespace ProductManager.Service.Utilities
{
    /// <summary>
    /// Class RootComposition.
    /// This class is an implementation of the root composition pattern https://freecontent.manning.com/dependency-injection-in-net-2nd-edition-understanding-the-composition-root/
    /// We might want to move this class to a different library (dll) so the service application only depends on that different library and the glue library
    /// </summary>
    public static class RootComposition
    {
        /// <summary>
        /// Configures the di.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <param name="configuration">The configuration.</param>
        public static void ConfigureDi(this IServiceCollection services, IConfiguration configuration)
        {
            DataDi.ConfigureDi(services, configuration);
            BusinessDi.ConfigureDi(services);
        }
    }
}