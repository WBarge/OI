using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OI.Data.Migrations.Reporting
{
    /// <inheritdoc />
    public partial class AddedCompanySyncStorage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompanyConfiguration",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    CompanyAddress = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    CompanyCity = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    CompanyState = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CompanyZip = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    CompanyEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CompanyPhone = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    ResultId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyConfiguration", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyConfiguration_Files_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyConfiguration_ResultId",
                table: "CompanyConfiguration",
                column: "ResultId",
                unique: true,
                filter: "[ResultId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyConfiguration");
        }
    }
}
