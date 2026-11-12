using System.Net;
using System.Net.Http.Headers;
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
        public async Task<HttpResponseMessage> GetEstimate(Guid reportId)
        {
            _logger.LogInformation("Retrieving report with ID: {ReportId}", reportId);
            byte[]? fileResult = await _reportResultManager.GetReportAsync(reportId);
            HttpResponseMessage returnValue;
            if (fileResult != null)
            {
                MemoryStream stream = new MemoryStream(fileResult);
                returnValue = new HttpResponseMessage(HttpStatusCode.OK);
                returnValue.Content = new StreamContent(stream);
                returnValue.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            }
            else
            {
                returnValue = new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            return returnValue;        }

    }
}
