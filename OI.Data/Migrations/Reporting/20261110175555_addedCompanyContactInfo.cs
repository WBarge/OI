using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OI.Data.Migrations.Reporting
{
    /// <inheritdoc />
    public partial class addedCompanyContactInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CompanyPhone",
                table: "CompanyConfiguration",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyContactEmail",
                table: "CompanyConfiguration",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CompanyContactName",
                table: "CompanyConfiguration",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CompanyContactPhone",
                table: "CompanyConfiguration",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyContactEmail",
                table: "CompanyConfiguration");

            migrationBuilder.DropColumn(
                name: "CompanyContactName",
                table: "CompanyConfiguration");

            migrationBuilder.DropColumn(
                name: "CompanyContactPhone",
                table: "CompanyConfiguration");

            migrationBuilder.AlterColumn<string>(
                name: "CompanyPhone",
                table: "CompanyConfiguration",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);
        }
    }
}
