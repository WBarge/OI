using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OI.Data.Migrations.Orders;

/// <inheritdoc />
public partial class _20261114234747_AddCanceledFields : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "CanceledBy",
            table: "Orders",
            type: "nvarchar(150)",
            maxLength: 150,
            nullable: true);

        migrationBuilder.AddColumn<DateTime>(
            name: "CanceledDate",
            table: "Orders",
            type: "datetime2",
            nullable: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "CanceledBy",
            table: "Orders");

        migrationBuilder.DropColumn(
            name: "CanceledDate",
            table: "Orders");
    }
}
