namespace OI.Glue.Models;

public sealed record PagedResult<T>(IEnumerable<T> Data, long TotalRecordSize);