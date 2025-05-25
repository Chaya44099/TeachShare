using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeachShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class nn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AwsUrl",
                table: "Materials");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AwsUrl",
                table: "Materials",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
