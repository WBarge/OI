namespace OI.Glue.Models;

public interface IUpdateCustomer : ICreateCustomer
{
    public Guid Id { get; set; }
}