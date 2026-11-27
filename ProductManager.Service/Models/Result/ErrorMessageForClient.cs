using Newtonsoft.Json;

namespace ProductManager.Service.Models.Result
{
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
    }
}
