namespace OI.Glue.Models;

public sealed record AdminRole(string Name, bool IsBuiltIn, int UserCount);
