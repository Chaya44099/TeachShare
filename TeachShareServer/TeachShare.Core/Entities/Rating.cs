using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.Entities
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }


        [Range(1, 5)]
        public int RatingValue { get; set; }

        public string Comment { get; set; }

        public DateTime RatingDate { get; set; } = DateTime.UtcNow;

        public bool IsApproved { get; set; } = true; // האם הדירוג מאושר להצגה

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        //[Key]
        //public int RatingId { get; set; } // מספר מזהה ייחודי

        //[Required]
        public int MaterialId { get; set; } // מזהה החומר

        //[Required]
        public int UserId { get; set; } // מזהה המשתמש

        //[Range(1, 5)]
        //public int RatingValue { get; set; } // ערך הדירוג (1-5)

        //public string Comment { get; set; } // הערה לדירוג (אופציונלי)

        //public DateTime RatingDate { get; set; } = DateTime.UtcNow; // תאריך הדירוג

        //public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון

        //// קשרים
        public virtual Material Material { get; set; } // החומר המדורג
        public virtual User User { get; set; } // המשתמש שדורג
    }

}
