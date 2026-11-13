using Microsoft.AspNetCore.Mvc;
using OI.Reporting.Managers;

namespace OI.Reporting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController(ILogger<ReportController> logger,IReportResultManager reportResultManager) : ControllerBase
    {
        private readonly ILogger<ReportController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        private readonly IReportResultManager _reportResultManager = reportResultManager ?? throw new ArgumentNullException(nameof(reportResultManager));

        [HttpGet("{reportId}")]
        public async Task<IActionResult> GetReport(Guid reportId)
        {
            _logger.LogInformation("Retrieving report with ID: {ReportId}", reportId);
            byte[]? fileResult = await _reportResultManager.GetReportAsync(reportId);
            return fileResult is null
                ? NotFound()
                : File(fileResult, "application/octet-stream");
        }
    }
}
