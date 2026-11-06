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
[Authorize(Policy = AdminPolicy.Name)]
public class AdminGroupsController(IAuthAdminManager adminManager) : ControllerBase
{
    private readonly IAuthAdminManager _adminManager = adminManager ?? throw new ArgumentNullException(nameof(adminManager));

    [HttpGet]
    [ProducesResponseType<IReadOnlyCollection<AdminGroup>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> List(CancellationToken cancellationToken)
    {
        return Ok(await _adminManager.GetGroupsAsync(cancellationToken));
    }

    /// <summary>One group and the users in it.</summary>
    [HttpGet("{name}")]
    [ProducesResponseType<AdminGroupDetail>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string name, CancellationToken cancellationToken)
    {
        AdminResult<AdminGroupDetail> result = await _adminManager.GetGroupAsync(name, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

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

    /// <summary>Changes the description. The name never changes, because policies and the hub use it.</summary>
    [HttpPut("{name}")]
    [ProducesResponseType<AdminGroup>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(string name, [FromBody] UpdateGroupRequest request, CancellationToken cancellationToken)
    {
        AdminResult<AdminGroup> result = await _adminManager.UpdateGroupAsync(name, request.Description, cancellationToken);
        return result.Succeeded ? Ok(result.Value) : this.ToProblem(result);
    }

    [HttpDelete("{name}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string name, CancellationToken cancellationToken)
    {
        AdminResult result = await _adminManager.DeleteGroupAsync(name, cancellationToken);
        return result.Succeeded ? NoContent() : this.ToProblem(result);
    }
}
