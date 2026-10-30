namespace OI.Data.Model.Jobs;

internal class JobResult
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public Guid? ResultId { get; set; }
    public StoredFile? Result { get; set; } = null;
    public required string CreatedBy { get; set; }
    public required DateTime Created { get; set; }
}