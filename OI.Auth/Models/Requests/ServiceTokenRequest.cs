using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

/// <summary>
/// Represents a request to obtain a service token by providing a client ID and secret.
/// </summary>
public sealed class ServiceTokenRequest
{
    /// <summary>
    /// Gets or sets the unique identifier for the client requesting the service token.
    /// </summary>
    /// <remarks>
    /// This property is required and must be a string with a maximum length of 100 characters.
    /// </remarks>
    [Required, StringLength(100)] 
    public string ClientId { get; set; } = "";
    
    /// <summary>
    /// Gets or sets the client secret used to authenticate the service token request.
    /// </summary>
    /// <remarks>
    /// The client secret is a required field with a maximum length of 512 characters.
    /// </remarks>
    [Required, StringLength(512)] 
    public string ClientSecret { get; set; } = "";
}
