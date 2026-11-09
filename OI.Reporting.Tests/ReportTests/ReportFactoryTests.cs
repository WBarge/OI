using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using OI.Reporting.Reports;

namespace OI.Reporting.Tests.ReportTests;

[TestFixture, Description("Tests for ReportFactory and the report classes it builds")]
public class ReportFactoryTests
{
    private ServiceProvider _provider = null!;
    private ReportFactory _sut = null!;

    [SetUp]
    public void SetUp()
    {
        ServiceCollection services = new();
        services.AddLogging();
        _provider = services.BuildServiceProvider();
        _sut = new ReportFactory(_provider, NullLogger<ReportFactory>.Instance);
    }

    [TearDown]
    public void TearDown() => _provider.Dispose();

    [Test, Description("Constructor should throw when serviceProvider is null")]
    public void Constructor_ThrowsWhenProviderIsNull()
    {
        Action act = () => _ = new ReportFactory(null!, NullLogger<ReportFactory>.Instance);

        act.Should().Throw<ArgumentNullException>().WithParameterName("serviceProvider");
    }

    [Test, Description("Constructor should throw when logger is null")]
    public void Constructor_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new ReportFactory(_provider, null!);

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("GetReport should build an order report for the Order kind")]
    public void GetReport_BuildsAnOrderReport()
    {
        _sut.GetReport(Guid.NewGuid(), Report.Order).Should().BeOfType<OrderReport>();
    }

    [Test, Description("GetReport should build an invoice report for the Invoice kind")]
    public void GetReport_BuildsAnInvoiceReport()
    {
        _sut.GetReport(Guid.NewGuid(), Report.Invoice).Should().BeOfType<InvoiceReport>();
    }

    [TestCase(Report.Order)]
    [TestCase(Report.Invoice)]
    [Description("GetReport should give the report the generation id it was asked for")]
    public void GetReport_PassesTheGenerationId(Report kind)
    {
        Guid id = Guid.NewGuid();

        _sut.GetReport(id, kind).GenerationId.Should().Be(id);
    }

    [Test, Description("GetReport should build a new report each time, so two jobs never share one")]
    public void GetReport_BuildsANewReportEachTime()
    {
        BaseReport first = _sut.GetReport(Guid.NewGuid(), Report.Order);
        BaseReport second = _sut.GetReport(Guid.NewGuid(), Report.Order);

        first.Should().NotBeSameAs(second);
    }

    [Test, Description("GetReport should throw for a report kind it does not know")]
    public void GetReport_ThrowsForAnUnknownKind()
    {
        Action act = () => _sut.GetReport(Guid.NewGuid(), (Report)999);

        act.Should().Throw<ArgumentOutOfRangeException>().WithParameterName("whichReport");
    }

    [Test, Description("GetReport should log which report it is creating")]
    public void GetReport_LogsTheRequest()
    {
        Mock<ILogger<ReportFactory>> logger = new();
        ReportFactory sut = new(_provider, logger.Object);

        sut.GetReport(Guid.NewGuid(), Report.Invoice);

        logger.Verify(l => l.Log(LogLevel.Information, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(),
            It.IsAny<Exception?>(), It.IsAny<Func<It.IsAnyType, Exception?, string>>()), Times.Once);
    }

    [Test, Description("Every Report value should be buildable, so adding a value without a report is caught here")]
    public void GetReport_CoversEveryReportKind()
    {
        foreach (Report kind in Enum.GetValues<Report>())
        {
            Action act = () => _sut.GetReport(Guid.NewGuid(), kind);

            act.Should().NotThrow($"{kind} needs a case in ReportFactory");
        }
    }

    [Test, Description("A report should be able to have its generation id changed")]
    public void BaseReport_GenerationIdCanBeChanged()
    {
        BaseReport report = _sut.GetReport(Guid.NewGuid(), Report.Order);
        Guid other = Guid.NewGuid();

        report.GenerationId = other;

        report.GenerationId.Should().Be(other);
    }

    [Test, Description("OrderReport constructor should throw when logger is null")]
    public void OrderReport_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new OrderReport(null!, Guid.NewGuid());

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }

    [Test, Description("InvoiceReport constructor should throw when logger is null")]
    public void InvoiceReport_ThrowsWhenLoggerIsNull()
    {
        Action act = () => _ = new InvoiceReport(null!, Guid.NewGuid());

        act.Should().Throw<ArgumentNullException>().WithParameterName("logger");
    }
}
