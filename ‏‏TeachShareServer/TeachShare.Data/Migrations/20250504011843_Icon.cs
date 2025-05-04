using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeachShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class Icon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "iconType",
                table: "Collections",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "iconType",
                table: "Collections");
        }
    }
}
