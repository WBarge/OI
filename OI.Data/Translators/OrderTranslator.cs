using OI.Data.Model;
using OI.Glue.Models;

namespace OI.Data.Translators;

internal static class OrderTranslator
{
    public static IOrder Translate(this Order order)
    {
        return new OI.Data.Translators.Internal_Models.Order
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            OrderDate = order.OrderDate,
            CompletedDate = order.CompletedDate ?? DateTime.MinValue,
            CustomerId = order.CustomerId,
            BillingAddress1 = order.BillingAddress1 ?? string.Empty,
            BillingAddress2 = order.BillingAddress2 ?? string.Empty,
            BillingCity = order.BillingCity ?? string.Empty,
            BillingStateCode = order.BillingStateCode ?? string.Empty,
            BillingZipCode = order.BillingZipCode ?? string.Empty,
            ShippingAddress1 = order.ShippingAddress1 ?? string.Empty,
            ShippingAddress2 = order.ShippingAddress2 ?? string.Empty,
            ShippingCity = order.ShippingCity ?? string.Empty,
            ShippingStateCode = order.ShippingStateCode ?? string.Empty,
            ShippingZipCode = order.ShippingZipCode ?? string.Empty,
            SubTotal = order.SubTotal,
            Shipping = order.Shipping,
            Tax = order.Tax,
            Total = order.Total,
            IsPending = order.IsPending
        };
    }
}
