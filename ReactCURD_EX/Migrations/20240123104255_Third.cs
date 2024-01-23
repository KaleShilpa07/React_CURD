using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactCURD_EX.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Class",
                table: "StudTBL",
                newName: "Standard");

            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "StudTBL",
                newName: "MobileNo");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "StudTBL",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DOB",
                table: "StudTBL",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailId",
                table: "StudTBL",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "StudTBL",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "StudTBL");

            migrationBuilder.DropColumn(
                name: "DOB",
                table: "StudTBL");

            migrationBuilder.DropColumn(
                name: "EmailId",
                table: "StudTBL");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "StudTBL");

            migrationBuilder.RenameColumn(
                name: "Standard",
                table: "StudTBL",
                newName: "Class");

            migrationBuilder.RenameColumn(
                name: "MobileNo",
                table: "StudTBL",
                newName: "Adress");
        }
    }
}
