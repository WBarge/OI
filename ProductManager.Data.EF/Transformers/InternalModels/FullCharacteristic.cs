using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Transformers.InternalModels
{
    internal class FullCharacteristic : IFullCharacteristic
    {
        public FullCharacteristic(Guid id, string name, IEnumerable<ICharacteristicValue> values)
        {
            Id = id;
            Name = name;
            Values = values;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ICharacteristicValue> Values { get; }
    }
}