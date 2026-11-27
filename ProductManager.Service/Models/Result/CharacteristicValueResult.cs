using OI.Common.Extensions.Comparison;
using Newtonsoft.Json;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Service.Models.Result
{
    /// <summary>
    /// A result object - needed cause .Net will serialize the full object that implements ICharacteristicValue, we only want specific properties returned
    /// </summary>
    public class CharacteristicValueResult
    {
        /// <summary>
        /// The constructor
        /// </summary>
        /// <param name="data"></param>
        public CharacteristicValueResult(ICharacteristicValue data)
        {
            if (data.IsEmpty())
            {
                return;
            }
            Id = data.Id;
            Value = data.Value;
        }

        /// <summary>
        /// id of the value
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; } = Guid.Empty;

        /// <summary>
        /// the characteristic value
        /// </summary>
        [JsonProperty(PropertyName = "value")]
        public string Value { get; set; } = string.Empty;
    }
}