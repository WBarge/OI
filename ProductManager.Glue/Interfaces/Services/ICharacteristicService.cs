using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Services
{
    public interface ICharacteristicService
    {
        /// <summary>
        /// Get all characteristics as an asynchronous operation.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <returns>A Task&lt;IEnumerable`1&gt; representing the asynchronous operation.</returns>
        Task<IEnumerable<IFullCharacteristic>> GetAllCharacteristicsAsync(CancellationToken cancellationToken = default);

        /// <summary>
        /// Create a new characteristic as an asynchronous operation.
        /// </summary>
        /// <param name="name">The name of the characteristic.</param>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <returns>A Task&lt;Guid&gt; representing the asynchronous operation.</returns>
        Task<ICharacteristic> CreateCharacteristicAsync(string name, CancellationToken cancellationToken = default);

        /// <summary>
        /// Delete a characteristic as an asynchronous operation.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <returns>A Task representing the asynchronous operation.</returns>
        Task DeleteCharacteristicAsync(Guid id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Add a value to a characteristic as an asynchronous operation.
        /// </summary>
        /// <param name="characteristicId">The characteristic identifier.</param>
        /// <param name="value">The value to add.</param>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <returns>A Task representing the asynchronous operation.</returns>
        Task<ICharacteristicValue> AddValueToCharacteristicAsync(Guid characteristicId, string value,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets the full characteristic information by its unique identifier as an asynchronous operation.
        /// </summary>
        /// <param name="id">The unique identifier of the characteristic to retrieve.</param>
        /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the full characteristic information.</returns>
        Task<IFullCharacteristic> GetFullCharacteristicAsync(Guid id, CancellationToken cancellationToken = default);

        Task<bool> DeleteCharacteristicValueAsync(Guid id, Guid valueId, CancellationToken token = default);
    }
}