namespace OI.Glue.Models;

/// <summary>What an administrator can change about an existing user. The email is the user's identity and cannot change.</summary>
public sealed record UpdateAdminUser(
    string DisplayName,
    IReadOnlyCollection<string> Roles,
    IReadOnlyCollection<string> Groups);
