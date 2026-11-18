using OI.Common.Extensions.Transformations;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Model
{
    /// <summary>
    /// Represents a possible value for a specific product characteristic.
    /// </summary>
    /// <remarks>
    /// This class associates a unique identifier with a characteristic and its corresponding value.
    /// It ensures that the value does not exceed a predefined maximum size.
    /// </remarks>
    internal class CharacteristicValue : ICharacteristicValue
    {
        /// <summary>
        /// Gets or sets the unique identifier for the characteristic value.
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Gets or sets the unique identifier of the associated <see cref="Characteristic"/>.
        /// </summary>
        public Guid CharacteristicId { get; set; }
        
        private string _value = string.Empty;
        internal const int VALUE_MAX_SIZE = 128;

        /// <summary>
        /// Gets or sets the value of the characteristic. The value is truncated to a maximum length of <see cref="VALUE_MAX_SIZE"/> characters.
        /// </summary>
        /// <value>
        /// A string representing the characteristic value. The maximum length is <see cref="VALUE_MAX_SIZE"/> characters.
        /// </value>
        public string Value { 
            get=>_value;
            set
            {
                _value = value.Truncate(VALUE_MAX_SIZE); 
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
        /// Gets or sets the associated <see cref="Characteristic"/> entity.
        /// </summary>
        /// <remarks>
        /// This property establishes a navigation relationship between the <see cref="CharacteristicValue"/> 
        /// and the corresponding <see cref="Characteristic"/>. It allows access to the details of the 
        /// characteristic that this value belongs to.
        /// </remarks>
        public virtual Characteristic Characteristic { get; set; } = null!;

    }
}