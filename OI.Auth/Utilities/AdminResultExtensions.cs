using Microsoft.AspNetCore.Mvc;
using OI.Glue.Models;

namespace OI.Auth.Utilities;

/// <summary>
/// Provides extension methods for handling administration results and converting them into HTTP responses.
/// </summary>
public static class AdminResultExtensions
{
    /// <summary>
    /// Turns a failed administration result into the matching HTTP problem (404, 400 or 409). The message goes in "detail",
    /// which is what the UI's error handler shows the user.
    /// </summary>
    public static IActionResult ToProblem(this ControllerBase controller, IAdminResult result)
    {
        (int status, string title) = result.Status switch
        {
            AdminStatus.NotFound => (StatusCodes.Status404NotFound, "Not found"),
            AdminStatus.Invalid => (StatusCodes.Status400BadRequest, "Invalid request"),
            AdminStatus.Conflict => (StatusCodes.Status409Conflict, "Conflict"),
            _ => (StatusCodes.Status500InternalServerError, "Unexpected result"),
        };

        return new ObjectResult(new ProblemDetails { Status = status, Title = title, Detail = result.Message })
        {
            StatusCode = status,
        };
    }
}
