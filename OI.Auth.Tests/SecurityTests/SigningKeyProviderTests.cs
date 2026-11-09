using System.Security.Cryptography;
using FluentAssertions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Moq;
using OI.Auth.Security;
using OI.Auth.Tests.TestSupport;

namespace OI.Auth.Tests.SecurityTests;

/// <summary>
/// Tests for SigningKeyProvider. Its constructor always generates a 4096-bit key before it looks at the configured one,
/// so building one takes a moment: these tests build only as many as they need.
/// </summary>
[TestFixture, Description("Tests for SigningKeyProvider: where the signing key comes from and how it is checked")]
public class SigningKeyProviderTests
{
    private static SigningKeyProvider Create(string? pem, string environment, ILogger<SigningKeyProvider>? logger = null) =>
        new(Options.Create(new JwtOptions { Issuer = "https://auth.test", SigningKeyPem = pem }),
            new FakeHostEnvironment(environment), logger ?? NullLogger<SigningKeyProvider>.Instance);

    private static string PemOf(RSA rsa) => rsa.ExportPkcs8PrivateKeyPem();

    // ---- no key configured

    [Test, Description("In Development with no key configured, a temporary key should be made")]
    public void Constructor_MakesATemporaryKeyInDevelopment()
    {
        using SigningKeyProvider sut = Create(null, Environments.Development);

        sut.SigningKey.Should().NotBeNull();
        sut.KeyId.Should().NotBeNullOrWhiteSpace();
        sut.PublicParameters.Modulus.Should().NotBeNullOrEmpty();
    }

    [Test, Description("In Development with no key configured, a warning should say tokens stop working after a restart")]
    public void Constructor_WarnsAboutTheTemporaryKey()
    {
        Mock<ILogger<SigningKeyProvider>> logger = new();

        using SigningKeyProvider sut = Create(null, Environments.Development, logger.Object);

        logger.Verify(l => l.Log(LogLevel.Warning, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(),
            It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }

    [Test, Description("In Development, whitespace for the key should count as no key")]
    public void Constructor_TreatsWhitespaceAsNoKeyInDevelopment()
    {
        using SigningKeyProvider sut = Create("   ", Environments.Development);

        sut.KeyId.Should().NotBeNullOrWhiteSpace();
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("   ")]
    [Description("Outside Development with no key configured, the application should refuse to start")]
    public void Constructor_ThrowsOutsideDevelopmentWithoutAKey(string? pem)
    {
        Action act = () => _ = Create(pem, Environments.Production);

        act.Should().Throw<InvalidOperationException>().WithMessage("*SigningKeyPem*");
    }

    [Test, Description("Two temporary keys should never share a key id")]
    public void Constructor_GivesEachTemporaryKeyItsOwnId()
    {
        using SigningKeyProvider first = Create(null, Environments.Development);
        using SigningKeyProvider second = Create(null, Environments.Development);

        first.KeyId.Should().NotBe(second.KeyId);
    }

    // ---- key configured

    [Test, Description("A configured key should be the one used, in any environment")]
    public void Constructor_UsesTheConfiguredKey()
    {
        using RSA rsa = RSA.Create(2048);
        RSAParameters expected = rsa.ExportParameters(false);

        using SigningKeyProvider sut = Create(PemOf(rsa), Environments.Production);

        sut.PublicParameters.Modulus.Should().Equal(expected.Modulus);
        sut.PublicParameters.Exponent.Should().Equal(expected.Exponent);
    }

    [Test, Description("A key with line breaks written as \\n should be read, so it fits on one line in a setting")]
    public void Constructor_ReadsAKeyWithEscapedLineBreaks()
    {
        using RSA rsa = RSA.Create(2048);
        string oneLine = PemOf(rsa).Replace("\r\n", "\n").Replace("\n", "\\n");
        oneLine.Should().NotContain("\n", "the test needs a single-line value");

        using SigningKeyProvider sut = Create(oneLine, Environments.Production);

        sut.PublicParameters.Modulus.Should().Equal(rsa.ExportParameters(false).Modulus);
    }

    [Test, Description("The key id should be the key's thumbprint, so it is the same after every restart")]
    public void Constructor_DerivesTheKeyIdFromTheKey()
    {
        using RSA rsa = RSA.Create(2048);
        string pem = PemOf(rsa);

        using SigningKeyProvider first = Create(pem, Environments.Production);
        using SigningKeyProvider second = Create(pem, Environments.Production);

        first.KeyId.Should().Be(second.KeyId);
        first.KeyId.Should().Be(Base64UrlEncoder.Encode(new RsaSecurityKey(rsa.ExportParameters(false)).ComputeJwkThumbprint()));
    }

    [Test, Description("The signing key should carry the key id, so tokens name the key that signed them")]
    public void Constructor_PutsTheKeyIdOnTheSigningKey()
    {
        using RSA rsa = RSA.Create(2048);

        using SigningKeyProvider sut = Create(PemOf(rsa), Environments.Production);

        sut.SigningKey.KeyId.Should().Be(sut.KeyId);
    }

    [Test, Description("The public parameters should never include the private half of the key")]
    public void PublicParameters_DoNotIncludeThePrivateKey()
    {
        using RSA rsa = RSA.Create(2048);

        using SigningKeyProvider sut = Create(PemOf(rsa), Environments.Production);

        sut.PublicParameters.D.Should().BeNull();
        sut.PublicParameters.P.Should().BeNull();
        sut.PublicParameters.Q.Should().BeNull();
    }

    [Test, Description("The signing key should be able to sign, and the public parameters should verify the signature")]
    public void SigningKey_SignaturesVerifyWithThePublicParameters()
    {
        using RSA rsa = RSA.Create(2048);
        using SigningKeyProvider sut = Create(PemOf(rsa), Environments.Production);
        byte[] data = [1, 2, 3, 4, 5];

        byte[] signature = sut.SigningKey.Rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

        using RSA verifier = RSA.Create(sut.PublicParameters);
        verifier.VerifyData(data, signature, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1).Should().BeTrue();
    }

    [Test, Description("A configured key shorter than 2048 bits should be refused")]
    public void Constructor_RejectsAKeyThatIsTooShort()
    {
        using RSA weak = RSA.Create(1024);

        Action act = () => _ = Create(PemOf(weak), Environments.Production);

        act.Should().Throw<InvalidOperationException>().WithMessage("*2048*");
    }

    [Test, Description("Dispose should be safe to call")]
    public void Dispose_DoesNotThrow()
    {
        using RSA rsa = RSA.Create(2048);
        SigningKeyProvider sut = Create(PemOf(rsa), Environments.Production);

        Action act = () => sut.Dispose();

        act.Should().NotThrow();
    }
}
