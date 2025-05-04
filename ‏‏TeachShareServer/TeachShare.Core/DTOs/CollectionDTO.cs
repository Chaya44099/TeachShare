using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.DTOs
{
    public class CollectionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int IconType { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public int? ParentCollectionId { get; set; }
        public ICollection<CollectionDTO> SubCollections { get; set; }
    }
        //    public int UserId { get; set; } // מזהה המשתמש
        //public int? ParentCollectionId { get; set; }
        //public string Name { get; set; } // שם התיקיה
        //public string Description { get; set; } // תיאור התיקיה
        //public bool IsPublic { get; set; } // האם התיקיה גלוי לכולם
                                           //public class Collection
                                           //{
                                           //    [Key]
                                           //    public int CollectionId { get; set; } // מזהה ייחודי של האוסף (מפתח ראשי)

        //    [ForeignKey("User")]
        //    public int UserId { get; set; } // מזהה המשתמש שהקים את האוסף

        //    public User User { get; set; } // אובייקט המשתמש

        //    [Required]
        //    public string Name { get; set; } // שם האוסף

        //    public string Description { get; set; } // תיאור האוסף

        //    public bool IsPublic { get; set; } // האם האוסף ציבורי

        //    public DateTime CreatedAt { get; set; } // תאריך יצירת הרשומה

        //    public DateTime UpdatedAt { get; set; } // תאריך עדכון הרשומה
        //}


    }
