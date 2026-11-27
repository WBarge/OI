using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using OI.Auth.Oidc;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Pages.Account;

/// <summary>
/// The one place a password is typed. A UI sends the browser here (through /connect/authorize) when there is no OI.Auth
/// session; after a good sign-in the session cookie is set and the browser is sent back to finish the authorize request.
/// </summary>
[AllowAnonymous]   // this is where people sign in
public class LoginModel(IAuthManager authManager, IOptions<BrandingOptions> branding) : PageModel
{
    /// <summary>The only message shown for a rejected sign-in: it never says whether the email, the password or a lockout was the reason.</summary>
    public const string GENERIC_ERROR = "The email or password is not correct.";

    private const int MAX_EMAIL_LENGTH = 256;
    private const int MAX_PASSWORD_LENGTH = 256;

    /// <summary>Where to go after signing in: always a /connect/authorize request on this application (see <see cref="IsSafeReturnUrl"/>).</summary>
    [BindProperty(SupportsGet = true)]
    public string? ReturnUrl { get; set; }

    /// <summary>The email typed (kept when the page is shown again).</summary>
    [BindProperty]
    public string Email { get; set; } = "";

    /// <summary>The password typed (never sent back to the page).</summary>
    [BindProperty]
    public string Password { get; set; } = "";

    /// <summary>The message shown above the form, if any.</summary>
    public string? Error { get; private set; }

    /// <summary>True when the person signed in but there was nowhere to send them back to.</summary>
    public bool SignedIn { get; private set; }

    /// <summary>A fresh value for this response, so the page's inline style is allowed and no other inline style is.</summary>
    public string Nonce { get; } = Convert.ToBase64String(RandomNumberGenerator.GetBytes(16));

    /// <summary>The company logo address (from Branding:LogoUrl), or null when none is set or it is not an http(s) address.</summary>
    public string? LogoUrl =>
        Uri.TryCreate(branding.Value.LogoUrl, UriKind.Absolute, out Uri? uri) && uri.Scheme is "http" or "https"
            ? uri.AbsoluteUri
            : null;

    /// <summary>Shows the form.</summary>
    public void OnGet() => ApplySecurityHeaders();

    /// <summary>Checks the password and, if it is accepted, starts the OI.Auth session.</summary>
    public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
    {
        ApplySecurityHeaders();

        string email = (Email ?? "").Trim();
        string password = Password ?? "";
        if (email.Length == 0 || password.Length == 0 || email.Length > MAX_EMAIL_LENGTH || password.Length > MAX_PASSWORD_LENGTH)
        {
            Error = GENERIC_ERROR;
            return Page();
        }

        IAuthUser? user = await authManager.ValidateCredentialsAsync(email, password, cancellationToken);
        if (user is null)
        {
            Error = GENERIC_ERROR;
            return Page();
        }

        string sessionId = Guid.NewGuid().ToString("N");
        await HttpContext.SignInAsync(
            SessionCookie.Scheme,
            SessionCookie.CreatePrincipal(user.Id, sessionId),
            new AuthenticationProperties { IsPersistent = true });   // lasts Oidc:SessionHours, sliding

        if (IsSafeReturnUrl(ReturnUrl))
        {
            return LocalRedirect(ReturnUrl!);
        }

        SignedIn = true;
        return Page();
    }

    /// <summary>
    /// Only a request back to this application's own authorize endpoint is a place to send the browser after sign-in.
    /// Anything else (another site, another path) is ignored, so the login page cannot be used to bounce people elsewhere.
    /// </summary>
    public bool IsSafeReturnUrl(string? returnUrl) =>
        !string.IsNullOrEmpty(returnUrl)
        && Url.IsLocalUrl(returnUrl)
        && returnUrl.StartsWith("/connect/authorize", StringComparison.OrdinalIgnoreCase);

    private void ApplySecurityHeaders()
    {
        string images = "'self' data:";
        if (LogoUrl is not null)
        {
            images += " " + new Uri(LogoUrl).GetLeftPart(UriPartial.Authority);
        }

        // No form-action rule on purpose: after the form is posted the browser is redirected to the application that
        // asked for the sign-in, and some browsers apply form-action to every step of that redirect.
        Response.Headers.ContentSecurityPolicy =
            $"default-src 'none'; style-src 'nonce-{Nonce}'; img-src {images}; base-uri 'none'; frame-ancestors 'none'";
        Response.Headers.XContentTypeOptions = "nosniff";
        Response.Headers["Referrer-Policy"] = "no-referrer";
        Response.Headers.CacheControl = "no-store";
    }
}
