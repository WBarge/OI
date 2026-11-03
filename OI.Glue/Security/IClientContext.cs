namespace OI.Glue.Security;

/// <summary>
/// Who is making the current request. Built once per request from the validated access token, so
/// controllers and managers can ask "who is calling?" without touching HttpContext or tokens.
/// </summary>
/// <remarks>
/// It only exists while a request is being handled. Work that continues after the response (a report
/// generated in the background, for example) must copy <see cref="UserId"/> out while the request is
/// still running and keep it with the job.
/// </remarks>
public interface IClientContext
{
    /// <summary>False for an anonymous request, and for a call made by another application rather than a person.</summary>
    bool IsAuthenticated { get; }

    /// <summary>The user's id (the token's "sub" claim), which is also what the hub addresses a user by. Empty when not authenticated.</summary>
    string UserId { get; }

    /// <summary>The name to show for the user. Empty when not authenticated.</summary>
    string DisplayName { get; }

    string? Email { get; }

    IReadOnlyCollection<string> Roles { get; }

    /// <summary>The groups the user belongs to (the token's "group" claims).</summary>
    IReadOnlyCollection<string> Groups { get; }
}
