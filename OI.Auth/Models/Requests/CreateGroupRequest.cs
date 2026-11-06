using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to create a new administrative group.
/// </summary>
/// <remarks>
/// This request includes the necessary details such as the group's name and an optional description.
/// The <see cref="Name"/> property is required and must adhere to specific length constraints.
/// </remarks>
public sealed class CreateGroupRequest
{
    /// <summary>
    /// Gets or sets the name of the group to be created.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 63 characters in length.
    /// </remarks>
    /// <value>
    /// A <see cref="string"/> representing the name of the group.
    /// </value>
    /// <exception cref="ValidationException">
    /// Thrown if the value does not meet the required constraints.
    /// </exception>
    [Required, StringLength(63)] public string Name { get; set; } = "";
    /// <summary>
    /// Gets or sets the description of the group to be created.
    /// </summary>
    /// <value>
    /// A <see cref="string"/> representing the description of the group.
    /// </value>
    [StringLength(200)] public string? Description { get; set; }
}
