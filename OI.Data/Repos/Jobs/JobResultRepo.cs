using Microsoft.EntityFrameworkCore;
using OI.Common.Extensions.Comparison;
using OI.Data.Contexts;
using OI.Data.Model.Jobs;
using OI.Glue.Repos;

namespace OI.Data.Repos.Jobs;

/// <summary>
/// Provides repository functionality for managing <see cref="JobResult"/> entities in the reporting database.
/// </summary>
/// <remarks>
/// This class extends the <see cref="BaseEfRepo{TDbContext, TEntity}"/> to provide specific operations
/// for handling job results, such as creating placeholders and saving job report results.
/// </remarks>
internal class JobResultRepo(OiReportingDbContext reportingDbContext): BaseEfRepo<OiReportingDbContext,JobResult>(reportingDbContext), IJobResultRepo
{
    /// <summary>
    /// Creates a placeholder for a job result in the database.
    /// </summary>
    /// <param name="jobId">The unique identifier of the job.</param>
    /// <param name="jobName">The name of the job.</param>
    /// <param name="creatorName">The name of the user who created the job.</param>
    /// <param name="token">A cancellation token to observe while waiting for the task to complete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task CreateJobResultPlaceholderAsync(Guid jobId, string jobName, string creatorName, CancellationToken token)
    {
        JobResult? preExisting = await FindByIdAsync(jobId, token);
        if (preExisting.IsNotEmpty())
        {
            throw new InvalidOperationException($"JobResult with Id {jobId} already exists.");
        }
        JobResult result = new JobResult()
        {
            Id = jobId,
            Name = jobName,
            Created = DateTime.UtcNow,
            CreatedBy = creatorName
        };
        await InsertAsync(result, token);
        await SaveAsync(token);
    }

    /// <summary>
    /// Saves the result of a job report to the database.
    /// </summary>
    /// <param name="reportId">The unique identifier of the report.</param>
    /// <param name="reportName">The name of the report.</param>
    /// <param name="reportResult">The binary content of the report.</param>
    /// <param name="token">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
    /// <returns>A <see cref="Task"/> that represents the asynchronous operation.</returns>
    /// <exception cref="InvalidOperationException">
    /// Thrown when a <see cref="JobResult"/> with the specified <paramref name="reportId"/> is not found.
    /// </exception>
    public async Task SaveJobResultAsync(Guid reportId, string reportName, byte[] reportResult, CancellationToken token)
    {
        JobResult? jobResult = await JobResult(reportId, token);
        if (jobResult == null)
        {
            throw new InvalidOperationException($"JobResult with Id {reportId} not found.");
        }
        jobResult.Result = new StoredFile()
        {
            Id = Guid.NewGuid(),
            FileName = $"{reportName}_Report_{reportId}.pdf",
            FileContents = reportResult
        };
        Update(jobResult);
        await SaveAsync(token);
    }

    public async Task<Glue.Models.JobResult> GetResultFileAsync(Guid reportId, CancellationToken token)
    {
        JobResult? jobResult = await JobResult(reportId, token);//may want project to Glue.Models.JobResult here instead of getting full entity
        if (jobResult == null || jobResult.Result == null)
            throw new InvalidOperationException(
                $"Job result with ID {reportId} not found or does not contain a result file.");

        return new Glue.Models.JobResult(jobResult.Name, jobResult.Result.FileContents);
    }

    private async Task<JobResult?> JobResult(Guid reportId, CancellationToken token)
    {
        JobResult? jobResult = await ((OiReportingDbContext)DbContext).ReportResults
            .Include(jobResult => jobResult.Result)
            .FirstOrDefaultAsync(r => r.Id == reportId, token);
        return jobResult;
    }
}