using System.Text.Json;
using FluentAssertions;
using OI.Glue.Models;
using OI.Glue.Notifications;

namespace OI.Glue.Tests;

[TestFixture, Description("Tests for the shared models in OI.Glue")]
public class ModelTests
{
    private static readonly DateTimeOffset Now = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    // ---- AdminUser

    private static AdminUser UserLockedUntil(DateTimeOffset? end) => new("u1", "pat@example.com", "Pat", end, [], []);

    [Test, Description("DisabledUntil should be the end of time")]
    public void AdminUser_DisabledUntilIsTheEndOfTime()
    {
        AdminUser.DisabledUntil.Should().Be(DateTimeOffset.MaxValue);
    }

    [Test, Description("A user locked out until the end of time should be disabled")]
    public void AdminUser_IsDisabledWhenLockedOutForGood()
    {
        UserLockedUntil(AdminUser.DisabledUntil).IsDisabled.Should().BeTrue();
    }

    [Test, Description("A user with no lockout should not be disabled")]
    public void AdminUser_IsNotDisabledWithoutALockout()
    {
        UserLockedUntil(null).IsDisabled.Should().BeFalse();
    }

    [Test, Description("A user with a temporary lockout should not count as disabled")]
    public void AdminUser_IsNotDisabledByATemporaryLockout()
    {
        UserLockedUntil(Now.AddMinutes(15)).IsDisabled.Should().BeFalse("a lockout from wrong passwords ends by itself");
    }

    [Test, Description("A lockout that lasts until the year 9999 should count as disabled")]
    public void AdminUser_IsDisabledWhenLockedUntilYear9999()
    {
        UserLockedUntil(new DateTimeOffset(9999, 1, 1, 0, 0, 0, TimeSpan.Zero)).IsDisabled.Should().BeTrue();
    }

    [Test, Description("A user should be locked out while the lockout is later than now")]
    public void AdminUser_IsLockedOutBeforeTheEnd()
    {
        UserLockedUntil(Now.AddSeconds(1)).IsLockedOut(Now).Should().BeTrue();
    }

    [Test, Description("A user should not be locked out once the lockout has passed, or exactly at its end")]
    public void AdminUser_IsNotLockedOutAtOrAfterTheEnd()
    {
        UserLockedUntil(Now).IsLockedOut(Now).Should().BeFalse();
        UserLockedUntil(Now.AddSeconds(-1)).IsLockedOut(Now).Should().BeFalse();
    }

    [Test, Description("A user with no lockout should never be locked out")]
    public void AdminUser_IsNotLockedOutWithoutALockout()
    {
        UserLockedUntil(null).IsLockedOut(Now).Should().BeFalse();
    }

    [Test, Description("A disabled user should also count as locked out")]
    public void AdminUser_DisabledUserIsLockedOut()
    {
        UserLockedUntil(AdminUser.DisabledUntil).IsLockedOut(Now).Should().BeTrue();
    }

    // ---- AdminResult

    [Test, Description("AdminResult.Ok should succeed with no message")]
    public void AdminResult_OkSucceeds()
    {
        AdminResult sut = AdminResult.Ok();

        sut.Succeeded.Should().BeTrue();
        sut.Status.Should().Be(AdminStatus.Ok);
        sut.Message.Should().BeNull();
    }

    [TestCase(AdminStatus.NotFound, "missing")]
    [TestCase(AdminStatus.Invalid, "bad input")]
    [TestCase(AdminStatus.Conflict, "duplicate")]
    [Description("AdminResult failures should not succeed and should carry their status and message")]
    public void AdminResult_FailuresCarryStatusAndMessage(AdminStatus status, string message)
    {
        AdminResult sut = status switch
        {
            AdminStatus.NotFound => AdminResult.NotFound(message),
            AdminStatus.Invalid => AdminResult.Invalid(message),
            _ => AdminResult.Conflict(message),
        };

        sut.Succeeded.Should().BeFalse();
        sut.Status.Should().Be(status);
        sut.Message.Should().Be(message);
    }

    [Test, Description("AdminResult<T>.Ok should succeed and carry the value")]
    public void AdminResultOfT_OkCarriesTheValue()
    {
        AdminResult<string> sut = AdminResult<string>.Ok("value");

        sut.Succeeded.Should().BeTrue();
        sut.Value.Should().Be("value");
        sut.Message.Should().BeNull();
    }

