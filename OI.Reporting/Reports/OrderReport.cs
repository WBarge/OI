namespace OI.Reporting.Reports;

public class OrderReport(ILogger<OrderReport> logger, Guid generationId) : BaseReport(generationId)
{
    private readonly ILogger<OrderReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    //TODO implement the flow and use protected properties for any parameters needed at the time of execution
    //any properties should be the parameter name e.g. public int OrderId {get;set;} is the parameter name
    //should be called on the object list obj.SetParameter("OrderID",1234);
}