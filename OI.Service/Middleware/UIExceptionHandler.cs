using CrossCutting.Exceptions;
using Newtonsoft.Json;
using OI.Service.Models.Results;

namespace OI.Service.Middleware;

/// <summary>
/// Class UiExceptionHandler.
/// This class is responsible for creating a consistent result message to the client in the case of an error (aka a throw).
/// <see cref="RequestException"/> and <see cref="RequiredObjectException"/> mean the caller sent bad data and become a 400;
/// everything else is a defect on our side and becomes a 500 whose details are logged but not sent to the client
/// (except in the Development environment).
/// </summary>
public class UiExceptionHandler
{
    /// <summary>
    /// Non-standard but widely used status for a request that the client abandoned before a response could be sent.
    /// </summary>
    private const int CLIENT_CLOSED_REQUEST_STATUS_CODE = 499;

    /// <summary>
    /// The message sent to the client when the real message must not be exposed.
    /// </summary>
    private const string GENERIC_ERROR_MESSAGE = "An unexpected error occurred. Please quote the traceId if you contact support.";

    /// <summary>
    /// The exception type sent to the client when the real type must not be exposed.
    /// </summary>
    private const string GENERIC_EXCEPTION_TYPE = "UnhandledException";

    /// <summary>
    /// The next
    /// </summary>
    readonly RequestDelegate _next;

    /// <summary>
    /// The logger
    /// </summary>
    readonly ILogger<UiExceptionHandler> _logger;

    /// <summary>
    /// The host environment, used to decide whether error details may be sent to the client
    /// </summary>
    readonly IHostEnvironment _environment;

    /// <summary>
    /// Initializes a new instance of the <see cref="UiExceptionHandler" /> class.
    /// </summary>
    /// <param name="next">The next.</param>
    /// <param name="logger">The logger.</param>
    /// <param name="environment">The host environment.</param>
    public UiExceptionHandler(RequestDelegate next, ILogger<UiExceptionHandler> logger, IHostEnvironment environment)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _environment = environment ?? throw new ArgumentNullException(nameof(environment));
    }

    /// <summary>
    /// called by the system as part of the request pipe-line
    /// </summary>
    /// <param name="context">The context.</param>
    /// <returns>Task.</returns>
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch (OperationCanceledException) when (context.RequestAborted.IsCancellationRequested)
        {
            // the client went away; nobody is listening, so this is not an error and no body is written
            _logger.LogInformation("Request {Method} {Path} was cancelled by the client (trace {TraceId})",
                context.Request.Method, context.Request.Path.ToString(), context.TraceIdentifier);
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = CLIENT_CLOSED_REQUEST_STATUS_CODE;
            }
        }
        catch (Exception x)
        {
            bool isClientError = IsClientError(x);
            bool responseStarted = context.Response.HasStarted;
            LogException(context, x, isClientError, responseStarted);

            if (!responseStarted)
            {
                context.Response.StatusCode = isClientError
                    ? StatusCodes.Status400BadRequest
                    : StatusCodes.Status500InternalServerError;
                await BuildResponseBodyAsync(context, x);
            }
        }
    }

    /// <summary>
    /// build response body as an asynchronous operation.
    /// Client errors always send the real message; other errors only do so in the Development environment.
    /// </summary>
    /// <param name="context">The context.</param>
    /// <param name="x">The x.</param>
    /// <returns>Task.</returns>
    public async Task BuildResponseBodyAsync(HttpContext context, Exception x)
    {
        bool exposeDetails = IsClientError(x) || _environment.IsDevelopment();
        ErrorMessageForClient errorStruct = exposeDetails
            ? new ErrorMessageForClient(x) { TraceId = context.TraceIdentifier }
            : new ErrorMessageForClient(GENERIC_ERROR_MESSAGE, GENERIC_EXCEPTION_TYPE, context.TraceIdentifier);
        string stringToSendToClient = JsonConvert.SerializeObject(errorStruct);

        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(stringToSendToClient);
    }

    /// <summary>
    /// Determines whether the exception means the caller sent bad data.
    /// Matching is by type so subclasses are included. ArgumentNullException is deliberately not here:
    /// it comes from our own guards and means a defect, not bad input (that is what RequiredObjectException is for).
    /// </summary>
    private static bool IsClientError(Exception x)
    {
        return x is RequestException or RequiredObjectException;
    }

    private void LogException(HttpContext context, Exception x, bool isClientError, bool responseStarted)
    {
        string method = context.Request.Method;
        string path = context.Request.Path.ToString();
        string traceId = context.TraceIdentifier;
        if (isClientError)
        {
            // the caller's mistake, not a defect: no stack trace
            _logger.LogWarning("Request {Method} {Path} was rejected as invalid: {Message} (trace {TraceId})", method, path, x.Message, traceId);
        }
        else if (responseStarted)
        {
            _logger.LogError(x, "Unhandled exception for {Method} {Path} (trace {TraceId}) after the response had started; the error could not be sent to the client", method, path, traceId);
        }
        else
        {
            _logger.LogError(x, "Unhandled exception for {Method} {Path} (trace {TraceId})", method, path, traceId);
        }
    }
}