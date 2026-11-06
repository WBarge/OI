using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OI.Auth.Controllers;
using OI.Auth.Models.Requests;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Tests.ControllerTests;

[TestFixture, Description("Tests for AdminUsersController")]
public class AdminUsersControllerTests
{
    private Mock<IAuthAdminManager> _manager = null!;
    private AdminUsersController _sut = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;
    private static AdminUser User(string id = "u1") => new(id, $"{id}@example.com", "Pat", null, ["User"], []);

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IAuthAdminManager>();
        _sut = new AdminUsersController(_manager.Object);
    }

    private static ProblemDetails ProblemOf(IActionResult result, int status)
    {
        ObjectResult objectResult = result.Should().BeOfType<ObjectResult>().Subject;
        objectResult.StatusCode.Should().Be(status);
        return objectResult.Value.Should().BeOfType<ProblemDetails>().Subject;
    }

    [Test, Description("Constructor should throw when adminManager is null")]
    public void Constructor_ThrowsWhenManagerIsNull()
    {
        Action act = () => _ = new AdminUsersController(null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("adminManager");
    }

    [Test, Description("List should return the page the manager gives, passing the search and paging on")]
    public async Task List_ReturnsThePage()
    {
        PagedResult<AdminUser> page = new([User()], 1);
        _manager.Setup(m => m.GetUsersAsync("pat", 2, 10, It.IsAny<CancellationToken>())).ReturnsAsync(page);

        IActionResult result = await _sut.List("pat", 2, 10, Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(page);
    }

    [Test, Description("Get should return the user")]
    public async Task Get_ReturnsTheUser()
    {
        AdminUser user = User();
        _manager.Setup(m => m.GetUserAsync("u1", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.Ok(user));

        IActionResult result = await _sut.Get("u1", Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(user);
    }

    [Test, Description("Get should answer 404 with the reason for an unknown user")]
    public async Task Get_Returns404ForAnUnknownUser()
    {
        _manager.Setup(m => m.GetUserAsync("u1", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.NotFound("That user does not exist."));

        IActionResult result = await _sut.Get("u1", Ct);

        ProblemOf(result, StatusCodes.Status404NotFound).Detail.Should().Be("That user does not exist.");
    }

    [Test, Description("Create should answer 201 with the new user and where to find it")]
    public async Task Create_Returns201()
    {
        AdminUser created = User("new-id");
        _manager.Setup(m => m.CreateUserAsync(It.IsAny<NewAdminUser>(), It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.Ok(created));

        IActionResult result = await _sut.Create(new CreateUserRequest { Email = "new@example.com", DisplayName = "New", Password = "a-long-password-1" }, Ct);

        CreatedAtActionResult createdResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.StatusCode.Should().Be(StatusCodes.Status201Created);
        createdResult.ActionName.Should().Be(nameof(AdminUsersController.Get));
        createdResult.RouteValues!["id"].Should().Be("new-id");
        createdResult.Value.Should().BeSameAs(created);
    }

    [Test, Description("Create should pass everything in the request on to the manager")]
    public async Task Create_PassesTheRequestOn()
    {
        NewAdminUser? sent = null;
        _manager.Setup(m => m.CreateUserAsync(It.IsAny<NewAdminUser>(), It.IsAny<CancellationToken>()))
            .Callback<NewAdminUser, CancellationToken>((u, _) => sent = u)
            .ReturnsAsync(AdminResult<AdminUser>.Ok(User()));

        await _sut.Create(new CreateUserRequest
        {
            Email = "new@example.com", DisplayName = "New", Password = "a-long-password-1", Roles = ["Admin"], Groups = ["sales"],
        }, Ct);

        sent.Should().NotBeNull();
        sent!.Email.Should().Be("new@example.com");
        sent.DisplayName.Should().Be("New");
        sent.Password.Should().Be("a-long-password-1");
        sent.Roles.Should().Equal("Admin");
        sent.Groups.Should().Equal("sales");
    }

    [TestCase(AdminStatus.Invalid, 400), TestCase(AdminStatus.Conflict, 409)]
    [Description("Create should answer 400 for a bad request and 409 for a duplicate")]
    public async Task Create_MapsFailures(AdminStatus status, int expected)
    {
        AdminResult<AdminUser> failure = status == AdminStatus.Invalid
            ? AdminResult<AdminUser>.Invalid("nope")
            : AdminResult<AdminUser>.Conflict("nope");
        _manager.Setup(m => m.CreateUserAsync(It.IsAny<NewAdminUser>(), It.IsAny<CancellationToken>())).ReturnsAsync(failure);

        IActionResult result = await _sut.Create(new CreateUserRequest(), Ct);

        ProblemOf(result, expected).Detail.Should().Be("nope");
    }

    [Test, Description("Update should return the changed user")]
    public async Task Update_ReturnsTheUser()
    {
        AdminUser user = User();
        _manager.Setup(m => m.UpdateUserAsync("u1", It.IsAny<UpdateAdminUser>(), It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.Ok(user));

        IActionResult result = await _sut.Update("u1", new UpdateUserRequest { DisplayName = "Pat", Roles = ["User"], Groups = ["sales"] }, Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(user);
        _manager.Verify(m => m.UpdateUserAsync("u1",
            It.Is<UpdateAdminUser>(u => u.DisplayName == "Pat" && u.Roles.SequenceEqual(new[] { "User" }) && u.Groups.SequenceEqual(new[] { "sales" })),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test, Description("Update should answer 409 when a rule stops it, such as removing the last administrator")]
    public async Task Update_Returns409WhenARuleStopsIt()
    {
        _manager.Setup(m => m.UpdateUserAsync("u1", It.IsAny<UpdateAdminUser>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(AdminResult<AdminUser>.Conflict("There must always be at least one active administrator."));

        IActionResult result = await _sut.Update("u1", new UpdateUserRequest(), Ct);

        ProblemOf(result, StatusCodes.Status409Conflict).Detail.Should().Contain("administrator");
    }

    [Test, Description("Update should answer 404 for an unknown user")]
    public async Task Update_Returns404ForAnUnknownUser()
    {
        _manager.Setup(m => m.UpdateUserAsync("u1", It.IsAny<UpdateAdminUser>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(AdminResult<AdminUser>.NotFound("That user does not exist."));

        IActionResult result = await _sut.Update("u1", new UpdateUserRequest(), Ct);

        ProblemOf(result, StatusCodes.Status404NotFound);
    }

    [Test, Description("ResetPassword should answer 204 when it works, and pass the new password on")]
    public async Task ResetPassword_Returns204()
    {
        _manager.Setup(m => m.ResetPasswordAsync("u1", "a-long-password-1", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult.Ok());

        IActionResult result = await _sut.ResetPassword("u1", new ResetPasswordRequest { NewPassword = "a-long-password-1" }, Ct);

        result.Should().BeOfType<NoContentResult>();
    }

    [Test, Description("ResetPassword should answer 400 for a weak password")]
    public async Task ResetPassword_Returns400ForAWeakPassword()
    {
        _manager.Setup(m => m.ResetPasswordAsync("u1", It.IsAny<string>(), It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult.Invalid("too short"));

        IActionResult result = await _sut.ResetPassword("u1", new ResetPasswordRequest { NewPassword = "x" }, Ct);

        ProblemOf(result, StatusCodes.Status400BadRequest);
    }

    [Test, Description("Disable should disable the user and return them")]
    public async Task Disable_DisablesTheUser()
    {
        AdminUser user = User();
        _manager.Setup(m => m.SetDisabledAsync("u1", true, It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.Ok(user));

        IActionResult result = await _sut.Disable("u1", Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(user);
    }

    [Test, Description("Disable should answer 409 when it would lock out the last administrator or the caller")]
    public async Task Disable_Returns409WhenARuleStopsIt()
    {
        _manager.Setup(m => m.SetDisabledAsync("u1", true, It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.Conflict("You cannot disable your own account."));

        IActionResult result = await _sut.Disable("u1", Ct);

        ProblemOf(result, StatusCodes.Status409Conflict);
    }

    [Test, Description("Enable should enable the user and return them")]
    public async Task Enable_EnablesTheUser()
    {
        AdminUser user = User();
        _manager.Setup(m => m.SetDisabledAsync("u1", false, It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.Ok(user));

        IActionResult result = await _sut.Enable("u1", Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(user);
    }

    [Test, Description("Enable should answer 404 for an unknown user")]
    public async Task Enable_Returns404ForAnUnknownUser()
    {
        _manager.Setup(m => m.SetDisabledAsync("u1", false, It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminUser>.NotFound("That user does not exist."));

        IActionResult result = await _sut.Enable("u1", Ct);

        ProblemOf(result, StatusCodes.Status404NotFound);
    }

    [Test, Description("Delete should answer 204 when the user is deleted")]
    public async Task Delete_Returns204()
    {
        _manager.Setup(m => m.DeleteUserAsync("u1", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult.Ok());

        IActionResult result = await _sut.Delete("u1", Ct);

        result.Should().BeOfType<NoContentResult>();
    }

    [TestCase(AdminStatus.NotFound, 404), TestCase(AdminStatus.Conflict, 409)]
    [Description("Delete should answer 404 for an unknown user and 409 when a rule stops it")]
    public async Task Delete_MapsFailures(AdminStatus status, int expected)
    {
        AdminResult failure = status == AdminStatus.NotFound ? AdminResult.NotFound("nope") : AdminResult.Conflict("nope");
        _manager.Setup(m => m.DeleteUserAsync("u1", It.IsAny<CancellationToken>())).ReturnsAsync(failure);

        IActionResult result = await _sut.Delete("u1", Ct);

        ProblemOf(result, expected);
    }
}
