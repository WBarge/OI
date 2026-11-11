using Microsoft.AspNetCore.Mvc;
using OI.Common.Constants;

namespace OI.Service.Controllers;

/// <summary>
/// Provides API endpoints for managing and retrieving payment terms.
/// </summary>
/// <remarks>
/// This controller handles HTTP requests related to payment terms, such as retrieving a list of predefined terms.
/// </remarks>
[Route("api/[controller]")]
[ApiController]
public class TermsController(ILogger<TermsController> logger) :ControllerBase
{
    private readonly ILogger<TermsController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    /// <summary>
    /// Retrieves a list of predefined payment terms.
    /// </summary>
    /// <remarks>
    /// This method returns a collection of common payment terms,
    /// with values being "Upon Completion" "Net 30" "Net 60" "Net 90" and "COD"
    /// </remarks>
    /// <returns>
    /// An <see cref="IActionResult"/> containing a list of payment terms as an
    /// <see cref="IEnumerable{T}"/> of <see cref="string"/> 
    /// with a status code of 200 (OK),
    /// or a status code of 500 (Internal Server Error) in case of an error.
    /// </returns>
    /// <response code="200">Returns the list of payment terms.</response>
    /// <response code="500">Indicates an internal server error occurred while processing the request.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetTerms()
    {
        _logger.LogInformation("GET api/terms called");
        // Create a list of payment terms using the constants defined in the Terms class
        // KISS at the moment, reflection is over kill.
        // if we need to add more terms we can add them to the constants class and this list
        // The terms are currently simple strings.  If more functionality is needed
        // then this can be moved to a manager where business logic would be implemented
        List<string> result =
        [
            Terms.UPON_COMPLETION,
            Terms.NET_30,
            Terms.NET_60,
            Terms.NET_90,
            Terms.COD
        ];
        return Ok(result);
    }
}