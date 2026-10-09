namespace OI.Glue.Models;

public interface ICreateOrder
{
    Guid? CustomerId { get; set; }
    DateTime? OrderDate { get; set; }
    string BillingAddress1 { get; set; }
    string BillingAddress2 { get; set; }
    string BillingCity { get; set; }
    string BillingStateCode { get; set; }
    string BillingZipCode { get; set; }
    string ShippingAddress1 { get; set; }
    string ShippingAddress2 { get; set; }
    string ShippingCity { get; set; }
    string ShippingStateCode { get; set; }
    string ShippingZipCode { get; set; }
    decimal? SubTotal { get; set; }
    decimal? Shipping { get; set; }
    decimal? Tax { get; set; }
    decimal? Total { get; set; }
    IEnumerable<ICreateOrderItem>? OrderItems { get; set; }
}
