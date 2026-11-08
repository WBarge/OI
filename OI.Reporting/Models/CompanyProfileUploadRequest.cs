using Microsoft.AspNetCore.Http;

namespace OI.Reporting.Models;

/// <summary>
/// The multipart/form-data body the UI sends. Every text field is nullable on purpose: with nullable reference types on,
/// a non-nullable string would be treated as [Required] and a company with no address line (an empty value) would be rejected.
/// </summary>
public class CompanyProfileUploadRequest
{
    public string? CompanyName { get; set; }
    public string? CompanyAddress { get; set; }
    public string? CompanyCity { get; set; }
    public string? CompanyState { get; set; }
    public string? CompanyZip { get; set; }
    public string? CompanyEmail { get; set; }
    public string? CompanyPhone { get; set; }

    /// <summary>
    /// The name of the logo resource. Omitted when the company has no logo. When a logo is sent, this name is required and must be non-empty.
    /// </summary>
    public string? LogoResourceName { get; set; }

    /// <summary>The logo image. Omitted when the company has no logo.</summary>
    public IFormFile? Logo { get; set; }
}
