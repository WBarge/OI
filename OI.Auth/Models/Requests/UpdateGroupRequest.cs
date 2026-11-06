using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to update a group's description.
/// </summary>
public sealed class UpdateGroupRequest
{
    /// <summary>
    /// Gets or sets the description of the group to be updated.
    /// </summary>
    /// <remarks>
    /// The description is optional and has a maximum length of 200 characters.
    /// </remarks>
    [StringLength(200)] 
    public string? Description { get; set; }
}
