using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OI.Data.Contexts;
using OI.Data.Model.Jobs;
using OI.Data.Model.Orders;

namespace OI.Data.Tests.ConfigurationTests;

/// <summary>
/// Tests for the reporting entity configurations. These pin the table names, column sizes and relationships that the
/// reporting migrations are generated from, and that the reporting context does not reach into the other contexts.
/// </summary>
[TestFixture, Description("Tests for the reporting entity configurations")]
public class ReportingEntityConfigurationTests
{
    private IModel _model = null!;
    private OiReportingDbContext _context = null!;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _context = new IsolatedReportingDatabase().CreateContext();
        _model = _context.Model;
    }

    [OneTimeTearDown]
    public void OneTimeTearDown() => _context.Dispose();

    [TestCase(typeof(ConfiguredCompany), "CompanyConfiguration")]
    [TestCase(typeof(JobResult), "JobResults")]
    [TestCase(typeof(StoredFile), "Files")]
    [Description("Each reporting entity should map to its expected table")]
    public void Entity_MapsToExpectedTable(Type entityType, string tableName)
    {
        _model.FindEntityType(entityType)!.GetTableName().Should().Be(tableName);
    }

    [TestCase(typeof(ConfiguredCompany))]
    [TestCase(typeof(JobResult))]
    [TestCase(typeof(StoredFile))]
    [Description("Each reporting entity should have Id as its primary key")]
    public void Entity_HasIdAsPrimaryKey(Type entityType)
    {
        IKey? key = _model.FindEntityType(entityType)!.FindPrimaryKey();

        key.Should().NotBeNull();
        key!.Properties.Select(p => p.Name).Should().Equal("Id");
    }

    [Test, Description("The reporting context should hold the reporting entities and nothing else")]
    public void Context_HoldsOnlyTheReportingEntities()
    {
        _model.GetEntityTypes().Select(t => t.ClrType)
            .Should().BeEquivalentTo(new[] { typeof(ConfiguredCompany), typeof(JobResult), typeof(StoredFile) },
                "crossing a context boundary breaks the system on start-up");
    }

    [Test, Description("The reporting context should not contain any order entity")]
    public void Context_DoesNotContainOrderEntities()
    {
        _model.FindEntityType(typeof(Order)).Should().BeNull();
        _model.FindEntityType(typeof(Customer)).Should().BeNull();
        _model.FindEntityType(typeof(State)).Should().BeNull();
    }

    [TestCase(typeof(ConfiguredCompany), "CompanyName", 120)]
    [TestCase(typeof(ConfiguredCompany), "CompanyAddress", 300)]
    [TestCase(typeof(ConfiguredCompany), "CompanyCity", 120)]
    [TestCase(typeof(ConfiguredCompany), "CompanyState", 20)]
    [TestCase(typeof(ConfiguredCompany), "CompanyZip", 11)]
    [TestCase(typeof(ConfiguredCompany), "CompanyEmail", 256)]
    [TestCase(typeof(ConfiguredCompany), "CompanyPhone", 20)]
    [TestCase(typeof(JobResult), "Name", 300)]
    [TestCase(typeof(StoredFile), "FileName", 260)]
    [Description("Each text column should have its expected maximum length")]
    public void TextColumn_HasExpectedSize(Type entityType, string propertyName, int maxLength)
    {
        _model.FindEntityType(entityType)!.FindProperty(propertyName)!.GetMaxLength().Should().Be(maxLength);
    }

    [TestCase(typeof(ConfiguredCompany), "CompanyName")]
    [TestCase(typeof(ConfiguredCompany), "CompanyAddress")]
    [TestCase(typeof(ConfiguredCompany), "CompanyCity")]
    [TestCase(typeof(ConfiguredCompany), "CompanyState")]
    [TestCase(typeof(ConfiguredCompany), "CompanyZip")]
    [TestCase(typeof(ConfiguredCompany), "CompanyEmail")]
    [TestCase(typeof(ConfiguredCompany), "CompanyPhone")]
    [TestCase(typeof(ConfiguredCompany), "ResultId")]
    [TestCase(typeof(JobResult), "ResultId")]
    [Description("A company may be saved with any of its text fields, or its logo, left out")]
    public void Column_IsOptional(Type entityType, string propertyName)
    {
        _model.FindEntityType(entityType)!.FindProperty(propertyName)!.IsNullable.Should().BeTrue();
    }

    [TestCase(typeof(JobResult), "Name")]
    [TestCase(typeof(JobResult), "Created")]
    [TestCase(typeof(JobResult), "CreatedBy")]
    [TestCase(typeof(StoredFile), "FileName")]
    [TestCase(typeof(StoredFile), "FileContents")]
    [Description("Each of these columns should be required")]
    public void Column_IsRequired(Type entityType, string propertyName)
    {
        _model.FindEntityType(entityType)!.FindProperty(propertyName)!.IsNullable.Should().BeFalse();
    }

    [Test, Description("A job result's created time should be filled in by the database when it is not given")]
    public void JobResult_CreatedHasADatabaseDefault()
    {
        IProperty created = _model.FindEntityType(typeof(JobResult))!.FindProperty("Created")!;

        created.ValueGenerated.Should().Be(ValueGenerated.OnAdd);
        created.GetDefaultValueSql().Should().Be("GETUTCDATE()");
    }

    [Test, Description("Deleting a company's logo file should leave the company in place with no logo")]
    public void ConfiguredCompany_LogoIsOptionalAndClearedWhenTheFileIsDeleted()
    {
        IForeignKey foreignKey = _model.FindEntityType(typeof(ConfiguredCompany))!.GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(StoredFile));

        foreignKey.Properties.Select(p => p.Name).Should().Equal("ResultId");
        foreignKey.IsRequired.Should().BeFalse();
        foreignKey.IsUnique.Should().BeTrue("one logo file belongs to one company");
        foreignKey.DeleteBehavior.Should().Be(DeleteBehavior.SetNull);
    }

    [Test, Description("Deleting a stored file should delete the job result that points at it")]
    public void JobResult_IsDeletedWithItsFile()
    {
        IForeignKey foreignKey = _model.FindEntityType(typeof(JobResult))!.GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(StoredFile));

        foreignKey.Properties.Select(p => p.Name).Should().Equal("ResultId");
        foreignKey.IsUnique.Should().BeTrue();
        foreignKey.DeleteBehavior.Should().Be(DeleteBehavior.Cascade);
    }
}
