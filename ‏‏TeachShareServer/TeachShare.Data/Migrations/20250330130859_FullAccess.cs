using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeachShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class FullAccess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPublic",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "LastUpdateDate",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Collections");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Materials",
                newName: "ModifiedDate");

            migrationBuilder.RenameColumn(
                name: "FileType",
                table: "Materials",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Materials",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Materials",
                newName: "CreatedDate");

            migrationBuilder.AlterColumn<string>(
                name: "S3Key",
                table: "Materials",
                type: "nvarchar(512)",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddColumn<string>(
                name: "AwsUrl",
                table: "Materials",
                type: "nvarchar(512)",
                maxLength: 512,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "Materials",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Collections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "Collections",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Collections",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Collections",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AwsUrl",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Collections");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Materials",
                newName: "FileType");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Materials",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "ModifiedDate",
                table: "Materials",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Materials",
                newName: "CreatedAt");

            migrationBuilder.AlterColumn<string>(
                name: "S3Key",
                table: "Materials",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(512)",
                oldMaxLength: 512);

            migrationBuilder.AddColumn<bool>(
                name: "isPublic",
                table: "Materials",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Collections",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Collections",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Collections",
                type: "bit",
                maxLength: 50,
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateDate",
                table: "Collections",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Collections",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
