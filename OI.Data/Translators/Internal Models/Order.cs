using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class Order : IOrder
{
    public Guid Id { get; set; }
    public int OrderNumber { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime CompletedDate { get; set; }
    public Guid? CustomerId { get; set; }
    public ICustomer? Customer { get; set; } = null;
    public string BillingAddress1 { get; set; } = string.Empty;
    public string BillingAddress2 { get; set; } = string.Empty;
    public string BillingCity { get; set; } = string.Empty;
    public string BillingStateCode { get; set; } = string.Empty;
    public string BillingZipCode { get; set; } = string.Empty;
    public string ShippingAddress1 { get; set; } = string.Empty;
    public string ShippingAddress2 { get; set; } = string.Empty;
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingStateCode { get; set; } = string.Empty;
    public string ShippingZipCode { get; set; } = string.Empty;
    public IEnumerable<IOrderItem> OrderItems { get; set; } = [];
    public decimal SubTotal { get; set; }
    public decimal Shipping { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public bool IsPending { get; set; }
}
