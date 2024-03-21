using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactCURD_EX.Migrations
{
    public partial class CalenderEventinit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_events",
                table: "events");

            migrationBuilder.RenameTable(
                name: "events",
                newName: "EventTBL");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventTBL",
                table: "EventTBL",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EventTBL",
                table: "EventTBL");

            migrationBuilder.RenameTable(
                name: "EventTBL",
                newName: "events");

            migrationBuilder.AddPrimaryKey(
                name: "PK_events",
                table: "events",
                column: "Id");
        }
    }
}
