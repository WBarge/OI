using OI.Glue.Models;

namespace OI.Data.Translators.Internal_Models;

internal class State:IState
{
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
}