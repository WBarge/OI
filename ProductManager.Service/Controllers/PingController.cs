// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-21-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-21-2024
// ***********************************************************************
// <copyright file="PingController.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// Class PingController.
    /// Implements the <see cref="ControllerBase" />
    /// </summary>
    /// <seealso cref="ControllerBase" />
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        /// <summary>
        /// Will always return a 200
        /// This endpoint it to be used to validate the service is up and running
        /// </summary>
        /// <returns>IActionResult.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}
