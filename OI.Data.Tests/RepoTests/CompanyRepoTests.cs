using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using OI.Data.Contexts;
using OI.Data.Model.Jobs;
using OI.Data.Repos.Jobs;
using OI.Glue.Models;

namespace OI.Data.Tests.RepoTests;

[TestFixture, Description("Tests for the company repository, which keeps the one company profile the reports print")]
public class CompanyRepoTests
{
    private static readonly byte[] Logo = [0x89, 0x50, 0x4E, 0x47, 0x01, 0x02, 0x03];
    private static readonly byte[] OtherLogo = [0xFF, 0xD8, 0xFF, 0xE0];

    private IsolatedReportingDatabase _database = null!;

    [SetUp]
    public void SetUp() => _database = new IsolatedReportingDatabase();

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    /// <summary>A profile as the reporting controller builds it. A null logo models "no logo", and the file name is then empty.</summary>
    private static ICompanyProfile Profile(string name = "Acme Tools", byte[]? logo = null, string logoName = "logo.png")
    {
        Mock<ICompanyProfile> profile = new();
        profile.SetupGet(p => p.CompanyName).Returns(name);
        profile.SetupGet(p => p.CompanyAddress).Returns("1 Main Street");
        profile.SetupGet(p => p.CompanyCity).Returns("Phoenix");
        profile.SetupGet(p => p.CompanyState).Returns("AZ");
        profile.SetupGet(p => p.CompanyZip).Returns("85001");
        profile.SetupGet(p => p.CompanyEmail).Returns("orders@acme.test");
        profile.SetupGet(p => p.CompanyPhone).Returns("602-555-0100");
        profile.SetupGet(p => p.LogoResourceName).Returns(logo is null ? string.Empty : logoName);
        profile.SetupGet(p => p.LogoFile).Returns(logo!);
        return profile.Object;
    }

    private async Task Do(Func<CompanyRepo, Task> action)
    {
        await using OiReportingDbContext context = _database.CreateContext();
        await action(new CompanyRepo(context));
    }

    private ICompanyProfile? CurrentProfile()
    {
        using OiReportingDbContext context = _database.CreateContext();
        return new CompanyRepo(context).GetCompanyProfile();
    }

    private async Task<List<ConfiguredCompany>> CompaniesAsync()
    {
        await using OiReportingDbContext context = _database.CreateContext();
        return await context.CompanyConfiguration.AsNoTracking().Include(c => c.Result).ToListAsync(Ct);
    }

    [Test, Description("CompanyRepo constructor should throw when the context is null")]
    public void Constructor_ThrowsWhenDbContextIsNull()
    {
        Action act = () => _ = new CompanyRepo(null!);

        act.Should().Throw<ArgumentNullException>("the reporting context is required by CompanyRepo");
    }

    // ---- GetCompanyProfile

    [Test, Description("GetCompanyProfile should return null until a profile has been stored")]
    public void GetCompanyProfile_ReturnsNullWhenNothingIsStored()
    {
        ICompanyProfile? result = CurrentProfile();

        result.Should().BeNull();
    }

    [Test, Description("GetCompanyProfile should return every text field that was stored")]
    public async Task GetCompanyProfile_ReturnsTheStoredTextFields()
    {
        await Do(r => r.UpsertAsync(Profile(), Ct));

        ICompanyProfile? result = CurrentProfile();

        result.Should().NotBeNull();
        result!.CompanyName.Should().Be("Acme Tools");
        result.CompanyAddress.Should().Be("1 Main Street");
        result.CompanyCity.Should().Be("Phoenix");
        result.CompanyState.Should().Be("AZ");
        result.CompanyZip.Should().Be("85001");
        result.CompanyEmail.Should().Be("orders@acme.test");
        result.CompanyPhone.Should().Be("602-555-0100");
    }

    [Test, Description("GetCompanyProfile should return an empty logo name and file when the company has no logo")]
    public async Task GetCompanyProfile_ReturnsAnEmptyLogoWhenThereIsNone()
    {
        await Do(r => r.UpsertAsync(Profile(logo: null), Ct));

        ICompanyProfile? result = CurrentProfile();

        result!.LogoResourceName.Should().BeEmpty();
        result.LogoFile.Should().BeEmpty();
    }

    [Test, Description("GetCompanyProfile should return the stored logo, also when it is read by a later request with its own context")]
    public async Task GetCompanyProfile_ReturnsTheStoredLogoInALaterRequest()
    {
        // NOTE: if this fails, GetCompanyProfile is not loading the logo row (the Result navigation).
        // Inside the request that saved the profile the logo is still tracked, so it only shows up as lost after a restart.
        await Do(r => r.UpsertAsync(Profile(logo: Logo, logoName: "acme.png"), Ct));

        ICompanyProfile? result = CurrentProfile();

        result!.LogoResourceName.Should().Be("acme.png");
        result.LogoFile.Should().Equal(Logo);
    }

    // ---- UpsertAsync: first save

    [Test, Description("UpsertAsync should insert a company when none exists")]
    public async Task UpsertAsync_InsertsTheFirstCompany()
    {
        await Do(r => r.UpsertAsync(Profile(), Ct));

        List<ConfiguredCompany> companies = await CompaniesAsync();
        companies.Should().ContainSingle();
        companies[0].Id.Should().NotBe(Guid.Empty);
        companies[0].CompanyName.Should().Be("Acme Tools");
        companies[0].CompanyAddress.Should().Be("1 Main Street");
        companies[0].CompanyCity.Should().Be("Phoenix");
        companies[0].CompanyState.Should().Be("AZ");
        companies[0].CompanyZip.Should().Be("85001");
        companies[0].CompanyEmail.Should().Be("orders@acme.test");
        companies[0].CompanyPhone.Should().Be("602-555-0100");
    }

