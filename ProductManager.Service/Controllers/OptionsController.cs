using Microsoft.AspNetCore.Mvc;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Services;
using ProductManager.Service.Models.Request;
using ProductManager.Service.Models.Transformers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManager.Service.Controllers
{
    /// <summary>
    /// Represents the Options controller.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OptionsController : ControllerBase
    {

        /// <summary>
        /// The data size
        /// </summary>
        const int DATA_SIZE = 100000;

        /// <summary>
        /// The logger
        /// </summary>
        private readonly ILogger<OptionsController> _logger;
        
        /// <summary>
        /// The option service
        /// </summary>
        private readonly IOptionService _optionService;

        /// <summary>
        /// Initializes a new instance of the <see cref="OptionsController"/> class.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="optionService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public OptionsController(ILogger<OptionsController> logger, IOptionService optionService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _optionService = optionService ?? throw new ArgumentNullException(nameof(optionService));
        }

        /// <summary>
        /// Gets a list of options.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOptions([FromBody] ListRequest? request)
        {
            _logger.LogDebug("request for list of options");
            request ??= new ListRequest();

            if (request.Page is null or < 1 )
            {
                request.Page = 1;
            }

            if (request.PageSize is null or < 1)
            {
                request.PageSize = DATA_SIZE;
            }
            CancellationToken token = HttpContext?.RequestAborted ?? CancellationToken.None;

            Dictionary<string, IFilterMetaData[]> filters = FilterTransformers.TransformFilters(request);
            var returnValue = new
            {
                data = await _optionService.GetOptionsAsync(filters, request.Page.Value, request.PageSize.Value, token),
                totalRecordSize = await _optionService.GetOptionCountAsync()
            };
            return new OkObjectResult(returnValue);
            
        }
        

    }
}
