using OI.Data.Model;
using OI.Glue.Models;

namespace OI.Data.Translators;

internal static class OrderItemTranslator
{
    public static IOrderItem Translate(this OrderItem orderItem)
    {
        return new OI.Data.Translators.Internal_Models.OrderItem
        {
            Id = orderItem.Id,
            Name = orderItem.Name,
            Description = orderItem.Description,
            Sku = orderItem.Sku,
            Price = orderItem.Price,
            Quantity = orderItem.Quantity,
            Total = orderItem.Total
        };
    }
}