namespace OI.Glue.Models;

/// <summary>
/// The sign-in rules. Defaults apply unless an application registers its own instance before BusinessDi.ConfigureAuthDi.
/// </summary>
public sealed record AuthPolicy(int MaxFailedAttempts = 5, TimeSpan? LockoutDuration = null, int MinPasswordLength = 12)
{
    public TimeSpan LockoutFor => LockoutDuration ?? TimeSpan.FromMinutes(15);
}
