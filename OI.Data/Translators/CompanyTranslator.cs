using OI.Data.Model.Jobs;
using OI.Data.Translators.Internal_Models;
using OI.Glue.Models;

namespace OI.Data.Translators;

internal static class CompanyTranslator
{
    public static ICompanyProfile Translate(this ConfiguredCompany configuredCompany)
    {
        return new CompanyProfile
        {
            CompanyName = configuredCompany.CompanyName ?? "",
            CompanyAddress = configuredCompany.CompanyAddress ?? "",
            CompanyCity = configuredCompany.CompanyCity ?? "",
            CompanyState = configuredCompany.CompanyState ?? "",
            CompanyZip = configuredCompany.CompanyZip ?? "",
            CompanyEmail = configuredCompany.CompanyEmail ?? "",
            CompanyPhone = configuredCompany.CompanyPhone ?? "",
            CompanyContactName = configuredCompany.CompanyContactName ?? "",
            CompanyContactEmail = configuredCompany.CompanyContactEmail ?? "",
            CompanyContactPhone = configuredCompany.CompanyContactPhone ?? "",
            LogoResourceName = configuredCompany.Result?.FileName ?? "",
            LogoFile = configuredCompany.Result?.FileContents ?? []
        };
    }
}