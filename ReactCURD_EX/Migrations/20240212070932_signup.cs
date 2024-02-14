using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactCURD_EX.Migrations
{
    public partial class signup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RegistrationTBL");

            migrationBuilder.DropTable(
                name: "SkillTBL");

            migrationBuilder.CreateTable(
                name: "LoginFormModelTBL",
                columns: table => new
                {
                    LoginId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginFormModelTBL", x => x.LoginId);
                });

            migrationBuilder.CreateTable(
                name: "SignUpFormModelTBL",
                columns: table => new
                {
                    SignUpId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SignUpFormModelTBL", x => x.SignUpId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoginFormModelTBL");

            migrationBuilder.DropTable(
                name: "SignUpFormModelTBL");

            migrationBuilder.CreateTable(
                name: "RegistrationTBL",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Adress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationTBL", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SkillTBL",
                columns: table => new
                {
                    SkillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillTBL", x => x.SkillId);
                });
        }
    }
}
