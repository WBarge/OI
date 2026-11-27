using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Glue.Interfaces.Repos
{
    public interface ICharacteristicRepo
    {
        /// <summary>
        /// Retrieves all <see cref="ICharacteristic"/> entities from the database asynchronously.
        /// </summary>
        /// <param name="token">
        /// A <see cref="CancellationToken"/> to observe while waiting for the task to complete.
        /// </param>
        /// <returns>
        /// A task that represents the asynchronous operation. The task result contains an enumerable collection of 
        /// <see cref="ICharacteristic"/> entities.
        /// </returns>
        /// <exception cref="OperationCanceledException">
        /// Thrown if the operation is canceled.
        /// </exception>
        Task<IEnumerable<IFullCharacteristic>> GetAll(CancellationToken token);

        /// <summary>
        /// Creates a new instance of the <see cref="ICharacteristic"/> entity.
        /// </summary>
        /// <returns>
        /// A new instance of <see cref="ICharacteristic"/>.
        /// </returns>
        ICharacteristic CreateInstance();

        /// <summary>
        /// Adds a new characteristic record to the database.
        /// </summary>
        /// <param name="recordToAdd">
        /// The <see cref="ICharacteristic"/> instance representing the characteristic to add.
        /// </param>
        /// <param name="token">
        /// A <see cref="CancellationToken"/> to observe while waiting for the task to complete.
        /// </param>
        /// <returns>
        /// A task that represents the asynchronous operation. The task result contains the added 
        /// <see cref="ICharacteristic"/> instance.
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// Thrown when <paramref name="recordToAdd"/> is <c>null</c>.
        /// </exception>
        Task<ICharacteristic> Add(ICharacteristic recordToAdd, CancellationToken token);

        /// <summary>
        /// Adds a new characteristic value to the database.
        /// </summary>
        /// <param name="value">The characteristic value to add. Must not be <c>null</c> and must have a valid <see cref="ICharacteristicValue.CharacteristicId"/>.</param>
        /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>
        /// A <see cref="Task{TResult}"/> representing the asynchronous operation. 
        /// The task result contains <c>true</c> if the value was successfully added; otherwise, <c>false</c>.
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// Thrown when <paramref name="value"/> is <c>null</c> or its <see cref="ICharacteristicValue.CharacteristicId"/> is an empty GUID.
        /// </exception>
        /// <exception cref="KeyNotFoundException">
        /// Thrown when the characteristic with the specified <see cref="ICharacteristicValue.CharacteristicId"/> does not exist.
        /// </exception>
        Task<ICharacteristicValue> AddValue(ICharacteristicValue value, CancellationToken token);

        Task<bool> DeleteValue(Guid id, CancellationToken token = default);

        /// <summary>
        /// Deletes a characteristic record by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the characteristic to delete.</param>
        /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>
        /// A task that represents the asynchronous operation. The task result contains 
        /// <c>true</c> if the record was successfully deleted; otherwise, <c>false</c>.
        /// </returns>
        Task<bool> Delete(Guid id,CancellationToken token);

        /// <summary>
        /// Gets the full characteristic information by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the characteristic to retrieve.</param>
        /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>
        /// A task that represents the asynchronous operation. The task result contains the full characteristic information.
        /// </returns>
        /// <exception cref="KeyNotFoundException"></exception>
        Task<IFullCharacteristic> GetFullCharacteristicAsync(Guid id, CancellationToken token);
    }
}