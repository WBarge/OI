using Hangfire;
using Microsoft.AspNetCore.Mvc;
using OI.Glue.Security;
using OI.Reporting.Managers;

namespace OI.Reporting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(ILogger<OrderController> logger,IBackgroundJobClient backgroundJobClient,IClientContext clientContext) : ControllerBase
    {
        private readonly ILogger<OrderController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        private readonly IBackgroundJobClient _backgroundJobClient = backgroundJobClient ?? throw new ArgumentNullException(nameof(backgroundJobClient));

        private readonly IClientContext _clientContext = clientContext ?? throw new ArgumentNullException(nameof(clientContext));
        
        [HttpPost]
        public IActionResult CreateOrder([FromBody] Guid orderId, CancellationToken token)
        {
            _logger.LogInformation(" Queueing up the generating of an order report ");
            string userName = _clientContext.DisplayName;
            string userId = _clientContext.UserId;
            Guid reportId = Guid.NewGuid();
            _backgroundJobClient.Enqueue<IReportManager>(rm => rm.CreateOrderAsync(reportId, orderId, userName, userId, token));
            return Ok(reportId);
        }
    }
}
