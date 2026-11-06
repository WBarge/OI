namespace OI.Glue.Models;

/// <summary>A user as the administration screens see them.</summary>
public sealed record AdminUser(
    string Id,
    string Email,
    string DisplayName,
    DateTimeOffset? LockoutEnd,
    IReadOnlyCollection<string> Roles,
    IReadOnlyCollection<string> Groups)
{
    /// <summary>
    /// A user is disabled by locking them out until the end of time. A temporary lockout (too many wrong passwords)
    /// ends by itself; this one only ends when an administrator enables the user again.
    /// </summary>
    public static readonly DateTimeOffset DisabledUntil = DateTimeOffset.MaxValue;

    public bool IsDisabled => LockoutEnd is { } end && end.Year >= 9999;

    public bool IsLockedOut(DateTimeOffset now) => LockoutEnd is { } end && end > now;
}
