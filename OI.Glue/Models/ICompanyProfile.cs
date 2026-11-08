namespace OI.Glue.Models;

public interface ICompanyProfile
{
    string CompanyName { get; init; }
    string CompanyAddress { get; init; }
    string CompanyCity { get; init; }
    string CompanyState { get; init; }
    string CompanyZip { get; init; }
    string CompanyEmail { get; init; }
    string CompanyPhone { get; init; }

    /// <summary>The file name of the logo: everything after the last "/" in the UI's companyLogoUrl. Empty when there is no logo.</summary>
    string LogoResourceName { get; init; }

    /// <summary>The logo image. Empty when there is no logo.</summary>
    byte[] LogoFile { get; init; }
}