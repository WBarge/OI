using OI.Glue.Security;

namespace OI.Integration.Security;

/// <summary>
/// Holds the client context for one request (it is registered per request scope). The middleware fills it in;
/// everything else reads it through IClientContext.
/// </summary>
public sealed class ClientContextAccessor
{
    public IClientContext Current { get; set; } = ClientContext.Anonymous;
}

/// <summary>
/// What gets injected as IClientContext. It reads the accessor each time rather than copying the value, so a service
/// created before the middleware has run still sees the right caller afterwards.
/// </summary>
internal sealed class CurrentClientContext(ClientContextAccessor accessor) : IClientContext
{
    public bool IsAuthenticated => accessor.Current.IsAuthenticated;
    public string UserId => accessor.Current.UserId;
    public string DisplayName => accessor.Current.DisplayName;
    public string? Email => accessor.Current.Email;
    public IReadOnlyCollection<string> Roles => accessor.Current.Roles;
    public IReadOnlyCollection<string> Groups => accessor.Current.Groups;
}
