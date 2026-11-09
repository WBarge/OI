using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Data.Repos.Auth;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

/// <summary>
/// Tests for the refresh token repository.
/// RevokeAsync and RevokeAllAsync are not covered here: they use ExecuteUpdateAsync, which the in-memory provider
/// does not support, so they need a relational provider (SQLite or SQL Server) to be tested for real.
/// </summary>
[TestFixture, Description("Tests for the refresh token repository")]
public class RefreshTokenRepoTests
{
    private static readonly DateTimeOffset Created = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

    private IsolatedAuthDatabase _database = null!;

    [SetUp]
    public void SetUp() => _database = new IsolatedAuthDatabase();

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    private static RefreshTokenRecord Record(string hash, string userId = "user-1", DateTimeOffset? revokedAt = null, string? replacedBy = null) =>
        new(userId, hash, Created, Created.AddDays(7), revokedAt, replacedBy);

    private async Task Do(Func<RefreshTokenRepo, Task> action)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        await action(new RefreshTokenRepo(context));
    }

    private async Task<T> Get<T>(Func<RefreshTokenRepo, Task<T>> action)
    {
        await using OiAuthDbContext context = _database.CreateContext();
        return await action(new RefreshTokenRepo(context));
    }

    private async Task<List<RefreshToken>> AllRowsAsync()
    {
        await using OiAuthDbContext context = _database.CreateContext();
        return await context.RefreshTokens.AsNoTracking().ToListAsync(Ct);
    }

    // ---- FindAsync

    [Test, Description("FindAsync should return null for a hash that was never issued")]
    public async Task FindAsync_ReturnsNullForAnUnknownHash()
    {
        RefreshTokenRecord? result = await Get(r => r.FindAsync("missing", Ct));

        result.Should().BeNull();
    }

    [Test, Description("FindAsync should return null when the table holds only other tokens")]
    public async Task FindAsync_ReturnsNullWhenOnlyOtherTokensExist()
    {
        await Do(r => r.IssueAsync(Record("HASH-A"), Ct));

        RefreshTokenRecord? result = await Get(r => r.FindAsync("HASH-B", Ct));

        result.Should().BeNull();
    }

    [Test, Description("FindAsync should return every field of the token that was issued")]
    public async Task FindAsync_ReturnsTheIssuedToken()
    {
        await Do(r => r.IssueAsync(Record("HASH-A", "user-7"), Ct));

        RefreshTokenRecord? result = await Get(r => r.FindAsync("HASH-A", Ct));

        result.Should().NotBeNull();
        result!.UserId.Should().Be("user-7");
        result.TokenHash.Should().Be("HASH-A");
        result.CreatedAt.Should().Be(Created);
        result.ExpiresAt.Should().Be(Created.AddDays(7));
        result.RevokedAt.Should().BeNull();
        result.ReplacedByHash.Should().BeNull();
    }

    [Test, Description("FindAsync should return the revocation details of a token that was revoked")]
    public async Task FindAsync_ReturnsRevocationDetails()
    {
        DateTimeOffset revoked = Created.AddHours(1);
        await Do(r => r.IssueAsync(Record("HASH-A", revokedAt: revoked, replacedBy: "HASH-B"), Ct));

        RefreshTokenRecord? result = await Get(r => r.FindAsync("HASH-A", Ct));

        result!.RevokedAt.Should().Be(revoked);
        result.ReplacedByHash.Should().Be("HASH-B");
    }

    [Test, Description("FindAsync should not track the row, so a later save cannot change it by accident")]
    public async Task FindAsync_DoesNotTrackTheRow()
    {
        await Do(r => r.IssueAsync(Record("HASH-A"), Ct));
        await using OiAuthDbContext context = _database.CreateContext();
        RefreshTokenRepo sut = new(context);

        await sut.FindAsync("HASH-A", Ct);

        context.ChangeTracker.Entries<RefreshToken>().Should().BeEmpty();
    }

    // ---- IssueAsync

    [Test, Description("IssueAsync should store the token so that it is there for a later request")]
    public async Task IssueAsync_StoresTheToken()
    {
        await Do(r => r.IssueAsync(Record("HASH-A"), Ct));

        List<RefreshToken> rows = await AllRowsAsync();
        rows.Should().ContainSingle();
        rows[0].TokenHash.Should().Be("HASH-A");
        rows[0].UserId.Should().Be("user-1");
    }

    [Test, Description("IssueAsync should keep tokens that were issued earlier, including for the same user")]
    public async Task IssueAsync_KeepsEarlierTokens()
    {
        await Do(r => r.IssueAsync(Record("HASH-A"), Ct));
        await Do(r => r.IssueAsync(Record("HASH-B"), Ct));
        await Do(r => r.IssueAsync(Record("HASH-C", "user-2"), Ct));

        List<RefreshToken> rows = await AllRowsAsync();
        rows.Select(t => t.TokenHash).Should().BeEquivalentTo("HASH-A", "HASH-B", "HASH-C");
    }

    [Test, Description("IssueAsync should give each stored token its own generated id")]
    public async Task IssueAsync_GeneratesDistinctIds()
    {
        await Do(r => r.IssueAsync(Record("HASH-A"), Ct));
        await Do(r => r.IssueAsync(Record("HASH-B"), Ct));

        List<RefreshToken> rows = await AllRowsAsync();
        rows.Select(t => t.Id).Should().OnlyHaveUniqueItems();
    }

    // ---- RotateAsync

    [Test, Description("RotateAsync should mark the old token revoked and point it at its replacement")]
    public async Task RotateAsync_RevokesTheOldToken()
    {
        await Do(r => r.IssueAsync(Record("OLD"), Ct));
        DateTimeOffset revokedAt = Created.AddMinutes(30);

        await Do(r => r.RotateAsync("OLD", revokedAt, Record("NEW"), Ct));

        RefreshTokenRecord? old = await Get(r => r.FindAsync("OLD", Ct));
        old!.RevokedAt.Should().Be(revokedAt);
        old.ReplacedByHash.Should().Be("NEW");
    }

    [Test, Description("RotateAsync should store the replacement as a live token")]
    public async Task RotateAsync_StoresTheReplacement()
    {
        await Do(r => r.IssueAsync(Record("OLD"), Ct));

        await Do(r => r.RotateAsync("OLD", Created.AddMinutes(30), Record("NEW"), Ct));

        RefreshTokenRecord? replacement = await Get(r => r.FindAsync("NEW", Ct));
        replacement.Should().NotBeNull();
        replacement!.UserId.Should().Be("user-1");
        replacement.RevokedAt.Should().BeNull("the replacement is the token now in use");
        replacement.ReplacedByHash.Should().BeNull();
    }

    [Test, Description("RotateAsync should leave other tokens, including the same user's other sessions, alone")]
    public async Task RotateAsync_LeavesOtherTokensAlone()
    {
        await Do(r => r.IssueAsync(Record("OLD"), Ct));
        await Do(r => r.IssueAsync(Record("OTHER-SESSION"), Ct));
        await Do(r => r.IssueAsync(Record("OTHER-USER", "user-2"), Ct));

        await Do(r => r.RotateAsync("OLD", Created.AddMinutes(30), Record("NEW"), Ct));

        (await Get(r => r.FindAsync("OTHER-SESSION", Ct)))!.RevokedAt.Should().BeNull();
        (await Get(r => r.FindAsync("OTHER-USER", Ct)))!.RevokedAt.Should().BeNull();
        (await AllRowsAsync()).Should().HaveCount(4);
    }

    [Test, Description("RotateAsync should throw and store nothing when the old token does not exist")]
    public async Task RotateAsync_ThrowsForAnUnknownOldToken()
    {
        Func<Task> act = () => Do(r => r.RotateAsync("MISSING", Created, Record("NEW"), Ct));

        await act.Should().ThrowAsync<InvalidOperationException>();
        (await AllRowsAsync()).Should().BeEmpty("a replacement must not be stored for a token that was never issued");
    }

    [Test, Description("RotateAsync should be able to rotate a token that was itself a replacement")]
    public async Task RotateAsync_CanBeChained()
    {
        await Do(r => r.IssueAsync(Record("FIRST"), Ct));
        await Do(r => r.RotateAsync("FIRST", Created.AddMinutes(1), Record("SECOND"), Ct));

        await Do(r => r.RotateAsync("SECOND", Created.AddMinutes(2), Record("THIRD"), Ct));

        (await Get(r => r.FindAsync("FIRST", Ct)))!.ReplacedByHash.Should().Be("SECOND");
        (await Get(r => r.FindAsync("SECOND", Ct)))!.ReplacedByHash.Should().Be("THIRD");
        (await Get(r => r.FindAsync("THIRD", Ct)))!.RevokedAt.Should().BeNull();
    }
}
