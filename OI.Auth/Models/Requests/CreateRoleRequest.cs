using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to create a new administrative role.
/// </summary>
/// <remarks>
/// This request includes the necessary details such as the role's name.
/// The <see cref="Name"/> property is required and must adhere to specific length constraints.
/// </remarks>
public sealed class CreateRoleRequest
{
    /// <summary>
    /// Gets or sets the name of the role to be created.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 50 characters in length.
    /// </remarks>
    /// <value>
    /// A <see cref="string"/> representing the name of the role.
    /// </value>
    /// <exception cref="ValidationException">
    /// Thrown if the value does not meet the required constraints.
    /// </exception>
    [Required, StringLength(50)] public string Name { get; set; } = "";
}
