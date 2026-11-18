using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using OI.Integration.Security;
using ProductManager.Service.Controllers;

namespace ProductManager.Service.Tests.Security;

/// <summary>
/// Guards against the mistake that matters most here: an endpoint that changes product data without being admin-only.
/// These read the attributes, so they fail the moment a new write endpoint is added without protection.
/// </summary>
[TestFixture, Description("Every endpoint that changes product data must be admin-only; reads are open to any valid token")]
public class ControllerProtectionTests
{
    private static readonly string[] _changingVerbs = ["POST", "PUT", "DELETE", "PATCH"];

    // The only POST endpoints that merely READ data (they take a filter in the body). Every other
    // POST, PUT, DELETE or PATCH changes data and therefore needs the admin policy.
    private static readonly string[] _readOnlyPosts =
    [
        $"{nameof(ProductsController)}.{nameof(ProductsController.GetProducts)}",
        $"{nameof(OptionsController)}.{nameof(OptionsController.GetOptions)}"
    ];

    private static IEnumerable<Type> Controllers() =>
        typeof(PingController).Assembly.GetTypes()
            .Where(t => typeof(ControllerBase).IsAssignableFrom(t) && !t.IsAbstract);

    private static IEnumerable<(Type Controller, MethodInfo Action, string[] Verbs)> Actions() =>
        Controllers().SelectMany(c => c
            .GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
            .Select(m => (Controller: c, Action: m,
                Verbs: m.GetCustomAttributes<HttpMethodAttribute>().SelectMany(a => a.HttpMethods).ToArray()))
            .Where(a => a.Verbs.Length > 0));

    private static string Name(Type controller, MethodInfo action) => $"{controller.Name}.{action.Name}";

    private static IEnumerable<AuthorizeAttribute> Authorizations(Type controller, MethodInfo action) =>
        action.GetCustomAttributes<AuthorizeAttribute>(true)
            .Concat(controller.GetCustomAttributes<AuthorizeAttribute>(true));

    private static bool IsAnonymous(Type controller, MethodInfo action) =>
        action.GetCustomAttributes<AllowAnonymousAttribute>(true).Any() ||
        controller.GetCustomAttributes<AllowAnonymousAttribute>(true).Any();

    [Test, Description("The scan should actually find the controllers and their actions, or the other tests prove nothing")]
    public void TheScan_FindsTheActions()
    {
        Controllers().Should().HaveCountGreaterThan(5);
        Actions().Should().HaveCountGreaterThan(20);
    }

    [Test, Description("Every action that changes data (POST, PUT, DELETE, PATCH) except the read-only POSTs should require the Admin policy")]
    public void EveryActionThatChangesData_RequiresTheAdminPolicy()
    {
        List<string> unprotected = Actions()
            .Where(a => a.Verbs.Any(v => _changingVerbs.Contains(v)))
            .Where(a => !_readOnlyPosts.Contains(Name(a.Controller, a.Action)))
            .Where(a => !Authorizations(a.Controller, a.Action).Any(x => x.Policy == AdminPolicy.NAME) ||
                        IsAnonymous(a.Controller, a.Action))
            .Select(a => Name(a.Controller, a.Action))
            .ToList();

        unprotected.Should().BeEmpty("these endpoints change data but are not admin-only");
    }

    [Test, Description("The read-only POST endpoints should exist, so the allow list cannot quietly go stale")]
    public void TheReadOnlyPosts_StillExist()
    {
        List<string> found = Actions()
            .Where(a => a.Verbs.Contains("POST"))
            .Select(a => Name(a.Controller, a.Action))
            .ToList();

        found.Should().Contain(_readOnlyPosts);
    }

    [Test, Description("The read-only POST endpoints should be open to any valid token, not admin-only")]
    public void TheReadOnlyPosts_AreNotAdminOnly()
    {
        List<string> adminOnly = Actions()
            .Where(a => _readOnlyPosts.Contains(Name(a.Controller, a.Action)))
            .Where(a => Authorizations(a.Controller, a.Action).Any(x => x.Policy == AdminPolicy.NAME))
            .Select(a => Name(a.Controller, a.Action))
            .ToList();

        adminOnly.Should().BeEmpty();
    }

    [Test, Description("GET endpoints should be open to any valid token, not admin-only")]
    public void GetActions_AreNotAdminOnly()
    {
        List<string> adminOnly = Actions()
            .Where(a => a.Verbs.Contains("GET"))
            .Where(a => Authorizations(a.Controller, a.Action).Any(x => x.Policy == AdminPolicy.NAME))
            .Select(a => Name(a.Controller, a.Action))
            .ToList();

        adminOnly.Should().BeEmpty();
    }

    [Test, Description("Only the Ping endpoint may be called without a token")]
    public void OnlyPing_IsAnonymous()
    {
        List<string> anonymous = Actions()
            .Where(a => IsAnonymous(a.Controller, a.Action))
            .Select(a => a.Controller.Name)
            .Distinct()
            .ToList();

        anonymous.Should().ContainSingle().Which.Should().Be(nameof(PingController));
    }
}
