namespace OI.Glue.Models;

public sealed record AdminGroup(string Name, string? Description, int MemberCount);

public sealed record AdminGroupMember(string UserId, string Email, string DisplayName);

public sealed record AdminGroupDetail(string Name, string? Description, IReadOnlyCollection<AdminGroupMember> Members);

public sealed record NewAdminGroup(string Name, string? Description);
