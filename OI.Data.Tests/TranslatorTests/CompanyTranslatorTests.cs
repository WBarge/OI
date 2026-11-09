using FluentAssertions;
using OI.Data.Model.Jobs;
using OI.Data.Translators;
using OI.Glue.Models;

namespace OI.Data.Tests.TranslatorTests;

[TestFixture, Description("Tests for CompanyTranslator, which turns the stored company into the profile the reports use")]
public class CompanyTranslatorTests
{
    private static ConfiguredCompany FullCompany() => new()
    {
        Id = Guid.NewGuid(),
        CompanyName = "Acme Tools",
        CompanyAddress = "1 Main Street",
        CompanyCity = "Phoenix",
        CompanyState = "AZ",
        CompanyZip = "85001",
        CompanyEmail = "orders@acme.test",
        CompanyPhone = "602-555-0100",
        Result = new StoredFile { Id = Guid.NewGuid(), FileName = "acme.png", FileContents = [1, 2, 3] },
    };

    [Test, Description("Translate should copy every text field")]
    public void Translate_CopiesTheTextFields()
    {
        ICompanyProfile result = FullCompany().Translate();

        result.CompanyName.Should().Be("Acme Tools");
        result.CompanyAddress.Should().Be("1 Main Street");
        result.CompanyCity.Should().Be("Phoenix");
        result.CompanyState.Should().Be("AZ");
        result.CompanyZip.Should().Be("85001");
        result.CompanyEmail.Should().Be("orders@acme.test");
        result.CompanyPhone.Should().Be("602-555-0100");
    }

    [Test, Description("Translate should copy the logo name and file from the stored file")]
    public void Translate_CopiesTheLogo()
    {
        ICompanyProfile result = FullCompany().Translate();

        result.LogoResourceName.Should().Be("acme.png");
        result.LogoFile.Should().Equal(1, 2, 3);
    }

    [Test, Description("Translate should give an empty logo name and file when the company has no stored file")]
    public void Translate_GivesAnEmptyLogoWhenThereIsNoFile()
    {
        ConfiguredCompany company = FullCompany();
        company.Result = null;

        ICompanyProfile result = company.Translate();

        result.LogoResourceName.Should().BeEmpty();
        result.LogoFile.Should().NotBeNull().And.BeEmpty();
    }

    [Test, Description("Translate should turn every missing text field into an empty string, never null")]
    public void Translate_TurnsNullTextIntoEmptyStrings()
    {
        ConfiguredCompany company = new() { Id = Guid.NewGuid() };

        ICompanyProfile result = company.Translate();

        result.CompanyName.Should().BeEmpty();
        result.CompanyAddress.Should().BeEmpty();
        result.CompanyCity.Should().BeEmpty();
        result.CompanyState.Should().BeEmpty();
        result.CompanyZip.Should().BeEmpty();
        result.CompanyEmail.Should().BeEmpty();
        result.CompanyPhone.Should().BeEmpty();
        result.LogoResourceName.Should().BeEmpty();
        result.LogoFile.Should().BeEmpty();
    }

    [Test, Description("Translate should keep an empty string as an empty string")]
    public void Translate_KeepsEmptyStrings()
    {
        ConfiguredCompany company = FullCompany();
        company.CompanyAddress = string.Empty;

        ICompanyProfile result = company.Translate();

        result.CompanyAddress.Should().BeEmpty();
    }
}
