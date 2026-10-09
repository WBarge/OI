using OI.Data.Model;
using OI.Glue.Models;

namespace OI.Data.Translators;

internal static class StateTranslator
{
    public static IState Translate(this State state)
    {
        return new OI.Data.Translators.Internal_Models.State
        {
            Name = state.Name,
            Code = state.Code
        };
    }
}