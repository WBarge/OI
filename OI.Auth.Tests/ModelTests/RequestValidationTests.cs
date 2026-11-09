using System.ComponentModel.DataAnnotations;
using FluentAssertions;
using OI.Auth.Models.Requests;

namespace OI.Auth.Tests.ModelTests;

[TestFixture, Description("Tests for the validation rules on the OI.Auth request models")]
public class RequestValidationTests
{
    private static List<ValidationResult> Validate(object model)
    {
        List<ValidationResult> results = [];
        Validator.TryValidateObject(model, new ValidationContext(model), results, validateAllProperties: true);
        return results;
    }

    private static bool IsValid(object model) => Validate(model).Count == 0;

    private static string Chars(int length) => new('x', length);

    // ---- LoginRequest

    [Test, Description("LoginRequest should be valid with an email and a password")]
    public void LoginRequest_IsValidWhenComplete()
    {
        IsValid(new LoginRequest { Email = "pat@example.com", Password = "pw" }).Should().BeTrue();
    }

    [Test, Description("LoginRequest should start empty, which is not valid")]
    public void LoginRequest_IsNotValidWhenEmpty()
    {
        LoginRequest sut = new();

        sut.Email.Should().BeEmpty();
        sut.Password.Should().BeEmpty();
        Validate(sut).SelectMany(r => r.MemberNames).Should().BeEquivalentTo("Email", "Password");
    }

    [TestCase(256, true)]
    [TestCase(257, false)]
    [Description("LoginRequest should accept an email of up to 256 characters")]
    public void LoginRequest_LimitsTheEmail(int length, bool valid)
    {
        IsValid(new LoginRequest { Email = Chars(length), Password = "pw" }).Should().Be(valid);
    }

    [TestCase(256, true)]
    [TestCase(257, false)]
    [Description("LoginRequest should accept a password of up to 256 characters")]
    public void LoginRequest_LimitsThePassword(int length, bool valid)
    {
        IsValid(new LoginRequest { Email = "pat@example.com", Password = Chars(length) }).Should().Be(valid);
    }

    // ---- RefreshRequest

    [Test, Description("RefreshRequest should require a refresh token")]
    public void RefreshRequest_RequiresAToken()
    {
        IsValid(new RefreshRequest()).Should().BeFalse();
        IsValid(new RefreshRequest { RefreshToken = "abc" }).Should().BeTrue();
    }

    [TestCase(512, true)]
    [TestCase(513, false)]
    [Description("RefreshRequest should accept a refresh token of up to 512 characters")]
    public void RefreshRequest_LimitsTheToken(int length, bool valid)
    {
        IsValid(new RefreshRequest { RefreshToken = Chars(length) }).Should().Be(valid);
    }

    // ---- ServiceTokenRequest

