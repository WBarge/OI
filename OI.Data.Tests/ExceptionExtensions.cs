namespace OI.Data.Tests;

/// <summary>
/// Helpers for asserting on exceptions that come out of the data layer.
/// </summary>
internal static class ExceptionExtensions
{
    /// <summary>
    /// Returns the first non-aggregate exception inside <paramref name="exception"/>.
    /// The filtering engine builds its query on a worker task and waits for it, so an error it hits
    /// (for example an unknown property name) reaches the caller wrapped in an <see cref="AggregateException"/>.
    /// Asserting on the unwrapped exception keeps the tests about the real cause rather than the wrapper.
    /// </summary>
    public static Exception Unwrap(this Exception exception)
    {
        return exception is AggregateException aggregate
            ? aggregate.Flatten().InnerExceptions.First().Unwrap()
            : exception;
    }
}