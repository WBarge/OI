using Microsoft.EntityFrameworkCore;
using OI.Data.Contexts;
using OI.Data.Model.Jobs;
using OI.Data.Translators;
using OI.Data.Translators.Internal_Models;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos.Jobs;

internal class CompanyRepo(OiReportingDbContext serviceDbContext): BaseEfRepo<OiReportingDbContext,ConfiguredCompany>(serviceDbContext), ICompanyRepo
{
    public ICompanyProfile? GetCompanyProfile()
    {
        ConfiguredCompany? configuredCompany = serviceDbContext.CompanyConfiguration
            .Include(c => c.Result)
            .FirstOrDefault();

        return configuredCompany?.Translate();
    }

    public async Task UpsertAsync(ICompanyProfile profile, CancellationToken cancellationToken = default)
    {
        ConfiguredCompany? existingCompany = await GetFirstRecordAsync(cancellationToken);

        if (existingCompany == null)
        {
            ConfiguredCompany newCompany = new ConfiguredCompany
            {
                Id = Guid.NewGuid(),
                CompanyName = profile.CompanyName,
                CompanyAddress = profile.CompanyAddress,
                CompanyCity = profile.CompanyCity,
                CompanyState = profile.CompanyState,
                CompanyZip = profile.CompanyZip,
                CompanyEmail = profile.CompanyEmail,
                CompanyPhone = profile.CompanyPhone,
                Result = profile.LogoFile != null
                    ? new StoredFile { FileName = profile.LogoResourceName, FileContents = profile.LogoFile }
                    : null
            };

            await InsertAsync(newCompany, cancellationToken);
        }
        else
        {
            existingCompany.CompanyName = profile.CompanyName;
            existingCompany.CompanyAddress = profile.CompanyAddress;
            existingCompany.CompanyCity = profile.CompanyCity;
            existingCompany.CompanyState = profile.CompanyState;
            existingCompany.CompanyZip = profile.CompanyZip;
            existingCompany.CompanyEmail = profile.CompanyEmail;
            existingCompany.CompanyPhone = profile.CompanyPhone;

            if (profile.LogoFile != null)
            {
                existingCompany.Result = new StoredFile
                {
                    FileName = profile.LogoResourceName, 
                    FileContents = profile.LogoFile
                };
            }
            Update(existingCompany);
        }

        await SaveAsync(cancellationToken);
    }
}