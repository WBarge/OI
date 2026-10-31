using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class AuthUser : IAuthUser
{
    public string Id { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public DateTimeOffset? LockoutEnd { get; set; }
    public IReadOnlyCollection<string> Roles { get; set; } = [];
    public IReadOnlyCollection<KeyValuePair<string, string>> Claims { get; set; } = [];
}