    [Test, Description("ServiceTokenRequest should require a client id and a secret")]
    public void ServiceTokenRequest_RequiresBothFields()
    {
        Validate(new ServiceTokenRequest()).SelectMany(r => r.MemberNames).Should().BeEquivalentTo("ClientId", "ClientSecret");
        IsValid(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = "s" }).Should().BeTrue();
    }

    [TestCase(100, true)]
    [TestCase(101, false)]
    [Description("ServiceTokenRequest should accept a client id of up to 100 characters")]
    public void ServiceTokenRequest_LimitsTheClientId(int length, bool valid)
    {
        IsValid(new ServiceTokenRequest { ClientId = Chars(length), ClientSecret = "s" }).Should().Be(valid);
    }

    [TestCase(512, true)]
    [TestCase(513, false)]
    [Description("ServiceTokenRequest should accept a secret of up to 512 characters")]
    public void ServiceTokenRequest_LimitsTheSecret(int length, bool valid)
    {
        IsValid(new ServiceTokenRequest { ClientId = "oi-reporting", ClientSecret = Chars(length) }).Should().Be(valid);
    }

    // ---- CreateUserRequest

    [Test, Description("CreateUserRequest should default to no roles and no groups")]
    public void CreateUserRequest_HasNoRolesOrGroupsByDefault()
    {
        CreateUserRequest sut = new();

        sut.Roles.Should().BeEmpty();
        sut.Groups.Should().BeEmpty();
    }

    [Test, Description("CreateUserRequest should require an email, a display name and a password")]
    public void CreateUserRequest_RequiresTheThreeFields()
    {
        Validate(new CreateUserRequest()).SelectMany(r => r.MemberNames).Should().BeEquivalentTo("Email", "DisplayName", "Password");
        IsValid(new CreateUserRequest { Email = "pat@example.com", DisplayName = "Pat", Password = "a-long-password-1" }).Should().BeTrue();
    }

    [TestCase(256, true)]
    [TestCase(257, false)]
    [Description("CreateUserRequest should accept an email of up to 256 characters")]
    public void CreateUserRequest_LimitsTheEmail(int length, bool valid)
    {
        IsValid(new CreateUserRequest { Email = Chars(length), DisplayName = "Pat", Password = "pw" }).Should().Be(valid);
    }

    [TestCase(100, true)]
    [TestCase(101, false)]
    [Description("CreateUserRequest should accept a display name of up to 100 characters")]
    public void CreateUserRequest_LimitsTheDisplayName(int length, bool valid)
    {
        IsValid(new CreateUserRequest { Email = "pat@example.com", DisplayName = Chars(length), Password = "pw" }).Should().Be(valid);
    }

    [TestCase(128, true)]
    [TestCase(129, false)]
    [Description("CreateUserRequest should accept a password of up to 128 characters")]
    public void CreateUserRequest_LimitsThePassword(int length, bool valid)
    {
        IsValid(new CreateUserRequest { Email = "pat@example.com", DisplayName = "Pat", Password = Chars(length) }).Should().Be(valid);
    }

    // ---- UpdateUserRequest

    [Test, Description("UpdateUserRequest should require a display name and default to no roles and groups")]
    public void UpdateUserRequest_RequiresADisplayName()
    {
        UpdateUserRequest sut = new();

        sut.Roles.Should().BeEmpty();
        sut.Groups.Should().BeEmpty();
        IsValid(sut).Should().BeFalse();
        IsValid(new UpdateUserRequest { DisplayName = "Pat" }).Should().BeTrue();
    }

    [TestCase(100, true)]
    [TestCase(101, false)]
    [Description("UpdateUserRequest should accept a display name of up to 100 characters")]
    public void UpdateUserRequest_LimitsTheDisplayName(int length, bool valid)
    {
        IsValid(new UpdateUserRequest { DisplayName = Chars(length) }).Should().Be(valid);
    }

    // ---- ResetPasswordRequest

    [Test, Description("ResetPasswordRequest should require a new password")]
    public void ResetPasswordRequest_RequiresAPassword()
    {
        IsValid(new ResetPasswordRequest()).Should().BeFalse();
        IsValid(new ResetPasswordRequest { NewPassword = "a-long-password-1" }).Should().BeTrue();
    }

    [TestCase(128, true)]
    [TestCase(129, false)]
    [Description("ResetPasswordRequest should accept a password of up to 128 characters")]
    public void ResetPasswordRequest_LimitsThePassword(int length, bool valid)
    {
        IsValid(new ResetPasswordRequest { NewPassword = Chars(length) }).Should().Be(valid);
    }

    // ---- CreateRoleRequest

    [Test, Description("CreateRoleRequest should require a name")]
    public void CreateRoleRequest_RequiresAName()
    {
        IsValid(new CreateRoleRequest()).Should().BeFalse();
        IsValid(new CreateRoleRequest { Name = "Manager" }).Should().BeTrue();
    }

    [TestCase(50, true)]
    [TestCase(51, false)]
    [Description("CreateRoleRequest should accept a name of up to 50 characters")]
    public void CreateRoleRequest_LimitsTheName(int length, bool valid)
    {
        IsValid(new CreateRoleRequest { Name = Chars(length) }).Should().Be(valid);
    }

    // ---- CreateGroupRequest

    [Test, Description("CreateGroupRequest should require a name but not a description")]
    public void CreateGroupRequest_RequiresOnlyAName()
    {
        IsValid(new CreateGroupRequest()).Should().BeFalse();
        IsValid(new CreateGroupRequest { Name = "sales-west" }).Should().BeTrue();
        new CreateGroupRequest().Description.Should().BeNull();
    }

    [TestCase(63, true)]
    [TestCase(64, false)]
    [Description("CreateGroupRequest should accept a name of up to 63 characters")]
    public void CreateGroupRequest_LimitsTheName(int length, bool valid)
    {
        IsValid(new CreateGroupRequest { Name = Chars(length) }).Should().Be(valid);
    }

    [TestCase(200, true)]
    [TestCase(201, false)]
    [Description("CreateGroupRequest should accept a description of up to 200 characters")]
    public void CreateGroupRequest_LimitsTheDescription(int length, bool valid)
    {
        IsValid(new CreateGroupRequest { Name = "sales-west", Description = Chars(length) }).Should().Be(valid);
    }

    // ---- UpdateGroupRequest

    [Test, Description("UpdateGroupRequest should accept no description at all")]
    public void UpdateGroupRequest_DescriptionIsOptional()
    {
        IsValid(new UpdateGroupRequest()).Should().BeTrue();
    }

    [TestCase(200, true)]
    [TestCase(201, false)]
    [Description("UpdateGroupRequest should accept a description of up to 200 characters")]
    public void UpdateGroupRequest_LimitsTheDescription(int length, bool valid)
    {
        IsValid(new UpdateGroupRequest { Description = Chars(length) }).Should().Be(valid);
    }
}
