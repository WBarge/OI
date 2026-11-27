using FluentAssertions;
using OI.Reporting.Services;

namespace OI.Reporting.Tests.ServiceTests;

[TestFixture, Description("Tests for LogoImage: recognising a logo's type from its own bytes")]
public class LogoImageTests
{
    [Test, Description("ContentTypeOf should recognise a PNG")]
    public void ContentTypeOf_RecognisesAPng() =>
        LogoImage.ContentTypeOf([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00]).Should().Be("image/png");

    [Test, Description("ContentTypeOf should recognise a JPEG")]
    public void ContentTypeOf_RecognisesAJpeg() =>
        LogoImage.ContentTypeOf([0xFF, 0xD8, 0xFF, 0xE0, 0x00]).Should().Be("image/jpeg");

    [TestCase((byte)0x37)]
    [TestCase((byte)0x39)]
    [Description("ContentTypeOf should recognise both GIF versions")]
    public void ContentTypeOf_RecognisesAGif(byte version) =>
        LogoImage.ContentTypeOf([0x47, 0x49, 0x46, 0x38, version, 0x61, 0x00]).Should().Be("image/gif");

    [Test, Description("ContentTypeOf should refuse an SVG, which can carry script")]
    public void ContentTypeOf_RefusesAnSvg() =>
        LogoImage.ContentTypeOf("<svg xmlns=\"http://www.w3.org/2000/svg\"><script>alert(1)</script></svg>"u8.ToArray()).Should().BeNull();

    [Test, Description("ContentTypeOf should refuse a web page or other text")]
    public void ContentTypeOf_RefusesHtml() =>
        LogoImage.ContentTypeOf("<html><body>hi</body></html>"u8.ToArray()).Should().BeNull();

    [Test, Description("ContentTypeOf should refuse a WebP file: only PNG, JPG and GIF are served")]
    public void ContentTypeOf_RefusesWebP() =>
        LogoImage.ContentTypeOf([0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]).Should().BeNull();

    [Test, Description("ContentTypeOf should refuse a file that starts like a PNG but is cut short")]
    public void ContentTypeOf_RefusesATruncatedPng() =>
        LogoImage.ContentTypeOf([0x89, 0x50, 0x4E, 0x47]).Should().BeNull();

    [Test, Description("ContentTypeOf should refuse an empty or missing file")]
    public void ContentTypeOf_RefusesNothing()
    {
        LogoImage.ContentTypeOf([]).Should().BeNull();
        LogoImage.ContentTypeOf(null).Should().BeNull();
    }
}
