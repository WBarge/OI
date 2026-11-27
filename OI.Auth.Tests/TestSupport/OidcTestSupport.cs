using System.Collections.Immutable;
using System.Text.Json;
using Moq;
using OI.Glue.Models;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Tests.TestSupport;

/// <summary>People for the tests.</summary>
internal static class TestUsers
{
    public static IAuthUser Make(string id = "user-1", string[]? roles = null, string? email = "pat@example.com", params (string Type, string Value)[] claims)
    {
        Mock<IAuthUser> user = new();
        user.SetupGet(u => u.Id).Returns(id);
        user.SetupGet(u => u.Email).Returns(email);
        user.SetupGet(u => u.DisplayName).Returns("Pat Example");
        user.SetupGet(u => u.Roles).Returns(roles ?? []);
        user.SetupGet(u => u.Claims).Returns(claims.Select(c => new KeyValuePair<string, string>(c.Type, c.Value)).ToList());
        return user.Object;
    }
}

/// <summary>The three OpenIddict managers, set up the way the session code uses them.</summary>
internal sealed class OidcManagers
{
    public Mock<IOpenIddictApplicationManager> Applications { get; } = new();
    public Mock<IOpenIddictAuthorizationManager> Authorizations { get; } = new();
    public Mock<IOpenIddictTokenManager> Tokens { get; } = new();

    public static async IAsyncEnumerable<object> Stream(params object[] items)
    {
        foreach (object item in items)
        {
            yield return item;
        }
        await Task.CompletedTask;
    }

    /// <summary>The client exists in OpenIddict with this id.</summary>
    public void GivenApplication(string clientId, string applicationId)
    {
        object application = new();
        Applications.Setup(m => m.FindByClientIdAsync(clientId, It.IsAny<CancellationToken>())).Returns(new ValueTask<object?>(application));
        Applications.Setup(m => m.GetIdAsync(application, It.IsAny<CancellationToken>())).Returns(new ValueTask<string?>(applicationId));
    }

    /// <summary>An authorization the user already has for the application, made in the given sign-in session.</summary>
    public object GivenAuthorization(string authorizationId, string sessionId)
    {
        object authorization = new();
        Authorizations.Setup(m => m.GetIdAsync(authorization, It.IsAny<CancellationToken>())).Returns(new ValueTask<string?>(authorizationId));
        Authorizations.Setup(m => m.GetPropertiesAsync(authorization, It.IsAny<CancellationToken>()))
            .Returns(new ValueTask<ImmutableDictionary<string, JsonElement>>(
                ImmutableDictionary<string, JsonElement>.Empty.Add("oi_sid", JsonSerializer.SerializeToElement(sessionId))));
        return authorization;
    }

    /// <summary>The user's valid permanent authorizations for the application.</summary>
    public void GivenFindReturns(string userId, string applicationId, params object[] authorizations) =>
        Authorizations.Setup(m => m.FindAsync(userId, applicationId, Statuses.Valid, AuthorizationTypes.Permanent,
                It.IsAny<ImmutableArray<string>?>(), It.IsAny<CancellationToken>()))
            .Returns(() => Stream(authorizations));

    /// <summary>Every authorization the user has (what sign-out looks through).</summary>
    public void GivenBySubject(string userId, params object[] authorizations) =>
        Authorizations.Setup(m => m.FindBySubjectAsync(userId, It.IsAny<CancellationToken>()))
            .Returns(() => Stream(authorizations));

    /// <summary>A new authorization gets this id when it is created.</summary>
    public void GivenCreatedAuthorizationHasId(string authorizationId)
    {
        object created = new();
        Authorizations.Setup(m => m.CreateAsync(It.IsAny<OpenIddictAuthorizationDescriptor>(), It.IsAny<CancellationToken>()))
            .Returns(new ValueTask<object>(created));
        Authorizations.Setup(m => m.GetIdAsync(created, It.IsAny<CancellationToken>())).Returns(new ValueTask<string?>(authorizationId));
    }
}
