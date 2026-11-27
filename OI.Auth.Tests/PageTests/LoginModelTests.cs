using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using OI.Auth.Oidc;
using OI.Auth.Pages.Account;
using OI.Auth.Tests.TestSupport;
using OI.Glue.Managers;
using OI.Glue.Models;

namespace OI.Auth.Tests.PageTests;

[TestFixture, Description("Tests for LoginModel: the one place a password is typed")]
public class LoginModelTests
{
    private static readonly CancellationToken Ct = CancellationToken.None;

    private Mock<IAuthManager> _manager = null!;
    private Mock<IAuthenticationService> _auth = null!;
    private DefaultHttpContext _http = null!;

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IAuthManager>();
        _auth = new Mock<IAuthenticationService>();
        ServiceCollection services = new();
        services.AddSingleton(_auth.Object);
        _http = new DefaultHttpContext { RequestServices = services.BuildServiceProvider() };
    }

    private LoginModel Model(string? logoUrl = null, string email = "pat@example.com", string password = "correct horse", string? returnUrl = null)
    {
        Mock<IUrlHelper> url = new();
        url.Setup(u => u.IsLocalUrl(It.IsAny<string?>()))
            .Returns((string? s) => !string.IsNullOrEmpty(s) && s[0] == '/' && (s.Length == 1 || (s[1] != '/' && s[1] != '\\')));
        return new LoginModel(_manager.Object, Options.Create(new BrandingOptions { LogoUrl = logoUrl }))
        {
            PageContext = new PageContext { HttpContext = _http },
            Url = url.Object,
            Email = email,
            Password = password,
            ReturnUrl = returnUrl,
        };
    }

    private void GivenCredentialsAreAccepted(IAuthUser? user = null) =>
        _manager.Setup(m => m.ValidateCredentialsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(user ?? TestUsers.Make());

    // ---- signing in

    [TestCase("/connect/authorize?client_id=oi-ui&state=abc")]
    [TestCase("/CONNECT/AUTHORIZE?x=1")]
    [Description("OnPostAsync should send the browser back to the authorize request after a good sign-in")]
    public async Task OnPostAsync_RedirectsBackToTheAuthorizeRequest(string returnUrl)
    {
        GivenCredentialsAreAccepted();

        IActionResult result = await Model(returnUrl: returnUrl).OnPostAsync(Ct);

        result.Should().BeOfType<LocalRedirectResult>().Which.Url.Should().Be(returnUrl);
    }

    [Test, Description("OnPostAsync should start a persistent OI.Auth session holding the user id and a new session id")]
    public async Task OnPostAsync_StartsTheSession()
    {
        GivenCredentialsAreAccepted(TestUsers.Make("user-42"));

        await Model(returnUrl: "/connect/authorize?x=1").OnPostAsync(Ct);

        _auth.Verify(a => a.SignInAsync(
            _http,
            SessionCookie.Scheme,
            It.Is<ClaimsPrincipal>(p => p.FindFirst("sub")!.Value == "user-42" && !string.IsNullOrEmpty(p.FindFirst("sid")!.Value)),
            It.Is<AuthenticationProperties>(p => p.IsPersistent)), Times.Once);
    }

    [Test, Description("OnPostAsync should give every sign-in its own session id")]
    public async Task OnPostAsync_UsesANewSessionIdEachTime()
    {
        GivenCredentialsAreAccepted();
        List<string?> sessionIds = [];
        _auth.Setup(a => a.SignInAsync(It.IsAny<HttpContext>(), It.IsAny<string?>(), It.IsAny<ClaimsPrincipal>(), It.IsAny<AuthenticationProperties?>()))
            .Callback<HttpContext, string?, ClaimsPrincipal, AuthenticationProperties?>((_, _, p, _) => sessionIds.Add(p.FindFirst("sid")?.Value))
            .Returns(Task.CompletedTask);

        await Model().OnPostAsync(Ct);
        await Model().OnPostAsync(Ct);

        sessionIds.Should().HaveCount(2).And.OnlyHaveUniqueItems();
    }

    [TestCase("https://evil.example/connect/authorize")]
    [TestCase("//evil.example/connect/authorize")]
    [TestCase("/\\evil.example")]
    [TestCase("/account/login")]
    [TestCase("/connectx")]
    [TestCase("javascript:alert(1)")]
    [TestCase("")]
    [TestCase(null)]
    [Description("OnPostAsync should sign the person in but never redirect anywhere except this application's authorize endpoint")]
    public async Task OnPostAsync_IgnoresAnUnsafeReturnUrl(string? returnUrl)
    {
        GivenCredentialsAreAccepted();
        LoginModel model = Model(returnUrl: returnUrl);

        IActionResult result = await model.OnPostAsync(Ct);

        result.Should().BeOfType<PageResult>();
        model.SignedIn.Should().BeTrue();
        _auth.Verify(a => a.SignInAsync(It.IsAny<HttpContext>(), SessionCookie.Scheme, It.IsAny<ClaimsPrincipal>(), It.IsAny<AuthenticationProperties?>()), Times.Once);
    }

    [Test, Description("OnPostAsync should trim the email before checking it")]
    public async Task OnPostAsync_TrimsTheEmail()
    {
        GivenCredentialsAreAccepted();

        await Model(email: "  pat@example.com  ").OnPostAsync(Ct);

        _manager.Verify(m => m.ValidateCredentialsAsync("pat@example.com", "correct horse", It.IsAny<CancellationToken>()), Times.Once);
    }

    // ---- rejected sign-ins

    [Test, Description("OnPostAsync should show one generic message and start no session when the credentials are rejected")]
    public async Task OnPostAsync_RejectsBadCredentialsWithoutSayingWhy()
    {
        _manager.Setup(m => m.ValidateCredentialsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((IAuthUser?)null);
        LoginModel model = Model(returnUrl: "/connect/authorize?x=1");

        IActionResult result = await model.OnPostAsync(Ct);

        result.Should().BeOfType<PageResult>();
        model.Error.Should().Be(LoginModel.GENERIC_ERROR);
        model.SignedIn.Should().BeFalse();
        _auth.Verify(a => a.SignInAsync(It.IsAny<HttpContext>(), It.IsAny<string?>(), It.IsAny<ClaimsPrincipal>(), It.IsAny<AuthenticationProperties?>()), Times.Never);
    }

    [TestCase("", "password")]
    [TestCase("   ", "password")]
    [TestCase("pat@example.com", "")]
    [Description("OnPostAsync should not even check blank fields")]
    public async Task OnPostAsync_RejectsBlankFields(string email, string password)
    {
        LoginModel model = Model(email: email, password: password);

        await model.OnPostAsync(Ct);

        model.Error.Should().Be(LoginModel.GENERIC_ERROR);
        _manager.Verify(m => m.ValidateCredentialsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Test, Description("OnPostAsync should not hash an enormous password or look up an enormous email")]
    public async Task OnPostAsync_RejectsOversizedInput()
    {
        await Model(email: new string('a', 300) + "@example.com").OnPostAsync(Ct);
        await Model(password: new string('p', 300)).OnPostAsync(Ct);

        _manager.Verify(m => m.ValidateCredentialsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    // ---- the logo and the page's security headers

    [Test, Description("LogoUrl should be the address set in Branding:LogoUrl")]
    public void LogoUrl_IsTheConfiguredAddress()
    {
        Model(logoUrl: "https://reporting.test/api/CompanyProfile/logo").LogoUrl.Should().Be("https://reporting.test/api/CompanyProfile/logo");
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("not a url")]
    [TestCase("javascript:alert(1)")]
    [TestCase("ftp://reporting.test/logo.png")]
    [TestCase("/relative/logo.png")]
    [Description("LogoUrl should be null unless it is an absolute http or https address")]
    public void LogoUrl_IsNullForAnythingElse(string? address)
    {
        Model(logoUrl: address).LogoUrl.Should().BeNull();
    }

    [Test, Description("OnGet should allow images only from this application and the logo's own origin")]
    public void OnGet_AllowsImagesFromTheLogoOrigin()
    {
        LoginModel model = Model(logoUrl: "https://reporting.test:7267/api/CompanyProfile/logo");

        model.OnGet();

        string csp = _http.Response.Headers.ContentSecurityPolicy.ToString();
        csp.Should().Contain("img-src 'self' data: https://reporting.test:7267;");
    }

    [Test, Description("OnGet should allow only self hosted images when there is no logo")]
    public void OnGet_AllowsOnlyOwnImagesWithoutALogo()
    {
        Model().OnGet();

        _http.Response.Headers.ContentSecurityPolicy.ToString().Should().Contain("img-src 'self' data:;");
    }

    [Test, Description("OnGet should allow no scripts, no framing, and only the page's own nonce'd style")]
    public void OnGet_SetsAStrictPolicy()
    {
        LoginModel model = Model();

        model.OnGet();

        string csp = _http.Response.Headers.ContentSecurityPolicy.ToString();
        csp.Should().Contain("default-src 'none'");
        csp.Should().Contain($"style-src 'nonce-{model.Nonce}'");
        csp.Should().Contain("frame-ancestors 'none'");
        csp.Should().Contain("base-uri 'none'");
        csp.Should().NotContain("script-src");
        csp.Should().NotContain("unsafe-inline");
        _http.Response.Headers.CacheControl.ToString().Should().Be("no-store");
        _http.Response.Headers.XContentTypeOptions.ToString().Should().Be("nosniff");
    }

    [Test, Description("The policy should leave out form-action: browsers apply it to the redirect back to the application that asked for the sign-in")]
    public void OnGet_HasNoFormActionRule()
    {
        Model().OnGet();

        _http.Response.Headers.ContentSecurityPolicy.ToString().Should().NotContain("form-action");
    }

    [Test, Description("Each response should get its own nonce")]
    public void Nonce_IsDifferentEachTime()
    {
        Model().Nonce.Should().NotBe(Model().Nonce);
    }

    [Test, Description("The page should set its security headers on a failed sign-in too")]
    public async Task OnPostAsync_SetsTheHeadersWhenRejected()
    {
        await Model(password: "").OnPostAsync(Ct);

        _http.Response.Headers.ContentSecurityPolicy.ToString().Should().NotBeEmpty();
    }

    [Test, Description("The login page should be reachable without signing in")]
    public void LoginPage_IsAnonymous()
    {
        typeof(LoginModel).GetCustomAttributes(typeof(Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute), true).Should().NotBeEmpty();
    }
}
