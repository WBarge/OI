using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Reporting.Controllers;
using OI.Reporting.Models;
using OI.Reporting.Services;

namespace OI.Reporting.Tests.ControllerTests;

[TestFixture, Description("Tests for CompanyProfileController")]
public class CompanyProfileControllerTests
{
    private static readonly byte[] LogoBytes = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x01, 0x02];

    [SetUp]
    public void SetUp()
    {
    }

    private static IFormFile Logo(byte[] bytes, string fileName = "logo.png") =>
        new FormFile(new MemoryStream(bytes), 0, bytes.Length, "logo", fileName);

    private static CompanyProfileUploadRequest FullRequest(IFormFile? logo = null, string? resourceName = "logo.png") => new()
    {
        CompanyName = "Acme Tools",
        CompanyAddress = "1 Main Street",
        CompanyCity = "Phoenix",
        CompanyState = "AZ",
        CompanyZip = "85001",
        CompanyEmail = "orders@acme.test",
        CompanyPhone = "602-555-0100",
        LogoResourceName = resourceName,
        Logo = logo
    };

    [Test, Description("Constructor should throw when store is null")]
    public void Constructor_ThrowsWhenStoreIsNull()
    {
        Action act = () => _ = new CompanyProfileController(null!, NullLogger<CompanyProfileController>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("store");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Mock<ICompanyProfileStore> storeMock = new Mock<ICompanyProfileStore>();
        Action act = () => _ = new CompanyProfileController(storeMock.Object, null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    //[Test, Description("Upload should return 204 and keep every text field when the upload is complete")]
    //public async Task Upload_StoresTheTextFields()
    //{
    //    IActionResult result = await _sut.Upload(FullRequest(Logo(LogoBytes)), CancellationToken.None);

    //    result.Should().BeOfType<NoContentResult>();
    //    _stored.Should().NotBeNull();
    //    _stored!.CompanyName.Should().Be("Acme Tools");
    //    _stored.CompanyAddress.Should().Be("1 Main Street");
    //    _stored.CompanyCity.Should().Be("Phoenix");
    //    _stored.CompanyState.Should().Be("AZ");
    //    _stored.CompanyZip.Should().Be("85001");
    //    _stored.CompanyEmail.Should().Be("orders@acme.test");
    //    _stored.CompanyPhone.Should().Be("602-555-0100");
    //}

    //[Test, Description("Upload should keep the logo bytes exactly as sent, with its resource name")]
    //public async Task Upload_StoresTheLogoAsBytesWithItsName()
    //{
    //    await _sut.Upload(FullRequest(Logo(LogoBytes), "logo.png"), CancellationToken.None);

    //    _stored!.LogoFile.Should().Equal(LogoBytes);
    //    _stored.LogoResourceName.Should().Be("logo.png");
    //}

    //[Test, Description("Upload should replace the stored profile exactly once")]
    //public async Task Upload_ReplacesTheStoredProfileOnce()
    //{
    //    await _sut.Upload(FullRequest(Logo(LogoBytes)), CancellationToken.None);

    //    _store.Verify(s => s.ReplaceAsync(It.IsAny<CompanyProfile>()), Times.Once);
    //}

    //[Test, Description("Upload should accept a company without a logo and store an empty logo and name")]
    //public async Task Upload_AcceptsNoLogo()
    //{
    //    IActionResult result = await _sut.Upload(FullRequest(logo: null, resourceName: "left-over.png"), CancellationToken.None);

    //    result.Should().BeOfType<NoContentResult>();
    //    _stored!.LogoFile.Should().BeEmpty();
    //    _stored.LogoResourceName.Should().BeEmpty();
    //}

    //[Test, Description("Upload should treat a zero-length logo as no logo")]
    //public async Task Upload_TreatsAnEmptyFileAsNoLogo()
    //{
    //    IActionResult result = await _sut.Upload(FullRequest(Logo([])), CancellationToken.None);

    //    result.Should().BeOfType<NoContentResult>();
    //    _stored!.LogoFile.Should().BeEmpty();
    //    _stored.LogoResourceName.Should().BeEmpty();
    //}

    //[Test, Description("Upload should turn missing text fields into empty strings, never null")]
    //public async Task Upload_TurnsMissingFieldsIntoEmptyStrings()
    //{
    //    await _sut.Upload(new CompanyProfileUploadRequest { CompanyName = "Acme Tools" }, CancellationToken.None);

    //    _stored!.CompanyName.Should().Be("Acme Tools");
    //    _stored.CompanyAddress.Should().BeEmpty();
    //    _stored.CompanyCity.Should().BeEmpty();
    //    _stored.CompanyState.Should().BeEmpty();
    //    _stored.CompanyZip.Should().BeEmpty();
    //    _stored.CompanyEmail.Should().BeEmpty();
    //    _stored.CompanyPhone.Should().BeEmpty();
    //}

    //[Test, Description("Upload should trim stray spaces around the text fields")]
    //public async Task Upload_TrimsTheTextFields()
    //{
    //    await _sut.Upload(new CompanyProfileUploadRequest { CompanyName = "  Acme Tools ", CompanyZip = " 85001" }, CancellationToken.None);

    //    _stored!.CompanyName.Should().Be("Acme Tools");
    //    _stored.CompanyZip.Should().Be("85001");
    //}

    //[Test, Description("Upload should return 400 and store nothing when a logo arrives without a resource name")]
    //public async Task Upload_RejectsALogoWithoutAName([Values(null, "", "   ")] string? name)
    //{
    //    IActionResult result = await _sut.Upload(FullRequest(Logo(LogoBytes), name), CancellationToken.None);

    //    result.Should().BeOfType<BadRequestObjectResult>();
    //    _store.Verify(s => s.ReplaceAsync(It.IsAny<CompanyProfile>()), Times.Never);
    //}

    //[TestCase("images/brand/logo.png", "logo.png")]
    //[TestCase("../../etc/logo.png", "logo.png")]
    //[TestCase(@"C:\brand\logo.png", "logo.png")]
    //[Description("Upload should keep only the file name of the resource name")]
    //public async Task Upload_KeepsOnlyTheFileName(string sent, string expected)
    //{
    //    await _sut.Upload(FullRequest(Logo(LogoBytes), sent), CancellationToken.None);

    //    _stored!.LogoResourceName.Should().Be(expected);
    //}

    //[Test, Description("Upload should return 400 when the resource name has nothing after its last slash")]
    //public async Task Upload_RejectsANameThatEndsInASlash()
    //{
    //    IActionResult result = await _sut.Upload(FullRequest(Logo(LogoBytes), "images/"), CancellationToken.None);

    //    result.Should().BeOfType<BadRequestObjectResult>();
    //}

    //[Test, Description("Upload should return 413 and store nothing when the logo is over the limit")]
    //public async Task Upload_RejectsAnOversizedLogo()
    //{
    //    byte[] tooBig = new byte[CompanyProfileController.MAX_LOGO_BYTES + 1];

    //    IActionResult result = await _sut.Upload(FullRequest(Logo(tooBig)), CancellationToken.None);

    //    result.Should().BeOfType<ObjectResult>().Which.StatusCode.Should().Be(StatusCodes.Status413PayloadTooLarge);
    //    _store.Verify(s => s.ReplaceAsync(It.IsAny<CompanyProfile>()), Times.Never);
    //}

    //[Test, Description("Upload should accept a logo of exactly the limit")]
    //public async Task Upload_AcceptsALogoAtTheLimit()
    //{
    //    byte[] atLimit = new byte[CompanyProfileController.MAX_LOGO_BYTES];

    //    IActionResult result = await _sut.Upload(FullRequest(Logo(atLimit)), CancellationToken.None);

    //    result.Should().BeOfType<NoContentResult>();
    //    _stored!.LogoFile.Should().HaveCount((int)CompanyProfileController.MAX_LOGO_BYTES);
    //}
}
