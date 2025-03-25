using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using TeachShare.Core.Entities;

namespace TeachShare.Data
{


    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; } // טבלת משתמשים
        public DbSet<Material> Materials { get; set; } // טבלת חומרים
        public DbSet<Category> Categories { get; set; } // טבלת קטגוריות
        public DbSet<Tag> Tags { get; set; } // טבלת תגיות
        public DbSet<Rating> Ratings { get; set; } // טבלת דירוגים
        public DbSet<Collection> Collections { get; set; } // טבלת אוספים


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Material>()
                .HasOne(m => m.User)
                .WithMany(u => u.Materials)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.NoAction); // מונע מחיקת חומרים אם משתמש נמחק

            modelBuilder.Entity<Collection>()
                .HasOne(c => c.User)
                .WithMany(u => u.Collections)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction); // מונע מחיקת אוספים אם משתמש נמחק

            modelBuilder.Entity<Collection>()
                .HasOne(c => c.ParentCollection)
                .WithMany(c => c.SubCollections)
                .HasForeignKey(c => c.ParentCollectionId)
                .OnDelete(DeleteBehavior.NoAction); // מונע מחיקת אוסף הורה ומחיקת כל התת-אוספים

            // הגדרת הקשרים בין הטבלאות
            //modelBuilder.Entity<UserDTO>()
            //    .HasMany(u => u.Materials)
            //    .WithOne(m => m.User)
            //    .HasForeignKey(m => m.UserId);

            //modelBuilder.Entity<UserDTO>()
            //    .HasMany(u => u.Ratings)
            //    .WithOne(r => r.User)
            //    .HasForeignKey(r => r.UserId);

            //modelBuilder.Entity<UserDTO>()
            //    .HasMany(u => u.Collections)
            //    .WithOne(c => c.User)
            //    .HasForeignKey(c => c.UserId);

            //modelBuilder.Entity<MaterialDTO>()
            //    .HasMany(m => m.Categories)
            //    .WithOne(c => c.Material)
            //    .HasForeignKey(c => c.MaterialId);

            //modelBuilder.Entity<CollectionDTO>()
            //    .HasMany(c => c.CollectionItems)
            //    .WithOne(ci => ci.Collection)
            //    .HasForeignKey(ci => ci.CollectionId);
        }
    }

}
