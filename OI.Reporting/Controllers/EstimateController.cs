using Hangfire;
using Microsoft.AspNetCore.Mvc;
using OI.Glue.Security;
using OI.Reporting.Managers;

namespace OI.Reporting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstimateController(ILogger<EstimateController> logger,IBackgroundJobClient backgroundJobClient,IClientContext clientContext) : ControllerBase
    {
        private readonly ILogger<EstimateController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        private readonly IBackgroundJobClient _backgroundJobClient = backgroundJobClient ?? throw new ArgumentNullException(nameof(backgroundJobClient));

        private readonly IClientContext _clientContext = clientContext ?? throw new ArgumentNullException(nameof(clientContext));
        
        [HttpPost]
        public IActionResult CreateEstimate([FromBody] Guid orderId, CancellationToken token)
        {
            _logger.LogInformation(" Queueing up the generating of an estimate ");
            string userName = _clientContext.DisplayName;
            string userId = _clientContext.UserId.ToString();
            Guid reportId = Guid.NewGuid();
            _backgroundJobClient.Enqueue<IReportManager>(rm => rm.CreateEstimateAsync(reportId, orderId, userName, userId, token));
            return Ok(reportId);
        }
    }
}
