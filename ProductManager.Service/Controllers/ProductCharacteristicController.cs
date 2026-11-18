using Microsoft.AspNetCore.Mvc;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Models.Request;
using Microsoft.AspNetCore.Authorization;
using OI.Integration.Security;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// provides a controller for managing product characteristics.
    /// </summary>
    [Route("api/Product/{productId:guid}/Characteristic")]
    [ApiController]
    public class ProductCharacteristicController : ControllerBase
    {
        private readonly ILogger<ProductCharacteristicController> _logger;
        private readonly IProductService _productService;

        /// <summary>
        /// creates a new instance of the <see cref="ProductCharacteristicController"/> class.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="productService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public ProductCharacteristicController(ILogger<ProductCharacteristicController> logger, IProductService productService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        }

        // GET: api/<ProductCharacteristicController>
        /// <summary>
        /// Gets the product characteristics for a given product.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get(Guid productId)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            IEnumerable<IProductCharacteristic> productCharacteristics = await _productService.ListProductCharacteristicsAsync(productId, token);
            return Ok(productCharacteristics);
        }

        // GET api/Product/{productId:guid}/Characteristic/{id:guid}
        /// <summary>
        /// Gets the product characteristic by ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid productId, Guid id)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            IProductCharacteristic? characteristic = await _productService.ListProductCharacteristicsAsync(productId, token)
                .ContinueWith(t => t.Result.FirstOrDefault(c => c.Id == id), token);
            return Ok(characteristic);
        }

        /// <summary>
        /// Adds a product characteristic.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpPost]
        public async Task<IActionResult> Post(Guid productId,[FromBody] CharacteristicRequest request)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            Guid id = await _productService.AddProductCharacteristicAsync(productId, request.Name, request.Value, token);
            return Ok(id);
        }

        // POST api/Product/{productId:guid}/Characteristic/{id:guid}
        /// <summary>
        /// Deletes a product characteristic.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid productId, Guid id)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;

            await _productService.DeleteProductCharacteristicAsync(id, token);
            return Ok();
        }
    }
}
