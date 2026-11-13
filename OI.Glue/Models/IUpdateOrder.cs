namespace OI.Glue.Models;

public interface IUpdateOrder :  ICreateOrder
{
    Guid Id { get; set; }

    int OrderNumber { get; set; }
    public Guid EstimateId { get; set; }
    public Guid OrderId { get; set; }
    public Guid InvoiceId { get; set; }
}