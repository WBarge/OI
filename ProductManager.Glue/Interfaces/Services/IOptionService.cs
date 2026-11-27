using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Services
{
    public interface IOptionService
    {
        Task<IEnumerable<IOption>> GetOptionsAsync(Dictionary<string, IFilterMetaData[]> filters, int requestPage, int requestPageSize,CancellationToken cancellationToken = default);
        Task<long> GetOptionCountAsync(CancellationToken cancellationToken = default);
        Task<IOption?> GetOptionAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Guid> AddOptionAsync(IOption request, CancellationToken cancellationToken = default);
        Task<bool> UpdateOptionAsync(IOption request, CancellationToken cancellationToken = default);
        Task<bool> DeleteOptionAsync(Guid id, CancellationToken cancellationToken = default);
    }
}