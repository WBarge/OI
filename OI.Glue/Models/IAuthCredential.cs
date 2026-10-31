namespace OI.Glue.Models;

/// <summary>What is stored about a user's password and lockout state. Only the sign-in rules should read this.</summary>
public interface IAuthCredential
{
    string UserId { get; }
    string? PasswordHash { get; }
    DateTimeOffset? LockoutEnd { get; }
    int AccessFailedCount { get; }
}
