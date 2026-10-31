using OI.Glue.Models;

namespace OI.Glue.Services;

/// <summary>Implemented by the OI.Auth application, which owns the signing key. Business code never sees the key.</summary>
public interface IAccessTokenFactory
{
    TimeSpan RefreshTokenLifetime { get; }
    (string Token, DateTimeOffset Expires) CreateUserToken(IAuthUser user);
}
