namespace OI.Reporting.Reports;

public abstract class BaseReport(Guid generationId)
{
    public Guid GenerationId { get; set; } = generationId;

    //TODO write the base flow of generating a report

    //TODO Write a method to set a property on the child object - will require reflection
    //signature should be SetParameter(string propertyName,object propValue)
}