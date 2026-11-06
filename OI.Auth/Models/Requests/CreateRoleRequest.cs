using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

public sealed class CreateRoleRequest
{
    [Required, StringLength(50)] public string Name { get; set; } = "";
}
