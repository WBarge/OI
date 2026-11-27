using System.Security.Claims;

namespace OI.Auth.Oidc;

/// <summary>The OI.Auth sign-in cookie: the scheme name, what it holds, and how it is built.</summary>
public static class SessionCookie
{
    /// <summary>The authentication scheme (and cookie) name.</summary>
    public const string Scheme = "oi.session";

    /// <summary>The claim holding the signed-in user's id.</summary>
    public const string SubjectClaim = "sub";

    /// <summary>
    /// The claim holding the id of this browser's sign-in. Every authorization created for a UI during this sign-in
    /// carries it, so signing out revokes this browser's tokens and not the same person's other devices.
    /// </summary>
    public const string SessionClaim = "sid";

    /// <summary>A new sign-in session for the user.</summary>
    public static ClaimsPrincipal CreatePrincipal(string userId, string sessionId)
    {
        ClaimsIdentity identity = new(
        [
            new Claim(SubjectClaim, userId),
            new Claim(SessionClaim, sessionId),
        ], Scheme);
        return new ClaimsPrincipal(identity);
    }
}
