namespace OI.Glue.Models;

public sealed record NewAdminUser(
    string Email,
    string DisplayName,
    string Password,
    IReadOnlyCollection<string> Roles,
    IReadOnlyCollection<string> Groups);
