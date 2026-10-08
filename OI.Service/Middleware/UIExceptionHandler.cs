using Newtonsoft.Json;
using OI.Service.Models.Results;

namespace OI.Service.Middleware;

/// <summary>
/// Class UiExceptionHandler.
/// This class is responsible for creating a consistent result message to the client in the case of an error (aka a throw)
/// </summary>
public class UiExceptionHandler
{
    /// <summary>
    /// The next
    /// </summary>
    readonly RequestDelegate _next;

    /// <summary>
    /// Initializes a new instance of the <see cref="UiExceptionHandler" /> class.
    /// </summary>
    /// <param name="next">The next.</param>
    public UiExceptionHandler(RequestDelegate next)
    {
        _next = next;
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
          
        catch (Exception x)
        {
            if (!context.Response.HasStarted)
            {
                int statusCodeToSentToClient = x.GetType().Name switch
                {
                    //TODO update with exception types used in the application
                    "ArgumentNullException" => (int) System.Net.HttpStatusCode.BadRequest,
                    "RequestException" => (int) System.Net.HttpStatusCode.BadRequest,
                    "RequiredObjectException" => (int) System.Net.HttpStatusCode.BadRequest,
                    _ => (int) System.Net.HttpStatusCode.InternalServerError
                };

                context.Response.StatusCode = statusCodeToSentToClient;
                await BuildResponseBodyAsync(context, x);
            }
        }
    }

    /// <summary>
    /// build response body as an asynchronous operation.
    /// </summary>
    /// <param name="context">The context.</param>
    /// <param name="x">The x.</param>
    /// <returns>Task.</returns>
    public async Task BuildResponseBodyAsync(HttpContext context, Exception x)
    {
        ErrorMessageForClient errorStruct = new(x);
        string stringToSendToClient = JsonConvert.SerializeObject(errorStruct);

        await using StreamWriter sw = new(context.Response.Body);
        await sw.WriteAsync(stringToSendToClient);
    }
}