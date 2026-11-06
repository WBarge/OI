using Microsoft.AspNetCore.Identity;

namespace OI.Data.Model.Auth;

internal class ApplicationUser : IdentityUser
{
    public string? DisplayName { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    /// <summary>
    /// The user's rows in the group join table. To get to the groups themselves, go through the membership:
    /// <c>user.GroupMemberships.Select(m => m.Group)</c>.
    /// </summary>
    public ICollection<AuthGroupMember> GroupMemberships { get; set; } = new List<AuthGroupMember>();
}
