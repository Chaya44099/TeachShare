using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; } // מספר מזהה ייחודי
        public string Name { get; set; } // שם הקטגוריה
        //public string Description { get; set; } // תיאור הקטגוריה
    }

    //public class Category
    //{
    //    [Key]
    //    public int CategoryId { get; set; } // מזהה ייחודי של הקטגוריה (מפתח ראשי)

    //    [ForeignKey("ParentCategory")]
    //    public int? ParentCategoryId { get; set; } // מזהה קטגוריה אב (nullable)

    //    public Category ParentCategory { get; set; } // אובייקט הקטגוריה האב

    //    [Required]
    //    public string Name { get; set; } // שם הקטגוריה

    //    public string Description { get; set; } // תיאור הקטגוריה

    //    public string Icon { get; set; } // אייקון הקטגוריה

    //    public DateTime CreatedAt { get; set; } // תאריך יצירת הרשומה

    //    public DateTime UpdatedAt { get; set; } // תאריך עדכון הרשומה
    //}



}
