using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class AuthCredential : IAuthCredential
{
    public string UserId { get; set; } = string.Empty;
    public string? PasswordHash { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }
    public int AccessFailedCount { get; set; }
}
