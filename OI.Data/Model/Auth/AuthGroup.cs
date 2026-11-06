namespace OI.Data.Model.Auth;

/// <summary>A group users can belong to. Its name travels in the access token as a "group" claim.</summary>
internal class AuthGroup
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    /// <summary>
    /// The group's rows in the join table. To get to the users, go through the membership:
    /// <c>group.Members.Select(m => m.User)</c>.
    /// </summary>
    public ICollection<AuthGroupMember> Members { get; set; } = new List<AuthGroupMember>();
}
