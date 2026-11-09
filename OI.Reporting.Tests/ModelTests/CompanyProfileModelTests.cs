using FluentAssertions;
using Microsoft.AspNetCore.Http;
using OI.Glue.Models;
using OI.Reporting.Models;

namespace OI.Reporting.Tests.ModelTests;

[TestFixture, Description("Tests for the company profile models")]
public class CompanyProfileModelTests
{
    [Test, Description("CompanyProfile should default every text field to empty and the logo to an empty file, never null")]
    public void CompanyProfile_HasEmptyDefaults()
    {
        CompanyProfile sut = new();

        sut.CompanyName.Should().BeEmpty();
        sut.CompanyAddress.Should().BeEmpty();
        sut.CompanyCity.Should().BeEmpty();
        sut.CompanyState.Should().BeEmpty();
        sut.CompanyZip.Should().BeEmpty();
        sut.CompanyEmail.Should().BeEmpty();
        sut.CompanyPhone.Should().BeEmpty();
        sut.LogoResourceName.Should().BeEmpty();
        sut.LogoFile.Should().NotBeNull().And.BeEmpty();
    }

    [Test, Description("CompanyProfile should hold what it is initialised with")]
    public void CompanyProfile_HoldsItsValues()
    {
        ICompanyProfile sut = new CompanyProfile { CompanyName = "Acme", CompanyZip = "85001", LogoFile = [1, 2], LogoResourceName = "a.png" };

        sut.CompanyName.Should().Be("Acme");
        sut.CompanyZip.Should().Be("85001");
        sut.LogoFile.Should().Equal(1, 2);
        sut.LogoResourceName.Should().Be("a.png");
    }

    [Test, Description("CompanyProfileUploadRequest should start with every field unset, so a missing field is not rejected as required")]
    public void UploadRequest_StartsUnset()
    {
        CompanyProfileUploadRequest sut = new();

        sut.CompanyName.Should().BeNull();
        sut.CompanyAddress.Should().BeNull();
        sut.CompanyCity.Should().BeNull();
        sut.CompanyState.Should().BeNull();
        sut.CompanyZip.Should().BeNull();
        sut.CompanyEmail.Should().BeNull();
        sut.CompanyPhone.Should().BeNull();
        sut.LogoResourceName.Should().BeNull();
        sut.Logo.Should().BeNull();
    }

    [Test, Description("CompanyProfileUploadRequest should hold the logo file it is given")]
    public void UploadRequest_HoldsTheLogo()
    {
        IFormFile logo = new FormFile(new MemoryStream([1]), 0, 1, "logo", "logo.png");

        CompanyProfileUploadRequest sut = new() { Logo = logo, LogoResourceName = "logo.png" };

        sut.Logo.Should().BeSameAs(logo);
        sut.LogoResourceName.Should().Be("logo.png");
    }
}
