using Microsoft.AspNetCore.Identity;

namespace OI.Data.Model.Auth;

internal class ApplicationUser : IdentityUser
{
    public string? DisplayName { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
