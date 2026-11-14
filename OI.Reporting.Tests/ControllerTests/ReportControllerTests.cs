using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Reporting.Controllers;
using OI.Reporting.Managers;

namespace OI.Reporting.Tests.ControllerTests;

[TestFixture, Description("Tests for ReportController: handing a finished report to the browser")]
public class ReportControllerTests
{
    private static readonly Guid ReportId = Guid.Parse("3f2504e0-4f89-11d3-9a0c-0305e82c3301");
    private static readonly byte[] Pdf = [0x25, 0x50, 0x44, 0x46];

    private Mock<IReportResultManager> _manager = null!;
    private ReportController _sut = null!;

    [SetUp]
    public void SetUp()
    {
        _manager = new Mock<IReportResultManager>();
        _sut = new ReportController(NullLogger<ReportController>.Instance, _manager.Object);
    }

    [Test, Description("GetReport should return the file bytes as a download when the report exists")]
    public async Task GetReport_ReturnsTheFileWhenTheReportExists()
    {
        _manager.Setup(m => m.GetReportAsync(ReportId, It.IsAny<CancellationToken>())).ReturnsAsync(Pdf);

        IActionResult result = await _sut.GetReport(ReportId);

        FileContentResult file = result.Should().BeOfType<FileContentResult>().Subject;
        file.FileContents.Should().Equal(Pdf);
        file.ContentType.Should().Be("application/octet-stream");
    }

    [Test, Description("GetReport should return 404 when the report has not been generated")]
    public async Task GetReport_Returns404WhenTheReportDoesNotExist()
    {
        _manager.Setup(m => m.GetReportAsync(ReportId, It.IsAny<CancellationToken>())).ReturnsAsync((byte[]?)null);

        IActionResult result = await _sut.GetReport(ReportId);

        result.Should().BeOfType<NotFoundResult>();
    }
}
