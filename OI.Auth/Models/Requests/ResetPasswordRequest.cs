using System.ComponentModel.DataAnnotations;

namespace OI.Auth.Models.Requests;

public sealed class ResetPasswordRequest
{
    [Required, StringLength(128)] public string NewPassword { get; set; } = "";
}
