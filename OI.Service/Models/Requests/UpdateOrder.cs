using Microsoft.AspNetCore.SignalR;
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

    /// <summary>
    /// The report ID of the estimate
    /// </summary>
    public Guid EstimateId { get; set; }

    /// <summary>
    /// The report ID of the order
    /// </summary>
    public Guid OrderId { get; set; }

    /// <summary>
    ///  The report ID of the invoice
    /// </summary>
    public Guid InvoiceId { get; set; }
}