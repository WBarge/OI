using OI.Data.Model;
using OI.Glue.Models;

namespace OI.Data.Translators;

internal static class OrderTranslator
{
    public static IOrder Translate(this OI.Data.Model.Order order)
    {
        return new OI.Data.Translators.Internal_Models.Order
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            OrderDate = order.OrderDate,
            CompletedDate = order.CompletedDate ?? DateTime.MinValue,
            CustomerId = order.CustomerId,
            Customer = order.Customer?.Translate(),
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
            OrderItems = order.OrderItems?.Select(orderItem => orderItem.Translate()).ToList() ?? [],
            SubTotal = order.SubTotal,
            Shipping = order.Shipping,
            Tax = order.Tax,
            Total = order.Total,
            IsPending = order.IsPending
        };
    }

    public static IQueryable<Internal_Models.OrderSearch> ToSearchResult(this IQueryable<Order> orders)
    {
        //the last name and phone number are required in the system but the code is to get the complier and IDE to shut up
        return orders.Select(c => new Internal_Models.OrderSearch
        {
            Id = c.Id,
            CustomerName = (c.Customer != null ? c.Customer.FirstName+ " " : string.Empty)  + (c.Customer != null ? c.Customer.LastName : string.Empty),
            PhoneNumber = c.Customer != null ? c.Customer.PhoneNumber : string.Empty,
            OrderDate = c.OrderDate,
            CompletedDate = c.CompletedDate,
            Total = c.Total,
            IsPending = c.IsPending
        });
    }

}