using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace OI.Auth.Pages.Account;

/// <summary>Where the browser lands after signing out when the application did not ask for its own address.</summary>
[AllowAnonymous]
public class SignedOutModel : PageModel
{
    /// <summary>Shows the page.</summary>
    public void OnGet()
    {
        Response.Headers.ContentSecurityPolicy = "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'";
        Response.Headers.CacheControl = "no-store";
    }
}
