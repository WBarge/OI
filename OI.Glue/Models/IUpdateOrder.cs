namespace OI.Glue.Models;

public interface IUpdateOrder :  ICreateOrder
{
    Guid Id { get; set; }

    int OrderNumber { get; set; }
    public Guid? EstimateReportId { get; set; }
    public Guid? OrderReportId { get; set; }
    public Guid? InvoiceReportId { get; set; }
}