using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class CompanyProfile : ICompanyProfile
{
    public string CompanyName { get; init; }
    public string CompanyAddress { get; init; }
    public string CompanyCity { get; init; }
    public string CompanyState { get; init; }
    public string CompanyZip { get; init; }
    public string CompanyEmail { get; init; }
    public string CompanyPhone { get; init; }
    public string LogoResourceName { get; init; }
    public byte[] LogoFile { get; init; }
}