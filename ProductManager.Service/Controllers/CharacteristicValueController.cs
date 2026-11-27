using Microsoft.AspNetCore.Mvc;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Models.Result;
using Microsoft.AspNetCore.Authorization;
using OI.Integration.Security;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// Represents a controller for managing characteristic values.
    /// </summary>
    [Route("api/Characteristic/{id:guid}/value")]
    [ApiController]
    public class CharacteristicValueController : ControllerBase
    {
        private readonly ILogger<CharacteristicValueController> _logger;
        private readonly ICharacteristicService _characteristicService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CharacteristicValueController"/> class.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="characteristicService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public CharacteristicValueController(ILogger<CharacteristicValueController> logger,
            ICharacteristicService characteristicService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _characteristicService =
                characteristicService ?? throw new ArgumentNullException(nameof(characteristicService));
        }


        /// <summary>
        /// Adds a value to a characteristic
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpPost]
        public async Task<IActionResult> Post(Guid id, [FromBody] string value)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            ICharacteristicValue result = await _characteristicService.AddValueToCharacteristicAsync(id, value, token);
            return new OkObjectResult(new CharacteristicValueResult(result));
        }

        /// <summary>
        /// delete the characteristic value from the system.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="valueId"></param>
        /// <returns></returns>
        [Authorize(Policy = AdminPolicy.NAME)]
        [HttpDelete("{valueId:guid}")]
        public async Task<IActionResult> Delete(Guid id, Guid valueId)
        {
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;
            await _characteristicService.DeleteCharacteristicValueAsync(id, valueId, token);
            return Ok();
        }

    }
}
