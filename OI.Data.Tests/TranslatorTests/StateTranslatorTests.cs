using FluentAssertions;
using OI.Data.Model;
using OI.Data.Translators;
using OI.Glue.Models;

namespace OI.Data.Tests.TranslatorTests;

[TestFixture, Description("Tests for StateTranslator")]
public class StateTranslatorTests
{
    [Test, Description("Translate should copy the name and code to an IState")]
    public void Translate_CopiesNameAndCode()
    {
        State state = new() { Id = Guid.NewGuid(), Name = "Texas", Code = "TX" };

        IState result = state.Translate();

        result.Name.Should().Be("Texas");
        result.Code.Should().Be("TX");
    }

    [Test, Description("Translate should return a new object that is not the entity, so callers cannot change tracked data")]
    public void Translate_ReturnsNewObject()
    {
        State state = new() { Id = Guid.NewGuid(), Name = "Texas", Code = "TX" };

        IState result = state.Translate();

        result.Should().NotBeSameAs(state);
        result.Should().NotBeOfType<State>();
    }

    [Test, Description("Changing the entity after translating should not change the translated state")]
    public void Translate_ResultIsIndependentOfEntity()
    {
        State state = new() { Id = Guid.NewGuid(), Name = "Texas", Code = "TX" };
        IState result = state.Translate();

        state.Name = "Changed";

        result.Name.Should().Be("Texas");
    }
}
