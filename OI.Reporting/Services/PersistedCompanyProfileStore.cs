using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Reporting.Services;

public class PersistedCompanyProfileStore: ICompanyProfileStore
{
    private readonly ICompanyRepo _companyRepo;

    public PersistedCompanyProfileStore(ICompanyRepo companyRepo)
    {
        _companyRepo = companyRepo ?? throw new ArgumentNullException(nameof(companyRepo));
        Current = _companyRepo.GetCompanyProfile();
        
    }

    public ICompanyProfile? Current { get; }
    public async Task ReplaceAsync(ICompanyProfile profile, CancellationToken cancellationToken= default)
    { 
        await  _companyRepo.UpsertAsync(profile, cancellationToken);
    }
}