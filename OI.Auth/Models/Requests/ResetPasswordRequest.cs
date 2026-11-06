using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to reset a user's password.
/// </summary>
/// <remarks>
/// This request is used to provide the new password for a user during a password reset operation.
/// </remarks>
public sealed class ResetPasswordRequest
{
    /// <summary>
    /// Gets or sets the new password for the user.
    /// </summary>
    /// <remarks>
    /// This property is required and must not exceed 128 characters in length.
    /// </remarks>
    [Required, StringLength(128)] 
    public string NewPassword { get; set; } = "";
}
