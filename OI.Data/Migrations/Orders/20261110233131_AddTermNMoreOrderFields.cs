using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OI.Data.Migrations.Orders
{
    /// <inheritdoc />
    public partial class AddTermNMoreOrderFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PoNumber",
                table: "Orders",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Terms",
                table: "Orders",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Via",
                table: "Orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PoNumber",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Terms",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Via",
                table: "Orders");
        }
    }
}
