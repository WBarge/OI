using FluentAssertions;
using OI.Auth.Security;

namespace OI.Auth.Tests.SecurityTests;

[TestFixture, Description("Tests for IdentityPasswordService: password hashing")]
public class IdentityPasswordServiceTests
{
    private IdentityPasswordService _sut = null!;

    [SetUp]
    public void SetUp() => _sut = new IdentityPasswordService();

    [Test, Description("Hash should return something other than the password")]
    public void Hash_DoesNotReturnThePassword()
    {
        string hash = _sut.Hash("a-long-password-1");

        hash.Should().NotBeNullOrWhiteSpace();
        hash.Should().NotContain("a-long-password-1");
    }

    [Test, Description("Hash should give a different result each time for the same password, because the salt is random")]
    public void Hash_IsSaltedSoTheSamePasswordHashesDifferently()
    {
        string first = _sut.Hash("a-long-password-1");
        string second = _sut.Hash("a-long-password-1");

        first.Should().NotBe(second);
    }

    [Test, Description("Hash should throw for a null password")]
    public void Hash_ThrowsForANullPassword()
    {
        Action act = () => _sut.Hash(null!);

        act.Should().Throw<ArgumentNullException>();
    }

    [Test, Description("Verify should accept the password that was hashed")]
    public void Verify_AcceptsTheRightPassword()
    {
        string hash = _sut.Hash("a-long-password-1");

        _sut.Verify(hash, "a-long-password-1").Should().BeTrue();
    }

    [Test, Description("Verify should accept the right password against every hash made for it")]
    public void Verify_AcceptsTheRightPasswordAgainstEachSalt()
    {
        string first = _sut.Hash("a-long-password-1");
        string second = _sut.Hash("a-long-password-1");

        _sut.Verify(first, "a-long-password-1").Should().BeTrue();
        _sut.Verify(second, "a-long-password-1").Should().BeTrue();
    }

    [Test, Description("Verify should reject a wrong password")]
    public void Verify_RejectsAWrongPassword()
    {
        string hash = _sut.Hash("a-long-password-1");

        _sut.Verify(hash, "a-long-password-2").Should().BeFalse();
    }

    [TestCase("A-LONG-PASSWORD-1")]
    [TestCase("a-long-password-1 ")]
    [TestCase(" a-long-password-1")]
    [TestCase("")]
    [Description("Verify should reject a password that differs only by case, by a space or by being empty")]
    public void Verify_RejectsNearMisses(string attempt)
    {
        string hash = _sut.Hash("a-long-password-1");

        _sut.Verify(hash, attempt).Should().BeFalse();
    }

    [Test, Description("Verify should reject a password against the hash of a different password")]
    public void Verify_RejectsTheHashOfAnotherPassword()
    {
        string otherHash = _sut.Hash("some-other-password-9");

        _sut.Verify(otherHash, "a-long-password-1").Should().BeFalse();
    }

    [Test, Description("Verify should work with passwords that contain non-ASCII characters")]
    public void Verify_WorksWithUnicodePasswords()
    {
        const string password = "pässwörd-日本語-🔐-12345";
        string hash = _sut.Hash(password);

        _sut.Verify(hash, password).Should().BeTrue();
        _sut.Verify(hash, "passwörd-日本語-🔐-12345").Should().BeFalse();
    }

    [Test, Description("Verify should work across instances, because the hash carries everything it needs")]
    public void Verify_WorksAcrossInstances()
    {
        string hash = new IdentityPasswordService().Hash("a-long-password-1");

        new IdentityPasswordService().Verify(hash, "a-long-password-1").Should().BeTrue();
    }
}
