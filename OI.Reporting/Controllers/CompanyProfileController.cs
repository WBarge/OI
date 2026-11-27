using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Net.Http.Headers;
using OI.Glue.Models;
using OI.Reporting.Models;
using OI.Reporting.Services;

namespace OI.Reporting.Controllers;

/// <summary>
/// Receives the company details (and logo) that the UI reads from its config.json when it starts,
/// so that report generation can use them later.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class CompanyProfileController(ICompanyProfileStore store, ILogger<CompanyProfileController> logger) : ControllerBase
{
    /// <summary>The biggest logo accepted. A letterhead logo is small; this stops a mistake from filling memory.</summary>
    public const long MAX_LOGO_BYTES = 2 * 1024 * 1024;

    /// <summary>The biggest request accepted: the logo plus room for the text fields and the multipart framing.</summary>
    public const long MAX_REQUEST_BYTES = MAX_LOGO_BYTES + 256 * 1024;

    private readonly ICompanyProfileStore _store = store ?? throw new ArgumentNullException(nameof(store));
    private readonly ILogger<CompanyProfileController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Replaces the stored company profile. Sending the same data again changes nothing, so the UI can safely repeat it.
    /// </summary>
    /// <param name="request">Text fields, plus the logo file and its resource name when the company has a logo.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>
    /// 204 when stored
    /// 400 when a logo arrives without a resource name; 413 when the logo is too big.
    /// </returns>
    [HttpPut]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(MAX_REQUEST_BYTES)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status413PayloadTooLarge)]
    public async Task<IActionResult> Upload([FromForm] CompanyProfileUploadRequest request, CancellationToken cancellationToken)
    {
        string resourceName = LastSegment(request.LogoResourceName);
        byte[] logo = [];

        if (request.Logo is { Length: > 0 } file)
        {
            if (file.Length > MAX_LOGO_BYTES)
            {
                return StatusCode(StatusCodes.Status413PayloadTooLarge,
                    new { message = $"The logo must be {MAX_LOGO_BYTES / 1024} KB or smaller." });
            }

            if (resourceName.Length == 0)
            {
                return BadRequest(new { message = "logoResourceName is required when a logo is sent." });
            }

            await using Stream stream = file.OpenReadStream();
            using MemoryStream buffer = new((int)file.Length);
            await stream.CopyToAsync(buffer, cancellationToken);
            logo = buffer.ToArray();
        }
        else
        {
            resourceName = string.Empty;   // a name without a file would describe nothing
        }

        await _store.ReplaceAsync(new CompanyProfile
        {
            CompanyName = Clean(request.CompanyName),
            CompanyAddress = Clean(request.CompanyAddress),
            CompanyCity = Clean(request.CompanyCity),
            CompanyState = Clean(request.CompanyState),
            CompanyZip = Clean(request.CompanyZip),
            CompanyEmail = Clean(request.CompanyEmail),
            CompanyPhone = Clean(request.CompanyPhone),
            CompanyContactName = Clean(request.CompanyContactName),
            CompanyContactEmail = Clean(request.CompanyContactEmail),
            CompanyContactPhone = Clean(request.CompanyContactPhone),
            LogoResourceName = resourceName,
            LogoFile = logo
        }, cancellationToken);

        // the details are business contact data; the log only needs to show that a sync happened
        _logger.LogInformation("Company profile updated (logo: {LogoBytes} bytes)", logo.Length);
        return NoContent();
    }

    /// <summary>
    /// The company logo, for the OI.Auth login page (the browser loads it directly, before anyone is signed in). It is the
    /// only anonymous endpoint in this application and it returns nothing but the image: no company details.
    /// Only PNG, JPG and GIF files are served (recognised by their first bytes). The browser may keep the image for 5 minutes.
    /// </summary>
    /// <returns>The image; 304 when the browser already has this version; 404 when there is no logo (or it is not a PNG, JPG or GIF).</returns>
    [HttpGet("logo")]
    [AllowAnonymous]
    [EnableRateLimiting("logo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status304NotModified)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Logo()
    {
        ICompanyProfile? profile = _store.Current;
        byte[]? logo = profile?.LogoFile;
        string? contentType = LogoImage.ContentTypeOf(logo);
        if (logo is null || contentType is null)
        {
            return NotFound();
        }

        // The tag changes whenever the logo does, so a changed logo shows as soon as the 5 minutes are up.
        EntityTagHeaderValue tag = new("\"" + Convert.ToHexString(SHA256.HashData(logo))[..32] + "\"");
        Response.Headers.CacheControl = "public, max-age=300";
        Response.Headers.XContentTypeOptions = "nosniff";
        return File(logo, contentType, lastModified: null, entityTag: tag);
    }

    private static string Clean(string? value) => value?.Trim() ?? string.Empty;

    /// <summary>Keeps only the file name, so a value such as "../x/logo.png" can never be taken for a path.</summary>
    private static string LastSegment(string? value)
    {
        string trimmed = Clean(value);
        return trimmed[(trimmed.LastIndexOfAny(['/', '\\']) + 1)..];
    }
}
