using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
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

}
