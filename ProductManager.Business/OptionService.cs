using Microsoft.Extensions.Logging;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;
using ProductManager.Glue.Interfaces.Services;

namespace ProductManager.Business
{
    public class OptionService : IOptionService
    {
        // ReSharper disable once NotAccessedField.Local
        private readonly ILogger<OptionService> _logger;
        private readonly IOptionRepo _optionRepo;

        public OptionService(ILogger<OptionService> logger, IOptionRepo optionRepo)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _optionRepo = optionRepo ?? throw new ArgumentNullException(nameof(optionRepo));
        }

        public async Task<IEnumerable<IOption>> GetOptionsAsync(Dictionary<string, IFilterMetaData[]> filters, int requestPage, int requestPageSize,
            CancellationToken cancellationToken = default)
        {
            return await _optionRepo.FindPagedProductRecordsAsync(filters, requestPage, requestPageSize, cancellationToken);
        }

        public async Task<long> GetOptionCountAsync(CancellationToken cancellationToken = default)
        {
            return await _optionRepo.GetOptionCountAsync(cancellationToken);
        }

        public async Task<IOption?> GetOptionAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _optionRepo.GetOptionAsync(id, cancellationToken);
        }

        public async Task<Guid> AddOptionAsync(IOption request, CancellationToken cancellationToken = default)
        {
            return await _optionRepo.AddOptionAsync(request, cancellationToken);
        }

        public async Task<bool> UpdateOptionAsync(IOption request, CancellationToken cancellationToken = default)
        {
            return await _optionRepo.UpdateOptionAsync(request, cancellationToken);
        }

        public async Task<bool> DeleteOptionAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _optionRepo.DeleteAsync(id, cancellationToken);
            return true;
        }
    }
}