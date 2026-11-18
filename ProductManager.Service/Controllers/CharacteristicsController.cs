using Microsoft.AspNetCore.Mvc;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;

namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// Represents the characteristics controller.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CharacteristicsController : ControllerBase
    {
        private readonly ILogger<CharacteristicsController> _logger;
        private readonly ICharacteristicService _characteristicService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CharacteristicsController"/> class.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="characteristicService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public CharacteristicsController(ILogger<CharacteristicsController> logger, ICharacteristicService characteristicService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _characteristicService = characteristicService ?? throw new ArgumentNullException(nameof(characteristicService));
        }

        /// <summary>
        /// Gets all characteristics.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCharacteristics() 
        {
            _logger.LogDebug("Retrieving all characteristics.");
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            IEnumerable<IFullCharacteristic> characteristics = await _characteristicService.GetAllCharacteristicsAsync(token);
            return Ok(characteristics);
        }
    }
}