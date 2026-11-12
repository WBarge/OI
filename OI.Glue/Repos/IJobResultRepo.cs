using OI.Glue.Models;

namespace OI.Glue.Repos;

public interface IJobResultRepo
{
    Task CreateJobResultPlaceholderAsync(Guid jobId, string jobName, string creatorName, CancellationToken token);
    Task SaveJobResultAsync(Guid reportId, string reportName, byte[] reportResult, CancellationToken token);
    Task<JobResult> GetResultFileAsync(Guid reportId, CancellationToken token);
}