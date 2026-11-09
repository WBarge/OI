using FluentAssertions;
using Moq;
using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Reporting.Models;
using OI.Reporting.Services;

namespace OI.Reporting.Tests.ServiceTests;

[TestFixture, Description("Tests for PersistedCompanyProfileStore, the database-backed company profile store")]
public class PersistedCompanyProfileStoreTests
{
    private Mock<ICompanyRepo> _repo = null!;

    [SetUp]
    public void SetUp() => _repo = new Mock<ICompanyRepo>();

    [Test, Description("Constructor should throw when companyRepo is null")]
    public void Constructor_ThrowsWhenRepoIsNull()
    {
        Action act = () => _ = new PersistedCompanyProfileStore(null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("companyRepo");
    }

    [Test, Description("Current should be null when nothing has been stored yet")]
    public void Current_IsNullWhenNothingIsStored()
    {
        _repo.Setup(r => r.GetCompanyProfile()).Returns((ICompanyProfile?)null);

        PersistedCompanyProfileStore sut = new(_repo.Object);

        sut.Current.Should().BeNull();
    }

    [Test, Description("Current should be the profile the repository holds when the store is created")]
    public void Current_IsTheStoredProfile()
    {
        CompanyProfile profile = new() { CompanyName = "Acme Tools" };
        _repo.Setup(r => r.GetCompanyProfile()).Returns(profile);

        PersistedCompanyProfileStore sut = new(_repo.Object);

        sut.Current.Should().BeSameAs(profile);
    }

    [Test, Description("The store should read the profile from the repository once, when it is created")]
    public void Constructor_ReadsTheProfileOnce()
    {
        PersistedCompanyProfileStore sut = new(_repo.Object);
        _ = sut.Current;
        _ = sut.Current;

        _repo.Verify(r => r.GetCompanyProfile(), Times.Once);
    }

    [Test, Description("ReplaceAsync should hand the whole profile to the repository, with the cancellation token")]
    public async Task ReplaceAsync_UpsertsTheProfile()
    {
        PersistedCompanyProfileStore sut = new(_repo.Object);
        CompanyProfile profile = new() { CompanyName = "Acme Tools", LogoFile = [1, 2, 3], LogoResourceName = "logo.png" };
        using CancellationTokenSource source = new();

        await sut.ReplaceAsync(profile, source.Token);

        _repo.Verify(r => r.UpsertAsync(profile, source.Token), Times.Once);
    }

    [Test, Description("ReplaceAsync should pass on a failure from the repository")]
    public async Task ReplaceAsync_PassesOnAFailure()
    {
        _repo.Setup(r => r.UpsertAsync(It.IsAny<ICompanyProfile>(), It.IsAny<CancellationToken>())).ThrowsAsync(new InvalidOperationException("db down"));
        PersistedCompanyProfileStore sut = new(_repo.Object);

        Func<Task> act = () => sut.ReplaceAsync(new CompanyProfile());

        await act.Should().ThrowAsync<InvalidOperationException>().WithMessage("db down");
    }
}
