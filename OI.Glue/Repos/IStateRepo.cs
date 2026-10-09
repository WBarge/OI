using OI.Glue.Models;

namespace OI.Glue.Repos;

public interface IStateRepo
{
    Task<IEnumerable<IState>> ListStatesAsync(CancellationToken cancellationToken = default);
}