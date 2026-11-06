using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

public sealed class CreateGroupRequest
{
    [Required, StringLength(63)] public string Name { get; set; } = "";
    [StringLength(200)] public string? Description { get; set; }
}
