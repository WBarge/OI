using FluentAssertions;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OpenIddict.EntityFrameworkCore.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using OI.Data.Contexts;
using OI.Data.Model.Auth;
using OI.Data.Model.Jobs;
using OI.Data.Model.Orders;

namespace OI.Data.Tests.ConfigurationTests;

/// <summary>
/// Tests for the auth entity configurations (refresh tokens and groups). These pin the table names, column sizes,
/// indexes and relationships the auth migrations are generated from, and that the auth context stays separate
/// from the order and reporting contexts.
/// </summary>
[TestFixture, Description("Tests for the auth entity configurations")]
public class AuthEntityConfigurationTests
{
    private IModel _model = null!;
    private OiAuthDbContext _context = null!;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _context = new IsolatedAuthDatabase().CreateContext();
        _model = _context.Model;
    }

    [OneTimeTearDown]
    public void OneTimeTearDown() => _context.Dispose();

    private IEntityType Entity<T>() => _model.FindEntityType(typeof(T))!;

    [TestCase(typeof(OpenIddictEntityFrameworkCoreApplication), "OpenIddictApplications")]
    [TestCase(typeof(OpenIddictEntityFrameworkCoreAuthorization), "OpenIddictAuthorizations")]
    [TestCase(typeof(OpenIddictEntityFrameworkCoreScope), "OpenIddictScopes")]
    [TestCase(typeof(OpenIddictEntityFrameworkCoreToken), "OpenIddictTokens")]
    [TestCase(typeof(DataProtectionKey), "DataProtectionKey")]
    [TestCase(typeof(AuthGroup), "AuthGroups")]
    [TestCase(typeof(AuthGroupMember), "AuthUserGroups")]
    [Description("Each auth entity should map to its expected table")]
    public void Entity_MapsToExpectedTable(Type entityType, string tableName)
    {
        _model.FindEntityType(entityType)!.GetTableName().Should().Be(tableName);
    }

    [Test, Description("The auth context should not contain any order or reporting entity")]
    public void Context_DoesNotCrossIntoTheOtherContexts()
    {
        _model.FindEntityType(typeof(Order)).Should().BeNull();
        _model.FindEntityType(typeof(Customer)).Should().BeNull();
        _model.FindEntityType(typeof(ConfiguredCompany)).Should().BeNull();
        _model.FindEntityType(typeof(StoredFile)).Should().BeNull();
        _model.FindEntityType(typeof(JobResult)).Should().BeNull();
    }

    // ---- tokens now live in OpenIddict's tables

    [Test, Description("The old refresh token table should be gone: OpenIddict stores authorization codes and refresh tokens now")]
    public void RefreshTokens_AreNoLongerATable()
    {
        _model.GetEntityTypes().Select(t => t.GetTableName()).Should().NotContain("RefreshTokens");
    }

    [Test, Description("The OpenIddict token table should be keyed by a string id (the default OpenIddict expects)")]
    public void OpenIddictTokens_AreKeyedByAStringId()
    {
        Entity<OpenIddictEntityFrameworkCoreToken>().FindPrimaryKey()!.Properties.Single().ClrType.Should().Be(typeof(string));
    }

    [Test, Description("The shared Data Protection key ring should be stored in the auth database")]
    public void DataProtectionKeys_AreStoredInTheAuthContext()
    {
        Entity<DataProtectionKey>().FindPrimaryKey()!.Properties.Select(p => p.Name).Should().Equal("Id");
    }

    // ---- groups

    [Test, Description("A group should have Id as its primary key, sized like a GUID string")]
    public void AuthGroup_HasIdAsPrimaryKey()
    {
        Entity<AuthGroup>().FindPrimaryKey()!.Properties.Select(p => p.Name).Should().Equal("Id");
        Entity<AuthGroup>().FindProperty("Id")!.GetMaxLength().Should().Be(36);
    }

    [TestCase("Name", 64, true)]
    [TestCase("Description", 200, false)]
    [Description("Each group text column should have its expected size and requiredness")]
    public void AuthGroup_TextColumnHasExpectedSizeAndRequiredness(string propertyName, int maxLength, bool required)
    {
        IProperty property = Entity<AuthGroup>().FindProperty(propertyName)!;

        property.GetMaxLength().Should().Be(maxLength);
        property.IsNullable.Should().Be(!required);
    }

    [Test, Description("Group names should be unique")]
    public void AuthGroup_NameIsUnique()
    {
        IIndex index = Entity<AuthGroup>().GetIndexes().Single(i => i.Properties.Select(p => p.Name).SequenceEqual(new[] { "Name" }));

        index.IsUnique.Should().BeTrue();
    }

    // ---- group membership

    [Test, Description("A membership should be identified by the user and the group together")]
    public void AuthGroupMember_HasACompositeKey()
    {
        Entity<AuthGroupMember>().FindPrimaryKey()!.Properties.Select(p => p.Name).Should().Equal("UserId", "GroupId");
    }

    [Test, Description("A membership should have a key column size that matches the Identity user key and the group key")]
    public void AuthGroupMember_KeyColumnsMatchTheirParents()
    {
        Entity<AuthGroupMember>().FindProperty("UserId")!.GetMaxLength().Should().Be(450);
        Entity<AuthGroupMember>().FindProperty("GroupId")!.GetMaxLength().Should().Be(36);
    }

    [Test, Description("Memberships should be indexed by group, for listing a group's members")]
    public void AuthGroupMember_GroupIdIsIndexed()
    {
        Entity<AuthGroupMember>().GetIndexes().Should().Contain(i => i.Properties.Select(p => p.Name).SequenceEqual(new[] { "GroupId" }));
    }

    [Test, Description("Deleting a user should delete their memberships")]
    public void AuthGroupMember_IsDeletedWithItsUser()
    {
        IForeignKey foreignKey = Entity<AuthGroupMember>().GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(ApplicationUser));

        foreignKey.DeleteBehavior.Should().Be(DeleteBehavior.Cascade);
        foreignKey.DependentToPrincipal!.Name.Should().Be("User");
        foreignKey.PrincipalToDependent!.Name.Should().Be("GroupMemberships");
    }

    [Test, Description("Deleting a group should delete its memberships")]
    public void AuthGroupMember_IsDeletedWithItsGroup()
    {
        IForeignKey foreignKey = Entity<AuthGroupMember>().GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(AuthGroup));

        foreignKey.DeleteBehavior.Should().Be(DeleteBehavior.Cascade);
        foreignKey.DependentToPrincipal!.Name.Should().Be("Group");
        foreignKey.PrincipalToDependent!.Name.Should().Be("Members");
    }

    [Test, Description("A membership should have exactly two relationships, with no shadow relationship from a navigation left out of the configuration")]
    public void AuthGroupMember_HasNoShadowRelationships()
    {
        Entity<AuthGroupMember>().GetForeignKeys().Should().HaveCount(2);
        Entity<AuthGroupMember>().GetProperties().Select(p => p.Name).Should().BeEquivalentTo("UserId", "GroupId");
    }
}
