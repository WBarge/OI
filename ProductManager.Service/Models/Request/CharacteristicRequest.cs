namespace ProductManager.Service.Models.Request
{
    /// <summary>
    /// Represents a request to create or update a product characteristic.
    /// </summary>
    public class CharacteristicRequest
    {
        /// <summary>
        /// Gets or sets the name of the characteristic.
        /// </summary>
        public string Name { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets the value of the characteristic.
        /// </summary>
        public string Value { get; set; } = string.Empty;
    }
}