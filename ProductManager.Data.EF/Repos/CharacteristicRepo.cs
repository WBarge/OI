using Microsoft.EntityFrameworkCore;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Transformers;
using ProductManager.Glue.Interfaces.Models;
using ProductManager.Glue.Interfaces.Repos;

namespace ProductManager.Data.EF.Repos
{
    /// <summary>
    /// Represents a repository for managing <see cref="ICharacteristic"/> entities in the database.
    /// Provides methods for CRUD operations and other data access functionalities.
    /// </summary>
    internal class CharacteristicRepo : BaseEfRepo<Characteristic>, ICharacteristicRepo
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CharacteristicRepo"/> class.
        /// </summary>
        /// <param name="dbContext">
        /// The <see cref="ProductDbContext"/> instance used to interact with the database.
        /// </param>
        /// <exception cref="ArgumentNullException">
        /// Thrown when <paramref name="dbContext"/> is <c>null</c>.
        /// </exception>
        public CharacteristicRepo(ProductDbContext dbContext) : base(dbContext)
        {
        }

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
        public async Task<IEnumerable<IFullCharacteristic>> GetAll(CancellationToken token=default)
        {
            List<Characteristic> characteristics = await DbContext.Characteristics
                .Include(c => c.Values)
                .ToListAsync(token);
            List<IFullCharacteristic> fullCharacteristics = characteristics.Select(CharacteristicTransformer.Transform).ToList()!;
            return fullCharacteristics;
        }

        /// <summary>
        /// Creates a new instance of the <see cref="ICharacteristic"/> entity.
        /// </summary>
        /// <returns>
        /// A new instance of <see cref="ICharacteristic"/>.
        /// </returns>
        public ICharacteristic CreateInstance()
        {
            return base.Create();
        }

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
        public async Task<ICharacteristic> Add(ICharacteristic recordToAdd, CancellationToken token=default)
        {
            if (recordToAdd == null)
            {
                throw new ArgumentNullException(nameof(recordToAdd));
            }

            Characteristic entity = new Characteristic { Id = recordToAdd.Id, Name = recordToAdd.Name };

            await InsertAsync(entity,token);
            await SaveAsync(token);

            return entity;
        }

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
        public async Task<ICharacteristicValue> AddValue(ICharacteristicValue value, CancellationToken token)
        {
            if (value == null || value.CharacteristicId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(value));
            }

            Characteristic? characteristic = await DbContext.Characteristics
                .Where(c=>c.Id == value.CharacteristicId)
                .FirstOrDefaultAsync(token);
            if (characteristic == null)
            {
                throw new KeyNotFoundException($"Characteristic with ID {value.CharacteristicId} not found.");
            }
            CharacteristicValue entity = new CharacteristicValue
            {
                CharacteristicId = value.CharacteristicId,
                Value = value.Value,
                Created = DateTime.UtcNow
            };
            characteristic.Values ??= new List<CharacteristicValue>();
            characteristic.Values.Add(entity);
            

            await SaveAsync(token);

            return entity;
        }

        /// <summary>
        /// remove a characteristic value from the system
        /// </summary>
        /// <param name="id"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> DeleteValue(Guid id, CancellationToken token = default)
        {
            // ReSharper disable once MethodSupportsCancellation
            CharacteristicValue? characteristicValue = await DbContext.CharacteristicValues.FindAsync(id, token);
            if (characteristicValue == null)
            {
                return false;
            }
            DbContext.CharacteristicValues.Remove(characteristicValue);
            await SaveAsync(token);
            return true;
        }

        /// <summary>
        /// Deletes a characteristic record by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the characteristic to delete.</param>
        /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>
        /// A task that represents the asynchronous operation. The task result contains 
        /// <c>true</c> if the record was successfully deleted; otherwise, <c>false</c>.
        /// </returns>
        public async Task<bool> Delete(Guid id,CancellationToken token=default)
        {
            Characteristic? recordToDelete = await FindByIdAsync(id, token);
            if (recordToDelete == null)
            {
                return false;
            }
            base.Delete(recordToDelete);
            await SaveAsync(token);
            return true;
        }

        /// <summary>
        /// Gets the full characteristic information by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the characteristic to retrieve.</param>
        /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>
        /// A task that represents the asynchronous operation. The task result contains the full characteristic information.
        /// </returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task<IFullCharacteristic> GetFullCharacteristicAsync(Guid id, CancellationToken token=default)
        {
            Characteristic? characteristic = await DbContext.Characteristics
                .Include(c => c.Values)
                .FirstOrDefaultAsync(c => c.Id == id, token);
            if (characteristic == null)
            {
                throw new KeyNotFoundException($"Characteristic with ID {id} not found.");
            }
            IFullCharacteristic fullCharacteristic = CharacteristicTransformer.Transform(characteristic)!;
            return fullCharacteristic;
        }
    }
}