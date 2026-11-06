using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

public sealed class UpdateUserRequest
{
    [Required, StringLength(100)] public string DisplayName { get; set; } = "";
    public List<string> Roles { get; set; } = [];
    public List<string> Groups { get; set; } = [];
}
