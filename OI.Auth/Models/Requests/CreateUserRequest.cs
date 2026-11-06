using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

public sealed class CreateUserRequest
{
    [Required, StringLength(256)] public string Email { get; set; } = "";
    [Required, StringLength(100)] public string DisplayName { get; set; } = "";
    [Required, StringLength(128)] public string Password { get; set; } = "";
    public List<string> Roles { get; set; } = [];
    public List<string> Groups { get; set; } = [];
}
