using FluentAssertions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using OI.Auth.Security;

namespace OI.Auth.Tests.SecurityTests;

[TestFixture, Description("Tests for LocalJwtBearerSetup: OI.Auth checking the tokens it issued, with its own key")]
public class LocalJwtBearerSetupTests
{
    private sealed class DevelopmentEnvironment : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = Environments.Development;
        public string ApplicationName { get; set; } = "OI.Auth.Tests";
        public string ContentRootPath { get; set; } = ".";
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }

    private static ServiceProvider BuildProvider(string audience = "oi")
    {
        ServiceCollection services = new();
        services.AddLogging();
        services.AddSingleton<IHostEnvironment>(new DevelopmentEnvironment());
        services.Configure<JwtOptions>(o =>
        {
            o.Issuer = "https://auth.test";
            o.Audience = audience;
        });
        services.AddSingleton(TimeProvider.System);
        services.AddSingleton<SigningKeyProvider>();   // no PEM configured: in Development a temporary key is made
        services.AddSingleton<AccessTokenFactory>();
        services.AddLocalJwtBearer();
        return services.BuildServiceProvider();
    }

    /// <summary>A token shaped like the ones OpenIddict issues for a person: same key, issuer and audience, same claim names.</summary>
    private static string UserToken(ServiceProvider provider, string[] roles, params (string Type, string Value)[] claims)
    {
        JwtOptions jwt = provider.GetRequiredService<IOptions<JwtOptions>>().Value;
        SigningKeyProvider keys = provider.GetRequiredService<SigningKeyProvider>();
        Dictionary<string, object> payload = new() { ["sub"] = "user-1", ["name"] = "Pat Example", ["role"] = roles, ["token_use"] = "user" };
        foreach (IGrouping<string, (string Type, string Value)> group in claims.GroupBy(c => c.Type))
        {
            payload[group.Key] = group.Select(c => c.Value).ToArray();
        }

        return new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = jwt.NormalizedIssuer,
            Audience = jwt.Audience,
            Claims = payload,
            Expires = DateTime.UtcNow.AddMinutes(5),
            SigningCredentials = new SigningCredentials(keys.SigningKey, SecurityAlgorithms.RsaSha256),
        });
    }

    private static TokenValidationParameters ValidationParameters(ServiceProvider provider) =>
        provider.GetRequiredService<IOptionsMonitor<JwtBearerOptions>>().Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;

    private static Task<TokenValidationResult> ValidateAsync(ServiceProvider provider, string token) =>
        new JsonWebTokenHandler().ValidateTokenAsync(token, ValidationParameters(provider));

    [Test, Description("The accepted issuer should be the normalised address, the same value every token is written with")]
    public void TheAcceptedIssuer_IsTheNormalizedAddress()
    {
        using ServiceProvider provider = BuildProvider();

        ValidationParameters(provider).ValidIssuer.Should().Be("https://auth.test/");
    }

    [Test, Description("A token OI.Auth issued should be accepted by OI.Auth")]
    public async Task ATokenItIssued_IsAccepted()
    {
        using ServiceProvider provider = BuildProvider();
        string token = UserToken(provider, ["Admin"]);

        TokenValidationResult result = await ValidateAsync(provider, token);

        result.IsValid.Should().BeTrue();
    }

    [Test, Description("The roles, name and groups in the token should come out with the names the rest of the system uses")]
    public async Task TheClaimsKeepTheirNames()
    {
        using ServiceProvider provider = BuildProvider();
        string token = UserToken(provider, ["Admin", "User"], ("group", "sales"), ("group", "ops"));

        TokenValidationResult result = await ValidateAsync(provider, token);
        ClaimsPrincipal principal = new ClaimsPrincipal(result.ClaimsIdentity);
        result.ClaimsIdentity.FindFirst("sub")!.Value.Should().Be("user-1");
        result.ClaimsIdentity.FindFirst("token_use")!.Value.Should().Be("user");
        result.ClaimsIdentity.Name.Should().Be("Pat Example");
        principal.IsInRole("Admin").Should().BeTrue();
        principal.IsInRole("User").Should().BeTrue();
        result.ClaimsIdentity.FindAll("group").Select(c => c.Value).Should().BeEquivalentTo(new[] { "sales", "ops" });
    }

    [Test, Description("Claim names should not be rewritten to the long Microsoft names")]
    public void ClaimNamesAreNotRemapped()
    {
        using ServiceProvider provider = BuildProvider();

        provider.GetRequiredService<IOptionsMonitor<JwtBearerOptions>>()
            .Get(JwtBearerDefaults.AuthenticationScheme).MapInboundClaims.Should().BeFalse();
    }

    [Test, Description("A user without the Admin role should not look like an administrator once the token is read")]
    public async Task ARoleThatWasNotGranted_IsNotInTheIdentity()
    {
        using ServiceProvider provider = BuildProvider();
        string token = UserToken(provider, ["User"]);

        TokenValidationResult result = await ValidateAsync(provider, token);

        ClaimsPrincipal principal = new ClaimsPrincipal(result.ClaimsIdentity);
        principal.IsInRole("Admin").Should().BeFalse();
    }

    [Test, Description("A token made for a different audience should be refused")]
    public async Task ATokenForAnotherAudience_IsRefused()
    {
        using ServiceProvider provider = BuildProvider(audience: "oi");
        using ServiceProvider other = BuildProvider(audience: "someone-else");
        string token = UserToken(other, ["Admin"]);

        // the two providers also have different keys, so check the audience on its own with the same key
        TokenValidationParameters parameters = ValidationParameters(provider).Clone();
        parameters.IssuerSigningKey = other.GetRequiredService<SigningKeyProvider>().SigningKey;
        TokenValidationResult result = await new JsonWebTokenHandler().ValidateTokenAsync(token, parameters);

        result.IsValid.Should().BeFalse();
    }

    [Test, Description("A token signed with some other key should be refused: anyone can build a token, only ours is signed with our key")]
    public async Task ATokenSignedWithAnotherKey_IsRefused()
    {
        using ServiceProvider provider = BuildProvider();
        using ServiceProvider stranger = BuildProvider();   // makes its own temporary key
        string forged = UserToken(stranger, ["Admin"]);

        TokenValidationResult result = await ValidateAsync(provider, forged);

        result.IsValid.Should().BeFalse();
    }

    [Test, Description("A token that is not a token should be refused")]
    public async Task Garbage_IsRefused()
    {
        using ServiceProvider provider = BuildProvider();

        TokenValidationResult result = await ValidateAsync(provider, "not.a.token");

        result.IsValid.Should().BeFalse();
    }

    [Test, Description("An unsigned token that claims to be from us should be refused")]
    public async Task AnUnsignedToken_IsRefused()
    {
        using ServiceProvider provider = BuildProvider();
        string unsigned = new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = "https://auth.test/",
            Audience = "oi",
            Claims = new Dictionary<string, object> { ["sub"] = "u1", ["role"] = "Admin", ["token_use"] = "user" },
            Expires = DateTime.UtcNow.AddMinutes(5),
        });

        TokenValidationResult result = await ValidateAsync(provider, unsigned);

        result.IsValid.Should().BeFalse();
    }

    [Test, Description("A token from a different issuer should be refused")]
    public async Task ATokenFromAnotherIssuer_IsRefused()
    {
        using ServiceProvider provider = BuildProvider();
        SigningKeyProvider keys = provider.GetRequiredService<SigningKeyProvider>();
        string token = new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = "https://evil.example",
            Audience = "oi",
            Claims = new Dictionary<string, object> { ["sub"] = "u1", ["role"] = "Admin", ["token_use"] = "user" },
            Expires = DateTime.UtcNow.AddMinutes(5),
            SigningCredentials = new SigningCredentials(keys.SigningKey, SecurityAlgorithms.RsaSha256),
        });

        TokenValidationResult result = await ValidateAsync(provider, token);

        result.IsValid.Should().BeFalse();
    }

    [Test, Description("An expired token should be refused")]
    public async Task AnExpiredToken_IsRefused()
    {
        using ServiceProvider provider = BuildProvider();
        SigningKeyProvider keys = provider.GetRequiredService<SigningKeyProvider>();
        string token = new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = "https://auth.test/",
            Audience = "oi",
            Claims = new Dictionary<string, object> { ["sub"] = "u1", ["role"] = "Admin", ["token_use"] = "user" },
            NotBefore = DateTime.UtcNow.AddHours(-2),
            Expires = DateTime.UtcNow.AddHours(-1),
            SigningCredentials = new SigningCredentials(keys.SigningKey, SecurityAlgorithms.RsaSha256),
        });

        TokenValidationResult result = await ValidateAsync(provider, token);

        result.IsValid.Should().BeFalse();
    }
}
