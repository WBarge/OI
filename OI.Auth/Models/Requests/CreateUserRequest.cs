using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to create a new administrative user.
/// </summary>
/// <remarks>
/// This request includes the necessary details such as the user's email, display name, and password.
/// The <see cref="Email"/> property is required and must be a valid email address.
/// The <see cref="DisplayName"/> property is required and must not exceed 100 characters in length.
/// The <see cref="Password"/> property is required and must not exceed 128 characters in length.
/// </remarks>
public sealed class CreateUserRequest
{
    /// <summary>
    /// Gets or sets the email address of the user to be created.
    /// </summary>
    /// <remarks>
    /// This property is required and must be a valid email address.
    /// </remarks>
    [Required, StringLength(256)] 
    public string Email { get; set; } = "";

    /// <summary>
    /// Gets or sets the display name of the user being created.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 100 characters in length.
    /// </remarks>
    [Required, StringLength(100)] 
    public string DisplayName { get; set; } = "";
    /// <summary>
    /// Gets or sets the password for the user being created.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 128 characters in length.
    /// </remarks>
    [Required, StringLength(128)] 
    public string Password { get; set; } = "";
    /// <summary>
    /// Gets or sets the roles for the user being created.
    /// </summary>
    /// <remarks>
    /// This property is optional and can contain multiple roles.
    /// </remarks>
    public List<string> Roles { get; set; } = [];
    /// <summary>
    /// Gets or sets the groups for the user being created.
    /// </summary>
    /// <remarks>
    /// This property is optional and can contain multiple groups.
    /// </remarks>
    public List<string> Groups { get; set; } = [];
}
