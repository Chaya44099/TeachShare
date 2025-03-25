﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.Entities
{
    //public class Material
    //{
    //    [Key]
    //    public int MaterialId { get; set; } // מזהה ייחודי של חומר הלימוד (מפתח ראשי)

    //    [ForeignKey("User")]
    //    public int UserId { get; set; } // מזהה המשתמש שהעלה את חומר הלימוד

    //    public User User { get; set; } // אובייקט המשתמש שהעלה את חומר הלימוד

    //    [Required]
    //    public string Title { get; set; } // כותרת חומר הלימוד

    //    public string Description { get; set; } // תיאור חומר הלימוד

    //    public string FilePath { get; set; } // נתיב הקובץ של חומר הלימוד

    //    public int FileSize { get; set; } // גודל הקובץ של חומר הלימוד

    //    public string FileType { get; set; } // סוג הקובץ של חומר הלימוד

    //    public DateTime UploadDate { get; set; } // תאריך העלאת חומר הלימוד

    //    public bool IsPublic { get; set; } // האם חומר הלימוד ציבורי

    //    public int DownloadCount { get; set; } // מספר ההורדות של חומר הלימוד

    //    public int ViewCount { get; set; } // מספר הצפיות בחומר הלימוד

    //    public float AverageRating { get; set; } // דירוג ממוצע של חומר הלימוד

    //    public DateTime CreatedAt { get; set; } // תאריך יצירת הרשומה

    //    public DateTime UpdatedAt { get; set; } // תאריך עדכון הרשומה
    //}

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Material
    {
        [Key]
        public int Id { get; set; }


        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        [StringLength(255)]
        public string FilePath { get; set; }

        public int FileSize { get; set; }

        [StringLength(50)]
        public string FileType { get; set; }

        [StringLength(255)]
        public string ThumbnailPath { get; set; } // הוספת שדה לתמונה ממוזערת

        [StringLength(20)]
        public string Language { get; set; } // הוספת שדה שפה

        [StringLength(50)]
        public string GradeLevel { get; set; } // הוספת שדה שכבת גיל ספציפית

        public int? Duration { get; set; } // משך זמן משוער בדקות (למערכי שיעור)

        public DateTime UploadDate { get; set; } = DateTime.UtcNow;

        public DateTime LastUpdateDate { get; set; } = DateTime.UtcNow;

        public bool IsPublic { get; set; } = true; // שינוי ברירת המחדל לציבורי

        public int DownloadCount { get; set; } = 0;

        public int ViewCount { get; set; } = 0;

        public float AverageRating { get; set; } = 0;

        [StringLength(20)]
        public string Status { get; set; } = "active"; // הוספת סטטוס (פעיל/בבדיקה/בארכיון)

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        //[Key]
        //public int MaterialId { get; set; } // מספר מזהה ייחודי

        //[Required]
        //public int UserId { get; set; } // מזהה המשתמש שהעלה את החומר

        //[Required]
        //[StringLength(255)]
        //public string Title { get; set; } // כותרת החומר

        //public string Description { get; set; } // תיאור החומר

        //[StringLength(255)]
        //public string FilePath { get; set; } // נתיב לקובץ

        //public int FileSize { get; set; } // גודל הקובץ

        //[StringLength(50)]
        //public string FileType { get; set; } // סוג הקובץ

        //public DateTime UploadDate { get; set; } = DateTime.UtcNow; // תאריך העלאה

        //public DateTime LastUpdateDate { get; set; } = DateTime.UtcNow; // תאריך עדכון אחרון

        //public bool IsPublic { get; set; } = false; // האם החומר גלוי לכולם

        //public int DownloadCount { get; set; } = 0; // מספר הורדות

        //public int ViewCount { get; set; } = 0; // מספר צפיות

        //public float AverageRating { get; set; } = 0; // דירוג ממוצע

        //public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון

        //// קשרים
        public int UserId { get; set; }
        public virtual User User { get; set; } // המשתמש שהעלה את החומר
        public virtual ICollection<Rating> Ratings { get; set; } // דירוגים לחומר
        public virtual ICollection<Tag> Tags { get; set; } // תגיות שקשורות לחומר
        public virtual ICollection<Category> Categories { get; set; } // קטגוריות שקשורות לחומר

        public virtual ICollection<Collection> Collections { get; set; } = new List<Collection>();
    }

}
