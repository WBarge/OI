namespace OI.Glue.Models;

public interface IOrderSearch
{
    Guid Id { get; set; }
    string CustomerName { get; set; }
    int OrderNumber { get; set; }
    string PhoneNumber { get; set; }
    DateTime OrderDate { get; set; }
    DateTime? CompletedDate { get; set; }
    decimal Total { get; set; }
    bool IsPending { get; set; }
}