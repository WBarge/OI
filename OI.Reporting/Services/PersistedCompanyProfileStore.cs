using OI.Glue.Models;
using OI.Glue.Repos;
using OI.Reporting.Models;

namespace OI.Reporting.Services;

public class PersistedCompanyProfileStore: ICompanyProfileStore
{
    private static readonly Lock _lockObject = new Lock();
    private readonly ICompanyRepo _companyRepo;

    public PersistedCompanyProfileStore(ICompanyRepo companyRepo)
    {
        _companyRepo = companyRepo ?? throw new ArgumentNullException(nameof(companyRepo));
        Current = _companyRepo.GetCompanyProfile();
        
    }

    public ICompanyProfile? Current { get; }
    public async Task ReplaceAsync(ICompanyProfile profile, CancellationToken cancellationToken= default)
    {
        lock (_lockObject)
        {
            
        }
        await _companyRepo.UpsertAsync(profile, cancellationToken);
    }
}