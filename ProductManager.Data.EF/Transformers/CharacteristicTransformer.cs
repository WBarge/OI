using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Transformers.InternalModels;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Transformers
{
    /// <summary>
    /// Provides functionality to transform <see cref="Characteristic"/> entities into 
    /// <see cref="IFullCharacteristic"/> instances.
    /// </summary>
    /// <remarks>
    /// This class is responsible for converting <see cref="Characteristic"/> objects, including their 
    /// associated values, into a more comprehensive representation defined by the <see cref="IFullCharacteristic"/> interface.
    /// </remarks>
    internal static class CharacteristicTransformer
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="characteristic"></param>
        /// <returns></returns>
        public static IFullCharacteristic? Transform(Characteristic characteristic)
        {
            IFullCharacteristic? fullCharacteristic = null;
            if (characteristic != null)
            {
                fullCharacteristic = new FullCharacteristic(
                    characteristic.Id,
                    characteristic.Name,
                    (characteristic.Values ?? new List<CharacteristicValue>()).Cast<ICharacteristicValue>()
                );  
            }
            return fullCharacteristic;
        }
        
    }
}