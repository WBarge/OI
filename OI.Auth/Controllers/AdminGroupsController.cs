using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OI.Auth.Models.Requests;
using OI.Auth.Security;
using OI.Auth.Utilities;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Controllers;

/// <summary>List, create, describe and delete groups. Administrators only. Membership is set from the user.</summary>
[Route("api/admin/groups")]
[ApiController]
[Authorize(Policy = AdminPolicy.NAME)]
public class AdminGroupsController(IAuthAdminManager adminManager) : ControllerBase
{
    private readonly IAuthAdminManager _adminManager = adminManager ?? throw new ArgumentNullException(nameof(adminManager));

    /// <summary>
    /// Retrieves a list of all administrative groups.
    /// </summary>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>An <see cref="IActionResult"/> containing a collection of <see cref="AdminGroup"/> objects.</returns>
    /// <remarks>
    /// This method is accessible only to users with the "AdminOnly" policy.
    /// Returns a 200 OK response with the list of groups.
    /// </remarks>
    [HttpGet]
    [ProducesResponseType<IReadOnlyCollection<AdminGroup>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> List(CancellationToken cancellationToken)
    {
        return Ok(await _adminManager.GetGroupsAsync(cancellationToken));
    }

    /// <summary>
    /// Retrieves details for a specific group and the users in it.
    /// </summary>
    [HttpGet("{name}")]
    [ProducesResponseType<AdminGroupDetail>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string name, CancellationToken cancellationToken)
    {
        AdminResult<AdminGroupDetail> result = await _adminManager.GetGroupAsync(name, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    /// <summary>
    /// Creates a new administrative group with the specified details.
    /// </summary>
    /// <param name="request">
    /// The request containing the name and description of the group to be created.
    /// </param>
    /// <param name="cancellationToken">
    /// A token to monitor for cancellation requests.
    /// </param>
    /// <returns>
    /// A <see cref="CreatedAtActionResult"/> containing the newly created group and its location if successful,
    /// or a <see cref="BadRequestResult"/> if the request is invalid, or a <see cref="ConflictResult"/> if a group with the same name already exists.
    /// </returns>
    /// <remarks>
    /// This action is restricted to administrators only.
    /// </remarks>
    [HttpPost]
    [ProducesResponseType<AdminGroup>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateGroupRequest request, CancellationToken cancellationToken)
    {
        AdminResult<AdminGroup> result = await _adminManager.CreateGroupAsync(new NewAdminGroup(request.Name, request.Description), cancellationToken);
        return result.Succeeded
            ? CreatedAtAction(nameof(Get), new { name = result.Value!.Name }, result.Value)
            : this.ToProblem(result);
    }

    /// <summary>
    /// Changes the description. The name never changes, because policies and the hub use it.
    /// </summary>
    /// <param name="name">The name of the group to update.</param>
    /// <param name="request">The request containing the new description.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>An <see cref="IActionResult"/> indicating the result of the operation.</returns        >
    [HttpPut("{name}")]
    [ProducesResponseType<AdminGroup>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(string name, [FromBody] UpdateGroupRequest request, CancellationToken cancellationToken)
    {
        AdminResult<AdminGroup> result = await _adminManager.UpdateGroupAsync(name, request.Description, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    /// <summary>
    /// Deletes an administrative group by its name.
    /// </summary>
    /// <param name="name">The name of the group to delete.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// A <see cref="NoContentResult"/> if the group was successfully deleted.
    /// A <see cref="NotFoundResult"/> if the group does not exist.
    /// </returns>
    /// <remarks>
    /// This operation is restricted to administrators only.
    /// </remarks>
    [HttpDelete("{name}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string name, CancellationToken cancellationToken)
    {
        AdminResult result = await _adminManager.DeleteGroupAsync(name, cancellationToken);
        return result.Succeeded ? NoContent() : this.ToProblem(result);
    }
}
