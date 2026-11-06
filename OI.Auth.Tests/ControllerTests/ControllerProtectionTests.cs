using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using OI.Auth.Controllers;
using OI.Auth.Security;

namespace OI.Auth.Tests.ControllerTests;

/// <summary>
/// Guards against the mistake that matters most here: an administration endpoint that anyone can call, or a
/// sign-in endpoint that suddenly demands a token. These read the attributes, so they fail the moment one changes.
/// </summary>
[TestFixture, Description("Tests that the right endpoints are protected")]
public class ControllerProtectionTests
{
    private static readonly Type[] AdminControllers = [typeof(AdminUsersController), typeof(AdminRolesController), typeof(AdminGroupsController)];

    private static IEnumerable<MethodInfo> Actions(Type controller) =>
        controller.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly);

    [TestCaseSource(nameof(AdminControllers))]
    [Description("Every administration controller should require the Admin policy")]
    public void AdminController_RequiresTheAdminPolicy(Type controller)
    {
        AuthorizeAttribute? authorize = controller.GetCustomAttribute<AuthorizeAttribute>();

        authorize.Should().NotBeNull();
        authorize!.Policy.Should().Be(AdminPolicy.NAME);
    }

    [TestCaseSource(nameof(AdminControllers))]
    [Description("No administration controller should be open to anonymous callers")]
    public void AdminController_IsNotAnonymous(Type controller)
    {
        controller.GetCustomAttribute<AllowAnonymousAttribute>().Should().BeNull();
    }

    [TestCaseSource(nameof(AdminControllers))]
    [Description("No action on an administration controller should switch the protection off")]
    public void AdminController_HasNoAnonymousActions(Type controller)
    {
        Actions(controller).Where(a => a.GetCustomAttribute<AllowAnonymousAttribute>() is not null).Should().BeEmpty();
    }

    [TestCaseSource(nameof(AdminControllers))]
    [Description("No action on an administration controller should loosen the policy to something weaker")]
    public void AdminController_HasNoWeakerPolicyOnAnAction(Type controller)
    {
        Actions(controller).Where(a => a.GetCustomAttribute<AuthorizeAttribute>() is not null).Should().BeEmpty();
    }

    [TestCaseSource(nameof(AdminControllers))]
    [Description("Administration endpoints should live under api/admin")]
    public void AdminController_LivesUnderApiAdmin(Type controller)
    {
        controller.GetCustomAttribute<Microsoft.AspNetCore.Mvc.RouteAttribute>()!.Template.Should().StartWith("api/admin/");
    }

    [TestCase(typeof(AuthController))]
    [TestCase(typeof(DiscoveryController))]
    [Description("Sign-in and key discovery must stay open, because they happen before anyone has a token")]
    public void OpenController_StaysAnonymous(Type controller)
    {
        controller.GetCustomAttribute<AllowAnonymousAttribute>().Should().NotBeNull();
    }
}
