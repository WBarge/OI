using Microsoft.AspNetCore.Mvc;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Service.Models.Requests;

namespace OI.Service.Controllers;

/// <summary>
/// deal with single customer actions
/// </summary>
/// <param name="customerManager"></param>
/// <param name="logger"></param>
[Route("api/[controller]")]
[ApiController]
public class CustomerController(ICustomerManager customerManager, ILogger<CustomerController> logger) : ControllerBase
{
    private readonly ICustomerManager _customerManager = customerManager ?? throw new ArgumentNullException(nameof(customerManager));
    private readonly ILogger<CustomerController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Get a customer by their id
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ICustomer), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCustomerById(Guid id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("GET api/customer/{CustomerId} called", id);
        ICustomer? customer = await _customerManager.GetCustomerByIdAsync(id, cancellationToken);
        if (customer is null)
        {
            _logger.LogInformation("Customer {CustomerId} was not found", id);
            return NotFound();
        }

        return Ok(customer);
    }

    /// <summary>
    /// Adds a customer.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <param name="request">The customer to add. LastName and PhoneNumber are required.</param>
    /// <returns>201 Created with the new customer, and a Location header pointing at <see cref="GetCustomerById"/>.
    /// 400 Bad Request when the body is missing, a required value is missing or a value is too long.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(ICustomer), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateCustomer(CancellationToken cancellationToken, [FromBody] CreateCustomer? request)
    {
        _logger.LogInformation("POST api/customer called");
        ICustomer customer = await _customerManager.CreateCustomerAsync(request, cancellationToken);
        _logger.LogInformation("Created customer {CustomerId}", customer.Id);
        return CreatedAtAction(nameof(GetCustomerById), new { id = customer.Id }, customer);
    }

    /// <summary>
    /// Update the customer in the system
    /// </summary>
    /// <param name="token"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    [HttpPut]
    public async Task<IActionResult> UpdateCustomer(CancellationToken token, [FromBody] UpdateCustomer request)
    {
        ArgumentNullException.ThrowIfNull(request);
        _logger.LogInformation("PUT api/customer called");
        await _customerManager.UpdateCustomerAsync(request, token);
        _logger.LogInformation("Updated customer {id}",request.Id);
        return Ok();
    }
}