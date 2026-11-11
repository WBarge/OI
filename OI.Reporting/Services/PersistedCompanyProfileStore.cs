using OI.Glue.Models;
using OI.Glue.Repos;

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
    public Task ReplaceAsync(ICompanyProfile profile, CancellationToken cancellationToken= default)
    {
        try
        {
            lock (_lockObject)
            {
                Task result =  _companyRepo.UpsertAsync(profile, cancellationToken);
                while (!result.IsCompleted) ;
                if (result.IsFaulted)
                {
                    throw result.Exception;
                }
            }

            return Task.CompletedTask;
        }
        catch (Exception exception)
        {
            return Task.FromException(exception);
        }
    }
}