using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using OI.Auth.Security;

namespace OI.Auth.Tests.TestSupport;

/// <summary>A host environment with a name the test chooses.</summary>
internal sealed class FakeHostEnvironment(string environmentName) : IHostEnvironment
{
    public string EnvironmentName { get; set; } = environmentName;
    public string ApplicationName { get; set; } = "OI.Auth.Tests";
    public string ContentRootPath { get; set; } = ".";
    public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
}

/// <summary>A clock that always says the same time, so token lifetimes can be asserted exactly.</summary>
internal sealed class FixedClock(DateTimeOffset now) : TimeProvider
{
    public override DateTimeOffset GetUtcNow() => now;
}

internal static class AuthTestSupport
{
    public static readonly DateTimeOffset Now = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    public static JwtOptions DefaultOptions() => new() { Issuer = "https://auth.test", Audience = "oi" };

    /// <summary>
    /// One key for every test that does not care which key it is. The provider always generates a 4096-bit key first,
    /// which takes a moment, so tests share this one instead of making a key each.
    /// </summary>
    public static readonly Lazy<SigningKeyProvider> SharedKeys = new(() => new SigningKeyProvider(
        Options.Create(DefaultOptions()), new FakeHostEnvironment(Environments.Development), NullLogger<SigningKeyProvider>.Instance));

    public static AccessTokenFactory Factory(JwtOptions? options = null, DateTimeOffset? now = null) =>
        new(SharedKeys.Value, Options.Create(options ?? DefaultOptions()), new FixedClock(now ?? Now));
}
