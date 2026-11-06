using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OI.Auth.Controllers;
using OI.Auth.Models.Requests;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Tests.ControllerTests;

[TestFixture, Description("Tests for AdminRolesController")]
public class AdminRolesControllerTests
{
    private Mock<IAuthAdminManager> _manager = null!;
    private AdminRolesController _sut = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IAuthAdminManager>();
        _sut = new AdminRolesController(_manager.Object);
    }

    private static void AssertProblem(IActionResult result, int status)
    {
        ObjectResult objectResult = result.Should().BeOfType<ObjectResult>().Subject;
        objectResult.StatusCode.Should().Be(status);
        objectResult.Value.Should().BeOfType<ProblemDetails>();
    }

    [Test, Description("Constructor should throw when adminManager is null")]
    public void Constructor_ThrowsWhenManagerIsNull()
    {
        Action act = () => _ = new AdminRolesController(null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("adminManager");
    }

    [Test, Description("List should return the roles")]
    public async Task List_ReturnsTheRoles()
    {
        IReadOnlyCollection<AdminRole> roles = [new AdminRole("Admin", true, 1)];
        _manager.Setup(m => m.GetRolesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(roles);

        IActionResult result = await _sut.List(Ct);

        result.Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(roles);
    }

    [Test, Description("Create should answer 201 with the new role")]
    public async Task Create_Returns201()
    {
        AdminRole role = new("Auditor", false, 0);
        _manager.Setup(m => m.CreateRoleAsync("Auditor", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminRole>.Ok(role));

        IActionResult result = await _sut.Create(new CreateRoleRequest { Name = "Auditor" }, Ct);

        CreatedResult created = result.Should().BeOfType<CreatedResult>().Subject;
        created.StatusCode.Should().Be(StatusCodes.Status201Created);
        created.Value.Should().BeSameAs(role);
        created.Location.Should().Be("api/admin/roles/Auditor");
    }

    [Test, Description("Create should escape a role name with spaces in the address it gives back")]
    public async Task Create_EscapesTheName()
    {
        _manager.Setup(m => m.CreateRoleAsync("Sales Lead", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminRole>.Ok(new AdminRole("Sales Lead", false, 0)));

        IActionResult result = await _sut.Create(new CreateRoleRequest { Name = "Sales Lead" }, Ct);

        result.Should().BeOfType<CreatedResult>().Which.Location.Should().Be("api/admin/roles/Sales%20Lead");
    }

    [TestCase(AdminStatus.Invalid, 400), TestCase(AdminStatus.Conflict, 409)]
    [Description("Create should answer 400 for a bad name and 409 for a duplicate")]
    public async Task Create_MapsFailures(AdminStatus status, int expected)
    {
        AdminResult<AdminRole> failure = status == AdminStatus.Invalid ? AdminResult<AdminRole>.Invalid("x") : AdminResult<AdminRole>.Conflict("x");
        _manager.Setup(m => m.CreateRoleAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())).ReturnsAsync(failure);

        AssertProblem(await _sut.Create(new CreateRoleRequest { Name = "x" }, Ct), expected);
    }

    [Test, Description("Delete should answer 204 when the role is deleted")]
    public async Task Delete_Returns204()
    {
        _manager.Setup(m => m.DeleteRoleAsync("Auditor", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult.Ok());

        (await _sut.Delete("Auditor", Ct)).Should().BeOfType<NoContentResult>();
    }

    [TestCase(AdminStatus.NotFound, 404), TestCase(AdminStatus.Conflict, 409)]
    [Description("Delete should answer 404 for an unknown role and 409 for a built-in or a role in use")]
    public async Task Delete_MapsFailures(AdminStatus status, int expected)
    {
        AdminResult failure = status == AdminStatus.NotFound ? AdminResult.NotFound("x") : AdminResult.Conflict("x");
        _manager.Setup(m => m.DeleteRoleAsync("Admin", It.IsAny<CancellationToken>())).ReturnsAsync(failure);

        AssertProblem(await _sut.Delete("Admin", Ct), expected);
    }
}

[TestFixture, Description("Tests for AdminGroupsController")]
public class AdminGroupsControllerTests
{
    private Mock<IAuthAdminManager> _manager = null!;
    private AdminGroupsController _sut = null!;

    private static CancellationToken Ct => TestContext.CurrentContext.CancellationToken;

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IAuthAdminManager>();
        _sut = new AdminGroupsController(_manager.Object);
    }

    private static void AssertProblem(IActionResult result, int status)
    {
        ObjectResult objectResult = result.Should().BeOfType<ObjectResult>().Subject;
        objectResult.StatusCode.Should().Be(status);
        objectResult.Value.Should().BeOfType<ProblemDetails>();
    }

    [Test, Description("Constructor should throw when adminManager is null")]
    public void Constructor_ThrowsWhenManagerIsNull()
    {
        Action act = () => _ = new AdminGroupsController(null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("adminManager");
    }

    [Test, Description("List should return the groups")]
    public async Task List_ReturnsTheGroups()
    {
        IReadOnlyCollection<AdminGroup> groups = [new AdminGroup("sales", null, 2)];
        _manager.Setup(m => m.GetGroupsAsync(It.IsAny<CancellationToken>())).ReturnsAsync(groups);

        (await _sut.List(Ct)).Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(groups);
    }

    [Test, Description("Get should return the group with its members")]
    public async Task Get_ReturnsTheGroup()
    {
        AdminGroupDetail detail = new("sales", "The team", [new AdminGroupMember("u1", "a@example.com", "A")]);
        _manager.Setup(m => m.GetGroupAsync("sales", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminGroupDetail>.Ok(detail));

        (await _sut.Get("sales", Ct)).Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(detail);
    }

    [Test, Description("Get should answer 404 for an unknown group")]
    public async Task Get_Returns404ForAnUnknownGroup()
    {
        _manager.Setup(m => m.GetGroupAsync("nowhere", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminGroupDetail>.NotFound("x"));

        AssertProblem(await _sut.Get("nowhere", Ct), 404);
    }

    [Test, Description("Create should answer 201 with the new group and where to find it")]
    public async Task Create_Returns201()
    {
        AdminGroup group = new("finance", "Finance", 0);
        _manager.Setup(m => m.CreateGroupAsync(It.IsAny<NewAdminGroup>(), It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminGroup>.Ok(group));

        IActionResult result = await _sut.Create(new CreateGroupRequest { Name = "Finance", Description = "Finance" }, Ct);

        CreatedAtActionResult created = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        created.ActionName.Should().Be(nameof(AdminGroupsController.Get));
        created.RouteValues!["name"].Should().Be("finance");
        created.Value.Should().BeSameAs(group);
        _manager.Verify(m => m.CreateGroupAsync(new NewAdminGroup("Finance", "Finance"), It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestCase(AdminStatus.Invalid, 400), TestCase(AdminStatus.Conflict, 409)]
    [Description("Create should answer 400 for a bad name and 409 for a duplicate")]
    public async Task Create_MapsFailures(AdminStatus status, int expected)
    {
        AdminResult<AdminGroup> failure = status == AdminStatus.Invalid ? AdminResult<AdminGroup>.Invalid("x") : AdminResult<AdminGroup>.Conflict("x");
        _manager.Setup(m => m.CreateGroupAsync(It.IsAny<NewAdminGroup>(), It.IsAny<CancellationToken>())).ReturnsAsync(failure);

        AssertProblem(await _sut.Create(new CreateGroupRequest { Name = "x" }, Ct), expected);
    }

    [Test, Description("Update should change the description and return the group")]
    public async Task Update_ReturnsTheGroup()
    {
        AdminGroup group = new("sales", "New text", 3);
        _manager.Setup(m => m.UpdateGroupAsync("sales", "New text", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminGroup>.Ok(group));

        (await _sut.Update("sales", new UpdateGroupRequest { Description = "New text" }, Ct)).Should().BeOfType<OkObjectResult>().Which.Value.Should().BeSameAs(group);
    }

    [Test, Description("Update should answer 404 for an unknown group")]
    public async Task Update_Returns404ForAnUnknownGroup()
    {
        _manager.Setup(m => m.UpdateGroupAsync("nowhere", It.IsAny<string?>(), It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult<AdminGroup>.NotFound("x"));

        AssertProblem(await _sut.Update("nowhere", new UpdateGroupRequest(), Ct), 404);
    }

    [Test, Description("Delete should answer 204 when the group is deleted")]
    public async Task Delete_Returns204()
    {
        _manager.Setup(m => m.DeleteGroupAsync("sales", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult.Ok());

        (await _sut.Delete("sales", Ct)).Should().BeOfType<NoContentResult>();
    }

    [Test, Description("Delete should answer 404 for an unknown group")]
    public async Task Delete_Returns404ForAnUnknownGroup()
    {
        _manager.Setup(m => m.DeleteGroupAsync("nowhere", It.IsAny<CancellationToken>())).ReturnsAsync(AdminResult.NotFound("x"));

        AssertProblem(await _sut.Delete("nowhere", Ct), 404);
    }
}
