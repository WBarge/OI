using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Options;
using OI.Auth.Oidc;
using OI.Auth.Security;
using OI.Glue.Managers;
using OI.Glue.Models;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace OI.Auth.Controllers;

/// <summary>
/// The sign-in endpoints: /connect/authorize (where a UI sends the browser), /connect/token (trading a code or a refresh
/// token for tokens) and /connect/logout. OpenIddict validates every request (client, redirect address, PKCE, scopes)
/// before these actions run; what is decided here is who the person is and what goes into their tokens.
/// </summary>
[AllowAnonymous]   // sign-in has to work before anyone is signed in
[ApiExplorerSettings(IgnoreApi = true)]
public sealed class ConnectController(
    IAuthManager authManager,
    SessionAuthorizations sessions,
    PasswordGrantGate passwordGrant,
    IOptions<JwtOptions> jwtOptions,
    ILogger<ConnectController> logger) : Controller
{
    /// <summary>
    /// Where a UI sends the browser to sign in. With a valid OI.Auth session it answers with a code straight away (that
    /// is the single sign-on); otherwise it sends the browser to the login page and comes back here afterwards.
    /// </summary>
    [HttpGet("~/connect/authorize")]
    [HttpPost("~/connect/authorize")]
    [IgnoreAntiforgeryToken]
    [EnableRateLimiting("login-page")]
    public async Task<IActionResult> Authorize(CancellationToken cancellationToken)
    {
        OpenIddictRequest request = HttpContext.GetOpenIddictServerRequest()
            ?? throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

        AuthenticateResult session = await HttpContext.AuthenticateAsync(SessionCookie.Scheme);
        string? userId = session.Succeeded ? session.Principal!.FindFirst(SessionCookie.SubjectClaim)?.Value : null;

        // Every visit re-checks the user: a deleted, disabled or locked account must not get a code from an old cookie.
        IAuthUser? user = userId is null ? null : await authManager.FindActiveUserAsync(userId, cancellationToken);
        if (user is null)
        {
            if (session.Succeeded)
            {
                await HttpContext.SignOutAsync(SessionCookie.Scheme);
            }

            if (request.HasPromptValue(PromptValues.None))
            {
                return Forbid(
                    authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                    properties: Error(Errors.LoginRequired, "The user is not signed in."));
            }

            // Send the browser to the login page and bring it back to this same request afterwards.
            return Challenge(
                new AuthenticationProperties
                {
                    RedirectUri = Request.PathBase + Request.Path + QueryString.Create(Request.HasFormContentType ? Request.Form : Request.Query),
                },
                SessionCookie.Scheme);
        }

        string sessionId = session.Principal!.FindFirst(SessionCookie.SessionClaim)?.Value ?? Guid.NewGuid().ToString("N");
        var scopes = request.GetScopes();

        ClaimsIdentity identity = UserIdentityBuilder.Create(user, scopes, jwtOptions.Value.Audience);
        identity.SetAuthorizationId(await sessions.EnsureAsync(user.Id, request.ClientId!, sessionId, scopes, cancellationToken));
        identity.SetDestinations(UserIdentityBuilder.GetDestinations);

        return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    /// <summary>
    /// Trades an authorization code (after sign-in) or a refresh token (renewal) for new tokens. The user is re-checked and
    /// their claims rebuilt each time, so a changed role or a disabled account is noticed at the next renewal. In Development
    /// only, and only for a client marked for it, an email and password can be traded directly (the password grant, for Postman).
    /// </summary>
    [HttpPost("~/connect/token")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [EnableRateLimiting("token")]
    public async Task<IActionResult> Token(CancellationToken cancellationToken)
    {
        OpenIddictRequest request = HttpContext.GetOpenIddictServerRequest()
            ?? throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

        if (request.IsPasswordGrantType())
        {
            return await PasswordGrantAsync(request, cancellationToken);
        }

        if (request.IsAuthorizationCodeGrantType() || request.IsRefreshTokenGrantType())
        {
            return await RenewAsync(cancellationToken);
        }

        return Forbid(
            authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
            properties: Error(Errors.UnsupportedGrantType, "The specified grant type is not supported."));
    }

    /// <summary>
    /// Ends this browser's sign-in: revokes the tokens issued during it (so each UI's next renewal is refused), clears the
    /// OI.Auth cookie, and sends the browser back to the address the UI asked for (it must be registered).
    /// </summary>
    [HttpGet("~/connect/logout")]
    [HttpPost("~/connect/logout")]
    [IgnoreAntiforgeryToken]
    [EnableRateLimiting("login-page")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        AuthenticateResult session = await HttpContext.AuthenticateAsync(SessionCookie.Scheme);
        if (session.Succeeded)
        {
            string? userId = session.Principal!.FindFirst(SessionCookie.SubjectClaim)?.Value;
            string? sessionId = session.Principal.FindFirst(SessionCookie.SessionClaim)?.Value;
            if (userId is not null && sessionId is not null)
            {
                int revoked = await sessions.RevokeSessionAsync(userId, sessionId, cancellationToken);
                logger.LogInformation("Sign-out ended {Count} authorization(s) for user {UserId}", revoked, userId);
            }
            await HttpContext.SignOutAsync(SessionCookie.Scheme);
        }

        // OpenIddict redirects to the (registered) post_logout_redirect_uri, or to this address when none was asked for.
        return SignOut(
            authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
            properties: new AuthenticationProperties { RedirectUri = "/account/signed-out" });
    }

    private async Task<IActionResult> RenewAsync(CancellationToken cancellationToken)
    {
        // The principal OpenIddict stored in the authorization code or refresh token.
        AuthenticateResult result = await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

        string? userId = result.Principal?.GetClaim(Claims.Subject);
        IAuthUser? user = userId is null ? null : await authManager.FindActiveUserAsync(userId, cancellationToken);
        if (user is null)
        {
            return Forbid(
                authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                properties: Error(Errors.InvalidGrant, "The user is no longer allowed to sign in."));
        }

        ClaimsIdentity identity = UserIdentityBuilder.Refresh(result.Principal!, user, jwtOptions.Value.Audience);
        return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    private async Task<IActionResult> PasswordGrantAsync(OpenIddictRequest request, CancellationToken cancellationToken)
    {
        // Three locks, all of which must be open: Development, the setting, and a client marked for it.
        // (OpenIddict itself only accepts the grant when the same conditions were true at start-up.)
        if (!passwordGrant.IsOpenFor(request.ClientId))
        {
            return Forbid(
                authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                properties: Error(Errors.UnsupportedGrantType, "The specified grant type is not supported."));
        }

        IAuthUser? user = await authManager.ValidateCredentialsAsync(request.Username ?? "", request.Password ?? "", cancellationToken);
        if (user is null)
        {
            return Forbid(
                authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                properties: Error(Errors.InvalidGrant, "The username/password couple is invalid."));
        }

        var scopes = request.GetScopes();
        ClaimsIdentity identity = UserIdentityBuilder.Create(user, scopes, jwtOptions.Value.Audience);
        identity.SetAuthorizationId(await sessions.EnsureAsync(user.Id, request.ClientId!, Guid.NewGuid().ToString("N"), scopes, cancellationToken));
        identity.SetDestinations(UserIdentityBuilder.GetDestinations);

        return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    private static AuthenticationProperties Error(string error, string description) =>
        new(new Dictionary<string, string?>
        {
            [OpenIddictServerAspNetCoreConstants.Properties.Error] = error,
            [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = description,
        });
}
