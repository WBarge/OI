using Microsoft.AspNetCore.Mvc;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Models.Requests;
using OI.Service.Models.Transformers;

namespace OI.Service.Controllers;

/// <summary>
/// Controller for customer-related endpoints.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class CustomersController(ICustomerManager customerManager, ILogger<CustomersController> logger) : ControllerBase
{
    private readonly ICustomerManager _customerManager = customerManager ?? throw new ArgumentNullException(nameof(customerManager));
    private readonly ILogger<CustomersController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Gets a page of customers.
    /// The request is a Post method because swagger does not currently support sending data in the body of a Get method.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <param name="request">The paging and filter request. Optional; defaults to the first page.</param>
    /// <returns>An object with <c>data</c> (the customers on the page) and <c>totalRecordSize</c> (the total number of customers).</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCustomers(CancellationToken cancellationToken, [FromBody] ListRequest request)
    {
        _logger.LogInformation("POST api/customers called");
        request ??= new ListRequest();

        Dictionary<string, IFilterMetaData[]>? filters = FilterTransformers.TransformFilters(request);
        PagedResult<ICustomerSearch> result = await _customerManager.GetCustomersPagedAsync(filters, request.Page, request.PageSize, cancellationToken);

        return Ok(new { data = result.Data, totalRecordSize = result.TotalRecordSize });
    }
}
