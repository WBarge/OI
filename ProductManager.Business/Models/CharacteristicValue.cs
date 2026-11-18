using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Business.Models
{
    internal class CharacteristicValue : ICharacteristicValue
    {
        public Guid Id { get; set; }
        public Guid CharacteristicId { get; set; }
        public required string Value { get; set; }
    }
}