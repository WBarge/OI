namespace OI.Data.Model.Auth;

/// <summary>Join entity: one row per user in a group. Maps to the AuthUserGroups table.</summary>
internal class AuthGroupMember
{
    public required string UserId { get; set; }
    public required string GroupId { get; set; }

    /// <summary>The user side of the membership. Populated by EF when loaded or projected; not needed when inserting (set <see cref="UserId"/>).</summary>
    public ApplicationUser User { get; set; } = null!;

    /// <summary>The group side of the membership. Populated by EF when loaded or projected; not needed when inserting (set <see cref="GroupId"/>).</summary>
    public AuthGroup Group { get; set; } = null!;
}
