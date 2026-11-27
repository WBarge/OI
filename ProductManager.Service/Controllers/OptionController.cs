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
    /// Represents the Option controller.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OptionController : ControllerBase
    {
        /// <summary>
        /// The logger
        /// </summary>
        private readonly ILogger<OptionController> _logger;
        
        /// <summary>
        /// The option service
        /// </summary>
        private readonly IOptionService _optionService;

        /// <summary>
        /// Initializes a new instance of the <see cref="OptionController"/> class.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="optionService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public OptionController(ILogger<OptionController> logger, IOptionService optionService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _optionService = optionService ?? throw new ArgumentNullException(nameof(optionService));
        }

        // GET api/Option/5
        /// <summary>
        /// Gets an option by its ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(Guid id)
        {
            _logger.LogDebug("Get Option received request");
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            IOption? option = await _optionService.GetOptionAsync(id, token);
            if (option == null)
            {
                return NotFound();
            }
            return new OkObjectResult(option);
        }

        // POST api/Option
        /// <summary>
        /// Creates a new option.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] OptionRequest request)
        {
            _logger.LogDebug("Post Option received request");
            if (request == null)
            {
                return BadRequest("Request body is null");
            }else if (request.Name == null || request.Name.Trim() == "")
            {
                return BadRequest("Option name is required");
            }
            else if (request.Price < 0)
            {
                return BadRequest("Option price cannot be negative");
            }

            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            Guid newOptionId = await _optionService.AddOptionAsync(request, token);
            request.Id = newOptionId;

            return new CreatedResult("api/Option", request);// yes take advantage of the request object implementing IOption and return it with the new ID
        }

        // PUT api/Option/
        /// <summary>
        /// Updates an existing option.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpPut()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put([FromBody] OptionRequest request)
        {
            _logger.LogDebug("update Option request received");
            if (request == null)
            {
                return BadRequest("Request body is null");
            }
            else if (request.Id == Guid.Empty)
            {
                return BadRequest("Option ID is required for update");
            }
            else if (string.IsNullOrEmpty(request.Name) || 
                     string.IsNullOrEmpty(request.Description) ||
                     request.Price < 0)
            {
                return BadRequest("Invalid option data");
            }
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            bool updated = await _optionService.UpdateOptionAsync(request, token); 
            return new OkObjectResult(updated);
        }

        // DELETE api/Option/5
        /// <summary>
        /// Deletes an existing option.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(Guid id)
        {
            _logger.LogDebug("delete Option request received");
            if (id == Guid.Empty)
            {
                return BadRequest("Option ID is required for deletion");
            }
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            bool deleted = await _optionService.DeleteOptionAsync(id, token);
            return new OkObjectResult(deleted);
        }
    }
}
