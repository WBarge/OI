namespace OI.Data.Model.Jobs;

internal class StoredFile
{
    public Guid Id { get; set; }
    public required string FileName { get; set; }
    public required byte[] FileContents { get; set; }
}