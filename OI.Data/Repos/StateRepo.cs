using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

internal class StateRepo(OiDbContext dbContext) : BaseEfRepo<State>(dbContext), IStateRepo
{
    public async Task<IEnumerable<IState>> ListStatesAsync(CancellationToken cancellationToken = default)
    {
        IEnumerable<IState> results = (await this.GetAllRecordsAsync(cancellationToken)).Select( s => s.Translate());
        return results;
    }
}