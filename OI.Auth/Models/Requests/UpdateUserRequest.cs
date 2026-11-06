using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to update a user's details, including their display name, roles, and groups.
/// </summary>
public sealed class UpdateUserRequest
{
    /// <summary>
    /// Gets or sets the display name of the user to be updated.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 100 characters in length.
    /// </remarks>
    [Required, StringLength(100)] 
    public string DisplayName { get; set; } = "";
    /// <summary>
    /// Gets or sets the roles of the user to be updated.
    /// </summary>
    public List<string> Roles { get; set; } = [];
    /// <summary>
    /// Gets or sets the groups of the user to be updated.
    /// </summary>
    public List<string> Groups { get; set; } = [];
}