    [TestCase(AdminStatus.NotFound)]
    [TestCase(AdminStatus.Invalid)]
    [TestCase(AdminStatus.Conflict)]
    [Description("AdminResult<T> failures should not succeed and should carry no value")]
    public void AdminResultOfT_FailuresCarryNoValue(AdminStatus status)
    {
        AdminResult<string> sut = status switch
        {
            AdminStatus.NotFound => AdminResult<string>.NotFound("m"),
            AdminStatus.Invalid => AdminResult<string>.Invalid("m"),
            _ => AdminResult<string>.Conflict("m"),
        };

        sut.Succeeded.Should().BeFalse();
        sut.Status.Should().Be(status);
        sut.Message.Should().Be("m");
        sut.Value.Should().BeNull();
    }

    [Test, Description("Both result types should be usable through IAdminResult")]
    public void AdminResult_IsUsableThroughTheInterface()
    {
        IAdminResult plain = AdminResult.Conflict("c");
        IAdminResult typed = AdminResult<int>.NotFound("n");

        plain.Status.Should().Be(AdminStatus.Conflict);
        typed.Status.Should().Be(AdminStatus.NotFound);
    }

    // ---- AuthPolicy

    [Test, Description("AuthPolicy should default to 5 attempts, a 15 minute lockout and 12 character passwords")]
    public void AuthPolicy_HasSafeDefaults()
    {
        AuthPolicy sut = new();

        sut.MaxFailedAttempts.Should().Be(5);
        sut.MinPasswordLength.Should().Be(12);
        sut.LockoutFor.Should().Be(TimeSpan.FromMinutes(15));
    }

    [Test, Description("AuthPolicy should use the lockout duration it is given")]
    public void AuthPolicy_UsesTheGivenLockout()
    {
        new AuthPolicy(LockoutDuration: TimeSpan.FromHours(2)).LockoutFor.Should().Be(TimeSpan.FromHours(2));
    }

    // ---- notifications

    [Test, Description("NotificationTarget.User should target a user with no topic")]
    public void NotificationTarget_User()
    {
        NotificationTarget sut = NotificationTarget.User("user-1");

        sut.Kind.Should().Be(NotificationTargetKind.User);
        sut.Id.Should().Be("user-1");
        sut.Topic.Should().BeNull();
    }

    [Test, Description("NotificationTarget.Group should target a group with no topic")]
    public void NotificationTarget_Group()
    {
        NotificationTarget sut = NotificationTarget.Group("sales-west");

        sut.Kind.Should().Be(NotificationTargetKind.Group);
        sut.Id.Should().Be("sales-west");
        sut.Topic.Should().BeNull();
    }

    [Test, Description("NotificationTarget.GroupTopic should target a topic inside a group")]
    public void NotificationTarget_GroupTopic()
    {
        NotificationTarget sut = NotificationTarget.GroupTopic("sales-west", "orders");

        sut.Kind.Should().Be(NotificationTargetKind.Topic);
        sut.Id.Should().Be("sales-west");
        sut.Topic.Should().Be("orders");
    }

    [TestCase(NotificationTargetKind.User, "\"User\"")]
    [TestCase(NotificationTargetKind.Group, "\"Group\"")]
    [TestCase(NotificationTargetKind.Topic, "\"Topic\"")]
    [Description("The target kind should be written as text in JSON, so the sender and the hub cannot drift apart on numbers")]
    public void NotificationTargetKind_SerialisesAsText(NotificationTargetKind kind, string expected)
    {
        JsonSerializer.Serialize(kind).Should().Be(expected);
        JsonSerializer.Deserialize<NotificationTargetKind>(expected).Should().Be(kind);
    }

    [Test, Description("PublishRequest should survive a round trip through JSON")]
    public void PublishRequest_RoundTripsThroughJson()
    {
        PublishRequest request = new(NotificationTargetKind.Topic, "sales-west", "orders", "info", "Hello", "Body");

        string json = JsonSerializer.Serialize(request);
        PublishRequest? back = JsonSerializer.Deserialize<PublishRequest>(json);

        back.Should().Be(request);
        json.Should().Contain("\"Topic\"");
    }

    // ---- other records

    [Test, Description("PagedResult should hold the page and the total")]
    public void PagedResult_HoldsThePageAndTotal()
    {
        PagedResult<int> sut = new([1, 2, 3], 42);

        sut.Data.Should().Equal(1, 2, 3);
        sut.TotalRecordSize.Should().Be(42);
    }

    [Test, Description("RefreshTokenRecord should default to not revoked and not replaced")]
    public void RefreshTokenRecord_DefaultsToLive()
    {
        RefreshTokenRecord sut = new("u1", "HASH", Now, Now.AddDays(7));

        sut.RevokedAt.Should().BeNull();
        sut.ReplacedByHash.Should().BeNull();
    }
}
