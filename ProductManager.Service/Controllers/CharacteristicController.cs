using Microsoft.AspNetCore.Mvc;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using OI.Integration.Security;

namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// Represents the characteristic controller.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CharacteristicController: ControllerBase
    {
        private readonly ILogger<CharacteristicController> _logger;
        private readonly ICharacteristicService _characteristicService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CharacteristicController"/> class.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="characteristicService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public CharacteristicController(ILogger<CharacteristicController> logger, ICharacteristicService characteristicService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _characteristicService = characteristicService ?? throw new ArgumentNullException(nameof(characteristicService));
        }

        /// <summary>
        /// Gets the characteristic by ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<IActionResult> GetCharacteristic(Guid id)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            IFullCharacteristic characteristic = await _characteristicService.GetFullCharacteristicAsync(id, token);
            return Ok(characteristic);
        }

        /// <summary>
        /// Creates a new characteristic.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpPost]
        public async Task<IActionResult> CreateCharacteristic([FromBody] string name)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            ICharacteristic newCharacteristic = await _characteristicService.CreateCharacteristicAsync(name, token);
            return new OkObjectResult(newCharacteristic);
        }

        /// <summary>
        /// Delete a characteristic from the system
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCharacteristic(Guid id)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            await _characteristicService.DeleteCharacteristicAsync(id, token);
            return Ok();
        }
    }
}