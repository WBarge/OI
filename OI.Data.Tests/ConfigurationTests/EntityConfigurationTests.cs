using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OI.Data.Contexts;
using OI.Data.Model.Orders;

namespace OI.Data.Tests.ConfigurationTests;

/// <summary>
/// Tests for the entity configurations. These pin the table names, column sizes, required columns and relationships
/// that the database schema (and the migrations) are generated from, so an accidental change to a configuration fails here
/// rather than quietly producing a migration that truncates or rejects data.
/// The Business layer repeats some of these sizes as its own validation limits (see CustomerManager), so they must agree.
/// </summary>
[TestFixture, Description("Tests for the entity configurations")]
public class EntityConfigurationTests
{
    private IModel _model = null!;
    private OiServiceDbContext _context = null!;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _context = new IsolatedDatabase().CreateContext();
        _model = _context.Model;
    }

    [OneTimeTearDown]
    public void OneTimeTearDown() => _context.Dispose();

    [TestCase(typeof(Customer), "Customers")]
    [TestCase(typeof(Order), "Orders")]
    [TestCase(typeof(OrderItem), "OrderItems")]
    [TestCase(typeof(State), "States")]
    [TestCase(typeof(OrderCounter), "OrderCounters")]
    [Description("Each entity should map to its expected table")]
    public void Entity_MapsToExpectedTable(Type entityType, string tableName)
    {
        _model.FindEntityType(entityType)!.GetTableName().Should().Be(tableName);
    }

    [TestCase(typeof(Customer))]
    [TestCase(typeof(Order))]
    [TestCase(typeof(OrderItem))]
    [TestCase(typeof(State))]
    [TestCase(typeof(OrderCounter))]
    [Description("Each entity should have Id as its primary key")]
    public void Entity_HasIdAsPrimaryKey(Type entityType)
    {
        IKey? key = _model.FindEntityType(entityType)!.FindPrimaryKey();

        key.Should().NotBeNull();
        key!.Properties.Select(p => p.Name).Should().Equal("Id");
    }

    [TestCase(typeof(Customer), "LastName", 100, true)]
    [TestCase(typeof(Customer), "FirstName", 100, false)]
    [TestCase(typeof(Customer), "PhoneNumber", 20, true)]
    [TestCase(typeof(Customer), "DefaultBillingAddress1", 200, false)]
    [TestCase(typeof(Customer), "DefaultBillingAddress2", 200, false)]
    [TestCase(typeof(Customer), "DefaultBillingCity", 100, false)]
    [TestCase(typeof(Customer), "DefaultBillingStateCode", 2, false)]
    [TestCase(typeof(Customer), "DefaultBillingZipCode", 10, false)]
    [TestCase(typeof(Customer), "DefaultShippingAddress1", 200, false)]
    [TestCase(typeof(Customer), "DefaultShippingAddress2", 200, false)]
    [TestCase(typeof(Customer), "DefaultShippingCity", 100, false)]
    [TestCase(typeof(Customer), "DefaultShippingStateCode", 2, false)]
    [TestCase(typeof(Customer), "DefaultShippingZipCode", 10, false)]
    [TestCase(typeof(Order), "BillingAddress1", 200, false)]
    [TestCase(typeof(Order), "BillingAddress2", 200, false)]
    [TestCase(typeof(Order), "BillingCity", 100, false)]
    [TestCase(typeof(Order), "BillingStateCode", 2, false)]
    [TestCase(typeof(Order), "BillingZipCode", 10, false)]
    [TestCase(typeof(Order), "ShippingAddress1", 200, false)]
    [TestCase(typeof(Order), "ShippingAddress2", 200, false)]
    [TestCase(typeof(Order), "ShippingCity", 100, false)]
    [TestCase(typeof(Order), "ShippingStateCode", 2, false)]
    [TestCase(typeof(Order), "ShippingZipCode", 10, false)]
    [TestCase(typeof(OrderItem), "Name", 128, true)]
    [TestCase(typeof(OrderItem), "Description", 256, true)]
    [TestCase(typeof(OrderItem), "Sku", 12, true)]
    [TestCase(typeof(State), "Name", 100, true)]
    [TestCase(typeof(State), "Code", 2, true)]
    [Description("Each text column should have its expected maximum length and be required or optional as expected")]
    public void TextColumn_HasExpectedSizeAndRequiredness(Type entityType, string propertyName, int maxLength, bool required)
    {
        IProperty property = _model.FindEntityType(entityType)!.FindProperty(propertyName)!;

        property.GetMaxLength().Should().Be(maxLength);
        property.IsNullable.Should().Be(!required);
    }

    [TestCase(typeof(Customer), "Created")]
    [TestCase(typeof(Order), "OrderNumber")]
    [TestCase(typeof(Order), "OrderDate")]
    [TestCase(typeof(OrderItem), "Price")]
    [TestCase(typeof(OrderItem), "Quantity")]
    [TestCase(typeof(OrderItem), "Total")]
    [TestCase(typeof(OrderItem), "Created")]
    [TestCase(typeof(OrderCounter), "NextOrderNumber")]
    [Description("Columns the system always fills in should be required")]
    public void Column_IsRequired(Type entityType, string propertyName)
    {
        _model.FindEntityType(entityType)!.FindProperty(propertyName)!.IsNullable.Should().BeFalse();
    }

    [TestCase(typeof(Customer), "Modified")]
    [TestCase(typeof(Order), "CompletedDate")]
    [TestCase(typeof(Order), "CustomerId")]
    [TestCase(typeof(OrderItem), "Modified")]
    [Description("Columns that are not always known should be optional")]
    public void Column_IsOptional(Type entityType, string propertyName)
    {
        _model.FindEntityType(entityType)!.FindProperty(propertyName)!.IsNullable.Should().BeTrue();
    }

    [Test, Description("An order's customer should be optional, so an order can exist without one")]
    public void Order_HasOptionalCustomerRelationship()
    {
        IForeignKey foreignKey = _model.FindEntityType(typeof(Order))!.GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(Customer));

        foreignKey.Properties.Select(p => p.Name).Should().Equal("CustomerId");
        foreignKey.IsRequired.Should().BeFalse();
    }

    [Test, Description("An order item should belong to exactly one order")]
    public void OrderItem_HasRequiredOrderRelationship()
    {
        IForeignKey foreignKey = _model.FindEntityType(typeof(OrderItem))!.GetForeignKeys()
            .Single(fk => fk.PrincipalEntityType.ClrType == typeof(Order));

        foreignKey.Properties.Select(p => p.Name).Should().Equal("OrderId");
        foreignKey.IsRequired.Should().BeTrue();
    }

    [Test, Description("The database should be created with all fifty states")]
    public async Task Seed_ContainsFiftyStates()
    {
        (await _context.States.CountAsync()).Should().Be(50);
    }

    [Test, Description("Every seeded state should have a two letter code and a name, with no duplicates")]
    public async Task Seed_StatesAreWellFormedAndUnique()
    {
        List<State> states = await _context.States.ToListAsync();

        states.Should().OnlyContain(s => s.Code.Length == 2 && s.Name.Length > 0);
        states.Select(s => s.Code).Should().OnlyHaveUniqueItems();
        states.Select(s => s.Name).Should().OnlyHaveUniqueItems();
    }

    [Test, Description("The database should be created with one order counter that starts at 1000")]
    public async Task Seed_OrderCounterStartsAt1000()
    {
        List<OrderCounter> counters = await _context.OrderCounters.ToListAsync();

        counters.Should().ContainSingle().Which.NextOrderNumber.Should().Be(1000);
    }
}
