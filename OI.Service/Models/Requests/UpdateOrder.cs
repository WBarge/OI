using OI.Glue.Models;

namespace OI.Service.Models.Requests;

/// <summary>
/// represents an order that needs to be updated.
/// </summary>
public class UpdateOrder : CreateOrder, IUpdateOrder
{
    /// <summary>
    /// The unique ID of the order
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The order number of the order
    /// </summary>
    public int OrderNumber { get; set; }
}