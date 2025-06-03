using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        //public string Description { get; set; }

        //[StringLength(255)]
        //public string IconPath { get; set; }

        //public int DisplayOrder { get; set; } = 0;

        //public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Material> Materials { get; set; }
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
    //using System;
    //using System.Collections.Generic;
    //using System.ComponentModel.DataAnnotations;

    //public class Category
    //{
    //[Key]
    //public int CategoryId { get; set; } // מספר מזהה ייחודי

    //public int? ParentCategoryId { get; set; } // קטגוריית-אב

    //[Required]
    //[StringLength(100)]
    //public string Name { get; set; } // שם הקטגוריה

    //public string Description { get; set; } // תיאור הקטגוריה

    //[StringLength(255)]
    //public string Icon { get; set; } // אייקון (אופציונלי)

    //public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
    //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון

    //// קשרים

    //    [Key]
    //    public int Id { get; set; }

    //    public int? ParentCategoryId { get; set; }

    //    [Required]
    //    [StringLength(100)]
    //    public string Name { get; set; }

    //    public string Description { get; set; }

    //    [StringLength(255)]
    //    public string IconPath { get; set; } // שינוי שם השדה מ-Icon ל-IconPath

    //    public int DisplayOrder { get; set; } = 0; // הוספת סדר תצוגה

    //    public bool IsActive { get; set; } = true; // הוספת סטטוס פעיל/לא פעיל

    //    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    //    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    //    public virtual Category ParentCategory { get; set; } // אוסף ההורה


    //    // קשר של אחד לרבים (One-to-Many) - אוספים תת-אוספים
    //    public virtual ICollection<Category> SubCategories { get; set; } = new List<Category>();
    //    public virtual ICollection<Material> Materials { get; set; } // חומרים שקשורים לקטגוריה
    //}


}
