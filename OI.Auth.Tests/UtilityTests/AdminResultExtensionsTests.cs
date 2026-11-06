using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OI.Auth.Utilities;
using OI.Glue.Models;

namespace OI.Auth.Tests.UtilityTests;

[TestFixture, Description("Tests for AdminResultExtensions")]
public class AdminResultExtensionsTests
{
    private sealed class TestController : ControllerBase;

    private static ObjectResult Problem(IAdminResult result) =>
        new TestController().ToProblem(result).Should().BeOfType<ObjectResult>().Subject;

    [Test, Description("ToProblem should turn NotFound into a 404")]
    public void ToProblem_MapsNotFoundTo404()
    {
        ObjectResult problem = Problem(AdminResult.NotFound("That user does not exist."));

        problem.StatusCode.Should().Be(StatusCodes.Status404NotFound);
        ProblemDetails details = problem.Value.Should().BeOfType<ProblemDetails>().Subject;
        details.Status.Should().Be(404);
        details.Title.Should().Be("Not found");
        details.Detail.Should().Be("That user does not exist.");
    }

    [Test, Description("ToProblem should turn Invalid into a 400")]
    public void ToProblem_MapsInvalidTo400()
    {
        ObjectResult problem = Problem(AdminResult.Invalid("Enter a valid email address."));

        problem.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        problem.Value.Should().BeOfType<ProblemDetails>().Which.Detail.Should().Be("Enter a valid email address.");
    }

    [Test, Description("ToProblem should turn Conflict into a 409")]
    public void ToProblem_MapsConflictTo409()
    {
        ObjectResult problem = Problem(AdminResult.Conflict("You cannot delete your own account."));

        problem.StatusCode.Should().Be(StatusCodes.Status409Conflict);
        problem.Value.Should().BeOfType<ProblemDetails>().Which.Detail.Should().Be("You cannot delete your own account.");
    }

    [Test, Description("ToProblem should work for results that carry a value too")]
    public void ToProblem_WorksForGenericResults()
    {
        ObjectResult problem = Problem(AdminResult<AdminUser>.Conflict("A user with that email address already exists."));

        problem.StatusCode.Should().Be(StatusCodes.Status409Conflict);
    }

    [Test, Description("ToProblem should never present a successful result as a problem the user caused")]
    public void ToProblem_TreatsASuccessfulResultAsUnexpected()
    {
        ObjectResult problem = Problem(AdminResult.Ok());

        problem.StatusCode.Should().Be(StatusCodes.Status500InternalServerError);
    }
}
