using Microsoft.AspNetCore.Identity;
using OI.Glue.Services;

namespace OI.Auth.Security;

/// <summary>
/// Password hashing with ASP.NET Core Identity's PasswordHasher (PBKDF2, random salt, versioned format).
/// Only the hasher is used here, not UserManager; the rules that decide when to call it are in OI.Business.
/// </summary>
public sealed class IdentityPasswordService : IPasswordService
{
    private readonly PasswordHasher<object> _hasher = new();//yes this a tightly coupled dependency - this is reuse and is okay in this case.
    private readonly object _noUser = new();   // the default hasher ignores the user; the API just requires one

    /// <summary>
    /// Generates a hashed representation of the specified password using ASP.NET Core Identity's PasswordHasher.
    /// </summary>
    /// <param name="password">The plain text password to hash.</param>
    /// <returns>A hashed password string in a versioned format with a random salt.</returns>
    public string Hash(string password) => _hasher.HashPassword(_noUser, password);

    /// <summary>
    /// Verifies whether the provided password matches the specified hashed password.
    /// </summary>
    /// <param name="passwordHash">The hashed password to verify against.</param>
    /// <param name="password">The plain-text password to verify.</param>
    /// <returns>
    /// <c>true</c> if the password matches the hashed password; otherwise, <c>false</c>.
    /// </returns>
    public bool Verify(string passwordHash, string password) =>
        _hasher.VerifyHashedPassword(_noUser, passwordHash, password) != PasswordVerificationResult.Failed;
}
