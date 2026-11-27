using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Reporting.Controllers;
using OI.Reporting.Models;
using OI.Reporting.Services;

namespace OI.Reporting.Tests.ControllerTests;

[TestFixture, Description("Tests for CompanyProfileController.Logo: the anonymous logo the OI.Auth login page shows")]
public class CompanyProfileControllerLogoTests
{
    private static readonly byte[] Png = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x01, 0x02];

    private static CompanyProfileController Sut(byte[]? logo, bool noProfile = false)
    {
        Mock<ICompanyProfileStore> store = new();
        store.SetupGet(s => s.Current).Returns(noProfile ? null : new CompanyProfile { LogoFile = logo! });
        return new CompanyProfileController(store.Object, NullLogger<CompanyProfileController>.Instance)
        {
            ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext() },
        };
    }

    [Test, Description("Logo should return the stored image with its own content type")]
    public void Logo_ReturnsTheImage()
    {
        IActionResult result = Sut(Png).Logo();

        FileContentResult file = result.Should().BeOfType<FileContentResult>().Subject;
        file.FileContents.Should().Equal(Png);
        file.ContentType.Should().Be("image/png");
        file.EntityTag.Should().NotBeNull("the browser can ask whether its copy is still current");
    }

    [Test, Description("Logo should let the browser keep the image for five minutes, and no longer")]
    public void Logo_IsCachedForFiveMinutes()
    {
        CompanyProfileController sut = Sut(Png);

        sut.Logo();

        sut.Response.Headers.CacheControl.ToString().Should().Be("public, max-age=300");
        sut.Response.Headers.XContentTypeOptions.ToString().Should().Be("nosniff");
    }

    [Test, Description("Logo should change its tag when the logo changes, so a new logo shows once the cache runs out")]
    public void Logo_TagChangesWithTheLogo()
    {
        byte[] other = [.. Png, 0x03];

        string first = ((FileContentResult)Sut(Png).Logo()).EntityTag!.Tag.ToString();
        string second = ((FileContentResult)Sut(other).Logo()).EntityTag!.Tag.ToString();
        string firstAgain = ((FileContentResult)Sut(Png).Logo()).EntityTag!.Tag.ToString();

        first.Should().NotBe(second);
        first.Should().Be(firstAgain);
    }

    [Test, Description("Logo should return 404 when no company profile has been synced yet")]
    public void Logo_IsNotFoundBeforeTheFirstSync()
    {
        Sut(null, noProfile: true).Logo().Should().BeOfType<NotFoundResult>();
    }

    [Test, Description("Logo should return 404 when the profile has no logo file")]
    public void Logo_IsNotFoundWithoutAFile()
    {
        Sut([]).Logo().Should().BeOfType<NotFoundResult>();
        Sut(null!).Logo().Should().BeOfType<NotFoundResult>();
    }

    [Test, Description("Logo should return 404, never the bytes, for a file that is not a PNG, JPG or GIF")]
    public void Logo_RefusesAnythingThatIsNotAPngJpgOrGif()
    {
        byte[] svg = "<svg xmlns=\"http://www.w3.org/2000/svg\"><script>alert(1)</script></svg>"u8.ToArray();

        Sut(svg).Logo().Should().BeOfType<NotFoundResult>();
    }

    [Test, Description("Logo should be reachable without a token, and throttled")]
    public void Logo_IsTheAnonymousEndpoint()
    {
        MethodInfo method = typeof(CompanyProfileController).GetMethod(nameof(CompanyProfileController.Logo))!;

        method.GetCustomAttribute<AllowAnonymousAttribute>().Should().NotBeNull();
        method.GetCustomAttribute<EnableRateLimitingAttribute>()!.PolicyName.Should().Be("logo");
        method.GetCustomAttribute<HttpGetAttribute>()!.Template.Should().Be("logo");
    }

    [Test, Description("Logo should be the only anonymous action in the controller, so the profile itself still needs a token")]
    public void Logo_IsTheOnlyAnonymousAction()
    {
        typeof(CompanyProfileController).GetCustomAttribute<AllowAnonymousAttribute>().Should().BeNull();
        typeof(CompanyProfileController)
            .GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
            .Where(m => m.GetCustomAttribute<AllowAnonymousAttribute>() is not null)
            .Select(m => m.Name)
            .Should().Equal(nameof(CompanyProfileController.Logo));
    }
}
