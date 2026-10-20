using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

public class OrderSearch :IOrderSearch
{
    public Guid Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public int OrderNumber { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal Total { get; set; }
    public bool IsPending { get; set; }
}