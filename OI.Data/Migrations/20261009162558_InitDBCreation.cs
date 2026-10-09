using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OI.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitDBCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DefaultBillingAddress1 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DefaultBillingAddress2 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DefaultBillingCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DefaultBillingStateCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    DefaultBillingZipCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    DefaultShippingAddress1 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DefaultShippingAddress2 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DefaultShippingCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DefaultShippingStateCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    DefaultShippingZipCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompletedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BillingAddress1 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    BillingAddress2 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    BillingCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BillingStateCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    BillingZipCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    ShippingAddress1 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ShippingAddress2 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ShippingCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ShippingStateCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    ShippingZipCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    SubTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Shipping = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Tax = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Sku = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "States",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567801"), "AL", "Alabama" },
                    { new Guid("a1b2c3d4-e5f6-bcde-abcd-901234567e85"), "NM", "New Mexico" },
                    { new Guid("a3b4c5d6-e7f8-789a-abcd-1234404a8181"), "TX", "Texas" },
                    { new Guid("a3b4c5d6-e7f8-9abc-abcd-123456789d02"), "IL", "Illinois" },
                    { new Guid("a5b6c7d8-e9f0-5678-abcd-3456789e012f"), "MO", "Missouri" },
                    { new Guid("a7b8c9d0-e1f2-1234-abcd-56789e4e422b"), "OR", "Oregon" },
                    { new Guid("a7b8c9d0-e1f2-3456-abcd-567890123407"), "CT", "Connecticut" },
                    { new Guid("a9b0c1d2-e3f4-def0-abcd-7890a6e7e7e7"), "WI", "Wisconsin" },
                    { new Guid("a9b0c1d2-e3f4-f012-abcd-789012334568"), "ME", "Maine" },
                    { new Guid("b0c1d2e3-f4a5-0123-bcde-890123445679"), "MD", "Maryland" },
                    { new Guid("b0c1d2e3-f4a5-ef01-bcde-8901b7f8f8f8"), "WY", "Wyoming" },
                    { new Guid("b2c3d4e5-f6a7-8901-bcde-f12345678902"), "AK", "Alaska" },
                    { new Guid("b2c3d4e5-f6a7-cdef-bcde-012345678f96"), "NY", "New York" },
                    { new Guid("b4c5d6e7-f8a9-89ab-bcde-2345515b9292"), "UT", "Utah" },
                    { new Guid("b4c5d6e7-f8a9-abcd-bcde-23456789e013"), "IN", "Indiana" },
                    { new Guid("b6c7d8e9-f0a1-6789-bcde-456789f01230"), "MT", "Montana" },
                    { new Guid("b8c9d0e1-f2a3-2345-bcde-6789f5f5533c"), "PA", "Pennsylvania" },
                    { new Guid("b8c9d0e1-f2a3-4567-bcde-678901234508"), "DE", "Delaware" },
                    { new Guid("c1d2e3f4-a5b6-1234-cdef-90123455678a"), "MA", "Massachusetts" },
                    { new Guid("c3d4e5f6-a7b8-9012-cdef-123456789003"), "AZ", "Arizona" },
                    { new Guid("c3d4e5f6-a7b8-def0-cdef-1234567890a7"), "NC", "North Carolina" },
                    { new Guid("c5d6e7f8-a9b0-9abc-cdef-3456626ca3a3"), "VT", "Vermont" },
                    { new Guid("c5d6e7f8-a9b0-bcde-cdef-3456789f0124"), "IA", "Iowa" },
                    { new Guid("c7d8e9f0-a1b2-789a-cdef-5678900123a1"), "NE", "Nebraska" },
                    { new Guid("c9d0e1f2-a3b4-3456-cdef-789006064d4d"), "RI", "Rhode Island" },
                    { new Guid("c9d0e1f2-a3b4-5678-cdef-789012345609"), "FL", "Florida" },
                    { new Guid("d0e1f2a3-b4c5-4567-defa-890117175e5e"), "SC", "South Carolina" },
                    { new Guid("d0e1f2a3-b4c5-6789-defa-89012345670a"), "GA", "Georgia" },
                    { new Guid("d2e3f4a5-b6c7-2345-defa-0123456678b9"), "MI", "Michigan" },
                    { new Guid("d4e5f6a7-b8c9-0123-defa-234567890104"), "AR", "Arkansas" },
                    { new Guid("d4e5f6a7-b8c9-ef01-defa-23456789b1b8"), "ND", "North Dakota" },
                    { new Guid("d6e7f8a9-b0c1-abcd-defa-456773b4b4b4"), "VA", "Virginia" },
                    { new Guid("d6e7f8a9-b0c1-cdef-defa-456789001235"), "KS", "Kansas" },
                    { new Guid("d8e9f0a1-b2c3-89ab-defa-678901234b52"), "NV", "Nevada" },
                    { new Guid("e1f2a3b4-c5d6-5678-efab-901228286f6f"), "SD", "South Dakota" },
                    { new Guid("e1f2a3b4-c5d6-789a-efab-9012345678b0"), "HI", "Hawaii" },
                    { new Guid("e3f4a5b6-c7d8-3456-efab-123456789c0d"), "MN", "Minnesota" },
                    { new Guid("e5f6a7b8-c9d0-1234-efab-345678901205"), "CA", "California" },
                    { new Guid("e5f6a7b8-c9d0-f012-efab-3456789c2c09"), "OH", "Ohio" },
                    { new Guid("e7f8a9b0-c1d2-bcde-efab-5678840c5c5c"), "WA", "Washington" },
                    { new Guid("e7f8a9b0-c1d2-def0-efab-567890112346"), "KY", "Kentucky" },
                    { new Guid("e9f0a1b2-c3d4-9abc-efab-789012345c63"), "NH", "New Hampshire" },
                    { new Guid("f0a1b2c3-d4e5-abcd-fabc-890123456d74"), "NJ", "New Jersey" },
                    { new Guid("f2a3b4c5-d6e7-6789-fabc-012339397070"), "TN", "Tennessee" },
                    { new Guid("f2a3b4c5-d6e7-89ab-fabc-0123456789c1"), "ID", "Idaho" },
                    { new Guid("f4a5b6c7-d8e9-4567-fabc-23456789d01e"), "MS", "Mississippi" },
                    { new Guid("f6a7b8c9-d0e1-0123-fabc-456789d3d11a"), "OK", "Oklahoma" },
                    { new Guid("f6a7b8c9-d0e1-2345-fabc-456789012306"), "CO", "Colorado" },
                    { new Guid("f8a9b0c1-d2e3-cdef-fabc-678995d6d6d6"), "WV", "West Virginia" },
                    { new Guid("f8a9b0c1-d2e3-ef01-fabc-678901223457"), "LA", "Louisiana" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
