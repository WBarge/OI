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
[Authorize(Policy = AdminPolicy.Name)]
public class AdminRolesController(IAuthAdminManager adminManager) : ControllerBase
{
    private readonly IAuthAdminManager _adminManager = adminManager ?? throw new ArgumentNullException(nameof(adminManager));

    [HttpGet]
    [ProducesResponseType<IReadOnlyCollection<AdminRole>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> List(CancellationToken cancellationToken)
    {
        return Ok(await _adminManager.GetRolesAsync(cancellationToken));
    }

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
