namespace ProductManager.Glue.Interfaces.Models
{
    public interface ICharacteristic
    {
        /// <summary>
        /// Gets or sets the unique identifier for the characteristic.
        /// </summary>
        Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the characteristic
        /// Is limited to 128 characters - will be silently truncated if longer
        /// </summary>
        /// <value>The name.</value>
        string Name { get; set; }
        
    }
}