    [Test, Description("UpsertAsync should store the logo file and its name with the first company")]
    public async Task UpsertAsync_StoresTheLogoWithTheFirstCompany()
    {
        await Do(r => r.UpsertAsync(Profile(logo: Logo, logoName: "acme.png"), Ct));

        ConfiguredCompany company = (await CompaniesAsync()).Single();
        company.Result.Should().NotBeNull();
        company.Result!.FileName.Should().Be("acme.png");
        company.Result.FileContents.Should().Equal(Logo);
        company.ResultId.Should().Be(company.Result.Id);
    }

    [Test, Description("UpsertAsync should store no logo row when the profile has no logo")]
    public async Task UpsertAsync_StoresNoLogoWhenThereIsNone()
    {
        await Do(r => r.UpsertAsync(Profile(logo: null), Ct));

        ConfiguredCompany company = (await CompaniesAsync()).Single();
        company.Result.Should().BeNull();
        company.ResultId.Should().BeNull();
    }

    // ---- UpsertAsync: later saves

    [Test, Description("UpsertAsync should update the one company instead of adding a second")]
    public async Task UpsertAsync_UpdatesTheExistingCompany()
    {
        await Do(r => r.UpsertAsync(Profile("First Name"), Ct));
        Guid firstId = (await CompaniesAsync()).Single().Id;

        await Do(r => r.UpsertAsync(Profile("Second Name"), Ct));

        List<ConfiguredCompany> companies = await CompaniesAsync();
        companies.Should().ContainSingle("there is only ever one company profile");
        companies[0].Id.Should().Be(firstId);
        companies[0].CompanyName.Should().Be("Second Name");
    }

    [Test, Description("UpsertAsync should replace every text field when the profile changes")]
    public async Task UpsertAsync_ReplacesEveryTextField()
    {
        await Do(r => r.UpsertAsync(Profile(), Ct));
        Mock<ICompanyProfile> changed = new();
        changed.SetupGet(p => p.CompanyName).Returns("New Name");
        changed.SetupGet(p => p.CompanyAddress).Returns("2 Side Street");
        changed.SetupGet(p => p.CompanyCity).Returns("Tempe");
        changed.SetupGet(p => p.CompanyState).Returns("CA");
        changed.SetupGet(p => p.CompanyZip).Returns("90001");
        changed.SetupGet(p => p.CompanyEmail).Returns("new@acme.test");
        changed.SetupGet(p => p.CompanyPhone).Returns("480-555-0199");
        changed.SetupGet(p => p.LogoResourceName).Returns(string.Empty);
        changed.SetupGet(p => p.LogoFile).Returns((byte[])null!);

        await Do(r => r.UpsertAsync(changed.Object, Ct));

        ConfiguredCompany company = (await CompaniesAsync()).Single();
        company.CompanyName.Should().Be("New Name");
        company.CompanyAddress.Should().Be("2 Side Street");
        company.CompanyCity.Should().Be("Tempe");
        company.CompanyState.Should().Be("CA");
        company.CompanyZip.Should().Be("90001");
        company.CompanyEmail.Should().Be("new@acme.test");
        company.CompanyPhone.Should().Be("480-555-0199");
    }

    [Test, Description("UpsertAsync should keep the stored logo when the update brings no logo")]
    public async Task UpsertAsync_KeepsTheLogoWhenTheUpdateHasNone()
    {
        await Do(r => r.UpsertAsync(Profile(logo: Logo, logoName: "acme.png"), Ct));

        await Do(r => r.UpsertAsync(Profile("Renamed", logo: null), Ct));

        ConfiguredCompany company = (await CompaniesAsync()).Single();
        company.CompanyName.Should().Be("Renamed");
        company.Result.Should().NotBeNull("an update without a logo must not throw away the one that is stored");
        company.Result!.FileContents.Should().Equal(Logo);
    }

    [Test, Description("UpsertAsync should replace the logo when the update brings a new one")]
    public async Task UpsertAsync_ReplacesTheLogoWhenTheUpdateHasANewOne()
    {
        await Do(r => r.UpsertAsync(Profile(logo: Logo, logoName: "acme.png"), Ct));

        await Do(r => r.UpsertAsync(Profile(logo: OtherLogo, logoName: "acme-new.jpg"), Ct));

        ConfiguredCompany company = (await CompaniesAsync()).Single();
        company.Result.Should().NotBeNull();
        company.Result!.FileName.Should().Be("acme-new.jpg");
        company.Result.FileContents.Should().Equal(OtherLogo);
    }

    [Test, Description("UpsertAsync should add a logo to a company that was first stored without one")]
    public async Task UpsertAsync_AddsALogoToAnExistingCompany()
    {
        await Do(r => r.UpsertAsync(Profile(logo: null), Ct));

        await Do(r => r.UpsertAsync(Profile(logo: Logo, logoName: "acme.png"), Ct));

        ConfiguredCompany company = (await CompaniesAsync()).Single();
        company.Result.Should().NotBeNull();
        company.Result!.FileName.Should().Be("acme.png");
    }

    [Test, Description("UpsertAsync should be safe to repeat with the same data")]
    public async Task UpsertAsync_IsIdempotent()
    {
        await Do(r => r.UpsertAsync(Profile(), Ct));
        await Do(r => r.UpsertAsync(Profile(), Ct));
        await Do(r => r.UpsertAsync(Profile(), Ct));

        List<ConfiguredCompany> companies = await CompaniesAsync();
        companies.Should().ContainSingle();
        companies[0].CompanyName.Should().Be("Acme Tools");
    }
}
