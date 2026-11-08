using OI.Glue.Models;
using OI.Reporting.Models;

namespace OI.Reporting.Services;

/// <summary>Holds the company details the UI last uploaded, for report generation to read.</summary>
public interface ICompanyProfileStore
{
    /// <summary>The latest profile, or null until the UI has uploaded one.</summary>
    ICompanyProfile? Current { get; }

    /// <summary>Replaces the whole profile (the UI's config.json is the source of truth, so nothing is merged).</summary>
    Task ReplaceAsync(ICompanyProfile profile, CancellationToken cancellationToken = default);
}
