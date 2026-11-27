using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductManager.Data.EF.Migrations
{
    /// <inheritdoc />
    public partial class CostAndRetailEstimateAdditions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "ProductOption",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Estimated",
                table: "ProductOption",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Product",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Estimated",
                table: "Product",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Option",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Estimated",
                table: "Option",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "ProductOption");

            migrationBuilder.DropColumn(
                name: "Estimated",
                table: "ProductOption");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Estimated",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Option");

            migrationBuilder.DropColumn(
                name: "Estimated",
                table: "Option");
        }
    }
}
