using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OI.Auth.Models.Requests;
using OI.Auth.Security;
using OI.Auth.Utilities;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Controllers;

/// <summary>Create, change, disable and delete users. Administrators only.</summary>
[Route("api/admin/users")]
[ApiController]
[Authorize(Policy = AdminPolicy.NAME)]
public class AdminUsersController(IAuthAdminManager adminManager) : ControllerBase
{
    private readonly IAuthAdminManager _adminManager = adminManager ?? throw new ArgumentNullException(nameof(adminManager));

    /// <summary>
    /// One page of users, ordered by email. The search matches part of the email or the name.
    /// </summary>
    [HttpGet]
    [ProducesResponseType<PagedResult<AdminUser>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> List([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 25, CancellationToken cancellationToken = default)
    {
        return Ok(await _adminManager.GetUsersAsync(search, page, pageSize, cancellationToken));
    }

    /// <summary>
    /// Retrieves the details of an admin user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the admin user to retrieve.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// An <see cref="IActionResult"/> containing the admin user details if found, 
    /// or a 404 Not Found response if the user does not exist.
    /// </returns>
    /// <response code="200">Returns the details of the admin user.</response>
    /// <response code="404">Indicates that the admin user with the specified ID was not found.</response>
    [HttpGet("{id}")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string id, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.GetUserAsync(id, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    /// <summary>
    /// Creates a new user based on the provided request.
    /// </summary>
    /// <param name="request">
    /// The <see cref="CreateUserRequest"/> containing the details of the new admin user to be created.
    /// </param>
    /// <param name="cancellationToken">
    /// A <see cref="CancellationToken"/> to observe while waiting for the task to complete.
    /// </param>
    /// <returns>
    /// An <see cref="IActionResult"/> representing the result of the operation:
    /// <list type="bullet">
    /// <item><description>Returns <see cref="StatusCodes.Status201Created"/> if the user is successfully created.</description></item>
    /// <item><description>Returns <see cref="StatusCodes.Status400BadRequest"/> if the request is invalid.</description></item>
    /// <item><description>Returns <see cref="StatusCodes.Status409Conflict"/> if a conflict occurs, such as a duplicate user.</description></item>
    /// </list>
    /// </returns>
    [HttpPost]
    [ProducesResponseType<AdminUser>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateUserRequest request, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.CreateUserAsync(
            new NewAdminUser(request.Email, request.DisplayName, request.Password, request.Roles, request.Groups), cancellationToken);
        return result.Succeeded
            ? CreatedAtAction(nameof(Get), new { id = result.Value!.Id }, result.Value)
            : this.ToProblem(result);
    }

    /// <summary>
    /// Changes the name and replaces the user's roles and groups with exactly the ones sent.
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateUserRequest request, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.UpdateUserAsync(
            id, new UpdateAdminUser(request.DisplayName, request.Roles, request.Groups), cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    /// <summary>
    /// Resets the password for a specified user.
    /// </summary>
    /// <param name="id">The unique identifier of the user whose password is to be reset.</param>
    /// <param name="request">The request containing the new password.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// A <see cref="NoContentResult"/> if the password reset is successful.
    /// A <see cref="NotFoundResult"/> if the user is not found.
    /// A problem response if the operation fails for other reasons.
    /// </returns>
    /// <remarks>
    /// This method requires the caller to have administrative privileges.
    /// </remarks>
    [HttpPost("{id}/password")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ResetPassword(string id, [FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        AdminResult result = await _adminManager.ResetPasswordAsync(id, request.NewPassword, cancellationToken);
        return result.Succeeded ? NoContent() : this.ToProblem(result);
    }

    /// <summary>
    /// Disables the specified user account.
    /// </summary>
    /// <param name="id">The unique identifier of the user to disable.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// An <see cref="IActionResult"/> containing the disabled user if successful, or a conflict response if the operation fails.
    /// </returns>
    /// <remarks>
    /// Returns a 200 OK status with the disabled user if the operation succeeds.
    /// Returns a 409 Conflict status if the operation cannot be completed due to a rule violation.
    /// </remarks>
    [HttpPost("{id}/disable")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Disable(string id, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.SetDisabledAsync(id, true, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    /// <summary>
    /// Enables a previously disabled user account.
    /// </summary>
    /// <param name="id">The unique identifier of the user to enable.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// An <see cref="IActionResult"/> containing the enabled user if successful, or a problem response if the operation fails.
    /// </returns>
    /// <response code="200">The user was successfully enabled.</response>
    /// <response code="404">The user with the specified ID was not found.</response>
    [HttpPost("{id}/enable")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Enable(string id, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.SetDisabledAsync(id, false, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    /// <summary>
    /// Deletes a user with the specified identifier.
    /// </summary>
    /// <param name="id">The identifier of the user to delete.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// A <see cref="NoContentResult"/> if the user was successfully deleted.
    /// A <see cref="NotFoundResult"/> if the user with the specified identifier does not exist.
    /// A <see cref="ConflictResult"/> if the deletion is blocked by a rule.
    /// </returns>
    /// <remarks>
    /// This action is restricted to administrators only.
    /// </remarks>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
    {
        AdminResult result = await _adminManager.DeleteUserAsync(id, cancellationToken);
        return result.Succeeded ? NoContent() : this.ToProblem(result);
    }
}
