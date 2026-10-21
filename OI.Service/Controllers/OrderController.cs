using CrossCutting.Extensions;
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
public class OrderController(IOrderManager orderManager, ILogger<OrderController> logger) : ControllerBase
{
    private readonly IOrderManager _orderManager = orderManager ?? throw new ArgumentNullException(nameof(orderManager));
    private readonly ILogger<OrderController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Creates a new order.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <param name="request">The create order request.</param>
    /// <returns>The created order.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(IOrder), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateOrder(CancellationToken cancellationToken, [FromBody] CreateOrder? request)
    {
        _logger.LogInformation("POST api/order called");
        IOrder order = await _orderManager.CreateOrderAsync(request, cancellationToken);
        _logger.LogInformation("Created order {OrderNumber}", order.OrderNumber);
        return CreatedAtAction(nameof(CreateOrder), new { id = order.Id }, order);
    }

    /// <summary>
    /// Gets the order for the ID
    /// </summary>
    /// <param name="id">the unique id for the order</param>
    /// <param name="token">the cancellation token</param>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetOrderAsync(Guid id, CancellationToken token)
    {
        _logger.LogInformation("Get api/order/{id} called",id);
        IOrder? order = await _orderManager.GetOrderByIdAsync(id, token);
        return Ok(order);
    }

    /// <summary>
    /// Updates the order
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    /// <exception cref="BadHttpRequestException"></exception>
    [HttpPut]
    [ProducesResponseType( StatusCodes.Status201Created)]
    [ProducesResponseType( StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateOrder(CancellationToken cancellationToken, [FromBody] UpdateOrder request)
    {
        _logger.LogInformation("PUT api/order called");
        if (request == null)
        {
            return new BadRequestResult();
        }

        if (request.Id.IsEmpty())
        {
            throw new BadHttpRequestException("The id of the order is required.");
        }

        if (request.OrderDate.IsEmpty())
        {
            throw new BadHttpRequestException("The order date is required");
        }

        if (request.OrderNumber.IsEmpty())
        {
            throw new BadHttpRequestException("Invalid order number");
        }

        await _orderManager.UpdateOrderAsync(request, cancellationToken);
        _logger.LogInformation("{OrderNumber} was updated",request.OrderNumber);
        return Ok();
    }
}