using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.DTOs
{
    //public class Rating
    //{
    //    [Key]
    //    public int RatingId { get; set; } // מזהה ייחודי של הדירוג (מפתח ראשי)

    //    [ForeignKey("Material")]
    //    public int MaterialId { get; set; } // מזהה חומר הלימוד המדורג

    //    public Material Material { get; set; } // אובייקט חומר הלימוד

    //    [ForeignKey("User")]
    //    public int UserId { get; set; } // מזהה המשתמש שהעניק את הדירוג

    //    public User User { get; set; } // אובייקט המשתמש

    //    public int RatingValue { get; set; } // ערך הדירוג (למשל, 1-5)

    //    public string Comment { get; set; } // תגובה על הדירוג

    //    public DateTime RatingDate { get; set; } // תאריך הדירוג

    //    public DateTime CreatedAt { get; set; } // תאריך יצירת הרשומה

    //    public DateTime UpdatedAt { get; set; } // תאריך עדכון הרשומה
    //}
    public class RatingDTO
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Material")]
        public int MaterialId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Range(1, 5)]
        public int RatingValue { get; set; }

        public string Comment { get; set; }

        public DateTime RatingDate { get; set; }

        public virtual MaterialDTO Material { get; set; }
        public virtual UserDto User { get; set; }
    }

}
