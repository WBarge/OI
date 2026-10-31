using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to log in to the system using an email and password.
/// </summary>
public sealed class LoginRequest
{
    /// <summary>
    /// Gets or sets the email address of the user attempting to log in.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 256 characters in length.
    /// </remarks>
    [Required, StringLength(256)] 
    public string Email { get; set; } = "";
    /// <summary>
    /// Gets or sets the password used for authentication.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 256 characters.
    /// </remarks>
    [Required, StringLength(256)] 
    public string Password { get; set; } = "";
}