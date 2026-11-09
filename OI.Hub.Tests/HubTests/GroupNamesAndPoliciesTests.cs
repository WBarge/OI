using FluentAssertions;
using OI.Hub.Hubs;

namespace OI.Hub.Tests.HubTests;

[TestFixture, Description("Tests for GroupNames, HubPolicies and Notification")]
public class GroupNamesAndPoliciesTests
{
    [Test, Description("Group should prefix the group id")]
    public void Group_PrefixesTheId()
    {
        GroupNames.Group("sales-west").Should().Be("group:sales-west");
    }

    [Test, Description("Topic should name the topic inside its group")]
    public void Topic_NamesTheTopicInsideTheGroup()
    {
        GroupNames.Topic("sales-west", "orders").Should().Be("group:sales-west:topic:orders");
    }

    [Test, Description("A topic name should be different from its group name, so subscribing never joins the whole group")]
    public void Topic_IsDifferentFromTheGroup()
    {
        GroupNames.Topic("g", "t").Should().NotBe(GroupNames.Group("g"));
    }

    [Test, Description("Different groups should never give the same topic name")]
    public void Topic_IsDistinctPerGroup()
    {
        GroupNames.Topic("a", "orders").Should().NotBe(GroupNames.Topic("b", "orders"));
    }

    [Test, Description("The publish policy should be named Publish, because Program and the controller must agree")]
    public void PublishPolicy_IsNamedPublish()
    {
        HubPolicies.PUBLISH.Should().Be("Publish");
    }

    [Test, Description("A notification should hold what it is created with")]
    public void Notification_HoldsItsValues()
    {
        DateTimeOffset at = new(2026, 11, 7, 12, 0, 0, TimeSpan.Zero);

        Notification sut = new("success", "Done", null, at);

        sut.Type.Should().Be("success");
        sut.Title.Should().Be("Done");
        sut.Body.Should().BeNull();
        sut.At.Should().Be(at);
    }
}
