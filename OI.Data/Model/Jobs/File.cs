namespace OI.Data.Model.Jobs;

internal class File
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public byte[] FileContents { get; set; }
}