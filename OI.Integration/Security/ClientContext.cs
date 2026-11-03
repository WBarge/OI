using OI.Glue.Security;

namespace OI.Integration.Security;

/// <summary>The caller of the current request. Immutable once built.</summary>
public sealed class ClientContext : IClientContext
{
    /// <summary>Used when nobody is signed in, so callers never have to deal with null.</summary>
    public static ClientContext Anonymous { get; } = new();

    private ClientContext()
    {
        IsAuthenticated = false;
        UserId = string.Empty;
        DisplayName = string.Empty;
        Email = null;
        Roles = [];
        Groups = [];
    }

    public ClientContext(string userId, string displayName, string? email, IEnumerable<string> roles, IEnumerable<string> groups)
    {
        if (string.IsNullOrWhiteSpace(userId))
        {
            throw new ArgumentException("A signed-in user needs an id.", nameof(userId));
        }

        IsAuthenticated = true;
        UserId = userId;
        DisplayName = string.IsNullOrWhiteSpace(displayName) ? userId : displayName;
        Email = email;
        Roles = (roles ?? throw new ArgumentNullException(nameof(roles))).ToArray();
        Groups = (groups ?? throw new ArgumentNullException(nameof(groups))).ToArray();
    }

    /// <inheritdoc />
    public bool IsAuthenticated { get; }

    /// <inheritdoc />
    public string UserId { get; }

    /// <inheritdoc />
    public string DisplayName { get; }

    /// <inheritdoc />
    public string? Email { get; }

    /// <inheritdoc />
    public IReadOnlyCollection<string> Roles { get; }

    /// <inheritdoc />
    public IReadOnlyCollection<string> Groups { get; }
}
