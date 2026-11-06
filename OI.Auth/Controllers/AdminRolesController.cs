using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OI.Auth.Models.Requests;
using OI.Auth.Security;
using OI.Auth.Utilities;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Controllers;

/// <summary>List, create and delete roles. Administrators only.</summary>
[Route("api/admin/roles")]
[ApiController]
[Authorize(Policy = AdminPolicy.NAME)]
public class AdminRolesController(IAuthAdminManager adminManager) : ControllerBase
{
    private readonly IAuthAdminManager _adminManager = adminManager ?? throw new ArgumentNullException(nameof(adminManager));

    /// <summary>
    /// Retrieves a list of all administrative roles.
    /// </summary>
    /// <param name="cancellationToken">
    /// A <see cref="CancellationToken"/> to observe while waiting for the task to complete.
    /// </param>
    /// <returns>
    /// An <see cref="IActionResult"/> containing a collection of <see cref="AdminRole"/> objects if successful.
    /// </returns>
    /// <remarks>
    /// This endpoint is restricted to administrators only and requires the "Admin" role.
    /// </remarks>
    [HttpGet]
    [ProducesResponseType<IReadOnlyCollection<AdminRole>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> List(CancellationToken cancellationToken)
    {
        return Ok(await _adminManager.GetRolesAsync(cancellationToken));
    }

    /// <summary>
    /// Creates a new role.
    /// </summary>
    /// <param name="request">
    /// The request containing the details of the role to be created. 
    /// The <see cref="CreateRoleRequest.Name"/> property must be provided and adhere to the required constraints.
    /// </param>
    /// <param name="cancellationToken">
    /// A token to monitor for cancellation requests.
    /// </param>
    /// <returns>
    /// A <see cref="CreatedResult"/> containing the newly created role if successful, 
    /// or an appropriate error response:
    /// <list type="bullet">
    /// <item><description>400 Bad Request if the input is invalid.</description></item>
    /// <item><description>409 Conflict if a role with the same name already exists.</description></item>
    /// </list>
    /// </returns>
    /// <remarks>
    /// Only accessible to administrators. The created role's name will be URL-encoded in the response location.
    /// </remarks>
    [HttpPost]
    [ProducesResponseType<AdminRole>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] CreateRoleRequest request, CancellationToken cancellationToken)
    {
        AdminResult<AdminRole> result = await _adminManager.CreateRoleAsync(request.Name, cancellationToken);
        return result.Succeeded
            ? Created($"api/admin/roles/{Uri.EscapeDataString(result.Value!.Name)}", result.Value)
            : this.ToProblem(result);
    }

    /// <summary>
    /// Deletes a role by its name.
    /// </summary>
    /// <param name="name">The name of the role to delete.</param>
    /// <param name="cancellationToken">A token to monitor for cancellation requests.</param>
    /// <returns>
    /// A <see cref="NoContentResult"/> if the role was successfully deleted.
    /// A <see cref="NotFoundResult"/> if the specified role does not exist.
    /// A <see cref="ConflictResult"/> if the role is built-in or in use.
    /// </returns>
    /// <response code="204">The role was successfully deleted.</response>
    /// <response code="404">The specified role was not found.</response>
    /// <response code="409">The role is built-in or currently in use.</response>
    [HttpDelete("{name}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Delete(string name, CancellationToken cancellationToken)
    {
        AdminResult result = await _adminManager.DeleteRoleAsync(name, cancellationToken);
        return result.Succeeded ? NoContent() : this.ToProblem(result);
    }
}
