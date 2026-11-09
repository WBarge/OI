using FluentAssertions;
using Microsoft.EntityFrameworkCore;
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

    [TestCase(typeof(RefreshToken), "RefreshTokens")]
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

    // ---- refresh tokens

    [Test, Description("A refresh token should have a generated numeric Id as its primary key")]
    public void RefreshToken_HasIdAsPrimaryKey()
    {
        Entity<RefreshToken>().FindPrimaryKey()!.Properties.Select(p => p.Name).Should().Equal("Id");
    }

    [TestCase("UserId", 450, true)]
    [TestCase("TokenHash", 64, true)]
    [TestCase("ReplacedByHash", 64, false)]
    [Description("Each refresh token text column should have its expected size and requiredness")]
    public void RefreshToken_TextColumnHasExpectedSizeAndRequiredness(string propertyName, int maxLength, bool required)
    {
        IProperty property = Entity<RefreshToken>().FindProperty(propertyName)!;

        property.GetMaxLength().Should().Be(maxLength);
        property.IsNullable.Should().Be(!required);
    }

    [Test, Description("A refresh token's revoked time should be optional, since a live token has none")]
    public void RefreshToken_RevokedAtIsOptional()
    {
        Entity<RefreshToken>().FindProperty("RevokedAt")!.IsNullable.Should().BeTrue();
    }

    [Test, Description("The token hash should be unique, so one hash can never match two sessions")]
    public void RefreshToken_TokenHashIsUnique()
    {
        IIndex index = Entity<RefreshToken>().GetIndexes().Single(i => i.Properties.Select(p => p.Name).SequenceEqual(new[] { "TokenHash" }));

        index.IsUnique.Should().BeTrue();
    }

    [Test, Description("Refresh tokens should be indexed by user, so revoking a user's sessions does not scan the table")]
    public void RefreshToken_UserIdIsIndexed()
    {
        IIndex index = Entity<RefreshToken>().GetIndexes().Single(i => i.Properties.Select(p => p.Name).SequenceEqual(new[] { "UserId" }));

        index.IsUnique.Should().BeFalse("one user can have several sessions");
    }

    [Test, Description("Deleting a user should delete their refresh tokens")]
    public void RefreshToken_IsDeletedWithItsUser()
    {
        IForeignKey foreignKey = Entity<RefreshToken>().GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(ApplicationUser));

        foreignKey.Properties.Select(p => p.Name).Should().Equal("UserId");
        foreignKey.IsRequired.Should().BeTrue();
        foreignKey.DeleteBehavior.Should().Be(DeleteBehavior.Cascade);
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
