namespace ProductManager.Glue.Interfaces.Models
{
    public interface IFullCharacteristic :ICharacteristic       
    {
        
        IEnumerable<ICharacteristicValue> Values { get; }
        
    }
}