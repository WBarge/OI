using System.Security.Cryptography;
using System.Text;
// ReSharper disable ClassNeverInstantiated.Global

namespace OI.Auth.Security;

/// <summary>
/// Applications allowed to call other applications. Read from the "ServiceClients" section.
/// Keep the secrets in user-secrets or environment variables, e.g.:
///   ServiceClients:0:ClientId = oi-reporting
///   ServiceClients:0:Secret   = (long random value)
///   ServiceClients:0:Scopes:0 = hub:publish
/// </summary>
public sealed class ServiceClientRegistry(IConfiguration configuration)
{
    private readonly List<ServiceClient> _clients =
        configuration.GetSection("ServiceClients").Get<List<ServiceClient>>() ?? [];

    /// <summary>The client if the id and secret match, otherwise null. The comparison takes the same time either way.</summary>
    public ServiceClient? Validate(string clientId, string secret)
    {
        ServiceClient? client = _clients.FirstOrDefault(c => string.Equals(c.ClientId, clientId, StringComparison.Ordinal));
        byte[] expected = SHA256.HashData(Encoding.UTF8.GetBytes(client?.Secret ?? Guid.NewGuid().ToString("N")));
        byte[] given = SHA256.HashData(Encoding.UTF8.GetBytes(secret));
        bool match = CryptographicOperations.FixedTimeEquals(expected, given);
        return match && client is { Secret.Length: > 0 } ? client : null;
    }
}
