using OI.Glue.Models;

namespace OI.Reporting.Models;

/// <summary>
/// The company details that reports print (letterhead, invoice header). The UI sends them once when it starts,
/// taken from its config.json, and the Reporting service keeps them for report generation.
/// Everything is text except the logo, which is the image file itself.
/// </summary>
public class CompanyProfile : ICompanyProfile
{
    public string CompanyName { get; init; } = string.Empty;
    public string CompanyAddress { get; init; } = string.Empty;
    public string CompanyCity { get; init; } = string.Empty;
    public string CompanyState { get; init; } = string.Empty;
    public string CompanyZip { get; init; } = string.Empty;
    public string CompanyEmail { get; init; } = string.Empty;
    public string CompanyPhone { get; init; } = string.Empty;

    /// <summary>The file name of the logo: everything after the last "/" in the UI's companyLogoUrl. Empty when there is no logo.</summary>
    public string LogoResourceName { get; init; } = string.Empty;

    /// <summary>The logo image. Empty when there is no logo.</summary>
    public byte[] LogoFile { get; init; } = [];
}
