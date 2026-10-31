namespace OI.Glue.Models;

/// <summary>A user as the rest of the system sees them (no Identity types leak out of OI.Data).</summary>
public interface IAuthUser
{
    string Id { get; }
    string? Email { get; }
    string DisplayName { get; }
    DateTimeOffset? LockoutEnd { get; }
    IReadOnlyCollection<string> Roles { get; }
    /// <summary>Extra claims stored for the user, e.g. ("group", "sales-west"). Group management will feed this later.</summary>
    IReadOnlyCollection<KeyValuePair<string, string>> Claims { get; }
}
