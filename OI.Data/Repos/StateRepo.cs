using OI.Data.Contexts;
using OI.Data.Model.Orders;
using OI.Data.Translators;
using OI.Glue.Models;
using OI.Glue.Repos;

namespace OI.Data.Repos;

internal class StateRepo(OiServiceDbContext serviceDbContext) : BaseEfRepo<State>(serviceDbContext), IStateRepo
{
    public async Task<IEnumerable<IState>> ListStatesAsync(CancellationToken cancellationToken = default)
    {
        IEnumerable<IState> results = (await GetAllRecordsAsync(cancellationToken)).Select( s => s.Translate());
        return results;
    }
}