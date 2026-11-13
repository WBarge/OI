using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OI.Data.Migrations.Orders;

/// <inheritdoc />
public partial class _20261113020053_AddEstimate_Order_InvoiceTracking : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<Guid>(
            name: "EstimateId",
            table: "Orders",
            type: "uniqueidentifier",
            nullable: true);

        migrationBuilder.AddColumn<Guid>(
            name: "InvoiceId",
            table: "Orders",
            type: "uniqueidentifier",
            nullable: true);

        migrationBuilder.AddColumn<Guid>(
            name: "OrderId",
            table: "Orders",
            type: "uniqueidentifier",
            nullable: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "EstimateId",
            table: "Orders");

        migrationBuilder.DropColumn(
            name: "InvoiceId",
            table: "Orders");

        migrationBuilder.DropColumn(
            name: "OrderId",
            table: "Orders");
    }
}
