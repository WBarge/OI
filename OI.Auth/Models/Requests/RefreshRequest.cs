using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to refresh an access token using a refresh token.
/// </summary>
public sealed class RefreshRequest
{
    /// <summary>
    /// Gets or sets the refresh token used to request a new access token.
    /// </summary>
    /// <remarks>
    /// The refresh token is a required string with a maximum length of 512 characters.
    /// </remarks>
    [Required, StringLength(512)] 
    public string RefreshToken { get; set; } = "";
}