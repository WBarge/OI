using Microsoft.AspNetCore.Mvc;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Models.Requests;

namespace OI.Service.Controllers;

/// <summary>
/// Controller for order-related endpoints.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class OrdersController(IOrderManager orderManager, ILogger<OrdersController> logger) : ControllerBase
{
    private readonly IOrderManager _orderManager = orderManager ?? throw new ArgumentNullException(nameof(orderManager));
    private readonly ILogger<OrdersController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Creates a new order.
    /// </summary>
    /// <param name="request">The create order request.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>The created order.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(IOrder), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrder? request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("POST api/orders called");
        IOrder order = await _orderManager.CreateOrderAsync(request, cancellationToken);
        _logger.LogInformation("Created order {OrderNumber}", order.OrderNumber);
        return CreatedAtAction(nameof(CreateOrder), new { id = order.Id }, order);
    }
}
