namespace ProductManager.Glue.Interfaces.Models
{
    public interface IFullProduct :IProduct
    {
        IEnumerable<IProductCharacteristic> Characteristics { get; set; }
        IEnumerable<IFullProductOption> Options { get; set; }
        IEnumerable<IProductSell> Sells { get; set; }
    }
}