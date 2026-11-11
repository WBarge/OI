namespace OI.Data.Model.Jobs;

internal class ConfiguredCompany
{
    public Guid Id { get; set; }
    public string? CompanyName { get; set; }
    public string? CompanyAddress { get; set; }
    public string? CompanyCity { get; set; }
    public string? CompanyState { get; set; }
    public string? CompanyZip { get; set; }
    public string? CompanyEmail { get; set; }
    public string? CompanyPhone { get; set; }
    public string? CompanyContactName { get; set; }
    public string? CompanyContactEmail { get; set; }
    public string? CompanyContactPhone { get; set; }

    public Guid? ResultId { get; set; }
    public StoredFile? Result { get; set; } = null;
}