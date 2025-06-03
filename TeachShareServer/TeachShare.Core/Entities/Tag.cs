using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.Entities
{
    //public class Tag
    //{
    //    [Key]
    //    public int TagId { get; set; } // מזהה ייחודי של התגית (מפתח ראשי)

    //    [Required]
    //    public string Name { get; set; } // שם התגית

    //    public int UsageCount { get; set; } // מספר השימושים בתגית

    //    public DateTime CreatedAt { get; set; } // תאריך יצירת הרשומה

    //    public DateTime UpdatedAt { get; set; } // תאריך עדכון הרשומה
    //}
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Description { get; set; } // הוספת תיאור לתגית

        public int UsageCount { get; set; } = 0;

        public bool IsApproved { get; set; } = true; // האם התגית מאושרת

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        //[Key]
        //public int TagId { get; set; } // מספר מזהה ייחודי

        //[Required]
        //[StringLength(100)]
        //public string Name { get; set; } // שם התגית

        //public int UsageCount { get; set; } = 0; // מספר השימושים בתגית

        //public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון

        //// קשרים
        public virtual ICollection<Material> Materials { get; set; } // חומרים שקשורים לתגית
    }

}
