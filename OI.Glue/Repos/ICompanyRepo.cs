using OI.Glue.Models;

namespace OI.Glue.Repos;

public interface ICompanyRepo
{
    ICompanyProfile? GetCompanyProfile();
    Task UpsertAsync(ICompanyProfile profile, CancellationToken cancellationToken = default);
}