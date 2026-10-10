using Newtonsoft.Json;

namespace OI.Service.Models.Results;

/// <summary>
/// Class ErrorMessageForClient.
/// </summary>
public class ErrorMessageForClient
{
    /// <summary>
    /// Gets or sets the message.
    /// </summary>
    /// <value>The message.</value>
    [JsonProperty(PropertyName = "message")]
    public string? Message { get; set; }
    /// <summary>
    /// Gets or sets the type of the exception.
    /// </summary>
    /// <value>The type of the exception.</value>
    [JsonProperty(PropertyName = "exceptionType")]
    public string? ExceptionType { get; set; }
    /// <summary>
    /// Gets or sets the trace identifier that ties this response to the server-side log entry. Omitted when not set.
    /// </summary>
    /// <value>The trace identifier.</value>
    [JsonProperty(PropertyName = "traceId", NullValueHandling = NullValueHandling.Ignore)]
    public string? TraceId { get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="ErrorMessageForClient"/> class.
    /// </summary>
    public ErrorMessageForClient() { }
    /// <summary>
    /// Initializes a new instance of the <see cref="ErrorMessageForClient"/> class.
    /// </summary>
    /// <param name="x">The x.</param>
    public ErrorMessageForClient(Exception x)
    {
        Message = x.Message;
        ExceptionType = x.GetType().Name;
    }
    /// <summary>
    /// Initializes a new instance of the <see cref="ErrorMessageForClient"/> class with explicit values,
    /// for when the real exception details must not be sent to the client.
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="exceptionType">The exception type to report.</param>
    /// <param name="traceId">The trace identifier.</param>
    public ErrorMessageForClient(string message, string exceptionType, string? traceId)
    {
        Message = message;
        ExceptionType = exceptionType;
        TraceId = traceId;
    }
}