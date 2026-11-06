using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

public sealed class UpdateGroupRequest
{
    [StringLength(200)] public string? Description { get; set; }
}
