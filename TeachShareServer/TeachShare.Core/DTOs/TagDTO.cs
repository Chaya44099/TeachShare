using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.DTOs
{
    public class TagDTO
    {
        public int Id { get; set; } // מספר מזהה ייחודי
        public string Name { get; set; } // שם התגית
    }

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


}
