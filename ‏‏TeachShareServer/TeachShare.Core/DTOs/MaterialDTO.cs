using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;

namespace TeachShare.Core.DTOs
{
    public class MaterialDTO
    {
        public int Id { get; set; } // מספר מזהה ייחודי
        public int UserId { get; set; } // מזהה המשתמש שהעלה את החומר
        public string Title { get; set; } // כותרת החומר
        public string Description { get; set; } // תיאור החומר
        public string FilePath { get; set; } // נתיב לקובץ
        public int FileSize { get; set; } // גודל הקובץ
        public string FileType { get; set; } // סוג הקובץ
        public DateTime UploadDate { get; set; } // תאריך העלאה
        public bool IsPublic { get; set; } // האם החומר גלוי לכולם
        public float AverageRating { get; set; } // דירוג ממוצע


        //public class Material
        //{
        //    [Key]
        //    public int MaterialId { get; set; } // מזהה ייחודי של חומר הלימוד (מפתח ראשי)

        //    [ForeignKey("User")]
        //    public int UserId { get; set; } // מזהה המשתמש שהעלה את חומר הלימוד

        public virtual User User { get; set; } // אובייקט המשתמש שהעלה את חומר הלימוד

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


    }
}
