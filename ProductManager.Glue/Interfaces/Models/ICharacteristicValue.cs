namespace ProductManager.Glue.Interfaces.Models
{
    public interface ICharacteristicValue
    {
        /// <summary>
        /// Gets or sets the unique identifier for the characteristic value.
        /// </summary>
        Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier of the associated <see cref="Characteristic"/>.
        /// </summary>
        Guid CharacteristicId { get; set; }

        /// <summary>
        /// Gets or sets the value of the characteristic. The value is truncated to a maximum length of <see cref="VALUE_MAX_SIZE"/> characters.
        /// </summary>
        /// <value>
        /// A string representing the characteristic value. The maximum length is <see cref="VALUE_MAX_SIZE"/> characters.
        /// </value>
        string Value { get; set; }
    }
}