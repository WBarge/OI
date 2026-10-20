namespace OI.Glue.Models;

public interface IUpdateOrder :  ICreateOrder
{
    Guid Id { get; set; }

    int OrderNumber { get; set; }
}