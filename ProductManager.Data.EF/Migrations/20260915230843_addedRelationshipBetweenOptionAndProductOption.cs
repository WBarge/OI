using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductManager.Data.EF.Migrations
{
    /// <inheritdoc />
    public partial class addedRelationshipBetweenOptionAndProductOption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ProductOption_OptionId",
                table: "ProductOption",
                column: "OptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOption_Option_OptionId",
                table: "ProductOption",
                column: "OptionId",
                principalTable: "Option",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductOption_Option_OptionId",
                table: "ProductOption");

            migrationBuilder.DropIndex(
                name: "IX_ProductOption_OptionId",
                table: "ProductOption");
        }
    }
}
