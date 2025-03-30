using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeachShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class Aws : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CollectionMaterial");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "DownloadCount",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "GradeLevel",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "LastUpdateDate",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "ThumbnailPath",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "UploadDate",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Materials");

            migrationBuilder.RenameColumn(
                name: "IsPublic",
                table: "Materials",
                newName: "isPublic");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Materials",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Materials",
                newName: "CollectionID");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Materials",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Materials",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "S3Key",
                table: "Materials",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "Size",
                table: "Materials",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Materials_CollectionID",
                table: "Materials",
                column: "CollectionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_Collections_CollectionID",
                table: "Materials",
                column: "CollectionID",
                principalTable: "Collections",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_Collections_CollectionID",
                table: "Materials");

            migrationBuilder.DropIndex(
                name: "IX_Materials_CollectionID",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "S3Key",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Materials");

            migrationBuilder.RenameColumn(
                name: "isPublic",
                table: "Materials",
                newName: "IsPublic");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Materials",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "CollectionID",
                table: "Materials",
                newName: "Duration");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Materials",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "AverageRating",
                table: "Materials",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Materials",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DownloadCount",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Materials",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FileSize",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "GradeLevel",
                table: "Materials",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Materials",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateDate",
                table: "Materials",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Materials",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ThumbnailPath",
                table: "Materials",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadDate",
                table: "Materials",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CollectionMaterial",
                columns: table => new
                {
                    CollectionsId = table.Column<int>(type: "int", nullable: false),
                    MaterialsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionMaterial", x => new { x.CollectionsId, x.MaterialsId });
                    table.ForeignKey(
                        name: "FK_CollectionMaterial_Collections_CollectionsId",
                        column: x => x.CollectionsId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CollectionMaterial_Materials_MaterialsId",
                        column: x => x.MaterialsId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CollectionMaterial_MaterialsId",
                table: "CollectionMaterial",
                column: "MaterialsId");
        }
    }
}
