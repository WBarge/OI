using Microsoft.Extensions.Logging;
using ProductManager.Business.Models;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;
using ProductManager.Glue.Interfaces.Services;

namespace ProductManager.Business;
/// <summary>
/// Class CharacteristicService.
/// Implements the <see cref="ICharacteristicService" />
/// </summary>
/// <seealso cref="ICharacteristicService" />
public class CharacteristicService : ICharacteristicService
{
    /// <summary>
    /// The logger
    /// </summary>
    private readonly ILogger<CharacteristicService> _logger;
    /// <summary>
    /// The repository
    /// </summary>
    private readonly ICharacteristicRepo _repo;

    /// <summary>
    /// Initializes a new instance of the <see cref="CharacteristicService" /> class.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="characteristicRepo">The characteristic repository.</param>
    /// <exception cref="ArgumentNullException">logger</exception>
    /// <exception cref="ArgumentNullException">characteristicRepo</exception>
    public CharacteristicService(ILogger<CharacteristicService> logger, ICharacteristicRepo characteristicRepo)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _repo = characteristicRepo ?? throw new ArgumentNullException(nameof(characteristicRepo));
    }

    /// <summary>
    /// Get all characteristics as an asynchronous operation.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task&lt;IEnumerable`1&gt; representing the asynchronous operation.</returns>
    public async Task<IEnumerable<IFullCharacteristic>> GetAllCharacteristicsAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogDebug("GetAllCharacteristicsAsync called");
        return await _repo.GetAll(cancellationToken);
    }

    /// <summary>
    /// Create a new characteristic as an asynchronous operation.
    /// </summary>
    /// <param name="name">The name of the characteristic.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task&lt;Guid&gt; representing the asynchronous operation.</returns>
    public async Task<ICharacteristic> CreateCharacteristicAsync(string name, CancellationToken cancellationToken = default)
    {
        _logger.LogDebug("CreateCharacteristicAsync called");
        ICharacteristic characteristic = _repo.CreateInstance();
        characteristic.Id = Guid.NewGuid();
        characteristic.Name = name;
        return await _repo.Add(characteristic, cancellationToken);
    }

    /// <summary>
    /// Delete a characteristic as an asynchronous operation.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    public async Task DeleteCharacteristicAsync(Guid id, CancellationToken cancellationToken = default)
    {
        _logger.LogDebug($"DeleteCharacteristicAsync called for ID: {id}");
        await _repo.Delete(id, cancellationToken);
    }

    /// <summary>
    /// Add a value to a characteristic as an asynchronous operation.
    /// </summary>
    /// <param name="characteristicId">The characteristic identifier.</param>
    /// <param name="value">The value to add.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    public async Task<ICharacteristicValue> AddValueToCharacteristicAsync(Guid characteristicId, string value,
        CancellationToken cancellationToken = default)
    {
        _logger.LogDebug($"AddValueToCharacteristicAsync called for Characteristic ID: {characteristicId}");
        ICharacteristicValue newValue = new CharacteristicValue
        {
            CharacteristicId = characteristicId,
            Value = value
        };
        return await _repo.AddValue(newValue, cancellationToken);
    }

    /// <summary>
    /// Gets the full characteristic information by its unique identifier as an asynchronous operation.
    /// </summary>
    /// <param name="id">The unique identifier of the characteristic to retrieve.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the full characteristic information.</returns>
    public async Task<IFullCharacteristic> GetFullCharacteristicAsync(Guid id, CancellationToken cancellationToken = default)
    {
        _logger.LogDebug($"GetFullCharacteristicAsync called for ID: {id}");
        return await _repo.GetFullCharacteristicAsync(id, cancellationToken);
    }

    public async Task<bool> DeleteCharacteristicValueAsync(Guid id, Guid valueId, CancellationToken token = default)
    {
        _logger.LogDebug($"DeleteCharacteristicValueAsync for charId:{id} and valueId:{valueId}");
        return await _repo.DeleteValue(valueId, token);
    }
}