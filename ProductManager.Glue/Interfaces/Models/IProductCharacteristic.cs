namespace ProductManager.Glue.Interfaces.Models;

public interface IProductCharacteristic
{
    /// <summary>
    /// Gets or sets the identifier.
    /// primary identifier for the record
    /// </summary>
    /// <value>The identifier.</value>
    Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the product identifier.
    /// </summary>
    /// <value>The product identifier.</value>
    Guid ProductId { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// the name of the characteristic
    /// Is limited to 128 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The name.</value>
    string Name { get; set; }

    /// <summary>
    /// Gets or sets the characteristic value.
    /// Is limited to 128 characters - will be silently truncated if longer
    /// </summary>
    /// <value>The characteristic value.</value>
    string CharacteristicValue { get; set; }
}