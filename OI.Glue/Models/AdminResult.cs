namespace OI.Glue.Models;

public enum AdminStatus
{
    Ok,
    /// <summary>What was asked for does not exist.</summary>
    NotFound,
    /// <summary>The request itself is wrong (a missing field, a password that is too short, an unknown role).</summary>
    Invalid,
    /// <summary>The request is fine but a rule stops it (a duplicate, the last administrator, removing your own access).</summary>
    Conflict,
}

public interface IAdminResult
{
    AdminStatus Status { get; }
    string? Message { get; }
}

/// <summary>The outcome of an administration operation that returns nothing.</summary>
public sealed class AdminResult : IAdminResult
{
    private AdminResult(AdminStatus status, string? message)
    {
        Status = status;
        Message = message;
    }

    public AdminStatus Status { get; }
    public string? Message { get; }
    public bool Succeeded => Status == AdminStatus.Ok;

    public static AdminResult Ok() => new(AdminStatus.Ok, null);
    public static AdminResult NotFound(string message) => new(AdminStatus.NotFound, message);
    public static AdminResult Invalid(string message) => new(AdminStatus.Invalid, message);
    public static AdminResult Conflict(string message) => new(AdminStatus.Conflict, message);
}

/// <summary>The outcome of an administration operation that returns a value when it works.</summary>
public sealed class AdminResult<T> : IAdminResult
{
    private AdminResult(AdminStatus status, string? message, T? value)
    {
        Status = status;
        Message = message;
        Value = value;
    }

    public AdminStatus Status { get; }
    public string? Message { get; }
    public T? Value { get; }
    public bool Succeeded => Status == AdminStatus.Ok;

    public static AdminResult<T> Ok(T value) => new(AdminStatus.Ok, null, value);
    public static AdminResult<T> NotFound(string message) => new(AdminStatus.NotFound, message, default);
    public static AdminResult<T> Invalid(string message) => new(AdminStatus.Invalid, message, default);
    public static AdminResult<T> Conflict(string message) => new(AdminStatus.Conflict, message, default);
}
