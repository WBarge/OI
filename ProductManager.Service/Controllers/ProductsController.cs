// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-29-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 08-20-2024
// ***********************************************************************
// <copyright file="ProductsController.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.AspNetCore.Mvc;
using ProductManager.Service.Models.Request;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Models.Transformers;

namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// Class ProductsController.
    /// Implements the <see cref="ControllerBase" />
    /// </summary>
    /// <seealso cref="ControllerBase" />
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        /// <summary>
        /// The data size
        /// </summary>
        const int DATA_SIZE = 100000;

        /// <summary>
        /// The logger
        /// </summary>
        private readonly ILogger<ProductsController> _logger;
        /// <summary>
        /// The product service
        /// </summary>
        private readonly IProductService _productService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ProductsController" /> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="productService">The product service.</param>
        /// <exception cref="ArgumentNullException">logger</exception>
        /// <exception cref="ArgumentNullException">productService</exception>
        public ProductsController(ILogger<ProductsController> logger, IProductService productService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        }

        /// <summary>
        /// Gets the products using paging
        /// The request is a Post method - swagger does not currently support sending data in the body of a Get methods
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns>IActionResult.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProducts([FromBody] ListRequest? request)
        {
            _logger.LogDebug("request for short product list");
            request ??= new ListRequest();

            if (request.Page is null or < 1 )
            {
                request.Page = 1;
            }

            if (request.PageSize is null or < 1)
            {
                request.PageSize = DATA_SIZE;
            }

            Dictionary<string, IFilterMetaData[]> filters = FilterTransformers.TransformFilters(request);
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            var returnValue = new
                {
                    data = await _productService.GetProductsAsync(filters, request.Page.Value, request.PageSize.Value, token),
                    totalRecordSize = await _productService.GetProductCountAsync(token)
                };
                return new OkObjectResult(returnValue);
            
        }

    }
}
