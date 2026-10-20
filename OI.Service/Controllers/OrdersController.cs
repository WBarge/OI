using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Models.Requests;
using OI.Service.Models.Transformers;

namespace OI.Service.Controllers
{
    /// <summary>
    /// end points for dealing with multiple orders
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(IOrderManager orderManager,ILogger<IOrderManager> logger) : ControllerBase
    {

        private readonly IOrderManager _orderManager = orderManager ?? throw new ArgumentNullException(nameof(orderManager));
        private readonly ILogger<IOrderManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        /// <summary>
        /// Retrieves a paginated list of orders using the requested filters and pagination settings.
        /// </summary>
        /// <param name="cancellationToken">
        /// A token used to cancel the asynchronous request.
        /// </param>
        /// <param name="request">
        /// The filtering, page number, and page size settings. Defaults to an empty request when
        /// <see langword="null"/>.
        /// </param>
        /// <returns>
        /// An HTTP 200 response containing the matching orders and the total number of records.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrders(CancellationToken cancellationToken, [FromBody] ListRequest request)
        {
            _logger.LogInformation("POST api/orders called");
            request ??= new ListRequest();
            Dictionary<string, IFilterMetaData[]>? filters = FilterTransformers.TransformFilters(request);
            PagedResult<IOrderSearch> result =
                await _orderManager.GetOrdersPagedAsync(filters, request.Page, request.PageSize, cancellationToken);
            return Ok(new { data = result.Data, totalRecordSize = result.TotalRecordSize });
        }
    }
}
