using OI.Common.Extensions.Transformations;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model
{
    /// <summary>
    /// Represents a characteristic of a product, including its unique identifier, name, 
    /// and associated collection of possible values.
    /// </summary>
    internal class Characteristic : ICharacteristic
    {
        /// <summary>
        /// Gets or sets the unique identifier for the characteristic.
        /// </summary>
        public Guid Id { get; set; }
        
        private string _name = string.Empty;
        /// <summary>
        /// The name maximum size
        /// </summary>
        internal const int NAME_MAX_SIZE = 128;

        /// <summary>
        /// Gets or sets the name of the characteristic
        /// Is limited to 128 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The name.</value>
        public string Name { 
            get=>_name;
            set
            {
                _name = value.Truncate(NAME_MAX_SIZE); 
            }
        }

        /// <summary>
        /// Gets or sets the created.
        /// represents when the record was created
        /// </summary>
        /// <value>The created.</value>
        public DateTime Created { get; set; }

        /// <summary>
        /// Gets or sets the modified.
        /// represents when the record was last changed
        /// </summary>
        /// <value>The modified.</value>
        public DateTime? Modified { get; set; }


        /// <summary>
        /// Gets or sets the collection of possible values associated with this characteristic.
        /// </summary>
        /// <remarks>
        /// Each <see cref="CharacteristicValue"/> represents a potential value that this characteristic can have.
        /// </remarks>
        public ICollection<CharacteristicValue>? Values { get; set; } = null;
    }
}
