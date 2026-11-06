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
[Authorize(Policy = AdminPolicy.Name)]
public class AdminUsersController(IAuthAdminManager adminManager) : ControllerBase
{
    private readonly IAuthAdminManager _adminManager = adminManager ?? throw new ArgumentNullException(nameof(adminManager));

    /// <summary>One page of users, ordered by email. The search matches part of the email or the name.</summary>
    [HttpGet]
    [ProducesResponseType<PagedResult<AdminUser>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> List([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 25, CancellationToken cancellationToken = default)
    {
        return Ok(await _adminManager.GetUsersAsync(search, page, pageSize, cancellationToken));
    }

    [HttpGet("{id}")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string id, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.GetUserAsync(id, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

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

    /// <summary>Changes the name and replaces the user's roles and groups with exactly the ones sent.</summary>
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

    [HttpPost("{id}/password")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ResetPassword(string id, [FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        AdminResult result = await _adminManager.ResetPasswordAsync(id, request.NewPassword, cancellationToken);
        return result.Succeeded ? NoContent() : this.ToProblem(result);
    }

    [HttpPost("{id}/disable")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Disable(string id, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.SetDisabledAsync(id, true, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    [HttpPost("{id}/enable")]
    [ProducesResponseType<AdminUser>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Enable(string id, CancellationToken cancellationToken)
    {
        AdminResult<AdminUser> result = await _adminManager.SetDisabledAsync(id, false, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

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
